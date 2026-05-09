'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('auth_id', user.id)
        .single();

      if (userData?.role === 'ops') {
        window.location.href = '/ops';
      } else {
        window.location.href = '/portal';
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background" dir="rtl">
      <div className="w-full max-w-sm">
        <div className="glass rounded-3xl p-10 shadow-pop">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-3 h-3 rounded-full bg-coral" />
              <h1 className="text-4xl font-display font-bold text-primary">גרנטה</h1>
            </div>
            <p className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-coral">
              Operating System ל-Google Grants
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">אימייל</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-coral focus:border-coral outline-none transition"
                placeholder="you@example.com"
                dir="ltr"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-muted-foreground uppercase tracking-[0.15em] mb-1.5">סיסמה</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-card focus:ring-2 focus:ring-coral focus:border-coral outline-none transition"
                placeholder="••••••••"
                dir="ltr"
                required
              />
            </div>

            {error && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3 font-bold">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-primary text-primary-foreground rounded-full text-sm font-extrabold tracking-[0.15em] uppercase hover:brightness-110 transition active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'מתחבר...' : 'כניסה'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
