/**
 * Base LLM Adapter
 * Provides a unified interface for different LLM providers
 */
export class BaseLLMAdapter {
 constructor(config) {
 this.config = config;
 this.provider = config.provider;
 this.model = config.model;
 this.apiKey = config.apiKey;
 }

 /**
 * Generate a response from the LLM
 * @param {string} prompt - The prompt to send to the LLM
 * @param {object} options - Additional options (temperature, max_tokens, etc.)
 * @returns {Promise<string>} - The LLM's response
 */
 async generate(prompt, options = {}) {
 throw new Error('generate() must be implemented by subclass');
 }

 /**
 * Generate a streaming response from the LLM
 * @param {string} prompt - The prompt to send to the LLM
 * @param {function} onChunk - Callback for each chunk
 * @param {object} options - Additional options
 * @returns {Promise<string>} - The complete response
 */
 async generateStream(prompt, onChunk, options = {}) {
 throw new Error('generateStream() must be implemented by subclass');
 }

 /**
 * Validate the configuration
 * @returns {boolean} - Whether the configuration is valid
 */
 validate() {
 if (!this.apiKey) {
 throw new Error(`API key is required for ${this.provider}`);
 }
 return true;
 }
}
