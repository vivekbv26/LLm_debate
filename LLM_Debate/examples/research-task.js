import dotenv from 'dotenv';
import { LLMDebate } from '../src/index.js';

dotenv.config();

/**
 * Research Task Example
 * Demonstrates RAG agent with validator for research tasks
 */
async function main() {
 console.log('🔍 LLM Debate Arena - Research Task Example\n');

 const debate = new LLMDebate({
 maxRounds: 5,
 verbose: true,
 });

 // Custom retrieval function (mock example)
 const mockRetrieval = async (query) => {
 // In a real implementation, this would query a vector database,
 // search engine, or document store
 return `[Retrieved information about: "${query}"]
 
Example data: Climate change impacts include rising sea levels, 
extreme weather events, and ecosystem disruptions. Key mitigation 
strategies involve renewable energy adoption, carbon capture, and 
sustainable practices.`;
 };

 // Add RAG agent with custom retrieval
 const ragAgent = debate.addAgent('rag', {
 provider: 'openai',
 model: 'gpt-4-turbo-preview',
 apiKey: process.env.OPENAI_API_KEY,
 }, {
 retrievalFunction: mockRetrieval,
 });

 // Add validator agent
 debate.addAgent('validator', {
 provider: 'anthropic',
 model: 'claude-3-opus-20240229',
 apiKey: process.env.ANTHROPIC_API_KEY,
 });

 // Set a research goal
 debate.setGoal(
 `Research and summarize the current state of climate change mitigation strategies.
 Include:
 1. Most effective current approaches
 2. Emerging technologies
 3. Economic feasibility
 4. Timeline for impact
 
 Cite sources and validate claims.`
 );

 const result = await debate.start();

 console.log('\n\n' + '='.repeat(80));
 console.log('FINAL RESEARCH SUMMARY');
 console.log('='.repeat(80) + '\n');
 console.log(result.finalResponse);
}

main().catch(console.error);
