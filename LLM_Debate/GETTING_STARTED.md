# Getting Started with LLM Debate Arena

## Installation

### Prerequisites
- Node.js 18+ or Python 3.8+
- API keys for at least one LLM provider (OpenAI, Anthropic, or Google)

### JavaScript/Node.js Setup

```bash
# Clone the repository
git clone https://github.com/your-username/LLM_Debate.git
cd LLM_Debate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Python Setup

```bash
# Clone the repository (if not already done)
git clone https://github.com/your-username/LLM_Debate.git
cd LLM_Debate/python

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp ../.env.example .env
```

---

## Configuration

### 1. API Keys

Edit `.env` file with your API keys:

```bash
# OpenAI (for GPT models)
OPENAI_API_KEY=sk-...

# Anthropic (for Claude models)
ANTHROPIC_API_KEY=sk-ant-...

# Google (for Gemini models)
GOOGLE_API_KEY=...
```

**You need at least one API key to get started.**

### 2. Optional Configuration

```bash
# Maximum iterations
MAX_ITERATIONS=1000

# Timeout for each API call (milliseconds)
DEBATE_TIMEOUT=300000

# Logging level
LOG_LEVEL=info
```

---

## Quick Start

### JavaScript Example

```javascript
import { LLMDebate } from './src/index.js';
import dotenv from 'dotenv';

dotenv.config();

// Create a debate instance
const debate = new LLMDebate({
  maxRounds: 10,              // Max iterations
  verbose: true               // See progress
});

// Add agents
debate.addAgent('validator', {
  provider: 'anthropic',
  model: 'claude-3-opus-20240229',
  apiKey: process.env.ANTHROPIC_API_KEY
});

debate.addAgent('coder', {
  provider: 'openai',
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY
});

// Set goal
debate.setGoal('Create a Python function to calculate fibonacci numbers');

// Run
const result = await debate.start();
console.log(result.finalResponse);
```

### Python Example

```python
from llm_debate import LLMDebate
import os
from dotenv import load_dotenv

load_dotenv()

# Create debate instance
debate = LLMDebate({
    'max_rounds': 10,
    'verbose': True
})

# Add agents
debate.add_agent('validator', {
    'provider': 'anthropic',
    'model': 'claude-3-opus-20240229',
    'apiKey': os.getenv('ANTHROPIC_API_KEY')
})

debate.add_agent('coder', {
    'provider': 'openai',
    'model': 'gpt-4',
    'apiKey': os.getenv('OPENAI_API_KEY')
})

# Set goal
debate.set_goal('Create a Python function to calculate fibonacci numbers')

# Run
result = await debate.start()
print(result['finalResponse'])
```

---

## Running Examples

### JavaScript

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

# Custom agents
npm run example:custom

# See all available examples
npm run
```

### Python

```bash
cd python

# Run basic example
python examples/basic_example.py

# See Python README for more examples
cat README.md
```

---

## Common Use Cases

### 1. Code Review

```javascript
const debate = new LLMDebate({ maxRounds: 5 });

debate.addAgent('coder', {...});
debate.addAgent('validator', {...});
debate.addCustomAgent('security-expert', 'cybersecurity', {...}, 
  'You are a security expert. Review code for vulnerabilities.');

debate.setGoal('Review this authentication code for security issues...');
const result = await debate.start();
```

### 2. Research Analysis

```javascript
const debate = new LLMDebate({ maxRounds: 10 });

debate.addAgent('web-search', {...});
debate.addAgent('validator', {...});
debate.addCustomAgent('fact-checker', 'fact verification', {...},
  'You verify facts and cite sources.');

debate.setGoal('Research the economic impact of remote work...');
const result = await debate.start();
```

### 3. Complex Problem Solving (100+ Iterations)

