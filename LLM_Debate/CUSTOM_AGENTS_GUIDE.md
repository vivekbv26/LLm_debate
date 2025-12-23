# Adding Custom LLMs - Complete Guide

## YES! You Can Add Custom LLMs

Users have **THREE ways** to add custom LLMs with their own goals and specialties:

## Method 1: Quick Custom Agent

```javascript
import { LLMDebate } from './src/index.js';

const debate = new LLMDebate();

// Add ANY custom specialist with ANY LLM!
debate.addCustomAgent(
 'your-role-name', // Unique role
 'what they are expert at', // Their specialty
 {
 provider: 'openai', // Any provider
 model: 'gpt-4', // Any model
 apiKey: 'your-key'
 },
 `Your custom system prompt here...
 Define exactly what this agent should do.`
);

// Set your own goal
debate.setGoal('Your custom high-level goal here...');
```

## Method 2: Using Built-in Agent Types

```javascript
// Use 'custom' type with your own configuration
debate.addAgent('custom', {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
}, {
 role: 'my-specialist',
 specialty: 'my unique expertise',
 systemPrompt: 'Custom instructions...',
 temperature: 0.5
});
```

## Method 3: Extend BaseAgent Class

```javascript
import { BaseAgent } from './src/agents/base.js';
import { AdapterFactory } from './src/adapters/index.js';

// Create your own agent class
class MyCustomAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'my-agent',
 specialty: 'my expertise',
 ...config
 });
 }

 getDefaultSystemPrompt() {
 return `You are an expert in my custom domain...`;
 }

 // Override methods as needed
 async contribute(goal, context, currentResponse) {
 // Your custom logic
 return await super.contribute(goal, context, currentResponse);
 }
}

// Use it
const adapter = AdapterFactory.createAdapter({
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
});

const myAgent = new MyCustomAgent(adapter);
debate.arena.registerAgent(myAgent);
```

## Real-World Examples

### Example 1: Legal Expert

```javascript
debate.addCustomAgent(
 'legal-expert',
 'legal analysis and compliance',
 {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY
 },
 `You are a legal expert specializing in:
- Contract analysis and drafting
- Compliance and regulatory requirements
- Risk assessment
- Legal precedents and case law
- Terms of service and privacy policies

Provide legally sound advice and identify potential issues.`
);
```

### Example 2: Medical Advisor

```javascript
debate.addCustomAgent(
 'medical-advisor',
 'medical information and health analysis',
 {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
 },
 `You are a medical information specialist. Your role is to:
- Provide evidence-based medical information
- Explain health concepts clearly
- Cite medical research and studies
- Consider patient safety and ethical guidelines
- Always recommend consulting healthcare professionals

Note: This is for informational purposes only.`,
 { temperature: 0.3 } // Lower for accuracy
);
```

### Example 3: Financial Analyst

```javascript
debate.addCustomAgent(
 'financial-analyst',
 'financial analysis and investment strategy',
 {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY
 },
 `You are a financial analyst expert in:
- Financial modeling and forecasting
- Investment analysis and portfolio management
- Risk assessment and mitigation
- Market analysis and trends
- Economic indicators

Provide data-driven financial insights.`
);
```

### Example 4: Creative Writer

```javascript
debate.addCustomAgent(
 'creative-writer',
 'creative writing and storytelling',
 {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY
 },
 `You are a creative writing expert specializing in:
- Compelling narratives and storytelling
- Character development
- Dialogue and voice
- Plot structure and pacing
- Literary techniques and style

Create engaging, well-crafted content.`,
 { temperature: 0.9 } // Higher for creativity
);
```

### Example 5: DevOps Engineer

```javascript
debate.addCustomAgent(
 'devops-engineer',
 'infrastructure, deployment, and operations',
 {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY
 },
 `You are a DevOps and infrastructure expert in:
- CI/CD pipeline design
- Container orchestration (Docker, Kubernetes)
- Cloud infrastructure (AWS, GCP, Azure)
- Monitoring and observability
- Infrastructure as Code (Terraform, CloudFormation)
- Security and compliance

