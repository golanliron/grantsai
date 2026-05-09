# GrantsAI — Claude Code Instructions

## What this is
SaaS platform that manages Google Grants for Israeli nonprofits end-to-end:
eligibility, verification, website readiness, campaign building,
monitoring, optimization, recovery, and reporting.

Two portals:
- Internal Ops Dashboard — for our team. Dense, technical, full control.
- Client Portal — for the nonprofit. Simple, friendly, no technical details.

## Absolute rules — never violate
- NEVER call Claude API from frontend. Only from /api/agents/* routes.
- NEVER call Google Ads API from frontend. Only from /api/google/* routes.
- NEVER store OAuth tokens in localStorage, sessionStorage, or client state.
- NEVER delete campaigns — pause or archive only.
- NEVER show technical info to client portal (no CTR %, no keywords, no API errors, no policy rules, no logs).
- NEVER hardcode Google policy values (CPC limit, CTR threshold, eligibility rules). Always fetch from policy_rules table.
- NEVER let AI invent facts about a nonprofit. Only sourced, verified data.
- NEVER use window.storage.
- NEVER skip the safety sequence before any automated Google Ads action.

## Safety sequence — mandatory before every Google Ads action
1. Validate against policy_rules table
2. Validate landing page is live and approved
3. Check for duplicate campaigns
4. Create rollback_snapshot
5. Write audit_log entry
6. If automation_mode = approval_required → create human_review_queue item, stop
7. If automation_mode = full_auto AND confidence >= 0.85 → execute
8. If confidence < 0.6 → always escalate to human, never execute

## Confidence thresholds
- >= 0.85 → eligible for auto-execution (low-risk actions only)
- 0.6–0.85 → internal ops approval required
- < 0.6 → mandatory human review, no exceptions

## Automation modes (set by ops team only, never by client)
- draft_only — AI builds drafts, nothing executes
- approval_required — default for all new accounts
- full_auto — only after 90 days of stable performance data

## Two portals
/ops/* — ops team only, requires ops role
/portal/* — nonprofit client, requires client role, sees own org only

## Tech stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- Supabase (Postgres + Auth + Realtime + Storage)
- BullMQ + Redis for job queues
- Vercel deployment

## File structure
app/
  (ops)/              Internal ops pages — protected, ops role
  (client)/           Client portal pages — protected, client role
  api/
    agents/           Claude API calls — server only
    google/           Google Ads API — server only
    review/           Human review queue actions
    audit/            Audit log writes
components/
  ops/                Ops dashboard components
  client/             Client portal components (no technical info)
  ui/                 Shared primitives (Badge, Button, Card, Table)
  agents/             Agent status components
lib/
  confidence.ts       Confidence score evaluation
  policy.ts           Policy rules fetcher (never hardcoded)
  formatters.ts       Date, number, Hebrew formatters
services/
  api.ts              Typed fetch wrappers to /api routes
  google.ts           Google Ads (backend only, never imported by frontend)
jobs/
  website-scan.ts     BullMQ job
  campaign-publish.ts BullMQ job
  monitoring.ts       BullMQ job — hourly
  reporting.ts        BullMQ job — monthly
types/
  index.ts            All TypeScript interfaces
data/
  mock.ts             Development mock data (replace with real API)
supabase/
  migrations/         SQL migration files

## Current build phase
Check PHASE.md for current phase. Follow build order strictly.
