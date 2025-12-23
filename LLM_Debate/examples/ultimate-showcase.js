import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * ULTIMATE EXAMPLE - Everything Together!
 * Demonstrates ALL features of the LLM Debate Arena
 */
async function main() {
 console.log(' LLM Debate Arena - ULTIMATE SHOWCASE\n');
 console.log('This example demonstrates ALL features:\n');
 console.log('- Orchestrator mode for intelligent routing');
 console.log('- Multiple LLM providers (OpenAI, Anthropic, Google)');
 console.log('- Built-in specialized agents');
 console.log('- Custom agents with unique specialties');
 console.log('- Intelligent response synthesis');
 console.log('- Efficient scaling for complex tasks\n');
 
 // Create debate with all advanced features
 const debate = new LLMDebate({
 maxRounds: 12,
 maxHistory: 1000,
 convergenceThreshold: 0.80,
 verbose: true,
 useOrchestrator: true, // Enable intelligent routing
 });

 // === ORCHESTRATOR ===
 // The "team manager" who decides which expert contributes when
 console.log('\n📋 Setting up Orchestrator (GPT-4)...');
 debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // === BUILT-IN AGENTS ===
 console.log('📋 Adding built-in specialist agents...');
 
 // Validator - Claude Opus (excellent reasoning)
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // Coder - GPT-4 (great at code)
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Mathematician - Gemini (strong quantitative)
 debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 });

 // Web Search - GPT-3.5 (cost-effective research)
 debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // === CUSTOM AGENTS ===
 console.log('📋 Adding custom specialist agents...');
 
 // Database Architect
 debate.addCustomAgent(
 'database-architect',
 'database design, optimization, and scalability',
 {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 },
 `You are a database architecture expert specializing in:
- Efficient schema design and normalization
- Query optimization and indexing strategies
- Scalability and performance tuning
- Data modeling and relationships
- Choosing appropriate database technologies

Provide practical, production-ready database solutions.`
 );

 // Security Expert
 debate.addCustomAgent(
 'security-expert',
 'cybersecurity, secure coding, and threat modeling',
 {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a cybersecurity expert specializing in:
- Identifying security vulnerabilities
- Secure coding best practices
- Authentication and authorization
- Threat modeling and attack vectors
- Compliance and data protection

Think like an attacker to find weaknesses, then suggest robust defenses.`
 );

 // UX Designer
 debate.addCustomAgent(
 'ux-designer',
 'user experience, interface design, and accessibility',
 {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a UX/UI design expert specializing in:
- Intuitive user interface design
- User experience optimization
- Accessibility and inclusive design
- User flow and journey mapping
- Design systems and patterns

Create designs that users love and that work for everyone.`
 );

 // Business Analyst
 debate.addCustomAgent(
 'business-analyst',
 'business requirements, ROI, and market analysis',
 {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a business analyst specializing in:
- Gathering and analyzing business requirements
- Market research and competitive analysis
- ROI and business value assessment
- Stakeholder management
- Aligning technical solutions with business goals

Ensure technical solutions deliver real business value.`
 );

 // === RESPONSE SYNTHESIS ===
 // Claude Sonnet for merging contributions intelligently
 console.log('📋 Enabling intelligent response synthesis...');
 debate.enableSynthesis({
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // === THE CHALLENGE ===
 // A complex, real-world goal requiring all expertise
 const goal = `
Build a complete e-commerce platform for a sustainable fashion startup.

REQUIREMENTS:
1. Technical Architecture
 - Microservices backend with RESTful APIs
 - Scalable database design for products, users, orders
 - Real-time inventory management
 - Payment processing integration

2. Security & Compliance
 - PCI DSS compliance for payments
 - GDPR compliance for user data
 - Secure authentication (OAuth2, JWT)
 - Protection against common vulnerabilities

3. User Experience
 - Mobile-first responsive design
 - Intuitive product discovery and search
 - Seamless checkout experience
 - Accessibility (WCAG 2.1 AA)

4. Business Logic
 - Recommendation engine for products
 - Dynamic pricing based on demand
 - Loyalty program and promotions
 - Analytics and reporting

5. Performance & Scale
 - Handle 10,000 concurrent users
 - Sub-second page load times
 - 99.9% uptime
 - Global CDN distribution

DELIVERABLES:
- System architecture diagram (description)
- Database schema with relationships
- API endpoint specifications
- Security implementation plan
- UX flow and wireframes (descriptions)
- Code samples for critical components
- Performance optimization strategy
- Business metrics and KPIs
- Cost estimation and ROI analysis

The orchestrator should intelligently route each aspect to the appropriate expert,
and the synthesis engine should create a cohesive, production-ready plan.
 `.trim();

 debate.setGoal(goal);

 // === START THE MAGIC ===
 console.log('\n🎬 Starting the debate...\n');
 console.log('The orchestrator will analyze the goal and route tasks to experts.');
 console.log('Watch how each specialist contributes their unique expertise!\n');
 
 const startTime = Date.now();
 const result = await debate.start();
 const endTime = Date.now();

 // === RESULTS ===
 console.log('\n\n' + '='.repeat(100));
 console.log(' FINAL COMPREHENSIVE SOLUTION');
 console.log('='.repeat(100) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(100));
 console.log('Stats: DEBATE STATISTICS');
 console.log('='.repeat(100));
 console.log(`\n Time taken: ${((endTime - startTime) / 1000).toFixed(2)} seconds`);
 console.log(` Total rounds: ${result.rounds}`);
 console.log(`💬 Total messages: ${result.stats.totalMessages}`);
 console.log(` Participants: ${result.stats.participants.join(', ')}`);
 console.log(` Summarized messages: ${result.stats.summarizedMessages || 0}`);
 
 console.log('\n\n' + '='.repeat(100));
 console.log('🏆 TEAM ROSTER');
 console.log('='.repeat(100));
 console.log('\nOrchestrator: GPT-4 Turbo (OpenAI)');
 console.log('Synthesis Engine: Claude 3 Sonnet (Anthropic)');
 console.log('\nSpecialists:');
 console.log(' • Validator: Claude 3 Opus (Anthropic)');
 console.log(' • Coder: GPT-4 Turbo (OpenAI)');
 console.log(' • Mathematician: Gemini Pro (Google)');
 console.log(' • Web Search: GPT-3.5 Turbo (OpenAI)');
 console.log(' • Database Architect: Gemini Pro (Google)');
 console.log(' • Security Expert: Claude 3 Sonnet (Anthropic)');
 console.log(' • UX Designer: GPT-4 Turbo (OpenAI)');
 console.log(' • Business Analyst: GPT-3.5 Turbo (OpenAI)');
 
 console.log('\n\n This demonstrates the FULL POWER of LLM Debate Arena!');
 console.log('Each expert contributed their unique talent to create an optimal solution.\n');
}

main().catch(console.error);
