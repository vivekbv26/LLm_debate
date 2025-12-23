# LLM Debate Arena - Python Version
# Equivalent implementation for Python/ML users

from typing import List, Dict, Optional, Callable, Any
from abc import ABC, abstractmethod
import asyncio
from dataclasses import dataclass, field
from datetime import datetime
import json

@dataclass
class Message:
    """Represents a conversation message"""
    role: str
    content: str
    timestamp: str = field(default_factory=lambda: datetime.now().isoformat())
    metadata: Dict[str, Any] = field(default_factory=dict)

class BaseLLMAdapter(ABC):
    """Base class for LLM adapters"""
    
    def __init__(self, config: Dict[str, Any]):
        self.config = config
        self.provider = config.get('provider')
        self.model = config.get('model')
        self.api_key = config.get('api_key')
    
    @abstractmethod
    async def generate(self, prompt: str, options: Dict[str, Any] = None) -> str:
        """Generate a response from the LLM"""
        pass
    
    def validate(self) -> bool:
        """Validate the configuration"""
        if not self.api_key:
            raise ValueError(f"API key is required for {self.provider}")
        return True

class OpenAIAdapter(BaseLLMAdapter):
    """OpenAI/GPT adapter"""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        try:
            from openai import AsyncOpenAI
            self.client = AsyncOpenAI(api_key=self.api_key)
        except ImportError:
            raise ImportError("OpenAI package not installed. Run: pip install openai")
    
    async def generate(self, prompt: str, options: Dict[str, Any] = None) -> str:
        options = options or {}
        response = await self.client.chat.completions.create(
            model=self.model or 'gpt-4-turbo-preview',
            messages=[{'role': 'user', 'content': prompt}],
            temperature=options.get('temperature', 0.7),
            max_tokens=options.get('max_tokens', 2000)
        )
        return response.choices[0].message.content

class AnthropicAdapter(BaseLLMAdapter):
    """Anthropic/Claude adapter"""
    
    def __init__(self, config: Dict[str, Any]):
        super().__init__(config)
        try:
            from anthropic import AsyncAnthropic
            self.client = AsyncAnthropic(api_key=self.api_key)
        except ImportError:
            raise ImportError("Anthropic package not installed. Run: pip install anthropic")
    
    async def generate(self, prompt: str, options: Dict[str, Any] = None) -> str:
        options = options or {}
        response = await self.client.messages.create(
            model=self.model or 'claude-3-opus-20240229',
            max_tokens=options.get('max_tokens', 2000),
            messages=[{'role': 'user', 'content': prompt}],
            temperature=options.get('temperature', 0.7)
        )
        return response.content[0].text

class BaseAgent(ABC):
    """Base class for all agents"""
    
    def __init__(self, adapter: BaseLLMAdapter, config: Dict[str, Any] = None):
        config = config or {}
        self.adapter = adapter
        self.role = config.get('role', 'agent')
        self.specialty = config.get('specialty', 'general')
        self.system_prompt = config.get('system_prompt', self.get_default_system_prompt())
        self.temperature = config.get('temperature', 0.7)
    
    def get_default_system_prompt(self) -> str:
        return f"You are a helpful AI assistant specializing in {self.specialty}."
    
    async def contribute(self, goal: str, context: Dict[str, Any], current_response: str) -> str:
        """Contribute to the debate"""
        prompt = self.build_prompt(goal, context, current_response)
        return await self.adapter.generate(prompt, {'temperature': self.temperature})
    
    def build_prompt(self, goal: str, context: Dict[str, Any], current_response: str) -> str:
        """Build the prompt for this agent"""
        prompt = f"{self.system_prompt}\n\n"
        prompt += f"HIGH-LEVEL GOAL: {goal}\n\n"
        
        if current_response:
            prompt += f"CURRENT RESPONSE:\n{current_response}\n\n"
        
        if context.get('conversation_context'):
            prompt += f"RECENT DISCUSSION:\n{context['conversation_context']}\n\n"
        
        prompt += f"As the {self.role}, provide your expert contribution to improve this response. "
        prompt += f"Focus on your specialty: {self.specialty}.\n"
        prompt += "Be specific and actionable in your suggestions or improvements."
        
        return prompt

