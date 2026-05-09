'use client';

import { useState } from 'react';

const STEPS = [
  {
    id: 'info',
    title: 'פרטי העמותה',
    subtitle: 'ספרו לנו קצת על העמותה',
  },
  {
    id: 'google',
    title: 'חיבור ל-Google',
    subtitle: 'חיבור מאובטח לחשבון Google Ads',
  },
  {
    id: 'scanning',
    title: 'סורקים את החשבון',
    subtitle: 'גרנטה בודקת קמפיינים, CTR, מילות מפתח',
  },
  {
    id: 'results',
    title: 'תוצאות הסריקה',
    subtitle: 'הנה מה שמצאנו — ומה אנחנו הולכים לתקן',
  },
  {
    id: 'active',
    title: 'גרנטה עובדת!',
    subtitle: 'החשבון מחובר. אנחנו עוקבים ומשפרים.',
  },
];

// Mock scan results for Hopa
const SCAN_RESULTS = {
  account: 'הופה — hopa.org.il',
  customerId: '123-456-7890',
  campaigns: 3,
  keywords: 47,
  monthlyBudget: '$10,000',
  ctr: '4.8%',
  issues: [
    { type: 'warning', text: 'CTR 4.8% — קרוב לסף המינימום (5%)', fix: 'הסרת 3 מילות מפתח גנריות' },
    { type: 'error', text: '2 Landing Pages עם טעינה איטית (>3 שניות)', fix: 'אופטימיזציה אוטומטית' },
    { type: 'warning', text: '5 מילות מפתח עם CTR מתחת ל-2%', fix: 'החלפה במילים ממוקדות יותר' },
    { type: 'success', text: 'SSL תקין ✓' },
    { type: 'success', text: 'Privacy Policy קיים ✓' },
    { type: 'success', text: 'Conversion Tracking פעיל ✓' },
  ],
};

export default function ConnectFlowPage() {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState('הופה');
  const [orgSite, setOrgSite] = useState('hopa.org.il');
  const [scanning, setScanning] = useState(false);
  const current = STEPS[step];

  function handleConnect() {
    setStep(2);
    setScanning(true);
    // Simulate scanning
    setTimeout(() => {
      setScanning(false);
      setStep(3);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <span className="text-xl font-display font-bold text-primary">גרנטה</span>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-coral">מסלול 1 — חיבור חשבון קיים</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-coral' : 'bg-muted'}`} />
            ))}
          </div>

          {/* Step content */}
          <div className="glass rounded-3xl p-8 md:p-10 shadow-pop">
            <span className="inline-block text-[10px] font-extrabold tracking-[0.22em] uppercase text-coral mb-2">
              שלב {step + 1} מתוך {STEPS.length}
            </span>
            <h1 className="text-3xl font-display font-bold text-primary">{current.title}</h1>
            <p className="text-muted-foreground mt-1 mb-6">{current.subtitle}</p>

            {/* Step 0: Org info */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">שם העמותה</label>
                  <input
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-coral focus:border-coral outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">כתובת אתר</label>
                  <input
                    value={orgSite}
                    onChange={(e) => setOrgSite(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-coral focus:border-coral outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">מספר עמותה</label>
                  <input
                    defaultValue="580654094"
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-coral focus:border-coral outline-none"
                    dir="ltr"
                  />
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="w-full mt-2 py-3.5 bg-coral text-coral-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]"
                >
                  המשך ←
                </button>
              </div>
            )}

            {/* Step 1: Google connect */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center mb-4">
                    <span className="text-3xl">G</span>
                  </div>
                  <p className="text-sm text-foreground font-bold mb-1">חיבור לחשבון Google Ads</p>
                  <p className="text-xs text-muted-foreground">גרנטה תקבל גישה לקריאה ולניהול הקמפיינים שלכם</p>
                </div>
                <div className="space-y-2">
                  {['קריאת ביצועי קמפיינים', 'ניהול מודעות ומילות מפתח', 'מעקב CTR ותקציב'].map((scope) => (
                    <div key={scope} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      {scope}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleConnect}
                  className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]"
                >
                  התחבר עם Google ←
                </button>
              </div>
            )}

            {/* Step 2: Scanning */}
            {step === 2 && scanning && (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto flex items-center justify-center mb-4">
                  <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
                </div>
                <p className="font-extrabold text-foreground">סורקים את חשבון ה-Google Ads...</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p className="animate-pulse">בודקים קמפיינים...</p>
                  <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>מנתחים מילות מפתח...</p>
                  <p className="animate-pulse" style={{ animationDelay: '1s' }}>בודקים CTR ודפי נחיתה...</p>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {step === 3 && (
              <div className="space-y-6">
                {/* Account summary */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'קמפיינים', value: SCAN_RESULTS.campaigns },
                    { label: 'מילות מפתח', value: SCAN_RESULTS.keywords },
                    { label: 'CTR', value: SCAN_RESULTS.ctr },
                  ].map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-muted/50 p-4 text-center">
                      <div className="text-2xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>{stat.value}</div>
                      <div className="text-xs text-muted-foreground font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Issues found */}
                <div className="space-y-2">
                  {SCAN_RESULTS.issues.map((issue, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl px-5 py-4 flex items-start gap-3 ${
                        issue.type === 'error' ? 'bg-red-50 border border-red-200' :
                        issue.type === 'warning' ? 'bg-amber-50 border border-amber-200' :
                        'bg-success/10 border border-success/20'
                      }`}
                    >
                      <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        issue.type === 'error' ? 'bg-red-500' :
                        issue.type === 'warning' ? 'bg-amber-500' :
                        'bg-success'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-foreground">{issue.text}</p>
                        {issue.fix && <p className="text-xs text-muted-foreground mt-0.5">תיקון: {issue.fix}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl bg-primary text-primary-foreground p-5">
                  <p className="text-xs font-extrabold tracking-[0.18em] uppercase opacity-70">סיכום</p>
                  <p className="mt-1 font-extrabold">מצאנו 3 בעיות שגרנטה יכולה לתקן אוטומטית. אחרי התיקון CTR צפוי לעלות ל-5.4%.</p>
                </div>

                <button
                  onClick={() => setStep(4)}
                  className="w-full py-3.5 bg-coral text-coral-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98] shadow-pop"
                >
                  תתחילו לתקן ←
                </button>
              </div>
            )}

            {/* Step 4: Active */}
            {step === 4 && (
              <div className="text-center py-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-5 py-2.5 text-sm font-extrabold mb-6">
                  <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                  פעיל ועובד
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-2">
                  {orgName} מחוברת לגרנטה
                </h2>
                <p className="text-muted-foreground mb-8">
                  אנחנו כבר עובדים על התיקונים. תקבלו עדכון תוך 24 שעות.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>3</div>
                    <div className="text-xs text-muted-foreground font-bold">תיקונים בתהליך</div>
                  </div>
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>24/7</div>
                    <div className="text-xs text-muted-foreground font-bold">ניטור אוטומטי</div>
                  </div>
                </div>

                <a
                  href="/portal"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]"
                >
                  כניסה לפורטל שלכם ←
                </a>
              </div>
            )}
          </div>

          {/* Back button */}
          {step > 0 && step < 4 && !scanning && (
            <button
              onClick={() => setStep(step - 1)}
              className="mt-4 text-sm font-extrabold text-muted-foreground hover:text-foreground transition"
            >
              → חזרה
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
