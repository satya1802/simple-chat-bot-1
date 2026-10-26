<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because CloudFront/S3 for the static frontend, Fargate behind an ALB for the streaming backend, ElastiCache Redis, and RDS PostgreSQL — reliable at modest scale with low ongoing cost and room to scale out.

## Consequences

More moving parts than a single PaaS, but keeps scaling options open as usage grows (NFR-008).
<!-- sdlc:auto:end adr -->