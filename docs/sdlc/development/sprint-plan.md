# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Launch the anonymous, responsive chat app with core AI conversation, context memory, and in-session history

Capacity: 20 points · Committed: 20

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Use the chatbot without logging in | 2 | frontend-agent | — |
| US-002 | Story | Use the chatbot on desktop and mobile browsers | 3 | frontend-agent | US-001 |
| US-003 | Story | Use the chatbot for free | 1 | frontend-agent | — |
| US-004 | Story | Send a message and receive an AI response | 8 | backend-agent | US-001 |
| ↳ US-004-T1 | Task | Implement POST /api/chat endpoint integrating Anthropic Claude | — | backend-agent | — |
| ↳ US-004-T2 | Task | Build chat UI for sending messages and displaying assistant replies | — | frontend-agent | — |
| ↳ US-004-T3 | Task | Add error handling for missing API key and LLM call failures | — | backend-agent | — |
| US-006 | Story | Assistant remembers earlier messages in the same conversation | 3 | backend-agent | US-004 |
| US-007 | Story | Keep chat history within the current browser session | 3 | frontend-agent | US-004 |

## Sprint 2: Sprint 2

Add streamed responses, session reset, and per-IP rate limiting for cost control

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | See AI responses stream in as they are generated | 8 | backend-agent | US-004 |
| ↳ US-005-T1 | Task | Implement streamed response from Claude in POST /api/chat | — | backend-agent | — |
| ↳ US-005-T2 | Task | Consume and render streaming reply incrementally in chat UI | — | frontend-agent | — |
| US-008 | Story | Start a new conversation / clear the current session | 2 | frontend-agent | US-007 |
| US-009 | Story | Limit request rate to control cost and misuse | 8 | backend-agent | US-004 |
| ↳ US-009-T1 | Task | Implement Redis-backed per-IP rate limiting middleware | — | backend-agent | — |
| ↳ US-009-T2 | Task | Log rate-limit and usage events to PostgreSQL | — | backend-agent | — |
| ↳ US-009-T3 | Task | Display rate-limit exceeded message in chat UI | — | frontend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
