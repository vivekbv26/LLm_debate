import { BaseAgent } from './base.js';

/**
 * Web Search Agent
 * Specializes in real-time web search and current information retrieval
 */
export class WebSearchAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'web-search',
 specialty: 'real-time web search and current information',
 ...config,
 });
 
 this.searchFunction = config.searchFunction || null;
 }

 getDefaultSystemPrompt() {
 return `You are an expert web researcher and information gatherer. Your role is to:
1. Search the web for current, relevant information
2. Verify facts with up-to-date sources
3. Find recent developments and breaking news
4. Gather diverse perspectives from multiple sources
5. Provide citations and source links

You excel at finding accurate, timely information from the internet.
Always cite your sources and note the date of information.`;
 }

 /**
 * Perform web search
 * @param {string} query - Search query
 * @returns {Promise<string>} - Search results
 */
 async search(query) {
 if (this.searchFunction) {
 try {
 return await this.searchFunction(query);
 } catch (error) {
 console.error(`Web search error: ${error.message}`);
 return `[Web Search: Error performing search for "${query}"]`;
 }
 }
 
 // Placeholder if no search function is configured
 return `[Web Search: No search function configured. Would search for: "${query}"]
 
To enable real web search, provide a searchFunction when creating this agent.
Example: Use Google Custom Search API, Bing API, or SerpAPI.`;
 }

 async contribute(goal, context, currentResponse) {
 // Extract key topics to search for
 const searchQuery = await this.identifySearchNeeds(goal, currentResponse);
 
 // Perform search
 const searchResults = await this.search(searchQuery);
 
 // Contribute with search context
 const prompt = this.buildPrompt(goal, context, currentResponse, searchResults);
 return await this.adapter.generate(prompt, {
 temperature: this.temperature,
 });
 }

 async identifySearchNeeds(goal, currentResponse) {
 // Simple extraction - in production, could use LLM to identify search needs
 const combined = `${goal} ${currentResponse || ''}`;
 // Extract key phrases (simplified)
 return combined.substring(0, 200);
 }

 buildPrompt(goal, context, currentResponse, searchResults = '') {
 let prompt = `${this.systemPrompt}\n\n`;
 prompt += `HIGH-LEVEL GOAL: ${goal}\n\n`;

 if (searchResults) {
 prompt += `WEB SEARCH RESULTS:\n${searchResults}\n\n`;
 }

 if (currentResponse) {
 prompt += `CURRENT RESPONSE:\n${currentResponse}\n\n`;
 }

 if (context.conversationContext) {
 prompt += `DISCUSSION HISTORY:\n${context.conversationContext}\n\n`;
 }

 prompt += `YOUR TASK: As the web search expert, provide:\n`;
 prompt += `- Current, up-to-date information from web searches\n`;
 prompt += `- Recent developments or news related to the goal\n`;
 prompt += `- Verified facts with source citations\n`;
 prompt += `- Diverse perspectives from multiple sources\n\n`;
 prompt += `Include source URLs when available.`;

 return prompt;
 }

 /**
 * Set a custom search function
 * @param {function} fn - Async function that performs web search
 */
 setSearchFunction(fn) {
 this.searchFunction = fn;
 }
}
