import { ConversationManager } from './conversation.js';

/**
 * Debate Arena
 * The main playground where LLM agents collaborate and debate
 */
export class DebateArena {
 constructor(config = {}) {
 this.agents = [];
 this.conversation = new ConversationManager(config.maxHistory || 1000);
 this.currentResponse = '';
 this.goal = '';
 this.maxRounds = config.maxRounds || 10;
 this.convergenceThreshold = config.convergenceThreshold || 0.85;
 this.verbose = config.verbose !== false;
 this.useOrchestrator = config.useOrchestrator || false;
 this.orchestrator = null;
 this.synthesisAdapter = config.synthesisAdapter || null;
 }

 /**
 * Register an agent to participate in debates
 * @param {object} agent - Agent instance
 */
 registerAgent(agent) {
 this.agents.push(agent);
 if (this.verbose) {
 console.log(`[Registered] Agent: ${agent.role} (${agent.specialty})`);
 }
 }

 /**
 * Set an orchestrator agent for intelligent routing
 * @param {object} orchestrator - Orchestrator agent instance
 */
 setOrchestrator(orchestrator) {
 this.orchestrator = orchestrator;
 this.orchestrator.setAvailableAgents(this.agents);
 this.useOrchestrator = true;
 if (this.verbose) {
 console.log(`[Orchestrator enabled] ${orchestrator.role}`);
 }
 }

 /**
 * Set an adapter for response synthesis
 * @param {object} adapter - LLM adapter for synthesis
 */
 setSynthesisAdapter(adapter) {
 this.synthesisAdapter = adapter;
 }

 /**
 * Set the high-level goal for the debate
 * @param {string} goal - The goal or problem to solve
 */
 setGoal(goal) {
 this.goal = goal;
 this.currentResponse = '';
 this.conversation.addMessage('system', `Goal set: ${goal}`);
 }

 /**
 * Start the debate process
 * @returns {Promise<object>} - Final response and metadata
 */
 async debate() {
 if (!this.goal) {
 throw new Error('Goal must be set before starting debate');
 }

 if (this.agents.length === 0) {
 throw new Error('At least one agent must be registered');
 }

 if (this.verbose) {
 console.log('\n[Debate Arena] Starting...');
 console.log(`Goal: ${this.goal}`);
 console.log(`Agents: ${this.agents.map(a => a.role).join(', ')}`);
 console.log(`Orchestration: ${this.useOrchestrator ? 'ENABLED' : 'Round-robin'}\n`);
 }

 let round = 0;
 let previousResponse = '';

 while (round < this.maxRounds) {
 round++;
 if (this.verbose) {
 console.log(`\n--- Round ${round}/${this.maxRounds} ---`);
 }

 if (this.useOrchestrator && this.orchestrator) {
 // Orchestrator decides which agent contributes
 await this.orchestratedRound(round);
 } else {
 // Round-robin: each agent contributes
 await this.roundRobinRound(round);
 }

 // Check for convergence
 if (this.hasConverged(previousResponse, this.currentResponse)) {
 if (this.verbose) {
 console.log('\n[Debate converged]');
 }
 break;
 }

 previousResponse = this.currentResponse;
 }

 const result = {
 finalResponse: this.currentResponse,
 rounds: round,
 stats: this.conversation.getStats(),
 history: this.conversation.getAllMessages(),
 };

 if (this.verbose) {
 console.log('\n[Debate Complete]');
 console.log(`Total rounds: ${round}`);
 console.log(`Total messages: ${result.stats.totalMessages}`);
 }

 return result;
 }

 /**
 * Execute a round with orchestrator deciding which agent contributes
 * @param {number} round - Current round number
 */
 async orchestratedRound(round) {
 const context = this.buildContext();
 
 // Orchestrator decides which agent should contribute
 const decision = await this.orchestrator.decideNextAgent(
 this.goal,
 context,
 this.currentResponse
 );

 if (this.verbose) {
 console.log(`\n[Orchestrator Decision]`);
 console.log(` Agent: ${decision.agent}`);
 console.log(` Reason: ${decision.reason}`);
 console.log(` Focus: ${decision.focus}`);
 }

 // Find the selected agent
 const selectedAgent = this.agents.find(a => a.role === decision.agent);
 
 if (selectedAgent) {
 await this.agentContribute(selectedAgent, round, decision.focus);
 } else {
 // Fallback to first agent if orchestrator's choice not found
 if (this.verbose) {
 console.log(` [Warning] Agent '${decision.agent}' not found, using fallback`);
 }
 await this.agentContribute(this.agents[0], round);
 }
 }