Design scalable, reliable systems.`
);
```

## Setting Custom Goals

```javascript
// Simple goal
debate.setGoal('Design a mobile app for fitness tracking');

// Complex goal with details
debate.setGoal(`
Create a comprehensive SaaS platform for project management.

Requirements:
1. User authentication and authorization
2. Real-time collaboration features
3. Task management with dependencies
4. Time tracking and reporting
5. Integration with third-party tools
6. Mobile and web applications
7. Scalable architecture for 100k+ users

Consider all aspects: technical, legal, financial, UX, security.
`);

// Domain-specific goal
debate.setGoal(`
Analyze the feasibility of launching a telemedicine platform in California.

Areas to cover:
- Legal and compliance (HIPAA, state regulations)
- Technical infrastructure (video, EMR integration)
- Medical considerations (scope of practice, liability)
- Financial analysis (costs, revenue model, ROI)
- Market analysis (competitors, target audience)

Provide a comprehensive go/no-go recommendation.
`);
```

## Mixing Different LLM Providers

```javascript
const debate = new LLMDebate({ maxRounds: 10 });

// Use GPT-4 for coding
debate.addCustomAgent('backend-dev', 'backend development', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY
}, `You are a backend developer...`);

// Use Claude for validation
debate.addCustomAgent('code-reviewer', 'code review and quality', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY
}, `You are a code reviewer...`);

// Use Gemini for architecture
debate.addCustomAgent('architect', 'system architecture', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY
}, `You are a system architect...`);

// Use custom API for your own model
debate.addCustomAgent('custom-model', 'your specialty', {
 provider: 'custom',
 endpoint: 'https://your-api.com/generate',
 apiKey: 'your-key',
 model: 'your-model'
}, `Your custom instructions...`);
```

## Add As Many As You Need!

```javascript
// Add 10 different specialists!
const specialists = [
 { role: 'frontend', specialty: 'React/UI' },
 { role: 'backend', specialty: 'Node.js/APIs' },
 { role: 'database', specialty: 'SQL/NoSQL' },
 { role: 'security', specialty: 'AppSec' },
 { role: 'devops', specialty: 'Infrastructure' },
 { role: 'qa', specialty: 'Testing' },
 { role: 'product', specialty: 'Product Management' },
 { role: 'designer', specialty: 'UX/UI Design' },
 { role: 'legal', specialty: 'Compliance' },
 { role: 'marketing', specialty: 'Go-to-market' }
];

specialists.forEach(spec => {
 debate.addCustomAgent(
 spec.role,
 spec.specialty,
 {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
 },
 `You are a ${spec.specialty} expert...`
 );
});

// They all collaborate on your goal!
debate.setGoal('Build a complete SaaS product from scratch');
```

## Configuration Options

```javascript
debate.addCustomAgent(
 'my-agent',
 'my specialty',
 {
 provider: 'openai', // Required
 model: 'gpt-4', // Required
 apiKey: 'key', // Required
 endpoint: '...', // For custom provider
 headers: {...} // For custom provider
 },
 'System prompt...', // Required
 {
 // Optional configurations
 temperature: 0.7, // Control randomness (0-1)
 maxTokens: 2000, // Max response length
 customField: 'value' // Any custom fields
 }
);
```

## Key Points

 **Unlimited Agents**: Add as many as you need 
 **Any Specialty**: Define ANY domain expertise 
 **Any LLM Provider**: OpenAI, Anthropic, Google, Custom 
 **Mix & Match**: Different models for different roles 
 **Custom Goals**: Set any high-level objective 
 **Full Control**: Temperature, prompts, configuration 

## Summary

**YES, users can:**
1. Add unlimited custom LLMs
2. Define any specialty for each agent
3. Use any LLM provider (OpenAI, Anthropic, Google, Custom)
4. Set their own custom goals
5. Mix different models for different roles
6. Fully customize behavior and prompts

**The system is completely flexible and extensible!** 
