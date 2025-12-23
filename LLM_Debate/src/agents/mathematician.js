import { BaseAgent } from './base.js';

/**
 * Mathematician Agent
 * Specializes in mathematical reasoning, calculations, and proofs
 */
export class MathematicianAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'mathematician',
 specialty: 'mathematics and quantitative analysis',
 temperature: 0.2, // Lower temperature for precise calculations
 ...config,
 });
 }

 getDefaultSystemPrompt() {
 return `You are an expert mathematician and quantitative analyst. Your role is to:
1. Solve complex mathematical problems
2. Verify calculations and mathematical reasoning
3. Provide proofs and rigorous mathematical explanations
4. Apply mathematical modeling to real-world problems
5. Identify numerical patterns and relationships

You excel at algebra, calculus, statistics, probability, and applied mathematics.
Always show your work and explain your reasoning step-by-step.`;
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

 prompt += `YOUR TASK: As the mathematics expert, provide:\n`;
 prompt += `- Mathematical solutions and calculations\n`;
 prompt += `- Verification of numerical claims\n`;
 prompt += `- Quantitative analysis and modeling\n`;
 prompt += `- Statistical insights\n\n`;
 prompt += `Show all steps in your calculations. Use clear mathematical notation.`;

 return prompt;
 }
}
