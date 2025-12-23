import { BaseAgent } from './base.js';

/**
 * RAG Agent
 * Specializes in retrieval-augmented generation with database access
 */
export class RAGAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'rag',
 specialty: 'information retrieval and database access',
 ...config,
 });
 
 this.database = config.database || null;
 this.retrievalFunction = config.retrievalFunction || null;
 }

 getDefaultSystemPrompt() {
 return `You are an expert at information retrieval and database operations. Your role is to:
1. Retrieve relevant information from databases and knowledge bases
2. Provide context from stored documents and data
3. Search for and synthesize information from multiple sources
4. Query databases effectively
5. Augment responses with factual, retrieved information

You have access to database connections and retrieval systems.
Always cite your sources and indicate when information is retrieved vs. generated.`;
 }

 /**
 * Retrieve relevant information
 * @param {string} query - Query string
 * @returns {Promise<string>} - Retrieved information
 */
 async retrieve(query) {
 if (this.retrievalFunction) {
 try {
 return await this.retrievalFunction(query);
 } catch (error) {
 console.error(`Retrieval error: ${error.message}`);
 return '';
 }
 }
 
 // Placeholder if no retrieval function is configured
 return `[RAG: No retrieval function configured. Would search for: "${query}"]`;
 }

 async contribute(goal, context, currentResponse) {
 // First, retrieve relevant information
 const retrievedInfo = await this.retrieve(goal);
 
 // Then contribute with the retrieved context
 const prompt = this.buildPrompt(goal, context, currentResponse, retrievedInfo);
 return await this.adapter.generate(prompt, {
 temperature: this.temperature,
 });
 }

 buildPrompt(goal, context, currentResponse, retrievedInfo = '') {
 let prompt = `${this.systemPrompt}\n\n`;
 prompt += `HIGH-LEVEL GOAL: ${goal}\n\n`;

 if (retrievedInfo) {
 prompt += `RETRIEVED INFORMATION:\n${retrievedInfo}\n\n`;
 }

 if (currentResponse) {
 prompt += `CURRENT RESPONSE:\n${currentResponse}\n\n`;
 }

 if (context.conversationContext) {
 prompt += `DISCUSSION HISTORY:\n${context.conversationContext}\n\n`;
 }

 prompt += `YOUR TASK: As the RAG expert, provide:\n`;
 prompt += `- Relevant retrieved information to support the response\n`;
 prompt += `- Database insights and stored knowledge\n`;
 prompt += `- Fact-based augmentations\n`;
 prompt += `- Citations and sources\n\n`;
 prompt += `Integrate the retrieved information naturally into your contribution.`;

 return prompt;
 }

 /**
 * Set a custom retrieval function
 * @param {function} fn - Async function that takes a query and returns results
 */
 setRetrievalFunction(fn) {
 this.retrievalFunction = fn;
 }

 /**
 * Set a database connection
 * @param {object} db - Database connection object
 */
 setDatabase(db) {
 this.database = db;
 }
}
