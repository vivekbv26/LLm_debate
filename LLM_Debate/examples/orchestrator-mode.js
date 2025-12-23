import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Orchestrator Example
 * Shows how the orchestrator intelligently routes tasks to appropriate agents
 */
async function main() {
 console.log(' LLM Debate Arena - Orchestrator Mode Example\n');

 const debate = new LLMDebate({
 maxRounds: 8,
 verbose: true,
 useOrchestrator: true, // Enable orchestration
 });

 // Enable orchestrator (uses its own LLM to make routing decisions)
 debate.enableOrchestrator({
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Add various specialized agents
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 });

 debate.addAgent('web-search', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Complex goal requiring different expertise at different stages
 debate.setGoal(
 `Build a machine learning model to predict stock prices.
 
 Requirements:
 1. Research current approaches and best practices
 2. Design the algorithm and mathematical model
 3. Implement in Python with proper libraries
 4. Validate the approach and identify potential issues
 5. Consider real-world constraints and deployment
 
 The orchestrator should intelligently route each aspect to the right expert.`
 );

 // Enable intelligent synthesis for better response merging
 debate.enableSynthesis({
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL SOLUTION (Orchestrated)');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(80));
 console.log('ORCHESTRATION INSIGHTS');
 console.log('='.repeat(80));
 console.log(`Total rounds: ${result.rounds}`);
 console.log(`Messages: ${result.stats.totalMessages}`);
 console.log(`Participants: ${result.stats.participants.join(', ')}`);
}

main().catch(console.error);
