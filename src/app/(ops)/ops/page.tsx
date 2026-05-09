import { OpsCard } from '@/components/ui/OpsCard';
import { OrgTable } from '@/components/ops/OrgTable';
import { ORGS, REVIEW_QUEUE, ALERTS, AGENT_RUNS } from '@/data/mock';

export default function OpsDashboard() {
  const criticalAlerts = ALERTS.filter((a) => a.sev === 'critical' || a.sev === 'high');
  const agentRunsToday = AGENT_RUNS.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-primary">דשבורד</h1>
        <p className="text-muted-foreground mt-1">סקירה כללית של כל הארגונים</p>
      </div>

      {/* Critical alerts strip */}
      {criticalAlerts.length > 0 && (
        <div className="space-y-2">
          {criticalAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl px-5 py-4 text-sm font-bold flex items-center gap-3 ${
                alert.sev === 'critical'
                  ? 'bg-red-50 text-red-800 border border-red-200'
                  : 'bg-coral/10 text-coral border border-coral/20'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${
                alert.sev === 'critical' ? 'bg-red-500' : 'bg-coral'
              }`} />
              <span className="font-extrabold">{alert.org}</span> — {alert.title}: {alert.body}
            </div>
          ))}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <OpsCard title="ארגונים" value={ORGS.length} accent="primary" />
        <OpsCard title="ממתין לאישור" value={REVIEW_QUEUE.length} subtitle="פריטים בתור" accent="coral" />
        <OpsCard title="התראות קריטיות" value={criticalAlerts.length} accent="coral" />
        <OpsCard title="ריצות סוכנים" value={agentRunsToday} subtitle="היום" accent="success" />
      </div>

      {/* Organization table */}
      <div>
        <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em] mb-4">ארגונים</h2>
        <OrgTable orgs={ORGS} />
      </div>
    </div>
  );
}
