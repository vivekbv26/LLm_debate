import { BaseAgent } from './base.js';

/**
 * Orchestrator Agent
 * Routes tasks to the most appropriate agents based on expertise needs
 * Acts as a "team manager" deciding which LLM should handle what
 */
export class OrchestratorAgent extends BaseAgent {
 constructor(adapter, config = {}) {
 super(adapter, {
 role: 'orchestrator',
 specialty: 'task routing and agent coordination',
 temperature: 0.4, // Balanced for decision-making
 ...config,
 });
 this.availableAgents = [];
 }

 getDefaultSystemPrompt() {
 return `You are an expert orchestrator and project manager for a team of specialized AI agents.

Your role is to:
1. Analyze the current goal and response
2. Identify what expertise is needed next
3. Determine which agent(s) should contribute
4. Explain why that agent's expertise is needed
5. Provide specific guidance on what aspect they should focus on

You manage a team with different specialties. Always think strategically about
who can add the most value at each stage.`;
 }

 /**
 * Register available agents for orchestration
 * @param {Array} agents - Array of agent instances
 */
 setAvailableAgents(agents) {
 this.availableAgents = agents;
 }

 /**
 * Decide which agent should contribute next
 * @param {string} goal - The high-level goal
 * @param {object} context - Current context
 * @param {string} currentResponse - Current response
 * @returns {Promise<object>} - Decision object with agent and reasoning
 */
 async decideNextAgent(goal, context, currentResponse) {
 const agentDescriptions = this.availableAgents
 .map(agent => `- ${agent.role}: ${agent.specialty}`)
 .join('\n');

 const prompt = `${this.systemPrompt}\n\n
AVAILABLE AGENTS:
${agentDescriptions}

HIGH-LEVEL GOAL:
${goal}

CURRENT RESPONSE:
${currentResponse || 'No response yet - this is the beginning'}

RECENT DISCUSSION:
${context.conversationContext || 'No discussion yet'}

YOUR TASK:
1. Analyze what the response needs next
2. Choose the BEST agent for this stage
3. Explain WHY their expertise is needed now
4. Provide SPECIFIC guidance on what to focus on

Respond in this JSON format:
{
 "agent": "agent_role_here",
 "reason": "Why this agent is needed now",
 "focus": "Specific aspect they should address",
 "priority": "high/medium/low"
}`;

 try {
 const response = await this.adapter.generate(prompt, {
 temperature: this.temperature,
 });

 // Parse the JSON response
 const jsonMatch = response.match(/\{[\s\S]*\}/);
 if (jsonMatch) {
 const decision = JSON.parse(jsonMatch[0]);
 return decision;
 }
 
 // Fallback if JSON parsing fails
 return {
 agent: this.availableAgents[0]?.role || 'validator',
 reason: 'Default routing due to parsing error',
 focus: 'General review',
 priority: 'medium'
 };
 } catch (error) {
 console.error('Orchestrator decision error:', error.message);
 // Fallback to first available agent
 return {
 agent: this.availableAgents[0]?.role || 'validator',
 reason: 'Fallback routing',
 focus: 'Review and improve',
 priority: 'medium'
 };
 }
 }

 /**
 * Contribute by analyzing the overall progress
 */
 async contribute(goal, context, currentResponse) {
 const prompt = `${this.systemPrompt}\n\n
HIGH-LEVEL GOAL: ${goal}

CURRENT RESPONSE:
${currentResponse || 'No response yet'}

TEAM PROGRESS:
${context.conversationContext || 'Just starting'}

YOUR TASK AS ORCHESTRATOR:
Provide a strategic overview:
1. What progress has been made?
2. What's still missing?
3. What should happen next?
4. Are we on track to achieve the goal?

Be concise and actionable.`;

 return await this.adapter.generate(prompt, {
 temperature: this.temperature,
 });
 }
}
