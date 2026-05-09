import { CLIENT_VIEW } from '@/data/mock';

export default function ReportPage() {
  const { stats } = CLIENT_VIEW;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="inline-block text-[10px] font-extrabold tracking-[0.22em] uppercase text-coral mb-2">דוח חודשי</span>
        <h1 className="text-4xl font-display font-bold text-primary">מאי 2026</h1>
      </div>

      {/* Stats */}
      <div className="glass rounded-3xl p-8">
        <div className="grid grid-cols-4 gap-4 divide-x divide-x-reverse divide-border">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center px-4">
              <div className="text-4xl font-black text-primary" style={{ fontFamily: 'Karantina, sans-serif' }}>{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-2 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="glass rounded-2xl p-6">
        <h2 className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-[0.18em] mb-4">מה עשינו החודש</h2>
        <ul className="space-y-3">
          {[
            'אופטימיזציה ל-3 קמפיינים — שיפור CTR ב-1.2%',
            'הסרת 12 מילות מפתח לא אפקטיביות',
            'עדכון 4 מודעות לשפת גוף חזקה יותר',
            'בדיקת אתר שבועית — עבר בהצלחה',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-foreground">
              <span className="w-2 h-2 rounded-full bg-success mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Next month */}
      <div className="rounded-3xl bg-primary text-primary-foreground p-8">
        <h2 className="text-[10px] font-extrabold tracking-[0.18em] uppercase opacity-70 mb-3">תוכנית לחודש הבא</h2>
        <ul className="space-y-2">
          {[
            'קמפיין חדש למגויסים חדשים',
            'בדיקת Landing Pages — אופטימיזציה למובייל',
            'ניסוי A/B על 2 כותרות מודעה',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-2 h-2 rounded-full bg-coral mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
