import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Advanced Example: All Agents Collaboration
 * Demonstrates the full power of multi-agent collaboration
 */
async function main() {
 console.log(' LLM Debate Arena - All Agents Collaboration\n');

 const debate = new LLMDebate({
 maxRounds: 8,
 verbose: true,
 convergenceThreshold: 0.8,
 });

 // Add all types of agents
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

 debate.addAgent('rag', {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 });

 // Complex goal requiring all agents
 debate.setGoal(
 `Design and implement a recommendation system for an e-commerce platform.
 
 Requirements:
 1. Algorithm design (collaborative filtering + content-based)
 2. Mathematical formulation of similarity metrics
 3. Code implementation in Python
 4. Database schema for storing user preferences and item features
 5. Performance optimization strategies
 6. Validation approach with metrics (precision, recall, F1)
 
 Deliver a comprehensive solution with all components.`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL COMPREHENSIVE SOLUTION');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);

 console.log('\n\n' + '='.repeat(80));
 console.log('DETAILED STATISTICS');
 console.log('='.repeat(80));
 console.log(`Rounds: ${result.rounds}`);
 console.log(`Messages: ${result.stats.totalMessages}`);
 console.log(`Agents: ${result.stats.participants.join(', ')}`);
 console.log(`Summarized messages: ${result.stats.summarizedMessages}`);
}

main().catch(console.error);
