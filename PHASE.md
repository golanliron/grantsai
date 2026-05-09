# Build Order

## 🔄 Phase 1 — Database Schema
Migration file with all tables, enums, RLS, indexes.

## ⬜ Phase 2 — Auth
Supabase Auth. Two roles: ops / client. Route protection middleware.

## ⬜ Phase 3 — Internal Ops Dashboard (mock data)
Pages: dashboard, human-review-queue, agent-runs, alerts, audit-log.

## ⬜ Phase 4 — Client Portal (mock data)
Pages: dashboard, onboarding, status-timeline.

## ⬜ Phase 5 — Human Review Queue (real DB)
Full CRUD. Safety sequence enforced. Audit log on every action.

## ⬜ Phase 6 — Audit Log + Rollback Center
Read audit_logs table. Rollback from rollback_snapshots.

## ⬜ Phase 7 — Organization Knowledge Profile
Build + display. Validation: ai_invented must always be false.

## ⬜ Phase 8 — Website Scan Dashboard
Display scan results. Auto-fix queue items.

## ⬜ Phase 9 — Campaign Strategy Review
Draft display, approval flow, policy check, publish with safety sequence.

## ⬜ Phase 10 — Google OAuth Skeleton
Backend-only OAuth flow. Token encrypted in DB. Never touches frontend.

## ⬜ Phase 11 — Agent Job Infrastructure
BullMQ setup. Job definitions for all 18 agents.

## ⬜ Phase 12 — Monitoring + Alerts
Hourly cron. CTR check. Account status. OAuth health. Landing pages.

## ⬜ Phase 13 — Real Google Ads API
Campaign create, pause, update. Via /api/google/* only.

## ⬜ Phase 14 — Selective Automation
Enable full_auto mode for qualified accounts only.
