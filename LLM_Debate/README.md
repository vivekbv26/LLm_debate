# LLM Debate Arena

**A plug-and-play framework for multi-LLM collaborative reasoning and debate**

Transform how AI models work together! LLM Debate Arena enables multiple specialized Large Language Models to collaborate like a team, each contributing their expertise to achieve optimal responses on complex goals.

## Why This Matters: Reasoning at Scale

Enable **deep reasoning through 100+ iterations** of multi-LLM collaboration:
- **Iterative refinement**: Complex problems solved through continuous debate
- **Built-in validation**: Validator agents ensure logical consistency
- **Fact-checking**: Verify claims and sources across iterations
- **Critical thinking**: Challenge assumptions and ask probing questions
- **Auto-convergence**: Stops when optimal solution is reached

**Use this to think deeply about complex topics with AI validation and fact-checking built-in.**

## Concept: The Common Response Playground 

Think of it like a **football team** working together to score:
- **The Ball (Response)**: A **SHARED RESPONSE** that all agents collaborate to improve iteratively
- **The Players (Agents)**: Specialized LLMs, each expert in their domain (coding, math, validation, research)
- **The Goal**: Your high-level objective that all agents work toward
- **The Game (Debate)**: Multiple rounds where agents pitch in, challenge, and refine the **SAME RESPONSE**

### How The Common Response Works

```
Round 1: Agent A → Starts the response
Round 2: Agent B → Builds on Agent A's work } All working on
Round 3: Agent C → Refines A+B's response } THE SAME
Round 4: Agent A → Polishes everyone's work } RESPONSE
Result: One optimized response with all perspectives integrated!
```

**Every agent sees and improves the SAME shared response** - it's a true collaboration playground!

See `COMMON_RESPONSE_PLAYGROUND.md` for detailed explanation with examples.

### Key Feature: **YOU Control Everything!**

- Add **unlimited custom LLMs** with **any specialty** you define
- Use **any LLM provider** (OpenAI, Anthropic, Google, custom)
- Set **your own goals** - simple or complex, any domain
- Mix different models for different roles
- **Full flexibility** - it's your team, your rules!

**See `USER_CUSTOM_LLMS.md` for how to add your own custom LLMs!**

## Features

- **Plug-and-Play**: Easy integration with OpenAI, Anthropic, Google, and custom LLM providers
- **Specialized Agents**: Pre-built roles (Validator, Coder, Mathematician, RAG, Web Search)
- **Intelligent Orchestration**: Orchestrator agent routes tasks to the right expert automatically
- **Unlimited Custom Agents**: Add any number of agents with unique specialties
- **Smart Response Synthesis**: LLM-powered merging of contributions into coherent responses
- **Scales to 1000+ Iterations**: Efficient conversation management with automatic summarization
- **Provider Agnostic**: Use different LLMs for different roles - mix and match!
- **Fully Extensible**: Create custom agents and adapters easily
- **Rich Analytics**: Track debate rounds, convergence, and agent contributions
- **Python Version Available**: Full Python implementation for ML/AI developers
- **Production Ready**: Clean architecture, error handling, and best practices

## Quick Start

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd LLM_Debate

# Install dependencies
npm install

# Set up your environment
cp .env.example .env
```

### Choose Your Language

**JavaScript/Node.js** (Main implementation)
- Fast async/await for API calls
- Great for web services and APIs
- Excellent JSON/API handling
- Cross-platform compatibility
- Rich NPM ecosystem

**Python** (Also available in `/python`)
- Perfect for ML/AI workflows
- Jupyter notebook compatible
- Easy integration with pandas, numpy
- Type hints for better IDE support
- See `/python/README.md` for Python setup

### Configuration

Edit `.env` with your API keys:

```bash
# OpenAI (for GPT models)
OPENAI_API_KEY=sk-...

# Anthropic (for Claude models)
ANTHROPIC_API_KEY=sk-ant-...

# Google (for Gemini models)
GOOGLE_API_KEY=...
```

### Basic Usage

```javascript
import { LLMDebate } from './src/index.js';

// Create a debate instance
const debate = new LLMDebate({
 maxRounds: 5,
 verbose: true,
});

// Add specialized agents
debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
});

debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
});

// Set your goal
debate.setGoal('Design a REST API for a task management system');

// Start the debate!
const result = await debate.start();

