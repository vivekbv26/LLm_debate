# Python Version - LLM Debate Arena

This is the Python implementation of LLM Debate Arena, perfect for ML/AI developers.

## Installation

```bash
cd python
pip install -r requirements.txt
```

## Quick Start

```python
import os
import asyncio
from llm_debate import LLMDebate

async def main():
 # Create debate instance
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
 
 # Set goal and run
 debate.set_goal('Design a REST API for a task management system')
 result = await debate.start()
 
 print(result['final_response'])

if __name__ == '__main__':
 asyncio.run(main())
```

## Features

- Async/await support
- Type hints throughout
- Pythonic API design
- Easy integration with ML/AI workflows
- Compatible with Jupyter notebooks

## Why Python?

Perfect if you're:
- Working in ML/AI environments
- Using Jupyter notebooks
- Integrating with pandas, numpy, scikit-learn
- Building data science pipelines
- Prefer Python ecosystem

## Extending

The Python version has the same architecture as JavaScript:
- `BaseLLMAdapter` for new providers
- `BaseAgent` for custom agents
- `DebateArena` for orchestration
- Full type hints for better IDE support

See the main README for detailed documentation.
