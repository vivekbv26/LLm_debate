import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Basic Debate Example
 * Demonstrates how to set up a simple multi-LLM debate
 */
async function main() {
 console.log('LLM Debate Arena - Basic Example\n'); // Create a new debate instance
 const debate = new LLMDebate({
 maxRounds: 5,
 verbose: true,
 });

 // Add a validator agent (using Claude)
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-sonnet-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // Add a coder agent (using GPT-4)
 debate.addAgent('coder', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Set the high-level goal
 debate.setGoal(
 'Design a simple REST API for a task management system. Include endpoints, data models, and basic security considerations.'
 );

 // Start the debate
 const result = await debate.start();

 // Display results
 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL RESPONSE');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(80));
 console.log('STATISTICS');
 console.log('='.repeat(80));
 console.log(`Rounds completed: ${result.rounds}`);
 console.log(`Total messages: ${result.stats.totalMessages}`);
 console.log(`Participants: ${result.stats.participants.join(', ')}`);
}

main().catch(console.error);
