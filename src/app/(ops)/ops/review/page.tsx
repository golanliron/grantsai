'use client';

import { useState } from 'react';
import { ReviewItem } from '@/components/ops/ReviewItem';
import { REVIEW_QUEUE } from '@/data/mock';
import type { RiskLevel } from '@/types';

const RISK_FILTERS: (RiskLevel | 'all')[] = ['all', 'critical', 'high', 'medium', 'low'];
const RISK_LABELS: Record<string, string> = { all: 'הכל', critical: 'קריטי', high: 'גבוה', medium: 'בינוני', low: 'נמוך' };

export default function ReviewQueuePage() {
  const [filter, setFilter] = useState<RiskLevel | 'all'>('all');

  const filtered = filter === 'all'
    ? REVIEW_QUEUE
    : REVIEW_QUEUE.filter((item) => item.risk === filter);

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-display font-bold text-primary">תור אישורים</h1>
          <p className="text-muted-foreground mt-1">פריטים שדורשים אישור ידני</p>
        </div>
        <div className="flex gap-1.5">
          {RISK_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs rounded-full font-extrabold tracking-wide transition active:scale-[0.98] ${
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'glass text-muted-foreground hover:text-foreground hover:border-primary/40'
              }`}
            >
              {RISK_LABELS[f]}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="glass rounded-2xl px-8 py-20 text-center">
          <div className="w-12 h-12 rounded-full bg-success/15 text-success mx-auto flex items-center justify-center mb-3">
            <span className="text-xl">✓</span>
          </div>
          <p className="text-muted-foreground font-bold">אין פריטים ממתינים</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <ReviewItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
