# Contributing to LLM Debate Arena

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/your-repo/issues)
2. If not, create a new issue with:
 - Clear title and description
 - Steps to reproduce
 - Expected vs actual behavior
 - Your environment (OS, Node version, etc.)
 - Code samples if applicable

### Suggesting Enhancements

1. Check existing [Issues](https://github.com/your-repo/issues) and [Discussions](https://github.com/your-repo/discussions)
2. Create a new issue/discussion describing:
 - The enhancement and its benefits
 - Possible implementation approach
 - Any potential drawbacks

### Pull Requests

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/your-username/LLM_Debate.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes**
5. **Test** your changes thoroughly
6. **Commit** with clear messages: `git commit -m "Add feature: description"`
7. **Push** to your fork: `git push origin feature/your-feature-name`
8. **Open a Pull Request** with:
 - Clear description of changes
 - Reference to related issues
 - Screenshots/examples if applicable

## Development Areas

### High Priority

- **New LLM Adapters**: Add support for more providers (Cohere, Mistral, etc.)
- **Advanced RAG**: Implement vector database integrations
- **Performance**: Optimize for larger scale debates
- **Tests**: Increase test coverage

### Medium Priority

- **UI/Visualization**: Web interface for debates
- **Export Functions**: Different output formats
- **Orchestration Strategies**: New debate patterns
- **Monitoring**: Better logging and analytics

### Nice to Have

- **Documentation**: More examples and tutorials
- **Translations**: Multi-language support
- **Integrations**: Connect with other tools
- **Templates**: Pre-configured debate scenarios

## 📋 Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/LLM_Debate.git
cd LLM_Debate

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Add your API keys to .env

# Run examples to test
npm run example
```

## Code Style

- Use ES6+ features
- Follow existing code structure
- Add JSDoc comments for public methods
- Keep functions focused and modular
- Use meaningful variable/function names

### Example

```javascript
/**
 * Generate a response from the LLM
 * @param {string} prompt - The prompt to send
 * @param {object} options - Additional options
 * @returns {Promise<string>} - The LLM's response
 */
async generate(prompt, options = {}) {
 // Implementation
}
```

## 🧪 Testing

Before submitting:

1. Test with multiple LLM providers
2. Verify examples still work
3. Check for console errors
4. Test edge cases
5. Ensure backward compatibility

## Commit Messages

Use clear, descriptive commit messages:

- `feat: Add support for Cohere API`
- `fix: Resolve conversation history bug`
- `docs: Update README with new examples`
- `refactor: Improve arena convergence logic`
- `test: Add tests for validator agent`

## 🔍 Adding New Agents

To add a new agent type:

1. Create a new file in `src/agents/your-agent.js`
2. Extend `BaseAgent` class
3. Implement required methods
4. Add to `src/agents/index.js`
5. Create an example in `examples/`
6. Update documentation

```javascript
import { BaseAgent } from './base.js';

export class YourAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'your-role',
 specialty: 'your specialty',
 ...config,
 });
 }

 getDefaultSystemPrompt() {
 return 'You are an expert in...';
 }
}
```

## Adding New Adapters

To add a new LLM provider:

1. Create `src/adapters/provider.js`
2. Extend `BaseLLMAdapter`
3. Implement `generate()` and `generateStream()`
4. Add to `AdapterFactory` in `src/adapters/index.js`
5. Update documentation

```javascript
import { BaseLLMAdapter } from './base.js';

export class YourAdapter extends BaseLLMAdapter {
 constructor(config) {
 super(config);
 // Initialize your client
 }

 async generate(prompt, options = {}) {
 // Implement API call
 }

 async generateStream(prompt, onChunk, options = {}) {
 // Implement streaming
 }
}
```

## Documentation

When adding features:

- Update README.md
- Add JSDoc comments
- Create examples if applicable
- Update CONTRIBUTING.md if adding new areas

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 🙋 Questions?

- Open a [Discussion](https://github.com/your-repo/discussions)
- Comment on related [Issues](https://github.com/your-repo/issues)
- Review existing documentation

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for making LLM Debate Arena better! 
