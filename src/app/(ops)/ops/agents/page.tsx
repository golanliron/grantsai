import { AgentRunRow } from '@/components/ops/AgentRunRow';
import { AGENT_RUNS } from '@/data/mock';

export default function AgentRunsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-display font-bold text-primary">סוכנים</h1>
        <p className="text-muted-foreground mt-1">מוניטור ריצות AI בזמן אמת</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">סוכן</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">ארגון</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">סטטוס</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">ביטחון</th>
              <th className="text-center px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">צעדים</th>
              <th className="text-center px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">שגיאות</th>
              <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">משך</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {AGENT_RUNS.map((run) => (
              <AgentRunRow key={run.id} run={run} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
