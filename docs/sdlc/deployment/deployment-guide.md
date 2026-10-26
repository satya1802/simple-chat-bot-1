# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| Static Web Hosting (S3 + CloudFront) | React chat app | Static assets (CDN) | CDN edge, auto | dev |
| Backend Service (ECS Fargate) | FastAPI 0.115 app behind ALB | Python 3.12 container (uvicorn) | 1 task dev, horizontal autoscale on CPU/requests | dev |
| Redis (ElastiCache / container) | Rate-limit counters | redis:7-alpine | single node dev | dev |
| PostgreSQL (RDS) | Usage & abuse store | PostgreSQL 16 | single instance dev | dev |
| Anthropic Claude API | Hosted LLM | SaaS (external) | managed by provider | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_Static_Web_Hosting__S3___CloudFront_["Static Web Hosting (S3 + CloudFront)<br/>React chat app"]
  n_Backend_Service__ECS_Fargate_["Backend Service (ECS Fargate)<br/>FastAPI 0.115 app behind ALB"]
  n_Redis__ElastiCache___container_["Redis (ElastiCache / container)<br/>Rate-limit counters"]
  n_PostgreSQL__RDS_["PostgreSQL (RDS)<br/>Usage & abuse store"]
  n_Anthropic_Claude_API["Anthropic Claude API<br/>Hosted LLM"]
  n_Static_Web_Hosting__S3___CloudFront_ -->|"HTTPS"| n_Backend_Service__ECS_Fargate_
  n_Backend_Service__ECS_Fargate_ -->|"Redis TCP (TLS)"| n_Redis__ElastiCache___container_
  n_Backend_Service__ECS_Fargate_ -->|"PostgreSQL (TLS)"| n_PostgreSQL__RDS_
  n_Backend_Service__ECS_Fargate_ -->|"HTTPS"| n_Anthropic_Claude_API
```
<!-- sdlc:auto:end topology -->
