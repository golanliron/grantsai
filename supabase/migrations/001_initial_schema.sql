-- GrantsAI — Full Database Schema
-- Phase 1: All tables, enums, RLS, indexes

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE org_stage AS ENUM (
  'signup', 'verification', 'google_np', 'grants',
  'website_scan', 'website_fix', 'campaign_draft',
  'campaign_review', 'active', 'suspended', 'churned'
);

CREATE TYPE risk_level AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TYPE automation_mode AS ENUM ('draft_only', 'approval_required', 'full_auto');

CREATE TYPE review_status AS ENUM ('pending', 'approved', 'rejected', 'escalated');

CREATE TYPE agent_status AS ENUM ('running', 'completed', 'human_review', 'failed');

CREATE TYPE doc_status AS ENUM ('needed', 'uploaded', 'approved', 'rejected', 'expired');

CREATE TYPE check_status AS ENUM ('pass', 'warning', 'fail');

CREATE TYPE campaign_status AS ENUM ('draft', 'pending_approval', 'active', 'paused', 'archived');
-- NO 'deleted' — ever

CREATE TYPE alert_severity AS ENUM ('info', 'low', 'medium', 'high', 'critical');

CREATE TYPE verification_provider AS ENUM ('goodstack', 'techsoup', 'manual', 'unknown');

CREATE TYPE user_role AS ENUM ('ops', 'client');

