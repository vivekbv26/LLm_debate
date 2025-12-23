#!/usr/bin/env node

/**
 * Interactive Demo Script
 * Shows users how to add custom LLMs
 */

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║ LLM DEBATE ARENA ║
║ Add Your Own Custom LLMs! ║
╚════════════════════════════════════════════════════════════════════╝

 YES! You can add UNLIMITED custom LLMs with ANY specialty!

┌────────────────────────────────────────────────────────────────────┐
│ STEP 1: Choose Your Specialty │
└────────────────────────────────────────────────────────────────────┘

Examples of custom specialties you can add:
 • Marketing Expert • Legal Advisor • Financial Analyst
 • Product Manager • DevOps Engineer • UX Designer
 • Security Expert • Data Scientist • Content Writer
 • Medical Advisor • Sales Strategist • HR Consultant
 • SEO Specialist • Brand Manager • Supply Chain Expert
 • Customer Success • Business Analyst • Quality Assurance
 ... or ANYTHING else you can imagine!

┌────────────────────────────────────────────────────────────────────┐
│ STEP 2: Choose Your LLM Provider │
└────────────────────────────────────────────────────────────────────┘

Supported providers:
 ✓ OpenAI (GPT-4, GPT-3.5, etc.)
 ✓ Anthropic (Claude 3 Opus, Sonnet, Haiku)
 ✓ Google (Gemini Pro)
 ✓ Custom (Your own API endpoint)

Mix different providers for different roles!

┌────────────────────────────────────────────────────────────────────┐
│ STEP 3: Add Your Custom Agent │
└────────────────────────────────────────────────────────────────────┘

`);

console.log('\x1b[36m%s\x1b[0m', `
debate.addCustomAgent(
 'your-role-name', // 👈 Your custom role
 'your specialty', // 👈 What they're expert at
 {
 provider: 'openai', // 👈 Any LLM provider
 model: 'gpt-4', // 👈 Any model
 apiKey: 'your-api-key' // 👈 Your API key
 },
 \`You are an expert in... // 👈 Your custom instructions
 Describe what this agent should do.\`
);
`);

console.log(`
┌────────────────────────────────────────────────────────────────────┐
│ STEP 4: Set Your Goal │
└────────────────────────────────────────────────────────────────────┘
`);

console.log('\x1b[36m%s\x1b[0m', `
debate.setGoal('Your custom high-level goal here...');
`);

console.log(`
┌────────────────────────────────────────────────────────────────────┐
│ STEP 5: Run! │
└────────────────────────────────────────────────────────────────────┘
`);

console.log('\x1b[36m%s\x1b[0m', `
const result = await debate.start();
console.log(result.finalResponse);
`);

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║ REAL EXAMPLES ║
╚════════════════════════════════════════════════════════════════════╝

Example 1: Add a Marketing Expert
`);

console.log('\x1b[32m%s\x1b[0m', `
debate.addCustomAgent(
 'marketing-expert',
 'digital marketing and growth strategies',
 { provider: 'openai', model: 'gpt-4', apiKey: process.env.OPENAI_API_KEY },
 \`You are a digital marketing expert specializing in growth strategies...\`
);
`);

console.log(`
Example 2: Add a Legal Advisor
`);

console.log('\x1b[32m%s\x1b[0m', `
debate.addCustomAgent(
 'legal-advisor',
 'legal compliance and contract analysis',
 { provider: 'anthropic', model: 'claude-3-opus', apiKey: process.env.ANTHROPIC_API_KEY },
 \`You are a legal expert specializing in compliance and contracts...\`
);
`);

console.log(`
Example 3: Add a Financial Analyst
`);

console.log('\x1b[32m%s\x1b[0m', `
debate.addCustomAgent(
 'financial-analyst',
 'financial planning and investment strategy',
 { provider: 'google', model: 'gemini-pro', apiKey: process.env.GOOGLE_API_KEY },
 \`You are a financial analyst specializing in planning and strategy...\`
);
`);

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║ KEY FEATURES ║
╚════════════════════════════════════════════════════════════════════╝

 Unlimited Custom Agents Add as many as you need
 Any Specialty Define any domain expertise
 Any LLM Provider OpenAI, Anthropic, Google, Custom
 Mix & Match Models Different LLMs for different roles
 Custom Goals Set any high-level objective
 Full Control Temperature, prompts, configuration

╔════════════════════════════════════════════════════════════════════╗
║ TRY IT NOW ║
╚════════════════════════════════════════════════════════════════════╝

Run examples:
 npm run example:user # User-defined custom LLMs
 node examples/simple-custom.js # Simplest example

Documentation:
 USER_CUSTOM_LLMS.md # Quick guide
 CUSTOM_AGENTS_GUIDE.md # Detailed guide
 QUICKSTART.md # Quick reference

╔════════════════════════════════════════════════════════════════════╗
║ YES! Users can add custom LLMs with ANY specialty and goals! ║
╚════════════════════════════════════════════════════════════════════╝
`);
