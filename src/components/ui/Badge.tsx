import type { RiskLevel, AlertSeverity, AgentStatus, OrgStage } from '@/types';

const RISK_COLORS: Record<RiskLevel, string> = {
  low: 'bg-success/15 text-success',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-coral/15 text-coral',
  critical: 'bg-red-100 text-red-700',
};

const SEVERITY_COLORS: Record<AlertSeverity, string> = {
  info: 'bg-primary/10 text-primary',
  low: 'bg-success/15 text-success',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-coral/15 text-coral',
  critical: 'bg-red-100 text-red-700',
};

const STATUS_COLORS: Record<AgentStatus, string> = {
  running: 'bg-primary/10 text-primary',
  completed: 'bg-success/15 text-success',
  human_review: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

const STAGE_COLORS: Record<OrgStage, string> = {
  signup: 'bg-muted text-muted-foreground',
  verification: 'bg-primary/10 text-primary',
  google_np: 'bg-primary/10 text-primary',
  grants: 'bg-primary/15 text-primary',
  website_scan: 'bg-purple-100 text-purple-700',
  website_fix: 'bg-amber-100 text-amber-700',
  campaign_draft: 'bg-primary/10 text-primary',
  campaign_review: 'bg-coral/15 text-coral',
  active: 'bg-success/15 text-success',
  suspended: 'bg-red-100 text-red-700',
  churned: 'bg-muted text-muted-foreground',
};

type BadgeProps = {
  variant: 'risk' | 'severity' | 'status' | 'stage';
  value: string;
  label?: string;
  dot?: boolean;
};

export function Badge({ variant, value, label, dot }: BadgeProps) {
  let colorClass = 'bg-muted text-muted-foreground';

  if (variant === 'risk') colorClass = RISK_COLORS[value as RiskLevel] || colorClass;
  else if (variant === 'severity') colorClass = SEVERITY_COLORS[value as AlertSeverity] || colorClass;
  else if (variant === 'status') colorClass = STATUS_COLORS[value as AgentStatus] || colorClass;
  else if (variant === 'stage') colorClass = STAGE_COLORS[value as OrgStage] || colorClass;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold ${colorClass}`}>
      {dot && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
      {label || value}
    </span>
  );
}
