/**
 * Conversation Manager
 * Efficiently manages conversation history and supports scaling to 1000+ iterations
 */
export class ConversationManager {
 constructor(maxHistory = 1000) {
 this.maxHistory = maxHistory;
 this.history = [];
 this.summaries = [];
 }

 /**
 * Add a message to the conversation history
 * @param {string} role - The role (e.g., 'validator', 'coder', 'system')
 * @param {string} content - The message content
 * @param {object} metadata - Additional metadata
 */
 addMessage(role, content, metadata = {}) {
 const message = {
 role,
 content,
 timestamp: new Date().toISOString(),
 ...metadata,
 };

 this.history.push(message);

 // Auto-summarize if history exceeds max
 if (this.history.length > this.maxHistory) {
 this.summarizeOldMessages();
 }
 }

 /**
 * Get recent messages
 * @param {number} count - Number of recent messages to retrieve
 * @returns {Array} - Recent messages
 */
 getRecentMessages(count = 10) {
 return this.history.slice(-count);
 }

 /**
 * Get all messages
 * @returns {Array} - All messages
 */
 getAllMessages() {
 return [...this.history];
 }

 /**
 * Get messages by role
 * @param {string} role - The role to filter by
 * @returns {Array} - Filtered messages
 */
 getMessagesByRole(role) {
 return this.history.filter(msg => msg.role === role);
 }

 /**
 * Summarize old messages to save memory
 */
 summarizeOldMessages() {
 const messagesToSummarize = this.history.slice(0, Math.floor(this.maxHistory / 2));
 const summary = {
 messageCount: messagesToSummarize.length,
 timeRange: {
 start: messagesToSummarize[0]?.timestamp,
 end: messagesToSummarize[messagesToSummarize.length - 1]?.timestamp,
 },
 participants: [...new Set(messagesToSummarize.map(m => m.role))],
 };

 this.summaries.push(summary);
 this.history = this.history.slice(Math.floor(this.maxHistory / 2));
 }

 /**
 * Get conversation context for an agent
 * @param {number} contextWindow - Number of messages to include
 * @returns {string} - Formatted context
 */
 getContext(contextWindow = 20) {
 const recentMessages = this.getRecentMessages(contextWindow);
 return recentMessages
 .map(msg => `[${msg.role}]: ${msg.content}`)
 .join('\n\n');
 }

 /**
 * Clear the conversation history
 */
 clear() {
 this.history = [];
 this.summaries = [];
 }

 /**
 * Get statistics about the conversation
 * @returns {object} - Statistics
 */
 getStats() {
 return {
 totalMessages: this.history.length,
 summarizedMessages: this.summaries.reduce((acc, s) => acc + s.messageCount, 0),
 participants: [...new Set(this.history.map(m => m.role))],
 summaryCount: this.summaries.length,
 };
 }
}