-- ============================================
-- CORE TABLES
-- ============================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR NOT NULL,
  site VARCHAR,
  vertical VARCHAR,
  stage org_stage DEFAULT 'signup',
  risk risk_level DEFAULT 'low',
  automation_mode automation_mode DEFAULT 'approval_required',
  guidestar_id VARCHAR,
  amuta_number VARCHAR,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_id UUID UNIQUE, -- references auth.users(id)
  email VARCHAR NOT NULL UNIQUE,
  name VARCHAR,
  role user_role NOT NULL DEFAULT 'client',
  org_id UUID REFERENCES organizations(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE operator_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  user_id UUID NOT NULL REFERENCES users(id),
  is_primary BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ORGANIZATION PROFILES & KNOWLEDGE
-- ============================================

CREATE TABLE organization_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  description TEXT,
  contact_name VARCHAR,
  contact_email VARCHAR,
  contact_phone VARCHAR,
  address TEXT,
  founded_year INTEGER,
  employee_count INTEGER,
  annual_budget_ils INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE organization_knowledge_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  confidence DECIMAL(4,3),
  sources_used TEXT[],
  mission TEXT,
  target_audience JSONB,
  services TEXT[],
  tone VARCHAR,
  key_messages TEXT[],
  forbidden_words TEXT[],
  conversion_goals TEXT[],
  seasonality JSONB,
  annual_budget_ils INTEGER,
  staff_count INTEGER,
  ai_invented BOOLEAN NOT NULL DEFAULT false,
  -- CRITICAL: if ai_invented = true, block all campaign generation
  review_required BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DOCUMENTS & VERIFICATION
-- ============================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR NOT NULL,
  type VARCHAR NOT NULL, -- 'nihul_takin', 'financial_report', 'guidestar', etc.
  status doc_status DEFAULT 'needed',
  file_url TEXT,
  expires_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE verification_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  provider verification_provider DEFAULT 'unknown',
  status VARCHAR DEFAULT 'pending',
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE verification_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES verification_cases(id),
  document_id UUID NOT NULL REFERENCES documents(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- WEBSITE SCANS
-- ============================================

CREATE TABLE website_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  url VARCHAR NOT NULL,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  total_checks INTEGER DEFAULT 0,
  passed_checks INTEGER DEFAULT 0,
  failed_checks INTEGER DEFAULT 0,
  blockers_count INTEGER DEFAULT 0,
  scanned_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE website_scan_issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id UUID NOT NULL REFERENCES website_scans(id),
  category VARCHAR NOT NULL, -- 'security', 'legal', 'content', 'conversion', 'technical'
  check_name VARCHAR NOT NULL,
  status check_status NOT NULL,
  is_blocker BOOLEAN DEFAULT false,
  fix_available BOOLEAN DEFAULT false,
  fix_type VARCHAR,
  detail TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- GRANT APPLICATIONS
-- ============================================

CREATE TABLE grant_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  status VARCHAR DEFAULT 'pending', -- pending, submitted, approved, rejected
  google_customer_id VARCHAR,
  submitted_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- GOOGLE CONNECTIONS & ADS
-- ============================================

CREATE TABLE google_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  google_email VARCHAR,
  encrypted_refresh_token TEXT, -- AES-256 encrypted, never exposed
  access_token TEXT,
  token_expires_at TIMESTAMPTZ,
  scopes TEXT[],
  is_mcc BOOLEAN DEFAULT false,
  connected_at TIMESTAMPTZ,
  last_refresh_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE google_ads_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  connection_id UUID NOT NULL REFERENCES google_connections(id),
  google_customer_id VARCHAR NOT NULL,
  account_name VARCHAR,
  is_grants BOOLEAN DEFAULT false,
  status VARCHAR DEFAULT 'active',
  monthly_budget_usd DECIMAL(10,2) DEFAULT 10000,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CAMPAIGNS & ADS
-- ============================================

CREATE TABLE campaign_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  version INTEGER DEFAULT 1,
  strategy JSONB NOT NULL, -- full strategy document
  confidence DECIMAL(4,3),
  policy_check_passed BOOLEAN,
  policy_issues JSONB,
  created_by VARCHAR, -- agent or user email
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE campaign_drafts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  strategy_id UUID REFERENCES campaign_strategies(id),
  name VARCHAR NOT NULL,
  status campaign_status DEFAULT 'draft',
  ad_groups JSONB,
  keywords JSONB,
  negative_keywords JSONB,
  ads JSONB,
  sitelinks JSONB,
  callouts JSONB,
  estimated_impressions INTEGER,
  estimated_clicks INTEGER,
  estimated_conversions INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  draft_id UUID REFERENCES campaign_drafts(id),
  google_campaign_id VARCHAR, -- null until published
  name VARCHAR NOT NULL,
  status campaign_status DEFAULT 'draft',
  -- status can be: draft, pending_approval, active, paused, archived
  -- NEVER: deleted
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ad_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  google_ad_group_id VARCHAR,
  name VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'active',
  budget_allocation DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_group_id UUID NOT NULL REFERENCES ad_groups(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  text VARCHAR NOT NULL,
  match_type VARCHAR DEFAULT 'broad', -- broad, phrase, exact
  is_negative BOOLEAN DEFAULT false,
  status VARCHAR DEFAULT 'active',
  ctr DECIMAL(6,4),
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_group_id UUID NOT NULL REFERENCES ad_groups(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  google_ad_id VARCHAR,
  headline1 VARCHAR,
  headline2 VARCHAR,
  headline3 VARCHAR,
  description1 TEXT,
  description2 TEXT,
  final_url VARCHAR,
  status VARCHAR DEFAULT 'active',
  disapproved BOOLEAN DEFAULT false,
  disapproval_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE landing_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  url VARCHAR NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  last_checked_at TIMESTAMPTZ,
  http_status INTEGER,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE conversion_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  name VARCHAR NOT NULL,
  type VARCHAR, -- 'form_submit', 'phone_call', 'donation', 'volunteer_signup'
  tracking_active BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- POLICY RULES — never hardcoded
-- ============================================

CREATE TABLE policy_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  source VARCHAR, -- 'google_policy_api', 'manual', etc.
  last_synced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seed policy rules
INSERT INTO policy_rules (key, value, description, source) VALUES
  ('ctr_threshold_monthly', '0.05', 'Minimum monthly CTR for Google Ad Grants', 'google_policy'),
  ('ctr_grace_months', '2', 'Consecutive failing months before deactivation', 'google_policy'),
  ('grants_monthly_budget_usd', '10000', 'Monthly Google Grants budget', 'google_policy'),
  ('cpc_limit_manual_usd', '', 'Max CPC for manual bidding — NULL if Smart Bidding or unknown', 'google_policy');

CREATE TABLE policy_checks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  campaign_id UUID REFERENCES campaigns(id),
  checked_at TIMESTAMPTZ DEFAULT now(),
  passed BOOLEAN NOT NULL,
  issues JSONB,
  checked_by VARCHAR, -- agent name or user email
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- AUTOMATION & ACTIONS
-- ============================================

CREATE TABLE automation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  mode automation_mode DEFAULT 'approval_required',
  full_auto_enabled_at TIMESTAMPTZ,
  confidence_threshold DECIMAL(4,3) DEFAULT 0.850,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE automation_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  action_type VARCHAR NOT NULL,
  confidence DECIMAL(4,3),
  was_auto_executed BOOLEAN DEFAULT false,
  result JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE optimization_actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  campaign_id UUID REFERENCES campaigns(id),
  action_type VARCHAR NOT NULL, -- 'pause_keyword', 'add_negative', 'update_bid', etc.
  target_id UUID,
  old_value JSONB,
  new_value JSONB,
  confidence DECIMAL(4,3),
  was_auto_executed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- HUMAN REVIEW QUEUE — heart of the product
-- ============================================

CREATE TABLE rollback_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  reason TEXT,
  snapshot_data JSONB NOT NULL, -- full campaign/keyword state
  campaigns_count INTEGER DEFAULT 0,
  keywords_count INTEGER DEFAULT 0,
  is_restorable BOOLEAN DEFAULT true,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE human_review_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  agent VARCHAR NOT NULL,
  status review_status DEFAULT 'pending',
  risk_level risk_level NOT NULL,
  confidence DECIMAL(4,3) CHECK (confidence >= 0 AND confidence <= 1),
  title VARCHAR NOT NULL,
  problem TEXT NOT NULL,
  recommendation TEXT NOT NULL,
  if_approved TEXT NOT NULL,
  if_rejected TEXT NOT NULL,
  rollback_snapshot_id UUID REFERENCES rollback_snapshots(id),
  client_message TEXT, -- null = internal only, no client notification
  actions TEXT[] NOT NULL, -- ['approve','reject','edit','rollback','escalate']
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  resolution_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ALERTS & REPORTS
-- ============================================

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  severity alert_severity NOT NULL,
  title VARCHAR NOT NULL,
  body TEXT,
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  type VARCHAR DEFAULT 'monthly', -- 'monthly', 'quarterly', 'annual'
  period_start DATE,
  period_end DATE,
  data JSONB,
  pdf_url TEXT,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE client_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  message TEXT NOT NULL,
  source VARCHAR, -- 'review_approval', 'alert', 'report', 'manual'
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- AUDIT LOG — immutable, append-only
-- ============================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID REFERENCES organizations(id),
  actor VARCHAR NOT NULL, -- email or agent name
  action VARCHAR NOT NULL,
  severity alert_severity DEFAULT 'info',
  detail TEXT,
  rollback_snapshot_id UUID REFERENCES rollback_snapshots(id),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
  -- NO updated_at — audit logs are immutable
);

-- No UPDATE or DELETE on audit_logs
REVOKE UPDATE, DELETE ON audit_logs FROM PUBLIC;

-- ============================================
-- AGENT RUNS & ERRORS
-- ============================================

CREATE TABLE agent_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  agent VARCHAR NOT NULL,
  status agent_status DEFAULT 'running',
  confidence DECIMAL(4,3),
  steps INTEGER DEFAULT 0,
  errors_count INTEGER DEFAULT 0,
  duration_seconds INTEGER,
  review_id UUID REFERENCES human_review_queue(id),
  result JSONB,
  started_at TIMESTAMPTZ DEFAULT now(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE agent_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  run_id UUID NOT NULL REFERENCES agent_runs(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  error_type VARCHAR,
  message TEXT,
  stack TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- TASKS
-- ============================================

CREATE TABLE client_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  title VARCHAR NOT NULL,
  description TEXT,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE internal_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID NOT NULL REFERENCES organizations(id),
  assigned_to UUID REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  priority risk_level DEFAULT 'medium',
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- BILLING
-- ============================================

CREATE TABLE billing_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id UUID UNIQUE NOT NULL REFERENCES organizations(id),
  plan VARCHAR DEFAULT 'basic',
  monthly_fee_ils DECIMAL(10,2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  billing_account_id UUID NOT NULL REFERENCES billing_accounts(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  status VARCHAR DEFAULT 'active',
  started_at TIMESTAMPTZ DEFAULT now(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE operator_time_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  org_id UUID NOT NULL REFERENCES organizations(id),
  minutes INTEGER NOT NULL,
  description TEXT,
  logged_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- ENFORCE NO DELETE ON CAMPAIGNS
-- ============================================

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
CREATE POLICY no_delete_campaigns ON campaigns FOR DELETE USING (false);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Helper function: get user role and org_id from auth
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS user_role AS $$
  SELECT role FROM users WHERE auth_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION get_user_org_id()
RETURNS UUID AS $$
  SELECT org_id FROM users WHERE auth_id = auth.uid()
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE operator_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_knowledge_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_scan_issues ENABLE ROW LEVEL SECURITY;
ALTER TABLE grant_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE google_ads_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_strategies ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE ad_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE ads ENABLE ROW LEVEL SECURITY;
ALTER TABLE landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversion_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE automation_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimization_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rollback_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE human_review_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_errors ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE billing_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE operator_time_logs ENABLE ROW LEVEL SECURITY;

-- OPS POLICIES: full SELECT, INSERT, UPDATE on all tables
-- (applied per table — abbreviated with a DO block)

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'organizations','users','operator_assignments','organization_profiles',
      'organization_knowledge_profiles','documents','verification_cases',
      'verification_documents','website_scans','website_scan_issues',
      'grant_applications','google_connections','google_ads_accounts',
      'campaign_strategies','campaign_drafts','campaigns','ad_groups',
      'keywords','ads','landing_pages','conversion_goals','policy_rules',
      'policy_checks','automation_settings','automation_actions',
      'optimization_actions','rollback_snapshots','human_review_queue',
      'alerts','reports','client_messages','audit_logs','agent_runs',
      'agent_errors','client_tasks','internal_tasks','billing_accounts',
      'subscriptions','operator_time_logs'
    ])
  LOOP
    EXECUTE format(
      'CREATE POLICY ops_select_%1$s ON %1$I FOR SELECT USING (get_user_role() = ''ops'')',
      tbl
    );
    EXECUTE format(
      'CREATE POLICY ops_insert_%1$s ON %1$I FOR INSERT WITH CHECK (get_user_role() = ''ops'')',
      tbl
    );
    EXECUTE format(
      'CREATE POLICY ops_update_%1$s ON %1$I FOR UPDATE USING (get_user_role() = ''ops'')',
      tbl
    );
  END LOOP;
END $$;

-- CLIENT POLICIES: SELECT own org only
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'organizations','organization_profiles','documents',
      'campaigns','landing_pages','conversion_goals',
      'alerts','reports','client_messages','client_tasks'
    ])
  LOOP
    EXECUTE format(
      'CREATE POLICY client_select_%1$s ON %1$I FOR SELECT USING (get_user_role() = ''client'' AND org_id = get_user_org_id())',
      tbl
    );
  END LOOP;
END $$;

-- Special: users can see own record
CREATE POLICY client_select_self ON users FOR SELECT
  USING (auth_id = auth.uid());

-- Special: audit_logs — no update/delete for anyone (already revoked, but enforce via RLS too)
CREATE POLICY audit_no_update ON audit_logs FOR UPDATE USING (false);
CREATE POLICY audit_no_delete ON audit_logs FOR DELETE USING (false);

-- ============================================
-- INDEXES
-- ============================================

-- Foreign key indexes (most important ones)
CREATE INDEX idx_users_org ON users(org_id);
CREATE INDEX idx_users_auth ON users(auth_id);
CREATE INDEX idx_operator_assignments_org ON operator_assignments(org_id);
CREATE INDEX idx_documents_org ON documents(org_id);
CREATE INDEX idx_verification_cases_org ON verification_cases(org_id);
CREATE INDEX idx_website_scans_org ON website_scans(org_id);
CREATE INDEX idx_grant_applications_org ON grant_applications(org_id);
CREATE INDEX idx_google_connections_org ON google_connections(org_id);
CREATE INDEX idx_google_ads_accounts_org ON google_ads_accounts(org_id);
CREATE INDEX idx_campaign_strategies_org ON campaign_strategies(org_id);
CREATE INDEX idx_campaign_drafts_org ON campaign_drafts(org_id);
CREATE INDEX idx_campaigns_org ON campaigns(org_id);
CREATE INDEX idx_ad_groups_campaign ON ad_groups(campaign_id);
CREATE INDEX idx_keywords_ad_group ON keywords(ad_group_id);
CREATE INDEX idx_ads_ad_group ON ads(ad_group_id);
CREATE INDEX idx_landing_pages_org ON landing_pages(org_id);
CREATE INDEX idx_alerts_org ON alerts(org_id);
CREATE INDEX idx_reports_org ON reports(org_id);
CREATE INDEX idx_client_messages_org ON client_messages(org_id);
CREATE INDEX idx_audit_logs_org ON audit_logs(org_id);
CREATE INDEX idx_agent_runs_org ON agent_runs(org_id);
CREATE INDEX idx_agent_errors_run ON agent_errors(run_id);
CREATE INDEX idx_human_review_org ON human_review_queue(org_id);

-- Composite indexes (org_id, created_at)
CREATE INDEX idx_documents_org_created ON documents(org_id, created_at);
CREATE INDEX idx_campaigns_org_created ON campaigns(org_id, created_at);
CREATE INDEX idx_alerts_org_created ON alerts(org_id, created_at);
CREATE INDEX idx_audit_logs_org_created ON audit_logs(org_id, created_at);
CREATE INDEX idx_agent_runs_org_created ON agent_runs(org_id, created_at);
CREATE INDEX idx_human_review_org_created ON human_review_queue(org_id, created_at);
CREATE INDEX idx_client_messages_org_created ON client_messages(org_id, created_at);

-- Status + created_at indexes (for queue/monitor pages)
CREATE INDEX idx_human_review_status ON human_review_queue(status, created_at);
CREATE INDEX idx_agent_runs_status ON agent_runs(status, created_at);
CREATE INDEX idx_alerts_severity ON alerts(severity, created_at);
CREATE INDEX idx_alerts_unresolved ON alerts(is_resolved, created_at) WHERE is_resolved = false;

-- ============================================
-- UPDATED_AT TRIGGER
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOR tbl IN
    SELECT unnest(ARRAY[
      'organizations','users','operator_assignments','organization_profiles',
      'organization_knowledge_profiles','documents','verification_cases',
      'website_scans','grant_applications','google_connections',
      'google_ads_accounts','campaign_strategies','campaign_drafts',
      'campaigns','ad_groups','keywords','ads','landing_pages',
      'conversion_goals','policy_rules','automation_settings',
      'human_review_queue','alerts','reports','client_tasks',
      'internal_tasks','billing_accounts','subscriptions'
    ])
  LOOP
    EXECUTE format(
      'CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      tbl
    );
  END LOOP;
END $$;
