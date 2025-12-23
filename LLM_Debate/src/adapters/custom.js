import axios from 'axios';
import { BaseLLMAdapter } from './base.js';

/**
 * Custom Adapter
 * For custom API endpoints or other LLM providers
 */
export class CustomAdapter extends BaseLLMAdapter {
 constructor(config) {
 super(config);
 this.endpoint = config.endpoint;
 this.headers = config.headers || {
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${this.apiKey}`,
 };
 }

 async generate(prompt, options = {}) {
 try {
 const response = await axios.post(
 this.endpoint,
 {
 prompt,
 model: this.model,
 temperature: options.temperature || 0.7,
 max_tokens: options.max_tokens || 2000,
 ...options,
 },
 { headers: this.headers }
 );

 // Adjust this based on your API's response structure
 return response.data.response || response.data.text || response.data.content;
 } catch (error) {
 console.error(`Custom API Error: ${error.message}`);
 throw error;
 }
 }

 async generateStream(prompt, onChunk, options = {}) {
 // Custom streaming implementation
 // This is a fallback to non-streaming
 const response = await this.generate(prompt, options);
 if (onChunk) onChunk(response);
 return response;
 }

 validate() {
 if (!this.apiKey) {
 throw new Error('API key is required for custom adapter');
 }
 if (!this.endpoint) {
 throw new Error('Endpoint is required for custom adapter');
 }
 return true;
 }
}
