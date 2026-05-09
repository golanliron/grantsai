'use client';

import { useState, useEffect } from 'react';

const STEPS = [
  { id: 'info', title: 'פרטי העמותה', subtitle: 'ספרו לנו על העמותה שלכם' },
  { id: 'eligibility', title: 'בדיקת זכאות', subtitle: 'בודקים אם העמותה עומדת בתנאי Google' },
  { id: 'website', title: 'סריקת אתר', subtitle: 'בודקים שהאתר מוכן ל-Google Grants' },
  { id: 'fixes', title: 'תיקון בעיות', subtitle: 'מתקנים את מה שצריך — אוטומטית' },
  { id: 'apply', title: 'הגשה לגוגל', subtitle: 'מגישים את הבקשה ל-Google Ad Grants' },
  { id: 'campaigns', title: 'בניית קמפיינים', subtitle: 'גרנטה בונה קמפיינים מותאמים' },
  { id: 'live', title: 'אתם באוויר!', subtitle: '$10,000 בחודש מגוגל — עובד' },
];

const ELIGIBILITY_CHECKS = [
  { text: 'רשומה כעמותה (חל"צ)', passed: true },
  { text: 'אישור ניהול תקין', passed: true },
  { text: 'אתר פעיל עם תוכן', passed: true },
  { text: 'לא מוסד ממשלתי', passed: true },
  { text: 'לא בית חולים / בית ספר', passed: true },
];

const WEBSITE_CHECKS = [
  { text: 'SSL (HTTPS)', status: 'pass' },
  { text: 'Privacy Policy', status: 'fail', fix: 'גרנטה תיצור עמוד פרטיות' },
  { text: 'Mobile Responsive', status: 'pass' },
  { text: 'Thank You Page', status: 'fail', fix: 'גרנטה תיצור עמוד תודה' },
  { text: 'Conversion Tracking', status: 'fail', fix: 'התקנת Google Tag Manager' },
  { text: 'טעינה מהירה (<3s)', status: 'pass' },
  { text: 'דף מתנדבים', status: 'warning', fix: 'מומלץ — גרנטה תיצור' },
  { text: 'CTA ברור', status: 'pass' },
];

const CAMPAIGN_PREVIEW = [
  { name: 'תרומה לעמותה', keywords: 8, ads: 3 },
  { name: 'התנדבות', keywords: 6, ads: 2 },
  { name: 'פעילות קהילתית', keywords: 5, ads: 2 },
];