class ConversationManager:
    """Manages conversation history efficiently"""
    
    def __init__(self, max_history: int = 1000):
        self.max_history = max_history
        self.history: List[Message] = []
        self.summaries: List[Dict] = []
    
    def add_message(self, role: str, content: str, metadata: Dict = None):
        """Add a message to history"""
        message = Message(role=role, content=content, metadata=metadata or {})
        self.history.append(message)
        
        if len(self.history) > self.max_history:
            self._summarize_old_messages()
    
    def get_recent_messages(self, count: int = 10) -> List[Message]:
        """Get recent messages"""
        return self.history[-count:]
    
    def get_context(self, context_window: int = 20) -> str:
        """Get formatted context"""
        recent = self.get_recent_messages(context_window)
        return '\n\n'.join([f"[{msg.role}]: {msg.content}" for msg in recent])
    
    def _summarize_old_messages(self):
        """Summarize old messages to save memory"""
        to_summarize = self.history[:len(self.history) // 2]
        self.summaries.append({
            'message_count': len(to_summarize),
            'participants': list(set(msg.role for msg in to_summarize))
        })
        self.history = self.history[len(self.history) // 2:]
    
    def get_stats(self) -> Dict:
        """Get conversation statistics"""
        return {
            'total_messages': len(self.history),
            'participants': list(set(msg.role for msg in self.history)),
            'summaries': len(self.summaries)
        }

class DebateArena:
    """Main debate orchestration system"""
    
    def __init__(self, config: Dict[str, Any] = None):
        config = config or {}
        self.agents: List[BaseAgent] = []
        self.conversation = ConversationManager(config.get('max_history', 1000))
        self.current_response = ''
        self.goal = ''
        self.max_rounds = config.get('max_rounds', 10)
        self.verbose = config.get('verbose', True)
    
    def register_agent(self, agent: BaseAgent):
        """Register an agent"""
        self.agents.append(agent)
        if self.verbose:
            print(f"[Registered] Agent: {agent.role} ({agent.specialty})")
    
    def set_goal(self, goal: str):
        """Set the debate goal"""
        self.goal = goal
        self.current_response = ''
        self.conversation.add_message('system', f"Goal set: {goal}")
    
    async def debate(self) -> Dict[str, Any]:
        """Start the debate process"""
        if not self.goal:
            raise ValueError("Goal must be set before starting debate")
        
        if not self.agents:
            raise ValueError("At least one agent must be registered")
        
        if self.verbose:
            print(f"\n[Debate Arena] Starting...")
            print(f"Goal: {self.goal}")
            print(f"Agents: {', '.join(a.role for a in self.agents)}\n")
        
        for round_num in range(1, self.max_rounds + 1):
            if self.verbose:
                print(f"\n--- Round {round_num}/{self.max_rounds} ---")
            
            for agent in self.agents:
                try:
                    context = self._build_context()
                    contribution = await agent.contribute(self.goal, context, self.current_response)
                    
                    self.conversation.add_message(
                        agent.role,
                        contribution,
                        {'round': round_num, 'specialty': agent.specialty}
                    )
                    
                    self.current_response = contribution
                    
                    if self.verbose:
                        preview = contribution[:200] + ('...' if len(contribution) > 200 else '')
                        print(f"\n[{agent.role}] contributed:\n{preview}")
                
                except Exception as e:
                    print(f"[Error] from {agent.role}: {e}")
        
        return {
            'final_response': self.current_response,
            'rounds': self.max_rounds,
            'stats': self.conversation.get_stats(),
            'history': [vars(msg) for msg in self.conversation.history]
        }
    
    def _build_context(self) -> Dict[str, Any]:
        """Build context for agents"""
        return {
            'goal': self.goal,
            'current_response': self.current_response,
            'recent_history': self.conversation.get_recent_messages(10),
            'conversation_context': self.conversation.get_context(15)
        }

class LLMDebate:
    """Main API for LLM Debate system"""
    
    def __init__(self, config: Dict[str, Any] = None):
        config = config or {}
        self.arena = DebateArena(config)
    
    def add_agent(self, agent_type: str, llm_config: Dict[str, Any], agent_config: Dict[str, Any] = None):
        """Add an agent to the debate"""
        agent_config = agent_config or {}
        
        # Create adapter
        provider = llm_config['provider'].lower()
        if provider == 'openai':
            adapter = OpenAIAdapter(llm_config)
        elif provider == 'anthropic':
            adapter = AnthropicAdapter(llm_config)
        else:
            raise ValueError(f"Unsupported provider: {provider}")
        
        adapter.validate()
        
        # Create agent
        agent = BaseAgent(adapter, {
            'role': agent_type,
            'specialty': agent_config.get('specialty', agent_type),
            **agent_config
        })
        
        self.arena.register_agent(agent)
        return agent
    
    def set_goal(self, goal: str):
        """Set the debate goal"""
        self.arena.set_goal(goal)
    
    async def start(self) -> Dict[str, Any]:
        """Start the debate"""
        return await self.arena.debate()

# Example usage
async def main():
    """Example usage of the Python version"""
    import os
    
    debate = LLMDebate({'max_rounds': 5, 'verbose': True})
    
    # Add agents
    debate.add_agent('validator', {
        'provider': 'anthropic',
        'model': 'claude-3-sonnet-20240229',
        'api_key': os.getenv('ANTHROPIC_API_KEY')
    })
    
    debate.add_agent('coder', {
        'provider': 'openai',
        'model': 'gpt-4-turbo-preview',
        'api_key': os.getenv('OPENAI_API_KEY')
    })
    
    # Set goal
    debate.set_goal('Design a REST API for a task management system')
    
    # Start debate
    result = await debate.start()
    
    print('\n\n' + '='*80)
    print('FINAL RESPONSE')
    print('='*80 + '\n')
    print(result['final_response'])

if __name__ == '__main__':
    asyncio.run(main())
