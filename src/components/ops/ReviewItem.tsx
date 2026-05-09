'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { ConfidenceBar } from '@/components/ui/ConfidenceBar';
import { OpsButton } from '@/components/ui/OpsButton';
import type { MockReviewItem } from '@/data/mock';

export function ReviewItem({ item }: { item: MockReviewItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass rounded-2xl overflow-hidden transition hover:border-primary/40 hover:shadow-soft">
      {/* Header */}
      <div
        className="px-6 py-5 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="risk" value={item.risk} dot />
              <span className="text-xs font-bold text-muted-foreground">{item.org}</span>
              <span className="text-xs text-border">·</span>
              <span className="text-[10px] font-extrabold tracking-[0.15em] uppercase text-coral">{item.agent.replace(/_/g, ' ')}</span>
            </div>
            <h3 className="font-extrabold text-foreground">{item.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{item.problem}</p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <ConfidenceBar value={item.confidence} />
            <span className="text-[10px] text-muted-foreground">
              {new Date(item.created_at).toLocaleString('he-IL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-border px-6 py-5 bg-muted/30">
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em] mb-1.5">המלצה</p>
              <p className="text-foreground font-medium">{item.recommendation}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-success/10 p-4 border border-success/20">
                <p className="text-[10px] font-extrabold text-success uppercase tracking-[0.15em] mb-1">אם מאושר</p>
                <p className="text-xs text-foreground">{item.if_approved}</p>
              </div>
              <div className="rounded-2xl bg-destructive/10 p-4 border border-destructive/20">
                <p className="text-[10px] font-extrabold text-destructive uppercase tracking-[0.15em] mb-1">אם נדחה</p>
                <p className="text-xs text-foreground">{item.if_rejected}</p>
              </div>
            </div>

            {item.client_msg && (
              <div className="rounded-2xl bg-primary/5 p-4 border border-primary/15">
                <p className="text-[10px] font-extrabold text-primary uppercase tracking-[0.15em] mb-1">הודעה ללקוח</p>
                <p className="text-xs text-foreground">{item.client_msg}</p>
              </div>
            )}

            {item.rollback && (
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Rollback זמין: <span className="font-mono text-primary">{item.rollback_id}</span>
              </p>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              {item.actions.includes('approve') && <OpsButton variant="success">אישור</OpsButton>}
              {item.actions.includes('reject') && <OpsButton variant="danger">דחייה</OpsButton>}
              {item.actions.includes('edit') && <OpsButton variant="ghost">עריכה</OpsButton>}
              {item.actions.includes('rollback') && <OpsButton variant="ghost">Rollback</OpsButton>}
              {item.actions.includes('escalate') && <OpsButton variant="ghost">הסלמה</OpsButton>}
              {item.actions.includes('retry') && <OpsButton variant="ghost">ניסיון חוזר</OpsButton>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
