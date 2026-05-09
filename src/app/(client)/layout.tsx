export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <h1 className="text-xl font-display font-bold text-primary">גרנטה</h1>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-coral">הפורטל שלכם</span>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}
