import { Badge } from '@/components/ui/Badge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import type { MockAgentRun } from '@/data/mock';

const STATUS_LABELS: Record<string, string> = {
  running: 'פעיל',
  completed: 'הושלם',
  human_review: 'ממתין',
  failed: 'נכשל',
};

export function AgentRunRow({ run }: { run: MockAgentRun }) {
  return (
    <tr className="hover:bg-muted/30 transition-colors">
      <td className="px-5 py-4">
        <span className="text-[10px] font-extrabold tracking-[0.1em] uppercase text-coral">{run.agent.replace(/_/g, ' ')}</span>
      </td>
      <td className="px-5 py-4 text-sm font-bold text-foreground">{run.org}</td>
      <td className="px-5 py-4">
        <Badge variant="status" value={run.status} label={STATUS_LABELS[run.status]} dot />
      </td>
      <td className="px-5 py-4">
        <ConfidenceBar value={run.confidence} />
      </td>
      <td className="px-5 py-4 text-sm text-foreground text-center font-bold">{run.steps}</td>
      <td className="px-5 py-4 text-sm text-center">
        {run.errors > 0 ? (
          <span className="text-destructive font-extrabold">{run.errors}</span>
        ) : (
          <span className="text-muted-foreground">0</span>
        )}
      </td>
      <td className="px-5 py-4 text-sm font-mono text-muted-foreground">{run.duration}</td>
    </tr>
  );
}
