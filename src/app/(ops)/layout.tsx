import Link from 'next/link';

const NAV_ITEMS = [
  { href: '/ops', label: 'דשבורד', icon: '⊞' },
  { href: '/ops/review', label: 'תור אישורים', icon: '⚑' },
  { href: '/ops/agents', label: 'סוכנים', icon: '⚙' },
  { href: '/ops/alerts', label: 'התראות', icon: '▲' },
  { href: '/ops/audit', label: 'לוג פעולות', icon: '☰' },
];

export default function OpsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-60 bg-primary text-primary-foreground flex flex-col shrink-0">
        <div className="px-6 py-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-coral" />
            <h1 className="text-2xl font-display font-bold tracking-tight">גרנטה</h1>
          </div>
          <p className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-coral mt-1">Ops Dashboard</p>
        </div>
        <nav className="flex-1 py-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <span className="text-base opacity-50">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40">
          ops@granta.co.il
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