console.log(result.finalResponse);
```

## Agent Types

### Built-in Agents

#### Validator Agent
Specializes in fact-checking, validation, and ensuring accuracy.

```javascript
debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
});
```

#### Coder Agent
Expert in programming, code review, and technical implementation.

```javascript
debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
});
```

#### Mathematician Agent
Specializes in mathematical reasoning, calculations, and quantitative analysis.

```javascript
debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
});
```

#### RAG Agent
Retrieval-augmented generation with database access for information retrieval.

```javascript
const ragAgent = debate.addAgent('rag', {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY,
}, {
 retrievalFunction: async (query) => {
 return await searchDatabase(query);
 }
});
```

#### Web Search Agent
Real-time web search and current information retrieval.

```javascript
debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
}, {
 searchFunction: async (query) => {
 return await performWebSearch(query);
 }
});
```

#### Orchestrator Agent
**NEW!** Routes tasks to the most appropriate agents based on expertise needs.

```javascript
debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
});
```

### Custom Agents (Unlimited!)

Add **any number** of custom agents with unique specialties:

```javascript
// Add a UX designer
debate.addCustomAgent(
 'ux-designer',
 'user experience and interface design',
 {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a UX expert. Design intuitive interfaces...`
);

// Add a security expert
debate.addCustomAgent(
 'security-expert',
 'cybersecurity and secure coding',
 {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a cybersecurity expert...`
);

// Add ANY specialty you need!
debate.addCustomAgent(
 'your-role', // Your custom role
 'your unique specialty', // What they're expert at
 {
 provider: 'openai', // Any LLM provider
 model: 'gpt-4', // Any model
 apiKey: 'your-key'
 },
 `Your custom system prompt defining their expertise...`
);

// Examples: legal-expert, financial-advisor, marketing-specialist,
// devops-engineer, product-manager, data-scientist,
// medical-advisor, content-writer, etc.
```

**See `CUSTOM_AGENTS_GUIDE.md` for detailed examples of adding your own custom LLMs!**

## Examples

Run the included examples:

```bash
# Basic two-agent debate
npm run example

# Mathematical problem solving
npm run example:math

# Coding task with multiple agents
npm run example:coding

# Research task with RAG
npm run example:research

# Orchestrator mode (intelligent routing)
npm run example:orchestrator

# Custom agents with unique specialties
npm run example:custom

# Multiple models working together
npm run example:models

# User-defined custom LLMs (YOUR specialists!)
npm run example:user

# Common Response Evolution (see how ONE response iterates!)
npm run example:evolution

# Ultimate showcase (everything!)
npm run example:ultimate
```

## Advanced Configuration

### Orchestrator Mode

Enable intelligent routing where an orchestrator decides which agent should handle each task:

```javascript
const debate = new LLMDebate({
 maxRounds: 10,
 useOrchestrator: true, // Enable orchestration
});

// Add orchestrator (it decides who contributes when)
debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
});

// Add your team of agents
debate.addAgent('validator', { /* config */ });
debate.addAgent('coder', { /* config */ });
debate.addAgent('mathematician', { /* config */ });

// Orchestrator routes tasks intelligently!
```

### Intelligent Response Synthesis

Enable LLM-powered merging of contributions:

```javascript
debate.enableSynthesis({
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
});

// Now contributions are intelligently merged!
```

### Multiple Models Strategy

Use different models for different strengths:

```javascript
// GPT-4 for orchestration and coding
debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
});

// Claude for validation and synthesis
debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
});

// Gemini for mathematics
debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
});