 /**
 * Execute a round with all agents contributing (round-robin)
 * @param {number} round - Current round number
 */
 async roundRobinRound(round) {
 for (const agent of this.agents) {
 await this.agentContribute(agent, round);
 }
 }

 /**
 * Have an agent contribute to the debate
 * @param {object} agent - The agent to contribute
 * @param {number} round - Current round number
 * @param {string} focus - Optional focus area from orchestrator
 */
 async agentContribute(agent, round, focus = null) {
 try {
 const context = this.buildContext();
 if (focus) {
 context.focus = focus; // Add orchestrator's guidance
 }
 
 const contribution = await agent.contribute(this.goal, context, this.currentResponse);

 this.conversation.addMessage(agent.role, contribution, {
 round,
 specialty: agent.specialty,
 focus: focus || 'general',
 });

 // Synthesize the contribution into the current response
 this.currentResponse = await this.synthesizeResponse(contribution, agent.role);

 if (this.verbose) {
 console.log(`\n[${agent.role}] contributed:`);
 console.log(contribution.substring(0, 200) + (contribution.length > 200 ? '...' : ''));
 }
 } catch (error) {
 console.error(`Error from ${agent.role}: ${error.message}`);
 }
 }

 /**
 * Build context for agents
 * @returns {object} - Context object
 */
 buildContext() {
 return {
 goal: this.goal,
 currentResponse: this.currentResponse,
 recentHistory: this.conversation.getRecentMessages(10),
 conversationContext: this.conversation.getContext(15),
 };
 }

 /**
 * Synthesize the current response from a contribution
 * @param {string} contribution - Agent contribution
 * @param {string} agentRole - Role of the contributing agent
 * @returns {Promise<string>} - Updated response
 */
 async synthesizeResponse(contribution, agentRole) {
 // If no current response, use the contribution
 if (!this.currentResponse) {
 return contribution;
 }

 // If synthesis adapter is provided, use LLM to merge intelligently
 if (this.synthesisAdapter) {
 try {
 const synthesisPrompt = `You are a synthesis expert. Your job is to merge contributions into a coherent response.

CURRENT RESPONSE:
${this.currentResponse}

NEW CONTRIBUTION from ${agentRole}:
${contribution}

YOUR TASK:
Intelligently merge the new contribution into the current response. 
- Keep the best parts of both
- Resolve any conflicts
- Maintain coherence and flow
- Build upon previous work
- Don't repeat information

Output ONLY the merged response, nothing else.`;

 const synthesized = await this.synthesisAdapter.generate(synthesisPrompt, {
 temperature: 0.3,
 max_tokens: 3000,
 });

 return synthesized;
 } catch (error) {
 console.error('Synthesis error, using fallback:', error.message);
 // Fallback to simple append
 return `${this.currentResponse}\n\n--- ${agentRole} adds ---\n${contribution}`;
 }
 }

 // Simple merge: keep latest contribution as the working response
 // Previous contributions are in conversation history
 return contribution;
 }

 /**
 * Check if the debate has converged
 * @param {string} prev - Previous response
 * @param {string} current - Current response
 * @returns {boolean} - Whether converged
 */
 hasConverged(prev, current) {
 if (!prev || !current) return false;

 // Simple similarity check based on length and common words
 const similarity = this.calculateSimilarity(prev, current);
 return similarity >= this.convergenceThreshold;
 }

 /**
 * Calculate similarity between two texts
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} - Similarity score (0-1)
 */
 calculateSimilarity(text1, text2) {
 const words1 = new Set(text1.toLowerCase().split(/\s+/));
 const words2 = new Set(text2.toLowerCase().split(/\s+/));

 const intersection = new Set([...words1].filter(w => words2.has(w)));
 const union = new Set([...words1, ...words2]);

 return intersection.size / union.size;
 }

 /**
 * Get the final response
 * @returns {string} - Final response
 */
 getFinalResponse() {
 return this.currentResponse;
 }

 /**
 * Reset the arena for a new debate
 */
 reset() {
 this.currentResponse = '';
 this.goal = '';
 this.conversation.clear();
 }
}
