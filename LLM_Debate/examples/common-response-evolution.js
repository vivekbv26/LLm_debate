/**
 * Common Response Evolution Demo
 * 
 * This example demonstrates how the COMMON RESPONSE evolves through iterations
 * as different LLMs collaborate on the same shared response.
 * 
 * The "response" is like a football - all players work together to move it toward the goal!
 */

import { LLMDebate } from '../src/index.js';
import dotenv from 'dotenv';

dotenv.config();

async function demonstrateResponseEvolution() {
 console.log(' COMMON RESPONSE PLAYGROUND DEMO');
 console.log('=' .repeat(70));
 console.log('\nThis demo shows how a SINGLE RESPONSE evolves as multiple LLMs');
 console.log('collaborate iteratively to achieve your high-level goal.\n');

 const debate = new LLMDebate();

 // Add custom LLMs with different specialties
 debate.addCustomAgent(
 'product-strategist',
 'product strategy and market analysis',
 {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a product strategist. Focus on market positioning, user needs, and business value.
Keep your contributions concise and actionable.`
 );

 debate.addCustomAgent(
 'tech-architect',
 'technical architecture and implementation',
 {
 provider: 'openai',
 model: 'gpt-4',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a technical architect. Focus on feasibility, scalability, and technical decisions.
Keep your contributions concise and technical.`
 );

 debate.addCustomAgent(
 'ux-designer',
 'user experience and design',
 {
 provider: 'openai',
 model: 'gpt-3.5-turbo',
 apiKey: process.env.OPENAI_API_KEY,
 },
 `You are a UX designer. Focus on user experience, interface design, and usability.
Keep your contributions concise and user-focused.`
 );

 // Set high-level GOAL
 const goal = 'Design a feature for real-time collaboration in our mobile app';
 debate.setGoal(goal);

 console.log(' HIGH-LEVEL GOAL:');
 console.log(` "${goal}"\n`);

 console.log(' TEAM MEMBERS (Custom LLMs):');
 console.log(' 1. Product Strategist (OpenAI GPT-4)');
 console.log(' 2. Tech Architect (OpenAI GPT-4)');
 console.log(' 3. UX Designer (OpenAI GPT-3.5-turbo)\n');

 console.log(' THE COMMON RESPONSE will evolve as each expert contributes!\n');
 console.log('=' .repeat(70));

 // Enable synthesis for intelligent merging
 debate.enableSynthesis({
 provider: 'openai',
 model: 'gpt-4',
 });

 try {
 // Start the collaboration with fewer rounds for demo
 console.log('\n Starting collaborative iteration...\n');
 
 const result = await debate.start({
 maxRounds: 3, // 3 iterations for demo clarity
 participantsPerRound: 3, // All 3 agents contribute each round
 });

 console.log('\n' + '=' .repeat(70));
 console.log(' FINAL OPTIMIZED RESPONSE');
 console.log('=' .repeat(70));
 console.log(result.finalResponse);
 console.log('\n' + '=' .repeat(70));

 console.log('\nStats: ITERATION STATISTICS:');
 console.log(` Total Rounds: ${result.rounds}`);
 console.log(` Total Messages: ${result.stats.totalMessages}`);
 console.log(` Agents Involved: ${result.stats.uniqueRoles || 3}`);

 console.log('\n📜 EVOLUTION HISTORY:');
 console.log(' (How the response evolved through iterations)\n');

 result.history.forEach((msg, idx) => {
 if (msg.role !== 'system') {
 console.log(` ${idx}. [${msg.role}]:`);
 console.log(` ${msg.content.substring(0, 150)}...`);
 console.log('');
 }
 });

 console.log('=' .repeat(70));
 console.log(' KEY TAKEAWAY:');
 console.log(' All LLMs collaborated on ONE shared response, iteratively improving it!');
 console.log(' Each agent built upon previous contributions toward the common goal.');
 console.log('=' .repeat(70));

 } catch (error) {
 console.error('[Error] Error:', error.message);
 console.error('\n[Note] Make sure you have set OPENAI_API_KEY in your .env file');
 }
}

// Run the demo
demonstrateResponseEvolution();
