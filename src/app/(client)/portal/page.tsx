import { CLIENT_VIEW } from '@/data/mock';

export default function ClientDashboard() {
  const { headline, subline, stats, tasks, timeline } = CLIENT_VIEW;

  return (
    <div className="space-y-8">
      {/* Hero status */}
      <div className="glass rounded-3xl p-8 text-center transition hover:border-primary/40 hover:shadow-soft">
        <div className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-4 py-2 text-sm font-extrabold mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
          פעיל
        </div>
        <h1 className="text-3xl font-display font-bold text-primary">{headline}</h1>
        <p className="mt-2 text-muted-foreground">{subline}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass rounded-2xl p-5 text-center transition hover:-translate-y-1 hover:border-primary/40 hover:shadow-soft">
            <div className="text-3xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>{stat.value}</div>
            <div className="text-xs text-muted-foreground mt-1 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div>
        <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em] mb-3">משימות</h2>
        {tasks.length === 0 ? (
          <div className="glass rounded-2xl px-6 py-8 text-center">
            <div className="w-10 h-10 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center mb-2">
              <span className="text-lg">✓</span>
            </div>
            <p className="text-muted-foreground text-sm font-bold">אין צורך בפעולה מצדכם</p>
          </div>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="glass rounded-2xl px-5 py-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-coral" />
                <span className="text-sm font-bold text-foreground">{task.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Timeline */}
      <div>
        <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em] mb-3">פעילות אחרונה</h2>
        <div className="glass rounded-2xl overflow-hidden divide-y divide-border/50">
          {timeline.map((event, i) => {
            const dotColor = event.type === 'good' ? 'bg-success' : event.type === 'milestone' ? 'bg-coral' : 'bg-primary';
            return (
              <div key={i} className="px-5 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColor}`} />
                <div className="flex-1">
                  <p className="text-sm font-bold text-foreground">{event.text}</p>
                </div>
                <span className="text-xs text-muted-foreground font-mono">{event.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
