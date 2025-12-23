import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Multiple Models Example
 * Shows how to use different LLM models for different roles
 */
async function main() {
 console.log('🤖 LLM Debate Arena - Multiple Models Example\n');

 const debate = new LLMDebate({
 maxRounds: 6,
 verbose: true,
 useOrchestrator: true,
 });

 // GPT-4 as orchestrator (best at routing decisions)
 debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Claude Opus for validation (excellent at reasoning)
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // GPT-4 for coding (great at code generation)
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Gemini for math (strong at quantitative reasoning)
 debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 });

 // GPT-3.5 for web search (cost-effective for research)
 debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Custom agent with Claude Sonnet (balanced)
 debate.addCustomAgent(
 'technical-writer',
 'technical documentation and communication',
 {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 },
 `You are a technical writing expert. Create clear, concise documentation.`
 );

 // Claude Sonnet for synthesis (excellent at merging ideas)
 debate.enableSynthesis({
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 debate.setGoal(
 `Create a comprehensive guide for building a RESTful API with authentication.
 
 Include:
 1. Algorithm and security considerations
 2. Code implementation
 3. Mathematical aspects (token generation, hashing)
 4. Best practices from current research
 5. Clear documentation for developers
 
 Leverage each model's strengths!`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL GUIDE (Multi-Model Collaboration)');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(80));
 console.log('MODEL USAGE');
 console.log('='.repeat(80));
 console.log('Orchestrator: GPT-4 Turbo');
 console.log('Validator: Claude 3 Opus');
 console.log('Coder: GPT-4 Turbo');
 console.log('Mathematician: Gemini Pro');
 console.log('Web Search: GPT-3.5 Turbo');
 console.log('Technical Writer: Claude 3 Sonnet');
 console.log('Synthesis: Claude 3 Sonnet');
 console.log(`\nTotal rounds: ${result.rounds}`);
}

main().catch(console.error);
