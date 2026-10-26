<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Node/Express
- Django

## Decision Outcome

Chosen option: FastAPI 0.115, because Sits between browser and Claude: forwards the conversation, streams the reply back with StreamingResponse/SSE, and enforces per-IP rate limiting. Python-first fit for the Anthropic SDK.

## Consequences

Async streaming and per-IP middleware are straightforward; running long streamed connections means right-sizing worker concurrency under load.
<!-- sdlc:auto:end adr -->