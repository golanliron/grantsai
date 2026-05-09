-- Seed data for development
-- Two test users: ops and client

-- Create test organization
INSERT INTO organizations (id, name, site, vertical, stage, risk, automation_mode) VALUES
  ('00000000-0000-0000-0000-000000000001', 'הופה', 'hopa.org.il', 'youth_at_risk', 'active', 'medium', 'approval_required');

-- Create test users (auth_id will be set after Supabase Auth signup)
-- ops@grantsai.co — ops role, sees all organizations
-- demo@hopa.org.il — client role, sees only org_hopa

INSERT INTO users (id, email, name, role, org_id) VALUES
  ('00000000-0000-0000-0000-000000000010', 'ops@grantsai.co', 'Ops Admin', 'ops', NULL),
  ('00000000-0000-0000-0000-000000000011', 'demo@hopa.org.il', 'Hopa Demo', 'client', '00000000-0000-0000-0000-000000000001');