// Cost-effective GPT-3.5 for research
debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
});
```

### Custom Agent Configuration

```javascript
debate.addAgent('validator', {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY,
}, {
 temperature: 0.3, // Lower temperature for more consistent validation
 systemPrompt: 'Your custom system prompt here...',
});
```

### Debate Arena Settings

```javascript
const debate = new LLMDebate({
 maxRounds: 10, // Maximum debate rounds
 maxHistory: 1000, // Conversation history limit
 convergenceThreshold: 0.85, // When to stop (0-1)
 verbose: true, // Enable logging
});
```

### Using Custom LLM Providers

```javascript
debate.addAgent('coder', {
 provider: 'custom',
 endpoint: 'https://your-api.com/generate',
 apiKey: 'your-api-key',
 model: 'your-model',
 headers: {
 'Content-Type': 'application/json',
 'Authorization': 'Bearer YOUR_KEY',
 },
});
```

## Architecture

```
LLM_Debate/
├── src/
│ ├── adapters/ # LLM provider adapters
│ │ ├── base.js # Base adapter interface
│ │ ├── openai.js # OpenAI integration
│ │ ├── anthropic.js # Anthropic/Claude integration
│ │ ├── google.js # Google/Gemini integration
│ │ ├── custom.js # Custom provider support
│ │ └── index.js # Adapter factory
│ ├── agents/ # Specialized agent implementations
│ │ ├── base.js # Base agent class
│ │ ├── validator.js # Validation agent
│ │ ├── coder.js # Coding agent
│ │ ├── mathematician.js # Math agent
│ │ ├── rag.js # RAG agent
│ │ └── index.js # Agent exports
│ ├── core/ # Core debate system
│ │ ├── arena.js # Debate orchestration
│ │ └── conversation.js # Conversation management
│ └── index.js # Main entry point
├── examples/ # Usage examples
│ ├── basic-debate.js
│ ├── math-problem.js
│ ├── coding-task.js
│ ├── research-task.js
│ └── advanced-all-agents.js
├── package.json
├── .env.example
└── README.md
```

## Supported LLM Providers

- **OpenAI** (GPT-4, GPT-3.5, etc.)
- **Anthropic** (Claude 3 Opus, Sonnet, Haiku)
- **Google** (Gemini Pro)
- **Custom APIs** (Bring your own endpoint)

## 🎮 How It Works

### Standard Mode (Round-Robin)
1. **Setup**: Configure debate arena and register specialized agents
2. **Goal Setting**: Define the high-level objective you want to achieve
3. **Debate Rounds**: 
 - Each agent contributes in sequence
 - Agents review previous contributions in context
 - Response evolves through iterative refinement
4. **Convergence**: Debate continues until consensus is reached or max rounds hit
5. **Result**: Get the final synthesized response with full history

### Orchestrator Mode (Intelligent Routing)
1. **Setup**: Enable orchestrator and register specialized agents
2. **Goal Setting**: Define your high-level objective
3. **Smart Routing**:
 - Orchestrator analyzes what's needed at each stage
 - Routes task to the most appropriate expert
 - Provides specific focus areas for each agent
 - Agents contribute only when their expertise is needed
4. **Synthesis**: Contributions are intelligently merged
5. **Result**: Optimal solution leveraging each agent's strengths

### The Football Team Analogy
- **The Ball (Central Response)**: Shared response that gets refined
- **The Players (Agents)**: Specialized LLMs with unique talents
- **The Coach (Orchestrator)**: Decides which player handles what
- **The Goal**: Best possible response through teamwork
- **The Strategy**: Each player adds their unique value

## Use Cases

- **Complex Code Development**: Multiple models reviewing, implementing, and optimizing
- **Research & Analysis**: Combining retrieval, validation, and synthesis
- **Problem Solving**: Mathematical + logical + implementation perspectives
- **Content Creation**: Validation, optimization, and multi-angle refinement
- **System Design**: Architecture, security, UX, and database experts collaborating
- **Decision Making**: Multiple expert viewpoints on complex decisions
- **API Development**: Coding, validation, security, and documentation together
- **ML Model Building**: Math, coding, validation, and research combined

## Creating Custom Agents

```javascript
import { BaseAgent } from './src/agents/base.js';

class MyCustomAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'custom',
 specialty: 'my specialty',
 ...config,
 });
 }

 getDefaultSystemPrompt() {
 return 'You are an expert in...';
 }

 buildPrompt(goal, context, currentResponse) {
 // Custom prompt building logic
 return `Your custom prompt here...`;
 }
}

// Use it
const customAgent = new MyCustomAgent(adapter);
debate.arena.registerAgent(customAgent);
```

## Performance & Scaling

- **Efficient History Management**: Automatic summarization at 1000+ messages
- **Parallel-Ready**: Agents can be extended for parallel processing
- **Memory Optimization**: Old conversations are summarized to save memory
- **Convergence Detection**: Stops automatically when optimal response is reached

##  Contributing

We welcome contributions! Here's how:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Commit**: `git commit -m 'Add amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Areas for Contribution

- New LLM provider adapters
- Additional specialized agents
- Performance optimizations
- Documentation improvements
-  Test coverage
- Additional examples

## License

MIT License - see [LICENSE](LICENSE) file for details

##  Acknowledgments

Built with the vision of collaborative AI reasoning, inspired by how human experts work together to solve complex problems.

##  Support

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the `/examples` folder

## Roadmap

- [x] Core debate system with multiple agents
- [x] Intelligent orchestrator for task routing
- [x] Unlimited custom agents support
- [x] Smart response synthesis
- [x] Python version
- [ ] Web UI for debate visualization
- [ ] Streaming support for real-time updates
- [ ] Agent marketplace for sharing custom agents
- [ ] Vector database integration for RAG
- [ ] Multi-language support
- [ ] Performance benchmarks
- [ ] Parallel agent execution
- [ ] Export debates to various formats (JSON, Markdown, PDF)
- [ ] Agent memory and learning capabilities

---

**Open-source contribution to the AI community**

*Maximize the potential of LLMs through collaboration!*
