import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * SIMPLEST Custom LLM Example
 * 3 simple steps to add your own custom LLM
 */
async function main() {
 console.log(' Simple Custom LLM Example\n');

 // STEP 1: Create debate
 const debate = new LLMDebate({ maxRounds: 5, verbose: true });

 // STEP 2: Add YOUR custom LLM with YOUR specialty
 debate.addCustomAgent(
 'my-expert', // 👈 Your role name
 'my awesome specialty', // 👈 What they're good at
 {
 provider: 'openai', // 👈 Your LLM provider
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY
 },
 `You are an expert in my awesome specialty. // 👈 Your instructions
 You do amazing things and provide great insights.`
 );

 // STEP 3: Set YOUR goal
 debate.setGoal('My custom high-level goal here!'); // 👈 Your goal

 // RUN!
 const result = await debate.start();
 console.log('\n Final Response:\n', result.finalResponse);
}

main().catch(console.error);
