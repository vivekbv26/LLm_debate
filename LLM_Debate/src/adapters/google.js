import { GoogleGenerativeAI } from '@google/generative-ai';
import { BaseLLMAdapter } from './base.js';

/**
 * Google Adapter
 * Supports Gemini models
 */
export class GoogleAdapter extends BaseLLMAdapter {
 constructor(config) {
 super(config);
 this.client = new GoogleGenerativeAI(this.apiKey);
 }

 async generate(prompt, options = {}) {
 try {
 const model = this.client.getGenerativeModel({ 
 model: this.model || 'gemini-pro' 
 });

 const result = await model.generateContent({
 contents: [{ role: 'user', parts: [{ text: prompt }] }],
 generationConfig: {
 temperature: options.temperature || 0.7,
 maxOutputTokens: options.max_tokens || 2000,
 ...options,
 },
 });

 return result.response.text();
 } catch (error) {
 console.error(`Google API Error: ${error.message}`);
 throw error;
 }
 }

 async generateStream(prompt, onChunk, options = {}) {
 try {
 const model = this.client.getGenerativeModel({ 
 model: this.model || 'gemini-pro' 
 });

 const result = await model.generateContentStream({
 contents: [{ role: 'user', parts: [{ text: prompt }] }],
 generationConfig: {
 temperature: options.temperature || 0.7,
 maxOutputTokens: options.max_tokens || 2000,
 ...options,
 },
 });

 let fullResponse = '';
 for await (const chunk of result.stream) {
 const content = chunk.text();
 fullResponse += content;
 if (onChunk) onChunk(content);
 }

 return fullResponse;
 } catch (error) {
 console.error(`Google Streaming Error: ${error.message}`);
 throw error;
 }
 }
}