export default function NewFlowPage() {
  const [step, setStep] = useState(0);
  const [orgName, setOrgName] = useState('');
  const [orgSite, setOrgSite] = useState('');
  const [loading, setLoading] = useState(false);
  const [eligibilityDone, setEligibilityDone] = useState(false);
  const [websiteDone, setWebsiteDone] = useState(false);
  const [fixesDone, setFixesDone] = useState(false);
  const [applying, setApplying] = useState(false);
  const [building, setBuilding] = useState(false);

  // Simulate eligibility check
  useEffect(() => {
    if (step === 1 && !eligibilityDone) {
      setLoading(true);
      const t = setTimeout(() => { setLoading(false); setEligibilityDone(true); }, 2000);
      return () => clearTimeout(t);
    }
  }, [step, eligibilityDone]);

  // Simulate website scan
  useEffect(() => {
    if (step === 2 && !websiteDone) {
      setLoading(true);
      const t = setTimeout(() => { setLoading(false); setWebsiteDone(true); }, 2500);
      return () => clearTimeout(t);
    }
  }, [step, websiteDone]);

  function handleFix() {
    setLoading(true);
    setTimeout(() => { setLoading(false); setFixesDone(true); }, 2000);
  }

  function handleApply() {
    setApplying(true);
    setTimeout(() => { setApplying(false); setStep(5); }, 3000);
  }

  function handleBuild() {
    setBuilding(true);
    setTimeout(() => { setBuilding(false); setStep(6); }, 3000);
  }

  const current = STEPS[step];

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-coral" />
            <span className="text-xl font-display font-bold text-primary">גרנטה</span>
          </div>
          <span className="text-[10px] font-extrabold tracking-[0.18em] uppercase text-primary">מסלול 2 — מאפס</span>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress */}
          <div className="flex gap-1.5 mb-8">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-primary' : 'bg-muted'}`} />
            ))}
          </div>

          <div className="glass rounded-3xl p-8 md:p-10 shadow-pop">
            <span className="inline-block text-[10px] font-extrabold tracking-[0.22em] uppercase text-coral mb-2">
              שלב {step + 1} מתוך {STEPS.length}
            </span>
            <h1 className="text-3xl font-display font-bold text-primary">{current.title}</h1>
            <p className="text-muted-foreground mt-1 mb-6">{current.subtitle}</p>

            {/* Step 0: Info */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">שם העמותה</label>
                  <input value={orgName} onChange={(e) => setOrgName(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder='לדוגמה: עמותת "דרך חדשה"' />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">כתובת אתר</label>
                  <input value={orgSite} onChange={(e) => setOrgSite(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="www.example.org.il" dir="ltr" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">מספר עמותה</label>
                  <input className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    placeholder="58-0XXXXXX" dir="ltr" />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">תחום פעילות</label>
                  <select className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-primary focus:border-primary outline-none">
                    <option value="">בחרו תחום</option>
                    <option>חינוך</option>
                    <option>נוער בסיכון</option>
                    <option>רווחה</option>
                    <option>בריאות</option>
                    <option>סביבה</option>
                    <option>תרבות ואמנות</option>
                    <option>קהילה</option>
                    <option>אחר</option>
                  </select>
                </div>
                <button onClick={() => setStep(1)}
                  className="w-full mt-2 py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]">
                  בדיקת זכאות ←
                </button>
              </div>
            )}

            {/* Step 1: Eligibility */}
            {step === 1 && (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-bold text-foreground">בודקים זכאות...</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      {ELIGIBILITY_CHECKS.map((check) => (
                        <div key={check.text} className="flex items-center gap-3 rounded-2xl bg-success/10 border border-success/20 px-5 py-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-success" />
                          <span className="text-sm font-bold text-foreground">{check.text}</span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-success/15 text-success px-5 py-4 text-center font-extrabold">
                      העמותה זכאית ל-Google Ad Grants!
                    </div>
                    <button onClick={() => setStep(2)}
                      className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]">
                      סריקת אתר ←
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step 2: Website scan */}
            {step === 2 && (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-bold text-foreground">סורקים את {orgSite || 'האתר'}...</p>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <p className="animate-pulse">בודקים SSL...</p>
                      <p className="animate-pulse" style={{ animationDelay: '0.3s' }}>בודקים Privacy Policy...</p>
                      <p className="animate-pulse" style={{ animationDelay: '0.6s' }}>בודקים מובייל...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="rounded-2xl bg-muted/50 p-3 text-center">
                        <div className="text-2xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>62</div>
                        <div className="text-[10px] text-muted-foreground font-bold">ציון /100</div>
                      </div>
                      <div className="rounded-2xl bg-success/10 p-3 text-center">
                        <div className="text-2xl font-black text-success" style={{ fontFamily: 'Karantina, sans-serif' }}>5</div>
                        <div className="text-[10px] text-muted-foreground font-bold">עברו</div>
                      </div>
                      <div className="rounded-2xl bg-red-50 p-3 text-center">
                        <div className="text-2xl font-black text-red-600" style={{ fontFamily: 'Karantina, sans-serif' }}>3</div>
                        <div className="text-[10px] text-muted-foreground font-bold">לתיקון</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {WEBSITE_CHECKS.map((check) => (
                        <div key={check.text} className={`flex items-start gap-3 rounded-2xl px-5 py-3 ${
                          check.status === 'pass' ? 'bg-success/10 border border-success/20' :
                          check.status === 'fail' ? 'bg-red-50 border border-red-200' :
                          'bg-amber-50 border border-amber-200'
                        }`}>
                          <span className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                            check.status === 'pass' ? 'bg-success' :
                            check.status === 'fail' ? 'bg-red-500' : 'bg-amber-500'
                          }`} />
                          <div>
                            <p className="text-sm font-bold text-foreground">{check.text}</p>
                            {check.fix && <p className="text-xs text-muted-foreground mt-0.5">{check.fix}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => setStep(3)}
                      className="w-full py-3.5 bg-coral text-coral-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98] shadow-pop">
                      תתקנו הכל ←
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Fixes */}
            {step === 3 && (
              <div className="space-y-4">
                {!fixesDone && !loading && (
                  <>
                    <div className="space-y-2">
                      {WEBSITE_CHECKS.filter(c => c.status !== 'pass').map((check) => (
                        <div key={check.text} className="flex items-center gap-3 rounded-2xl bg-amber-50 border border-amber-200 px-5 py-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <div className="flex-1">
                            <p className="text-sm font-bold text-foreground">{check.text}</p>
                            <p className="text-xs text-muted-foreground">{check.fix}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleFix}
                      className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]">
                      תקנו אוטומטית ←
                    </button>
                  </>
                )}
                {loading && (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-3 border-coral/30 border-t-coral rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-bold text-foreground">מתקנים בעיות...</p>
                    <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                      <p className="animate-pulse">יוצרים Privacy Policy...</p>
                      <p className="animate-pulse" style={{ animationDelay: '0.5s' }}>יוצרים Thank You Page...</p>
                      <p className="animate-pulse" style={{ animationDelay: '1s' }}>מתקינים Tracking...</p>
                    </div>
                  </div>
                )}
                {fixesDone && (
                  <>
                    <div className="space-y-2">
                      {WEBSITE_CHECKS.filter(c => c.status !== 'pass').map((check) => (
                        <div key={check.text} className="flex items-center gap-3 rounded-2xl bg-success/10 border border-success/20 px-5 py-3">
                          <span className="w-2.5 h-2.5 rounded-full bg-success" />
                          <p className="text-sm font-bold text-foreground">{check.text} — תוקן!</p>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-success/15 text-success px-5 py-4 text-center font-extrabold">
                      ציון חדש: 95/100 — האתר מוכן!
                    </div>
                    <button onClick={() => { setStep(4); }}
                      className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]">
                      הגשה לגוגל ←
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Step 4: Apply */}
            {step === 4 && (
              <div className="space-y-6">
                {!applying ? (
                  <>
                    <div className="space-y-3">
                      {[
                        { label: 'רישום ב-Google for Nonprofits', status: 'גרנטה ממלאת אוטומטית' },
                        { label: 'אימות עמותה (GoodStack)', status: 'גרנטה מטפלת' },
                        { label: 'הגשת בקשה ל-Google Ad Grants', status: 'גרנטה מגישה' },
                        { label: 'המתנה לאישור', status: '3-7 ימי עסקים' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 glass rounded-2xl px-5 py-4">
                          <span className="text-lg">{['📝', '🔐', '📨', '⏳'][i]}</span>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-foreground">{item.label}</p>
                            <p className="text-xs text-muted-foreground">{item.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button onClick={handleApply}
                      className="w-full py-3.5 bg-coral text-coral-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98] shadow-pop">
                      הגישו בשבילי ←
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-3 border-coral/30 border-t-coral rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-bold text-foreground">מגישים לגוגל...</p>
                    <p className="text-sm text-muted-foreground mt-2 animate-pulse">ממלאים טפסים, מצרפים מסמכים, שולחים...</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Campaigns */}
            {step === 5 && (
              <div className="space-y-6">
                {!building ? (
                  <>
                    <div className="rounded-2xl bg-success/15 text-success px-5 py-3 text-center font-extrabold text-sm">
                      Google אישרה את הבקשה!
                    </div>
                    <p className="text-sm text-muted-foreground">גרנטה בנתה 3 קמפיינים מותאמים לעמותה שלכם:</p>
                    <div className="space-y-2">
                      {CAMPAIGN_PREVIEW.map((c) => (
                        <div key={c.name} className="glass rounded-2xl px-5 py-4 flex items-center justify-between hover:-translate-y-0.5 transition">
                          <div>
                            <p className="font-extrabold text-foreground">{c.name}</p>
                            <p className="text-xs text-muted-foreground">{c.keywords} מילות מפתח · {c.ads} מודעות</p>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-extrabold bg-primary/10 text-primary">
                            <span className="w-1.5 h-1.5 rounded-full bg-current" />
                            מוכן
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="rounded-2xl bg-primary text-primary-foreground p-5">
                      <p className="text-xs font-extrabold tracking-[0.18em] uppercase opacity-70">תקציב חודשי</p>
                      <p className="mt-1 text-3xl font-black" style={{ fontFamily: 'Karantina, sans-serif' }} dir="ltr">$10,000</p>
                      <p className="text-sm opacity-80 mt-1">מגוגל. בחינם. כל חודש.</p>
                    </div>
                    <button onClick={handleBuild}
                      className="w-full py-3.5 bg-coral text-coral-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98] shadow-pop">
                      העלו את הקמפיינים ←
                    </button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                    <p className="font-bold text-foreground">מעלים קמפיינים לגוגל...</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 6: Live! */}
            {step === 6 && (
              <div className="text-center py-6">
                <div className="text-5xl mb-4">🚀</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-5 py-2.5 text-sm font-extrabold mb-4">
                  <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse" />
                  באוויר!
                </div>
                <h2 className="text-2xl font-display font-bold text-primary mb-2">
                  {orgName || 'העמותה שלכם'} פעילה ב-Google Grants
                </h2>
                <p className="text-muted-foreground mb-8">
                  3 קמפיינים עלו. $10,000 בחודש. גרנטה עוקבת ומשפרת 24/7.
                </p>

                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>3</div>
                    <div className="text-xs text-muted-foreground font-bold">קמפיינים</div>
                  </div>
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-coral" style={{ fontFamily: 'Karantina, sans-serif' }}>19</div>
                    <div className="text-xs text-muted-foreground font-bold">מילות מפתח</div>
                  </div>
                  <div className="glass rounded-2xl p-4 text-center">
                    <div className="text-2xl font-black text-success" style={{ fontFamily: 'Karantina, sans-serif' }}>24/7</div>
                    <div className="text-xs text-muted-foreground font-bold">ניטור</div>
                  </div>
                </div>

                <a href="/portal"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98]">
                  כניסה לפורטל שלכם ←
                </a>
              </div>
            )}
          </div>

          {step > 0 && step < 6 && !loading && !applying && !building && (
            <button onClick={() => setStep(step - 1)}
              className="mt-4 text-sm font-extrabold text-muted-foreground hover:text-foreground transition">
              → חזרה
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
