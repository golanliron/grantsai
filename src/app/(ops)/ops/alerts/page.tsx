'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { OpsButton } from '@/components/ui/OpsButton';
import { ALERTS } from '@/data/mock';
import type { AlertSeverity } from '@/types';

const SEV_FILTERS: (AlertSeverity | 'all')[] = ['all', 'critical', 'high', 'medium', 'low', 'info'];
const SEV_LABELS: Record<string, string> = { all: 'הכל', critical: 'קריטי', high: 'גבוה', medium: 'בינוני', low: 'נמוך', info: 'מידע' };

export default function AlertsPage() {
  const [filter, setFilter] = useState<AlertSeverity | 'all'>('all');
  const [resolved, setResolved] = useState<Set<string>>(new Set());

  const filtered = (filter === 'all' ? ALERTS : ALERTS.filter((a) => a.sev === filter))
    .filter((a) => !resolved.has(a.id));

  function handleResolve(id: string) {
    setResolved((prev) => { const next = new Set(prev); next.add(id); return next; });
  }

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary">התראות</h1>
          <p className="text-muted-foreground mt-1">התראות פעילות מכל הארגונים</p>
        </div>
        <div className="flex gap-1.5">
          {SEV_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs rounded-full font-extrabold tracking-wide transition active:scale-[0.98] ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {SEV_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl px-8 py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center mb-3">
            <span className="text-xl">✓</span>
          </div>
          <p className="text-muted-foreground font-bold">אין התראות פעילות</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((alert) => (
            <div key={alert.id} className="glass rounded-2xl px-6 py-5 flex items-center justify-between transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft">
              <div className="flex items-center gap-4">
                <Badge variant="severity" value={alert.sev} dot />
                <div>
                  <p className="text-sm font-extrabold text-foreground">
                    <span className="text-muted-foreground">{alert.org}</span> — {alert.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.body}</p>
                </div>
              </div>
              <OpsButton variant="ghost" size="xs" onClick={() => handleResolve(alert.id)}>
                סגירה
              </OpsButton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
