'use client';

import { useState } from 'react';

const STEPS = [
  { title: 'ברוכים הבאים', desc: 'גרנטה תנהל את ה-Google Grants שלכם מקצה לקצה.', icon: '👋' },
  { title: 'חיבור לגוגל', desc: 'התחברות מאובטחת לחשבון Google של העמותה.', icon: '🔗' },
  { title: 'מכינים הכל', desc: 'גרנטה בודקת את האתר, בונה קמפיינים ומגדירה מעקב.', icon: '⚙' },
  { title: 'הכל פעיל!', desc: 'הפרסום שלכם עובד. אנחנו עוקבים ומשפרים כל הזמן.', icon: '🚀' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const current = STEPS[step];

  return (
    <div className="max-w-lg mx-auto space-y-8">
      {/* Progress */}
      <div className="flex gap-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? 'bg-coral' : 'bg-muted'}`}
          />
        ))}
      </div>

      {/* Card */}
      <div className="glass rounded-3xl p-10 text-center transition hover:border-primary/40 hover:shadow-soft">
        <div className="text-5xl mb-4">{current.icon}</div>
        <h1 className="text-3xl font-display font-bold text-primary">{current.title}</h1>
        <p className="mt-3 text-muted-foreground">{current.desc}</p>

        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-extrabold tracking-[0.15em] uppercase transition hover:brightness-110 active:scale-[0.98]"
          >
            התחבר לגוגל
            <span className="transition-transform">←</span>
          </button>
        )}

        {step === 2 && (
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-extrabold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              מכינים הכל...
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/15 text-success px-4 py-2 text-sm font-extrabold">
            <span className="w-2.5 h-2.5 rounded-full bg-success" />
            פעיל ועובד
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 text-sm rounded-full font-extrabold text-muted-foreground hover:text-foreground transition disabled:opacity-30"
        >
          → הקודם
        </button>
        <button
          onClick={() => setStep(Math.min(STEPS.length - 1, step + 1))}
          disabled={step === STEPS.length - 1}
          className="px-4 py-2 text-sm rounded-full font-extrabold bg-coral text-coral-foreground hover:brightness-110 transition active:scale-[0.98] disabled:opacity-30"
        >
          הבא ←
        </button>
      </div>
    </div>
  );
}
