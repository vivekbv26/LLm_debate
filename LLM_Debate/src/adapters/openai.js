import OpenAI from 'openai';
import { BaseLLMAdapter } from './base.js';

/**
 * OpenAI Adapter
 * Supports GPT-4, GPT-3.5, and other OpenAI models
 */
export class OpenAIAdapter extends BaseLLMAdapter {
 constructor(config) {
 super(config);
 this.client = new OpenAI({
 apiKey: this.apiKey,
 });
 }

 async generate(prompt, options = {}) {
 try {
 const response = await this.client.chat.completions.create({
 model: this.model || 'gpt-4-turbo-preview',
 messages: [{ role: 'user', content: prompt }],
 temperature: options.temperature || 0.7,
 max_tokens: options.max_tokens || 2000,
 ...options,
 });

 return response.choices[0].message.content;
 } catch (error) {
 console.error(`OpenAI API Error: ${error.message}`);
 throw error;
 }
 }

 async generateStream(prompt, onChunk, options = {}) {
 try {
 const stream = await this.client.chat.completions.create({
 model: this.model || 'gpt-4-turbo-preview',
 messages: [{ role: 'user', content: prompt }],
 temperature: options.temperature || 0.7,
 max_tokens: options.max_tokens || 2000,
 stream: true,
 ...options,
 });

 let fullResponse = '';
 for await (const chunk of stream) {
 const content = chunk.choices[0]?.delta?.content || '';
 fullResponse += content;
 if (onChunk) onChunk(content);
 }

 return fullResponse;
 } catch (error) {
 console.error(`OpenAI Streaming Error: ${error.message}`);
 throw error;
 }
 }
}
