import Anthropic from '@anthropic-ai/sdk';
import { BaseLLMAdapter } from './base.js';

/**
 * Anthropic Adapter
 * Supports Claude 3 (Opus, Sonnet, Haiku) and other Anthropic models
 */
export class AnthropicAdapter extends BaseLLMAdapter {
 constructor(config) {
 super(config);
 this.client = new Anthropic({
 apiKey: this.apiKey,
 });
 }

 async generate(prompt, options = {}) {
 try {
 const response = await this.client.messages.create({
 model: this.model || 'claude-3-opus-20240229',
 max_tokens: options.max_tokens || 2000,
 messages: [{ role: 'user', content: prompt }],
 temperature: options.temperature || 0.7,
 ...options,
 });

 return response.content[0].text;
 } catch (error) {
 console.error(`Anthropic API Error: ${error.message}`);
 throw error;
 }
 }

 async generateStream(prompt, onChunk, options = {}) {
 try {
 const stream = await this.client.messages.create({
 model: this.model || 'claude-3-opus-20240229',
 max_tokens: options.max_tokens || 2000,
 messages: [{ role: 'user', content: prompt }],
 temperature: options.temperature || 0.7,
 stream: true,
 ...options,
 });

 let fullResponse = '';
 for await (const chunk of stream) {
 if (chunk.type === 'content_block_delta' && chunk.delta?.text) {
 const content = chunk.delta.text;
 fullResponse += content;
 if (onChunk) onChunk(content);
 }
 }

 return fullResponse;
 } catch (error) {
 console.error(`Anthropic Streaming Error: ${error.message}`);
 throw error;
 }
 }
}
