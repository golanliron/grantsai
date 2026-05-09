// Mock data for development — replace with real API calls in production

import type {
  RiskLevel, AlertSeverity, AgentStatus, OrgStage, AutomationMode,
} from '@/types';

export interface MockOrg {
  id: string;
  name: string;
  site: string;
  vertical: string;
  stage: OrgStage;
  risk: RiskLevel;
  automation_mode: AutomationMode;
  budget_used: number;
  operator: string;
}

export interface MockReviewItem {
  id: string;
  org: string;
  agent: string;
  risk: RiskLevel;
  confidence: number;
  title: string;
  problem: string;
  recommendation: string;
  if_approved: string;
  if_rejected: string;
  rollback: boolean;
  rollback_id?: string;
  client_msg: string | null;
  actions: string[];
  created_at: string;
}

export interface MockAgentRun {
  id: string;
  agent: string;
  org: string;
  status: AgentStatus;
  confidence: number | null;
  steps: number;
  errors: number;
  duration: string;
  review_id: string | null;
}

export interface MockAlert {
  id: string;
  org: string;
  sev: AlertSeverity;
  title: string;
  body: string;
}

export const ORGS: MockOrg[] = [
  { id: "org_hopa",   name: "הופה",       site: "hopa.org.il",     vertical: "youth_at_risk",    stage: "active",          risk: "medium",   automation_mode: "approval_required", budget_used: 7200,  operator: "שרון" },
  { id: "org_alumot", name: "אלומות",     site: "alumot.org.il",   vertical: "social_inclusion", stage: "verification",    risk: "low",      automation_mode: "draft_only",        budget_used: 0,     operator: "שרון" },
  { id: "org_lev",    name: "לב לב",      site: "levlev.org.il",   vertical: "elderly",          stage: "suspended",       risk: "critical", automation_mode: "draft_only",        budget_used: 0,     operator: "דנה" },
  { id: "org_ohr",    name: "אור לכולם",  site: "ohrlkulam.co.il", vertical: "education",        stage: "website_fix",     risk: "medium",   automation_mode: "draft_only",        budget_used: 0,     operator: "דנה" },
  { id: "org_yad",    name: "יד עוזרת",   site: "yadozeret.org.il", vertical: "food_security",   stage: "campaign_review", risk: "low",      automation_mode: "approval_required", budget_used: 0,     operator: "שרון" },
];

export const REVIEW_QUEUE: MockReviewItem[] = [
  {
    id: "rv_001", org: "לב לב", agent: "recovery_agent",
    risk: "critical", confidence: 0.52,
    title: "חשבון מושעה — נדרשת פעולה ידנית",
    problem: "CTR נמוך 2 חודשים רצופים — 3.1% ו-3.8%. גוגל השעתה.",
    recommendation: "פנייה ל-Google Support + החלפת Landing Pages + הסרת keywords גנריים.",
    if_approved: "פנייה תישלח. Landing pages יוחלפו. Snapshot ייצור.",
    if_rejected: "החשבון יישאר מושעה.",
    rollback: false, client_msg: "אנחנו מטפלים בבעיה טכנית. הכל יחזור לפעולה בימים הקרובים.",
    actions: ["approve", "reject", "edit", "escalate"],
    created_at: "2026-05-09T08:30:00Z",
  },
  {
    id: "rv_002", org: "הופה", agent: "optimization_agent",
    risk: "medium", confidence: 0.74,
    title: "השהיית 3 מילות מפתח — CTR < 2%",
    problem: "מילות מפתח עם CTR 1.2%–1.8% — מורידות ממוצע חשבון.",
    recommendation: "Pause מיידי. CTR צפוי לעלות ל-5.4%.",
    if_approved: "3 keywords ל-Paused. Rollback snapshot ייצור.",
    if_rejected: "Keywords נשארות. CTR ממשיך לרדת.",
    rollback: true, rollback_id: "snap_hopa_001", client_msg: null,
    actions: ["approve", "reject", "edit", "rollback"],
    created_at: "2026-05-09T07:15:00Z",
  },
  {
    id: "rv_003", org: "יד עוזרת", agent: "campaign_strategy_agent",
    risk: "low", confidence: 0.88,
    title: "קמפיין ראשון מוכן לאישור",
    problem: "3 Ad Groups, 14 keywords, 6 מודעות. Policy check עבר.",
    recommendation: "אשר ופרסם. Confidence מעל לסף.",
    if_approved: "קמפיין עולה לגוגל. $10,000/חודש מתחיל.",
    if_rejected: "נשאר ב-Draft.",
    rollback: true, rollback_id: "snap_yad_001", client_msg: "הקמפיין שלכם מוכן! תתחילו לראות תוצאות בקרוב.",
    actions: ["approve", "reject", "edit", "retry"],
    created_at: "2026-05-08T16:00:00Z",
  },
];

