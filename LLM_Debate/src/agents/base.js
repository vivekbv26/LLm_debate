/**
 * Base Agent
 * Abstract class for all specialized agents
 */
export class BaseAgent {
 constructor(adapter, config = {}) {
 this.adapter = adapter;
 this.role = config.role || 'agent';
 this.specialty = config.specialty || 'general';
 this.systemPrompt = config.systemPrompt || this.getDefaultSystemPrompt();
 this.temperature = config.temperature || 0.7;
 }

 /**
 * Get the default system prompt for this agent
 * @returns {string} - System prompt
 */
 getDefaultSystemPrompt() {
 return `You are a helpful AI assistant specializing in ${this.specialty}.`;
 }

 /**
 * Contribute to the debate
 * @param {string} goal - The high-level goal
 * @param {object} context - Current context and history
 * @param {string} currentResponse - Current working response
 * @returns {Promise<string>} - Agent's contribution
 */
 async contribute(goal, context, currentResponse) {
 const prompt = this.buildPrompt(goal, context, currentResponse);
 return await this.adapter.generate(prompt, {
 temperature: this.temperature,
 });
 }

 /**
 * Build the prompt for this agent
 * @param {string} goal - The high-level goal
 * @param {object} context - Current context
 * @param {string} currentResponse - Current response
 * @returns {string} - Constructed prompt
 */
 buildPrompt(goal, context, currentResponse) {
 let prompt = `${this.systemPrompt}\n\n`;
 prompt += `HIGH-LEVEL GOAL: ${goal}\n\n`;

 if (currentResponse) {
 prompt += `CURRENT RESPONSE:\n${currentResponse}\n\n`;
 }

 if (context.conversationContext) {
 prompt += `RECENT DISCUSSION:\n${context.conversationContext}\n\n`;
 }

 prompt += `As the ${this.role}, provide your expert contribution to improve this response. `;
 prompt += `Focus on your specialty: ${this.specialty}.\n`;
 prompt += `Be specific and actionable in your suggestions or improvements.`;

 return prompt;
 }

 /**
 * Validate the agent's configuration
 * @returns {boolean} - Whether configuration is valid
 */
 validate() {
 if (!this.adapter) {
 throw new Error('Adapter is required for agent');
 }
 return true;
 }
}
