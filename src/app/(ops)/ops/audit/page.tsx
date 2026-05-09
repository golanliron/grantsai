const MOCK_LOGS = [
  { id: '1', time: '09:32', org: 'הופה', actor: 'optimization_agent', action: 'pause_keyword', severity: 'medium', detail: 'השהיית מילת מפתח "עזרה לנוער" — CTR 1.2%' },
  { id: '2', time: '09:30', org: 'הופה', actor: 'monitoring_agent', action: 'ctr_check', severity: 'info', detail: 'בדיקת CTR חודשית — 4.8%, חודש 1 מתוך 2' },
  { id: '3', time: '08:45', org: 'לב לב', actor: 'recovery_agent', action: 'suspension_detected', severity: 'critical', detail: 'חשבון מושעה — CTR נמוך 2 חודשים רצופים' },
  { id: '4', time: '08:30', org: 'יד עוזרת', actor: 'campaign_strategy_agent', action: 'draft_created', severity: 'info', detail: 'טיוטת קמפיין נוצרה — 3 Ad Groups, 14 keywords' },
  { id: '5', time: '07:15', org: 'אור לכולם', actor: 'website_audit_agent', action: 'scan_completed', severity: 'low', detail: 'סריקת אתר הושלמה — ציון 72/100, 5 חסמים' },
  { id: '6', time: '07:00', org: 'אלומות', actor: 'ops@granta.co.il', action: 'document_approved', severity: 'info', detail: 'אישור ניהול תקין — מסמך אושר ידנית' },
];

const SEV_COLORS: Record<string, string> = {
  info: 'bg-primary/10 text-primary',
  low: 'bg-success/15 text-success',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-coral/15 text-coral',
  critical: 'bg-red-100 text-red-700',
};

export default function AuditLogPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-primary">לוג פעולות</h1>
        <p className="text-muted-foreground mt-1">כל הפעולות במערכת — immutable</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">שעה</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">ארגון</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">שחקן</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">פעולה</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">חומרה</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">פירוט</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{log.time}</td>
                <td className="px-5 py-4 font-bold text-foreground">{log.org}</td>
                <td className="px-5 py-4">
                  <span className="text-[10px] font-extrabold tracking-[0.1em] uppercase text-coral">
                    {log.actor.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="px-5 py-4 font-mono text-xs text-foreground">{log.action}</td>
                <td className="px-5 py-4">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold ${SEV_COLORS[log.severity] || ''}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {log.severity}
                  </span>
                </td>
                <td className="px-5 py-4 text-sm text-muted-foreground max-w-xs">{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
