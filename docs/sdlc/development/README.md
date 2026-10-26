# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-001 · approved · source: plan:v1

Overall development plan (version 1) is approved and organizes work into two sprints, each with 20-point capacity.

Plan status: approved, version 1. Sprint 1 goal: launch the anonymous, responsive chat app with core AI conversation, context memory, and in-session history (capacity=20). Sprint 2 goal: add streamed responses, session reset, and per-IP rate limiting for cost control (capacity=20). The plan covers 4 epics and 9 user stories totaling 38 story points across the two sprints.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

- ⚠ Input does not state which specific backlog items (US-001..US-009) are assigned to Sprint 1 vs Sprint 2 -- only sprint goals and themes are given, so item-to-sprint assignment is unconfirmed.
- ⚠ No actual development status (not started/in progress/done), commit references, or code review info was provided for any item in this plan.

### EPIC-001 · draft · source: plan:EPIC-001

Epic covering anonymous access and a responsive chat interface usable without login, on desktop and mobile, at no cost.

Epic EPIC-001 'Anonymous Access & Responsive Chat Interface' has no points or role assigned at the epic level. It groups three stories assigned to frontend-agent: US-001 'Use the chatbot without logging in' (2 pts), US-002 'Use the chatbot on desktop and mobile browsers' (3 pts), US-003 'Use the chatbot for free' (1 pt). No implementation tasks were broken out under this epic in the plan input.

**Related:** US-001, US-002, US-003

- ⚠ No engineering tasks (e.g., US-001-T1) were listed for these stories, unlike other epics -- unclear if frontend-agent work has been further decomposed.
- ⚠ No completion or build status provided for US-001, US-002, or US-003.

### EPIC-002 · draft · source: plan:EPIC-002

Epic covering core AI conversation capability: sending/receiving messages, streamed responses, and conversation memory.

Epic EPIC-002 'AI Conversation' groups three stories. US-004 'Send a message and receive an AI response' (8 pts, backend-agent) is broken into: US-004-T1 implement POST /api/chat integrating Anthropic Claude (backend-agent); US-004-T2 build chat UI for sending messages and displaying assistant replies (frontend-agent); US-004-T3 add error handling for missing API key and LLM call failures (backend-agent). US-005 'See AI responses stream in as they are generated' (8 pts, backend-agent) is broken into: US-005-T1 implement streamed response from Claude in POST /api/chat (backend-agent); US-005-T2 consume and render streaming reply incrementally in chat UI (frontend-agent). US-006 'Assistant remembers earlier messages in the same conversation' (3 pts, backend-agent) has no sub-tasks listed.

**Related:** US-004, US-005, US-006, US-004-T1, US-004-T2, US-004-T3, US-005-T1, US-005-T2

- ⚠ No sub-tasks were provided for US-006 (context memory) -- unclear how memory/context will be implemented (e.g., storage mechanism).
- ⚠ No status/evidence of actual implementation, code, or testing for any task under this epic.
- ⚠ Error handling task (US-004-T3) exists only as a planned task; no detail on what errors are handled or how they surface to the user.

### EPIC-003 · draft · source: plan:EPIC-003

Epic covering session-scoped chat history and the ability to start a new conversation.

Epic EPIC-003 'Session Management & History' groups: US-007 'Keep chat history within the current browser session' (3 pts, frontend-agent) and US-008 'Start a new conversation / clear the current session' (2 pts, frontend-agent). No sub-tasks were listed for either story.

**Related:** US-007, US-008

- ⚠ No tasks decomposed for US-007 or US-008 -- unclear what mechanism (e.g., browser storage) is planned.
- ⚠ No implementation or test status available for this epic's stories.

### EPIC-004 · draft · source: plan:EPIC-004

Epic covering abuse protection via per-IP rate limiting to control cost and misuse.

Epic EPIC-004 'Abuse Protection & Cost Control' groups a single story: US-009 'Limit request rate to control cost and misuse' (8 pts, backend-agent), broken into: US-009-T1 implement Redis-backed per-IP rate limiting middleware (backend-agent); US-009-T2 log rate-limit and usage events to PostgreSQL (backend-agent); US-009-T3 display rate-limit exceeded message in chat UI (frontend-agent).

**Related:** US-009, US-009-T1, US-009-T2, US-009-T3

- ⚠ No status/evidence of implementation for Redis middleware, PostgreSQL logging, or the UI rate-limit message.
- ⚠ No details on rate-limit thresholds or policy (e.g., requests per minute) were provided in this input.

### DEV-STATUS-001 · draft

No development execution evidence was supplied for this phase -- only the approved sprint plan and backlog decomposition are available.

The development phase input consists solely of plan metadata (sprint goals, capacities, epics, stories, tasks, and role assignments). It does not include ticket status transitions (e.g., to-do/in-progress/done), code commits, pull requests, build results, or developer notes. Therefore this documentation reflects planned scope only, not actual progress or completion.

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-009

- ⚠ Development phase has not reported any execution status -- cannot confirm what, if anything, has actually been built yet.
- ⚠ No linkage provided between backlog items and real code artifacts or repositories.
<!-- sdlc:auto:end narrative -->
