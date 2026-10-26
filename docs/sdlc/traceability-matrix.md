# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Use the chatbot without logging in | US-001 | 1 | web_ui | — | — | not started | not run | — |
| US-002 | EPIC-001 | Use the chatbot on desktop and mobile browsers | US-002 | 1 | web_ui | — | — | not started | not run | — |
| US-003 | EPIC-001 | Use the chatbot for free | US-003 | 1 | web_ui | — | — | not started | not run | — |
| US-004 | EPIC-002 | Send a message and receive an AI response | US-004, US-004-T1, US-004-T2, US-004-T3 | 1 | POST /api/chat, api, llm, web_ui | — | — | not started | not run | — |
| US-005 | EPIC-002 | See AI responses stream in as they are generated | US-005, US-005-T1, US-005-T2 | 2 | POST /api/chat, api, llm, web_ui | — | — | not started | not run | — |
| US-006 | EPIC-002 | Assistant remembers earlier messages in the same conversation | US-006 | 1 | POST /api/chat, api, llm | — | — | not started | not run | — |
| US-007 | EPIC-003 | Keep chat history within the current browser session | US-007 | 1 | web_ui | — | — | not started | not run | — |
| US-008 | EPIC-003 | Start a new conversation / clear the current session | US-008 | 2 | web_ui | — | — | not started | not run | — |
| US-009 | EPIC-004 | Limit request rate to control cost and misuse | US-009, US-009-T1, US-009-T2, US-009-T3 | 2 | POST /api/chat, api, rate_limit_event, rate_store, usage_db, usage_log, web_ui | — | — | not started | not run | — |
<!-- sdlc:auto:end matrix -->
