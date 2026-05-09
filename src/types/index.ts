// GrantsAI — TypeScript Interfaces

// ============================================
// ENUMS
// ============================================

export type OrgStage =
  | 'signup' | 'verification' | 'google_np' | 'grants'
  | 'website_scan' | 'website_fix' | 'campaign_draft'
  | 'campaign_review' | 'active' | 'suspended' | 'churned';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export type AutomationMode = 'draft_only' | 'approval_required' | 'full_auto';

export type ReviewStatus = 'pending' | 'approved' | 'rejected' | 'escalated';

export type AgentStatus = 'running' | 'completed' | 'human_review' | 'failed';

export type DocStatus = 'needed' | 'uploaded' | 'approved' | 'rejected' | 'expired';

export type CheckStatus = 'pass' | 'warning' | 'fail';

export type CampaignStatus = 'draft' | 'pending_approval' | 'active' | 'paused' | 'archived';

export type AlertSeverity = 'info' | 'low' | 'medium' | 'high' | 'critical';

export type VerificationProvider = 'goodstack' | 'techsoup' | 'manual' | 'unknown';

export type UserRole = 'ops' | 'client';

// ============================================
// CORE
// ============================================

export interface Organization {
  id: string;
  name: string;
  site?: string;
  vertical?: string;
  stage: OrgStage;
  risk: RiskLevel;
  automation_mode: AutomationMode;
  guidestar_id?: string;
  amuta_number?: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  auth_id?: string;
  email: string;
  name?: string;
  role: UserRole;
  org_id?: string;
  created_at: string;
  updated_at: string;
}

export interface OperatorAssignment {
  id: string;
  org_id: string;
  user_id: string;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// ORGANIZATION PROFILES
// ============================================

export interface OrganizationProfile {
  id: string;
  org_id: string;
  description?: string;
  contact_name?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  founded_year?: number;
  employee_count?: number;
  annual_budget_ils?: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationKnowledgeProfile {
  id: string;
  org_id: string;
  confidence?: number;
  sources_used?: string[];
  mission?: string;
  target_audience?: Record<string, unknown>;
  services?: string[];
  tone?: string;
  key_messages?: string[];
  forbidden_words?: string[];
  conversion_goals?: string[];
  seasonality?: Record<string, unknown>;
  annual_budget_ils?: number;
  staff_count?: number;
  ai_invented: boolean;
  review_required: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// DOCUMENTS & VERIFICATION
// ============================================

export interface Document {
  id: string;
  org_id: string;
  name: string;
  type: string;
  status: DocStatus;
  file_url?: string;
  expires_at?: string;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface VerificationCase {
  id: string;
  org_id: string;
  provider: VerificationProvider;
  status: string;
  submitted_at?: string;
  approved_at?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// WEBSITE SCANS
// ============================================

export interface WebsiteScan {
  id: string;
  org_id: string;
  url: string;
  score?: number;
  total_checks: number;
  passed_checks: number;
  failed_checks: number;
  blockers_count: number;
  scanned_at: string;
  created_at: string;
  updated_at: string;
}

export interface WebsiteScanIssue {
  id: string;
  scan_id: string;
  category: 'security' | 'legal' | 'content' | 'conversion' | 'technical';
  check_name: string;
  status: CheckStatus;
  is_blocker: boolean;
  fix_available: boolean;
  fix_type?: string;
  detail?: string;
  created_at: string;
}

// ============================================
// CAMPAIGNS
// ============================================

export interface CampaignStrategy {
  id: string;
  org_id: string;
  version: number;
  strategy: Record<string, unknown>;
  confidence?: number;
  policy_check_passed?: boolean;
  policy_issues?: Record<string, unknown>;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CampaignDraft {
  id: string;
  org_id: string;
  strategy_id?: string;
  name: string;
  status: CampaignStatus;
  ad_groups?: Record<string, unknown>;
  keywords?: Record<string, unknown>;
  negative_keywords?: Record<string, unknown>;
  ads?: Record<string, unknown>;
  sitelinks?: Record<string, unknown>;
  callouts?: Record<string, unknown>;
  estimated_impressions?: number;
  estimated_clicks?: number;
  estimated_conversions?: number;
  created_at: string;
  updated_at: string;
}

export interface Campaign {
  id: string;
  org_id: string;
  draft_id?: string;
  google_campaign_id?: string;
  name: string;
  status: CampaignStatus;
  created_at: string;
  updated_at: string;
}

export interface AdGroup {
  id: string;
  campaign_id: string;
  org_id: string;
  google_ad_group_id?: string;
  name: string;
  status: string;
  budget_allocation?: number;
  created_at: string;
  updated_at: string;
}

export interface Keyword {
  id: string;
  ad_group_id: string;
  org_id: string;
  text: string;
  match_type: 'broad' | 'phrase' | 'exact';
  is_negative: boolean;
  status: string;
  ctr?: number;
  impressions: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface Ad {
  id: string;
  ad_group_id: string;
  org_id: string;
  google_ad_id?: string;
  headline1?: string;
  headline2?: string;
  headline3?: string;
  description1?: string;
  description2?: string;
  final_url?: string;
  status: string;
  disapproved: boolean;
  disapproval_reason?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// POLICY
// ============================================

export interface PolicyRule {
  id: string;
  key: string;
  value: string;
  description?: string;
  source?: string;
  last_synced_at?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// HUMAN REVIEW QUEUE
// ============================================

export interface RollbackSnapshot {
  id: string;
  org_id: string;
  reason?: string;
  snapshot_data: Record<string, unknown>;
  campaigns_count: number;
  keywords_count: number;
  is_restorable: boolean;
  used_at?: string;
  created_at: string;
}

export interface HumanReviewItem {
  id: string;
  org_id: string;
  agent: string;
  status: ReviewStatus;
  risk_level: RiskLevel;
  confidence?: number;
  title: string;
  problem: string;
  recommendation: string;
  if_approved: string;
  if_rejected: string;
  rollback_snapshot_id?: string;
  client_message?: string;
  actions: string[];
  resolved_by?: string;
  resolved_at?: string;
  resolution_note?: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// ALERTS & AUDIT
// ============================================

export interface Alert {
  id: string;
  org_id: string;
  severity: AlertSeverity;
  title: string;
  body?: string;
  is_resolved: boolean;
  resolved_by?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  org_id?: string;
  actor: string;
  action: string;
  severity: AlertSeverity;
  detail?: string;
  rollback_snapshot_id?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

// ============================================
// AGENTS
// ============================================

export interface AgentRun {
  id: string;
  org_id: string;
  agent: string;
  status: AgentStatus;
  confidence?: number;
  steps: number;
  errors_count: number;
  duration_seconds?: number;
  review_id?: string;
  result?: Record<string, unknown>;
  started_at: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AgentError {
  id: string;
  run_id: string;
  org_id: string;
  error_type?: string;
  message?: string;
  stack?: string;
  created_at: string;
}

// ============================================
// CLIENT VIEW (safe — no technical details)
// ============================================

export interface ClientStatus {
  status: 'good' | 'attention' | 'action_required';
  headline: string;
  subline: string;
}

export interface ClientStat {
  label: string;
  value: string;
}

export interface ClientTask {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
}

export interface ClientTimelineEvent {
  date: string;
  text: string;
  type: 'good' | 'info' | 'milestone' | 'attention';
}

export interface ClientDashboard {
  status: ClientStatus;
  stats: ClientStat[];
  tasks: ClientTask[];
  timeline: ClientTimelineEvent[];
}