export const AGENT_RUNS: MockAgentRun[] = [
  { id: "run_001", agent: "monitoring_agent",        org: "הופה",      status: "human_review", confidence: 0.74, steps: 7,  errors: 0, duration: "3:12",  review_id: "rv_002" },
  { id: "run_002", agent: "recovery_agent",          org: "לב לב",     status: "human_review", confidence: 0.52, steps: 12, errors: 1, duration: "6:00",  review_id: "rv_001" },
  { id: "run_003", agent: "campaign_strategy_agent", org: "יד עוזרת",  status: "human_review", confidence: 0.88, steps: 24, errors: 0, duration: "28:00", review_id: "rv_003" },
  { id: "run_004", agent: "website_audit_agent",     org: "אור לכולם", status: "completed",    confidence: 0.97, steps: 18, errors: 0, duration: "4:30",  review_id: null },
  { id: "run_005", agent: "org_intelligence_agent",  org: "אלומות",    status: "completed",    confidence: 0.89, steps: 31, errors: 0, duration: "9:00",  review_id: null },
  { id: "run_006", agent: "failure_agent",           org: "לב לב",     status: "failed",       confidence: null, steps: 2,  errors: 1, duration: "0:45",  review_id: null },
];

export const ALERTS: MockAlert[] = [
  { id: "a1", org: "לב לב",    sev: "critical", title: "חשבון מושעה",   body: "CTR נכשל 2 חודשים. Google השעתה." },
  { id: "a2", org: "הופה",      sev: "high",     title: "CTR קרוב לסף", body: "4.8% — חודש 1 מתוך 2." },
  { id: "a3", org: "אור לכולם", sev: "medium",   title: "5 חסמי אתר",   body: "Privacy, Volunteer, Thank You, GTM, Conversions." },
  { id: "a4", org: "אלומות",    sev: "medium",   title: "2 מסמכים חסרים", body: "אישור ניהול תקין + דוח כספי." },
];

export const POLICY = {
  ctr_threshold_monthly: 0.05,
  ctr_grace_months: 2,
  grants_monthly_budget_usd: 10000,
  cpc_limit_manual_usd: null as number | null,
  last_sync: "2026-05-09T06:00:00Z",
};

export const CLIENT_VIEW = {
  status: "good" as const,
  headline: "הפרסום שלכם פעיל ועובד",
  subline: "הכל תקין. אנחנו עוקבים ומשפרים כל הזמן.",
  stats: [
    { label: "חשיפות החודש", value: "11,240" },
    { label: "קליקים", value: "542" },
    { label: "פניות", value: "31" },
    { label: "מתנדבים חדשים", value: "4" },
  ],
  tasks: [] as { id: string; title: string; description?: string; is_completed: boolean }[],
  timeline: [
    { date: "01/05/2026", text: "הקמפיין שלכם עודכן", type: "good" as const },
    { date: "28/04/2026", text: "דוח חודשי נשלח", type: "info" as const },
    { date: "10/03/2026", text: "הפרסום הופעל לראשונה", type: "milestone" as const },
  ],
};
