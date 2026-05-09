export function OpsCard({
  title,
  value,
  subtitle,
  accent,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  accent?: 'coral' | 'amber' | 'success' | 'primary';
}) {
  const dotColors = {
    coral: 'bg-coral',
    amber: 'bg-amber-500',
    success: 'bg-success',
    primary: 'bg-primary',
  };

  return (
    <div className="glass rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-soft hover:border-primary/40">
      <div className="flex items-center gap-2 text-muted-foreground text-xs font-bold">
        {accent && <span className={`w-2 h-2 rounded-full ${dotColors[accent]}`} />}
        {title}
      </div>
      <div className="mt-3 text-3xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>
        {value}
      </div>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
