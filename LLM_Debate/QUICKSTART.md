# LLM Debate Arena - Quick Reference

## Basic Setup

```javascript
import { LLMDebate } from './src/index.js';

const debate = new LLMDebate({
 maxRounds: 10, // Max debate rounds
 maxHistory: 1000, // Conversation history limit
 convergenceThreshold: 0.85, // When to stop (0-1)
 verbose: true, // Enable logging
 useOrchestrator: false // Enable intelligent routing
});
```

## Adding Agents

### Built-in Agents
```javascript
// Validator (fact-checking, validation)
debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY
});

// Coder (programming, code review)
debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY
});

// Mathematician (math, quantitative analysis)
debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY
});

// RAG (retrieval, database access)
debate.addAgent('rag', {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
}, {
 retrievalFunction: async (query) => {
 return await yourSearchFunction(query);
 }
});

// Web Search (real-time info)
debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY
});
```

### Custom Agents
```javascript
debate.addCustomAgent(
 'role-name', // Unique role
 'specialty description', // What they're expert at
 { // LLM config
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
 },
 `System prompt describing the agent's expertise...`
);
```

## Orchestrator Mode

```javascript
// Enable orchestrator (decides which agent contributes when)
debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY
});
```

## Response Synthesis

```javascript
// Enable intelligent merging of contributions
debate.enableSynthesis({
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY
});
```

## Running Debates

```javascript
// Set your goal
debate.setGoal('Your high-level goal here...');

// Start the debate
const result = await debate.start();

// Access results
console.log(result.finalResponse); // The final answer
console.log(result.rounds); // How many rounds
console.log(result.stats); // Statistics
console.log(result.history); // Full conversation
```

## Supported Providers

| Provider | Config Key | Models |
|----------|-----------|---------|
| OpenAI | `'openai'` | gpt-4-turbo-preview, gpt-4, gpt-3.5-turbo |
| Anthropic | `'anthropic'` | claude-3-opus-20240229, claude-3-sonnet-20240229, claude-3-haiku-20240307 |
| Google | `'google'` | gemini-pro, gemini-pro-vision |
| Custom | `'custom'` | Your custom endpoint |

## Environment Variables

```bash
# .env file
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...

MAX_ITERATIONS=1000
DEBATE_TIMEOUT=300000
LOG_LEVEL=info
```

## Examples

```bash
npm run example # Basic debate
npm run example:math # Math problem
npm run example:coding # Coding task
npm run example:research # Research with RAG
npm run example:orchestrator # Intelligent routing
npm run example:custom # Custom agents
npm run example:models # Multiple models
```

## Common Patterns

### Pattern 1: Code Review Team
```javascript
debate.addAgent('coder', { /* config */ });
debate.addAgent('validator', { /* config */ });
debate.addCustomAgent('security-expert', 'cybersecurity', { /* config */ }, prompt);
```

### Pattern 2: Research Team
```javascript
debate.addAgent('web-search', { /* config */ });
debate.addAgent('rag', { /* config */ });
debate.addAgent('validator', { /* config */ });
```

### Pattern 3: Full Stack Team
```javascript
debate.enableOrchestrator({ /* config */ });
debate.addAgent('coder', { /* config */ });
debate.addCustomAgent('database-architect', 'database design', { /* config */ }, prompt);
debate.addCustomAgent('ux-designer', 'UI/UX', { /* config */ }, prompt);
debate.addAgent('validator', { /* config */ });
```

## Tips

1. **Use orchestrator** for complex tasks requiring different expertise at different stages
2. **Enable synthesis** for better response coherence
3. **Mix models** to leverage different strengths (GPT-4 for code, Claude for reasoning)
4. **Start with 5-10 rounds** then adjust based on convergence
5. **Custom agents** can represent ANY specialty - be creative!
6. **Lower temperature** (0.2-0.4) for math/code, higher (0.7-0.9) for creative tasks

## Python Version

```python
from llm_debate import LLMDebate

debate = LLMDebate({'max_rounds': 5, 'verbose': True})
debate.add_agent('validator', {...})
debate.set_goal('Your goal...')
result = await debate.start()
```

See `/python/README.md` for full Python documentation.
