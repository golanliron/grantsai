import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6" dir="rtl">
      <div className="text-center max-w-2xl">
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
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-extrabold tracking-[0.15em] uppercase transition hover:brightness-110 active:scale-[0.98]"
          >
            כניסה למערכת
            <span>←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
