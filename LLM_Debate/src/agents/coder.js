import { BaseAgent } from './base.js';

/**
 * Coder Agent
 * Specializes in code generation, review, and technical implementation
 */
export class CoderAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'coder',
 specialty: 'programming and software development',
 temperature: 0.3, // Lower temperature for more consistent code
 ...config,
 });
 }

 getDefaultSystemPrompt() {
 return `You are an expert software engineer and programmer. Your role is to:
1. Write clean, efficient, and well-documented code
2. Review code for bugs, security issues, and best practices
3. Suggest architectural improvements
4. Provide implementation details and technical solutions
5. Consider scalability, maintainability, and performance

You are proficient in multiple programming languages and frameworks.
Focus on practical, working solutions with proper error handling.`;
 }

 buildPrompt(goal, context, currentResponse) {
 let prompt = `${this.systemPrompt}\n\n`;
 prompt += `HIGH-LEVEL GOAL: ${goal}\n\n`;

 if (currentResponse) {
 prompt += `CURRENT RESPONSE:\n${currentResponse}\n\n`;
 }

 if (context.conversationContext) {
 prompt += `DISCUSSION HISTORY:\n${context.conversationContext}\n\n`;
 }

 prompt += `YOUR TASK: As the coding expert, provide:\n`;
 prompt += `- Code implementations or improvements\n`;
 prompt += `- Technical solutions to problems\n`;
 prompt += `- Code review and optimization suggestions\n`;
 prompt += `- Best practices and patterns\n\n`;
 prompt += `Include code examples where appropriate. Use proper syntax and formatting.`;

 return prompt;
 }
}
