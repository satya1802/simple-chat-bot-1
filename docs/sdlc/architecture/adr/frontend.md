<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because Drives the single-screen responsive chat UI, keeping conversation in browser session storage and rendering Claude's streamed tokens incrementally via the fetch streaming API.

## Consequences

A SPA needs a small build/hosting setup (served as static assets via CloudFront), but gives a smooth ChatGPT-style interactive experience on desktop and mobile.
<!-- sdlc:auto:end adr -->