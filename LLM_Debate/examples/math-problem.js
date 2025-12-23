import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Math Problem Example
 * Demonstrates the mathematician agent working with a validator
 */
async function main() {
 console.log('🧮 LLM Debate Arena - Math Problem Example\n');

 const debate = new LLMDebate({
 maxRounds: 4,
 verbose: true,
 });

 // Add mathematician agent
 debate.addAgent('mathematician', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Add validator agent
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // Set a mathematical goal
 debate.setGoal(
 `Solve this problem: A company's revenue is growing exponentially at 15% per year. 
 If they have $1 million in revenue today, how much will they have in 5 years? 
 Also calculate the total revenue over the 5-year period. 
 Show all work and verify the calculations.`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL SOLUTION');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);
}

main().catch(console.error);
