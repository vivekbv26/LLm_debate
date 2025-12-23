import { OpenAIAdapter } from './openai.js';
import { AnthropicAdapter } from './anthropic.js';
import { GoogleAdapter } from './google.js';
import { CustomAdapter } from './custom.js';

/**
 * Factory for creating LLM adapters
 */
export class AdapterFactory {
 static createAdapter(config) {
 const provider = config.provider.toLowerCase();

 switch (provider) {
 case 'openai':
 return new OpenAIAdapter(config);
 case 'anthropic':
 return new AnthropicAdapter(config);
 case 'google':
 return new GoogleAdapter(config);
 case 'custom':
 return new CustomAdapter(config);
 default:
 throw new Error(`Unsupported provider: ${provider}`);
 }
 }
}

export { OpenAIAdapter, AnthropicAdapter, GoogleAdapter, CustomAdapter };