```javascript
const debate = new LLMDebate({ 
  maxRounds: 100,              // Deep reasoning
  maxHistory: 2000,            // Handle extensive conversation
  convergenceThreshold: 0.90   // High quality
});

// Add multiple specialized agents
debate.addCustomAgent('economist', 'economics', {...}, '...');
debate.addCustomAgent('statistician', 'data analysis', {...}, '...');
debate.addCustomAgent('fact-checker', 'verification', {...}, '...');
debate.addCustomAgent('critic', 'critical thinking', {...}, '...');

// Enable intelligent orchestration
debate.enableOrchestrator({
  provider: 'openai',
  model: 'gpt-4',
  apiKey: process.env.OPENAI_API_KEY
});

debate.setGoal('Analyze climate change economic impacts over 20 years...');
const result = await debate.start(); // May run 50-100 rounds
```

---

## Configuration Options

### Debate Configuration

```javascript
const debate = new LLMDebate({
  maxRounds: 10,               // Maximum iterations (default: 10)
  maxHistory: 1000,            // Max messages before summarization (default: 1000)
  convergenceThreshold: 0.85,  // Similarity threshold to stop (default: 0.85)
  verbose: true,               // Enable logging (default: true)
  useOrchestrator: false       // Enable orchestrator mode (default: false)
});
```

### Agent Configuration

```javascript
{
  provider: 'openai',          // LLM provider
  model: 'gpt-4',              // Model name
  apiKey: 'your-key',          // API key
  temperature: 0.7,            // Response randomness (0-1, optional)
  max_tokens: 2000            // Max response length (optional)
}
```

### Advanced Features

```javascript
// Intelligent task routing
debate.enableOrchestrator({
  provider: 'openai',
  model: 'gpt-4-turbo-preview',
  apiKey: process.env.OPENAI_API_KEY
});

// Smart response merging
debate.enableSynthesis({
  provider: 'anthropic',
  model: 'claude-3-opus-20240229',
  apiKey: process.env.ANTHROPIC_API_KEY
});
```

---

## Supported LLM Providers

| Provider | Models | Best For |
|----------|--------|----------|
| **OpenAI** | gpt-4-turbo, gpt-4, gpt-3.5-turbo | General purpose, coding |
| **Anthropic** | claude-3-opus, claude-3-sonnet, claude-3-haiku | Reasoning, validation |
| **Google** | gemini-pro | Multimodal tasks |
| **Custom** | Any API endpoint | Your own models |

---

## Next Steps

1. **Read the main [README.md](README.md)** for full documentation
2. **Explore [examples/](examples/)** directory for more use cases
3. **Check [CONTRIBUTING.md](CONTRIBUTING.md)** to contribute
4. **See [CUSTOM_AGENTS_GUIDE.md](CUSTOM_AGENTS_GUIDE.md)** for creating custom agents

---

## Troubleshooting

### API Key Errors
```
Error: Invalid API key
```
**Solution**: Check your `.env` file and ensure API keys are correct.

### Module Not Found
```
Error: Cannot find module './src/index.js'
```
**Solution**: Run `npm install` and ensure you're in the correct directory.

### Out of Memory
```
JavaScript heap out of memory
```
**Solution**: Reduce `maxHistory` or `maxRounds` in configuration.

### Import Issues (Python)
```
ModuleNotFoundError: No module named 'llm_debate'
```
**Solution**: Ensure you're in the `/python` directory and ran `pip install -r requirements.txt`.

---

## Quick Tips

1. **Start simple**: Begin with 2 agents and 5-10 rounds
2. **Use orchestrator** for complex multi-step tasks
3. **Mix models**: GPT-4 for code, Claude for reasoning, Gemini for vision
4. **Monitor convergence**: Check logs to see when debates converge
5. **Adjust temperature**: Lower (0.2-0.4) for precise tasks, higher (0.7-0.9) for creative
6. **Scale gradually**: Test with 10 rounds, then increase to 50, then 100+

---

## Support

- **Documentation**: See [README.md](README.md)
- **Examples**: Browse [examples/](examples/) directory
- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Ask questions on GitHub Discussions

---

**You're ready to start reasoning at scale with LLM Debate Arena!**
