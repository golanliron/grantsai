export function ConfidenceBar({ value }: { value: number | null }) {
  if (value === null) return <span className="text-xs text-muted-foreground">N/A</span>;

  const pct = Math.round(value * 100);
  let color = 'bg-destructive';
  if (value >= 0.85) color = 'bg-success';
  else if (value >= 0.6) color = 'bg-amber-500';

  return (
    <div className="flex items-center gap-2.5">
      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-extrabold text-foreground">{pct}%</span>
    </div>
  );
}
