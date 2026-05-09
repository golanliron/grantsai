import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6" dir="rtl">
      <div className="text-center max-w-3xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-3 h-3 rounded-full bg-coral" />
          <span className="text-5xl font-display font-bold text-primary">גרנטה</span>
        </div>
        <span className="inline-block text-[10px] font-extrabold tracking-[0.22em] uppercase text-coral mb-6 border border-coral/40 rounded-full px-3 py-1">
          Operating System ל-Google Grants
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-[0.95]">
          Google Grants.
          <br />
          <span className="text-coral">בלי איש קמפיינים.</span>
        </h1>
        <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
          גרנטה מגישה, בונה, מתקנת ומנהלת את כל ה-Google Grants של העמותה שלכם.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">בחירת מסלול לפי המצב שלכם:</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-xl mx-auto">
          <Link
            href="/start/connect"
            className="group glass rounded-3xl p-6 text-center hover:-translate-y-1 hover:border-coral/40 hover:shadow-pop transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-coral/15 text-coral mx-auto flex items-center justify-center mb-3">
              <span className="text-xl">🔗</span>
            </div>
            <h3 className="text-lg font-extrabold text-foreground">יש לי Google Grants</h3>
            <p className="text-sm text-muted-foreground mt-1">חיבור חשבון קיים + אופטימיזציה</p>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-coral mt-3 tracking-[0.15em] uppercase">
              לחבר חשבון <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </span>
          </Link>
          <Link
            href="/start/new"
            className="group glass rounded-3xl p-6 text-center hover:-translate-y-1 hover:border-primary/40 hover:shadow-pop transition"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-3">
              <span className="text-xl">✨</span>
            </div>
            <h3 className="text-lg font-extrabold text-foreground">אין לי Google Grants</h3>
            <p className="text-sm text-muted-foreground mt-1">הגשה, אישור, בנייה — מאפס</p>
            <span className="inline-flex items-center gap-1 text-xs font-extrabold text-primary mt-3 tracking-[0.15em] uppercase">
              להתחיל מאפס <span className="group-hover:-translate-x-1 transition-transform">←</span>
            </span>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-muted-foreground">
          <Link href="/ops" className="hover:text-primary transition">דשבורד Ops →</Link>
          <Link href="/portal" className="hover:text-primary transition">פורטל לקוח →</Link>
        </div>
      </div>
    </div>
  );
}
