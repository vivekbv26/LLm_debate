import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Coding Task Example
 * Demonstrates multiple agents collaborating on a coding problem
 */
async function main() {
 console.log(' LLM Debate Arena - Coding Task Example\n');

 const debate = new LLMDebate({
 maxRounds: 6,
 verbose: true,
 });

 // Add coder agent (primary implementation)
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Add validator agent (code review)
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // Add mathematician agent (algorithm optimization)
 debate.addAgent('mathematician', {
 provider: 'google',
 model: 'gemini-pro',
 apiKey: process.env.GOOGLE_API_KEY,
 });

 // Set a coding goal
 debate.setGoal(
 `Implement a function to find the longest palindromic substring in a given string.
 Requirements:
 1. Efficient algorithm (better than O(n³))
 2. Handle edge cases
 3. Include unit tests
 4. Explain time and space complexity
 
 Example: "babad" should return "bab" or "aba"`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL IMPLEMENTATION');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);
}

main().catch(console.error);
