import { Badge } from '@/components/ui/Badge';
import type { MockOrg } from '@/data/mock';

export function OrgTable({ orgs }: { orgs: MockOrg[] }) {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">ארגון</th>
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">תחום</th>
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">שלב</th>
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">סיכון</th>
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">תקציב</th>
            <th className="text-right px-5 py-3 text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em]">מפעיל</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/50">
          {orgs.map((org) => (
            <tr key={org.id} className="hover:bg-muted/30 transition-colors cursor-pointer">
              <td className="px-5 py-4">
                <div>
                  <p className="font-extrabold text-foreground">{org.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{org.site}</p>
                </div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">{org.vertical.replace(/_/g, ' ')}</td>
              <td className="px-5 py-4"><Badge variant="stage" value={org.stage} dot /></td>
              <td className="px-5 py-4"><Badge variant="risk" value={org.risk} /></td>
              <td className="px-5 py-4">
                <div>
                  <span className="font-extrabold text-foreground" dir="ltr">${org.budget_used.toLocaleString()}</span>
                  <span className="text-muted-foreground text-xs"> / $10,000</span>
                  <div className="mt-1.5 h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-coral" style={{ width: `${(org.budget_used / 10000) * 100}%` }} />
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-muted-foreground">{org.operator}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
