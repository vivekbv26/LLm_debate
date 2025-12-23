import dotenv from 'dotenv';
import { DebateArena } from './core/arena.js';
import { AdapterFactory } from './adapters/index.js';
import { 
 ValidatorAgent, 
 CoderAgent, 
 MathematicianAgent, 
 RAGAgent, 
 OrchestratorAgent,
 WebSearchAgent,
 BaseAgent 
} from './agents/index.js';

// Load environment variables
dotenv.config();

/**
 * Main LLM Debate System
 * Easy-to-use API for setting up and running multi-LLM debates
 */
export class LLMDebate {
 constructor(config = {}) {
 this.arena = new DebateArena({
 maxHistory: config.maxHistory || 1000,
 maxRounds: config.maxRounds || 10,
 convergenceThreshold: config.convergenceThreshold || 0.85,
 verbose: config.verbose !== false,
 useOrchestrator: config.useOrchestrator || false,
 });
 this.customAgents = new Map();
 }

 /**
 * Add an agent to the debate
 * @param {string} agentType - Type of agent or 'custom'
 * @param {object} llmConfig - LLM configuration
 * @param {object} agentConfig - Agent-specific configuration
 * @returns {object} - The created agent
 */
 addAgent(agentType, llmConfig, agentConfig = {}) {
 // Create adapter
 const adapter = AdapterFactory.createAdapter(llmConfig);
 adapter.validate();

 // Create agent based on type
 let agent;
 const type = agentType.toLowerCase();
 
 switch (type) {
 case 'validator':
 agent = new ValidatorAgent(adapter, agentConfig);
 break;
 case 'coder':
 agent = new CoderAgent(adapter, agentConfig);
 break;
 case 'mathematician':
 agent = new MathematicianAgent(adapter, agentConfig);
 break;
 case 'rag':
 agent = new RAGAgent(adapter, agentConfig);
 break;
 case 'orchestrator':
 agent = new OrchestratorAgent(adapter, agentConfig);
 this.arena.setOrchestrator(agent);
 return agent; // Don't add orchestrator to regular agents
 case 'web-search':
 case 'websearch':
 agent = new WebSearchAgent(adapter, agentConfig);
 break;
 case 'custom':
 // For custom agents, user must provide role and specialty
 agent = new BaseAgent(adapter, {
 role: agentConfig.role || 'custom',
 specialty: agentConfig.specialty || 'general purpose',
 systemPrompt: agentConfig.systemPrompt,
 ...agentConfig,
 });
 break;
 default:
 throw new Error(`Unknown agent type: ${agentType}. Use 'custom' for custom agents.`);
 }

 this.arena.registerAgent(agent);
 return agent;
 }

 /**
 * Add a custom agent with any specialty
 * @param {string} role - Unique role name
 * @param {string} specialty - What this agent is expert at
 * @param {object} llmConfig - LLM configuration
 * @param {string} systemPrompt - Custom system prompt
 * @param {object} additionalConfig - Additional configuration
 * @returns {object} - The created agent
 */
 addCustomAgent(role, specialty, llmConfig, systemPrompt, additionalConfig = {}) {
 const adapter = AdapterFactory.createAdapter(llmConfig);
 adapter.validate();

 const agent = new BaseAgent(adapter, {
 role,
 specialty,
 systemPrompt,
 ...additionalConfig,
 });

 this.arena.registerAgent(agent);
 this.customAgents.set(role, agent);
 return agent;
 }

 /**
 * Enable orchestrator mode with a specific LLM
 * @param {object} llmConfig - LLM configuration for orchestrator
 * @param {object} config - Orchestrator configuration
 * @returns {object} - The orchestrator agent
 */
 enableOrchestrator(llmConfig, config = {}) {
 return this.addAgent('orchestrator', llmConfig, config);
 }

 /**
 * Enable intelligent response synthesis
 * @param {object} llmConfig - LLM configuration for synthesis
 */
 enableSynthesis(llmConfig) {
 const adapter = AdapterFactory.createAdapter(llmConfig);
 adapter.validate();
 this.arena.setSynthesisAdapter(adapter);
 }

 /**
 * Set the goal for the debate
 * @param {string} goal - The high-level goal or problem
 */
 setGoal(goal) {
 this.arena.setGoal(goal);
 }

 /**
 * Start the debate
 * @returns {Promise<object>} - Results including final response
 */
 async start() {
 return await this.arena.debate();
 }

 /**
 * Get the final response
 * @returns {string} - Final synthesized response
 */
 getFinalResponse() {
 return this.arena.getFinalResponse();
 }

 /**
 * Reset for a new debate
 */
 reset() {
 this.arena.reset();
 }
}

// Export everything for flexible usage
export { DebateArena } from './core/arena.js';
export { ConversationManager } from './core/conversation.js';
export { AdapterFactory } from './adapters/index.js';
export * from './agents/index.js';
