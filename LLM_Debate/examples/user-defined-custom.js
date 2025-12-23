import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * USER-DEFINED CUSTOM LLMs Example
 * Shows how users can add ANY custom LLMs with ANY specialty
 */
async function main() {
 console.log(' Custom LLMs - User Defined Specialists\n');
 console.log('This example shows how YOU can add ANY specialty!\n');

 const debate = new LLMDebate({
 maxRounds: 8,
 verbose: true,
 });

 // ===================================================================
 // USER DEFINES THEIR OWN CUSTOM LLMS WITH THEIR OWN SPECIALTIES
 // ===================================================================

 // Custom LLM 1: Marketing Expert
 console.log('📋 Adding YOUR custom Marketing Expert...');
 debate.addCustomAgent(
 'marketing-expert', // Your role name
 'digital marketing and growth strategies', // Your specialty
 {
 provider: 'openai', // Your chosen LLM
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 },
 // Your custom instructions:
 `You are a digital marketing and growth expert. Your role is to:
- Develop marketing strategies and campaigns
- Analyze target audiences and market segments
- Design growth funnels and conversion optimization
- Plan social media and content marketing
- Measure ROI and marketing metrics
- Consider SEO, SEM, and paid advertising

Create data-driven marketing strategies that drive growth.`
 );

 // Custom LLM 2: Legal/Compliance Expert
 console.log('📋 Adding YOUR custom Legal Expert...');
 debate.addCustomAgent(
 'legal-compliance',
 'legal analysis and regulatory compliance',
 {
 provider: 'anthropic', // Different LLM!
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a legal and compliance expert. Your role is to:
- Analyze legal requirements and regulations
- Draft and review contracts and agreements
- Ensure GDPR, CCPA, and data privacy compliance
- Identify legal risks and liabilities
- Provide terms of service and privacy policy guidance
- Consider intellectual property issues

Provide legally sound advice to protect the business.`
 );

 // Custom LLM 3: Financial Advisor
 console.log('📋 Adding YOUR custom Financial Advisor...');
 debate.addCustomAgent(
 'financial-advisor',
 'financial planning and investment strategy',
 {
 provider: 'google', // Yet another LLM!
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 },
 `You are a financial advisor and investment strategist. Your role is to:
- Create financial models and projections
- Analyze funding requirements and options
- Develop pricing strategies and revenue models
- Calculate ROI and financial metrics
- Plan budgets and resource allocation
- Consider cash flow and profitability

Provide financially sound advice for sustainable growth.`,
 { temperature: 0.3 } // Lower temp for precision
 );

 // Custom LLM 4: Customer Success Expert
 console.log('📋 Adding YOUR custom Customer Success Expert...');
 debate.addCustomAgent(
 'customer-success',
 'customer experience and retention',
 {
 provider: 'openai',
 model: 'gpt-3.5-turbo', // Cost-effective choice
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a customer success and experience expert. Your role is to:
- Design customer onboarding experiences
- Create support and help documentation
- Plan customer retention strategies
- Gather and analyze customer feedback
- Design loyalty and referral programs
- Optimize customer lifetime value

Focus on creating exceptional customer experiences.`,
 { temperature: 0.7 }
 );

 // Custom LLM 5: Product Manager
 console.log('📋 Adding YOUR custom Product Manager...');
 debate.addCustomAgent(
 'product-manager',
 'product strategy and roadmap planning',
 {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a product management expert. Your role is to:
- Define product vision and strategy
- Prioritize features and create roadmaps
- Analyze user needs and pain points
- Make build vs. buy decisions
- Define success metrics and KPIs
- Balance technical feasibility with business value

Create products users love and that drive business results.`
 );

 // Add standard agents too (optional)
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // ===================================================================
 // USER DEFINES THEIR OWN CUSTOM GOAL
 // ===================================================================

 const userGoal = `
Launch a B2B SaaS product for team collaboration.

The product is a real-time collaboration platform for remote teams.

Please address:
1. MARKETING: Go-to-market strategy, target audience, positioning
2. LEGAL: Compliance requirements, terms of service, data privacy
3. FINANCIAL: Pricing model, funding needs, revenue projections
4. CUSTOMER SUCCESS: Onboarding, support strategy, retention
5. PRODUCT: Feature prioritization, roadmap, MVP definition
6. TECHNICAL: Implementation approach (from the coder)

Create a comprehensive launch plan covering all aspects.
 `.trim();

 console.log('\n Setting YOUR custom goal...\n');
 debate.setGoal(userGoal);

 // ===================================================================
 // RUN THE COLLABORATION
 // ===================================================================

 console.log(' Starting collaboration with YOUR custom LLMs...\n');
 
 const result = await debate.start();

 // ===================================================================
 // RESULTS
 // ===================================================================

 console.log('\n\n' + '='.repeat(100));
 console.log(' FINAL COMPREHENSIVE PLAN');
 console.log('='.repeat(100) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(100));
 console.log('Stats: YOUR CUSTOM TEAM STATISTICS');
 console.log('='.repeat(100));
 console.log(`\nYour Custom Specialists:`);
 console.log(' • Marketing Expert (GPT-4 Turbo)');
 console.log(' • Legal/Compliance (Claude 3 Opus)');
 console.log(' • Financial Advisor (Gemini Pro)');
 console.log(' • Customer Success (GPT-3.5 Turbo)');
 console.log(' • Product Manager (Claude 3 Sonnet)');
 console.log(' • Coder (GPT-4 Turbo)');
 console.log(`\nTotal rounds: ${result.rounds}`);
 console.log(`Total messages: ${result.stats.totalMessages}`);
 console.log(`All participants: ${result.stats.participants.join(', ')}`);

 console.log('\n\n' + '='.repeat(100));
 console.log(' KEY TAKEAWAY');
 console.log('='.repeat(100));
 console.log('\n You can add ANY custom LLM with ANY specialty!');
 console.log(' Use different LLM providers for different roles!');
 console.log(' Define your own custom goals!');
 console.log(' Mix as many specialists as you need!');
 console.log(' Each brings their unique expertise to your goal!\n');

 console.log(' Try adding YOUR own custom specialists:');
 console.log(' - domain experts, - industry specialists,');
 console.log(' - technical roles, - creative roles,');
 console.log(' - anything you need!\n');
}

main().catch(console.error);
