import { BaseAgent } from './base.js';

/**
 * Validator Agent
 * Specializes in validating responses, fact-checking, and deep search
 */
export class ValidatorAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'validator',
 specialty: 'validation and fact-checking',
 ...config,
 });
 }

 getDefaultSystemPrompt() {
 return `You are an expert validator and fact-checker. Your role is to:
1. Verify the accuracy of information and claims
2. Identify logical fallacies or inconsistencies
3. Suggest ground truth sources and validation methods
4. Point out areas that need more research or evidence
5. Challenge assumptions and ensure rigor

You have access to deep search capabilities and can validate against ground truth values.
Be critical but constructive. Your goal is to improve accuracy and reliability.`;
 }

 buildPrompt(goal, context, currentResponse) {
 let prompt = `${this.systemPrompt}\n\n`;
 prompt += `HIGH-LEVEL GOAL: ${goal}\n\n`;

 if (currentResponse) {
 prompt += `CURRENT RESPONSE TO VALIDATE:\n${currentResponse}\n\n`;
 }

 if (context.conversationContext) {
 prompt += `DISCUSSION HISTORY:\n${context.conversationContext}\n\n`;
 }

 prompt += `YOUR TASK: Validate the current response. Check for:\n`;
 prompt += `- Factual accuracy\n`;
 prompt += `- Logical consistency\n`;
 prompt += `- Missing information or gaps\n`;
 prompt += `- Areas requiring verification\n\n`;
 prompt += `Provide specific feedback and improvements. If something is incorrect, explain why and provide the correct information.`;

 return prompt;
 }
}
