import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Custom Agents Example
 * Shows how to add unlimited custom agents with unique specialties
 */
async function main() {
 console.log(' LLM Debate Arena - Custom Agents Example\n');

 const debate = new LLMDebate({
 maxRounds: 10,
 verbose: true,
 });

 // Add custom agent #1: UX/UI Expert
 debate.addCustomAgent(
 'ux-designer',
 'user experience and interface design',
 {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a UX/UI design expert. Your role is to:
- Design intuitive user interfaces
- Consider user experience and accessibility
- Provide wireframes and design patterns
- Think about user flows and journeys
- Ensure designs are user-friendly and inclusive`
 );

 // Add custom agent #2: Security Expert
 debate.addCustomAgent(
 'security-expert',
 'cybersecurity and secure coding',
 {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a cybersecurity expert. Your role is to:
- Identify security vulnerabilities
- Suggest security best practices
- Review code for security issues
- Design secure architectures
- Consider threat models and attack vectors`
 );

 // Add custom agent #3: Database Expert
 debate.addCustomAgent(
 'database-architect',
 'database design and optimization',
 {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 },
 `You are a database architecture expert. Your role is to:
- Design efficient database schemas
- Optimize queries and indexes
- Consider scalability and performance
- Choose appropriate database technologies
- Handle data modeling and relationships`
 );

 // Add custom agent #4: Business Analyst
 debate.addCustomAgent(
 'business-analyst',
 'business requirements and market analysis',
 {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a business analyst. Your role is to:
- Understand business requirements
- Analyze market needs and competition
- Consider ROI and business value
- Identify stakeholder needs
- Align technical solutions with business goals`
 );

 // Standard agent: Coder
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Set a goal that benefits from all these perspectives
 debate.setGoal(
 `Design and plan a customer relationship management (CRM) system for small businesses.
 
 Consider:
 1. User interface and experience
 2. Database architecture for customer data
 3. Security and privacy concerns
 4. Business requirements and market fit
 5. Technical implementation
 
 Each expert should contribute their unique perspective to create the best solution.`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('COMPREHENSIVE CRM SOLUTION');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(80));
 console.log('TEAM STATISTICS');
 console.log('='.repeat(80));
 console.log(`Custom agents used: 4`);
 console.log(`Total rounds: ${result.rounds}`);
 console.log(`All participants: ${result.stats.participants.join(', ')}`);
}

main().catch(console.error);
