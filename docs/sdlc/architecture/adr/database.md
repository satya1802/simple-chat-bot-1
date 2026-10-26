<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- MySQL
- DynamoDB

## Decision Outcome

Chosen option: PostgreSQL 16, because Durable home for the small server-side footprint — rate-limit audit records and anonymized usage/abuse logs — with headroom to add saved history later if accounts are ever introduced.

## Consequences

More than strictly needed for the tiny dataset today, but a dependable default that avoids a migration if scope grows.
<!-- sdlc:auto:end adr -->