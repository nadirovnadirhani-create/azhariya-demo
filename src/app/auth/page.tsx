"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Mail, Lock, User, Sparkles, ArrowLeft } from 'lucide-react';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || (!isLogin && !name)) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Mock logic for specific users
    let userName = isLogin ? (email.split('@')[0]) : name;
    let userRole: 'admin' | 'user' = 'user';

    if (email === 'admin@azhariya.com' && password === 'admin123') {
      userName = 'Admin';
      userRole = 'admin';
    } else if (email === 'muslim@azhariya.com' && password === 'muslim123') {
      userName = 'Muslim';
    } else if (isLogin && email !== 'admin@azhariya.com' && email !== 'muslim@azhariya.com') {
      userName = email.split('@')[0];
    }

    login({
      id: Math.random().toString(36).substr(2, 9),
      name: userName,
      email: email,
      progress: 0,
      streak: 0,
      role: userRole,
    });

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center hero-mesh islamic-pattern-bg py-12 px-4 relative overflow-hidden">
      {/* Glow effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-[var(--color-accent)]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      {/* Floating Calligraphy Decoration (Subtle background graphic) */}
      <div className="absolute hidden lg:block left-10 top-1/2 -translate-y-1/2 text-slate-100 dark:text-[#0C2A20]/20 text-[12rem] font-serif pointer-events-none select-none animate-float opacity-30 leading-none tracking-widest arabic-text">
        العربية
      </div>

      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-6 px-3.5 py-2 rounded-xl bg-white/40 dark:bg-slate-900/35 border border-white/20 dark:border-white/5 backdrop-blur-md text-xs font-bold text-slate-600 dark:text-slate-350 hover:border-[var(--color-accent)]/30 hover:scale-102 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all cursor-pointer shadow-sm"
        >
          <ArrowLeft size={14} />
          <span>На главную</span>
        </Link>

        <Card variant="glass" className="p-8 md:p-10 border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[var(--color-accent)]/5 blur-2xl pointer-events-none" />
          
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] flex items-center justify-center text-[#0A3C2F] font-black shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-105 transition-all">
                A
              </div>
              <span className="text-xl font-black tracking-[0.2em] text-[var(--color-primary)] dark:text-[var(--color-accent)] group-hover:text-[#B89222] transition-colors">
                AZHARIYA
              </span>
            </Link>

            <div className="flex justify-center mb-3">
              <Badge variant="accent" className="px-3.5 py-1 text-[9px] uppercase tracking-wider font-extrabold flex items-center gap-1.5">
                <Sparkles className="w-2.5 h-2.5" />
                {isLogin ? 'Вход в систему' : 'Регистрация'}
              </Badge>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-[var(--color-text)] tracking-tight">
              {isLogin ? 'С возвращением!' : 'Создать аккаунт'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-450 mt-2 font-semibold">
              {isLogin ? 'Войдите для продолжения обучения' : 'Присоединяйтесь к нашей академии сегодня'}
            </p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/25 text-rose-600 dark:text-rose-450 p-4 rounded-2xl text-xs font-bold mb-6 text-center animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-1.5 block">Имя</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    <User size={16} />
                  </span>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm font-semibold text-[var(--color-text)]"
                    placeholder="Иван Иванов"
                  />
                </div>
              </div>
            )}
            
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-1.5 block">Email</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Mail size={16} />
                </span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm font-semibold text-[var(--color-text)]"
                  placeholder="student@azhariya.com"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-1.5 block">Пароль</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                  <Lock size={16} />
                </span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50/50 dark:bg-slate-950/20 border border-slate-200 dark:border-slate-800/80 rounded-2xl pl-11 pr-4 py-3.5 outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all text-sm font-semibold text-[var(--color-text)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              variant="primary"
              className="w-full py-4 text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--color-primary)]/10 mt-2"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 flex items-center justify-center space-x-2">
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/85"></div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">или</span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800/85"></div>
          </div>

          <Button 
            variant="outline"
            className="w-full mt-6 py-3.5 flex items-center justify-center gap-3 text-xs font-bold tracking-wide uppercase border-slate-200 dark:border-slate-800/80"
            onClick={() => {
              // Simulating quick Google login as a demo account
              login({
                id: 'google-mock',
                name: 'Гость Google',
                email: 'google-student@azhariya.com',
                progress: 0,
                streak: 0,
                role: 'user',
              });
              router.push('/dashboard');
            }}
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Войти через Google
          </Button>

          <div className="mt-8 text-center pt-8 border-t border-slate-100 dark:border-slate-800/60">
            <p className="text-xs text-slate-500 dark:text-slate-450 font-semibold">
              {isLogin ? 'У вас еще нет аккаунта?' : 'Уже есть аккаунт?'}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-[var(--color-primary)] dark:text-[var(--color-accent)] font-bold ml-1.5 hover:underline transition-all cursor-pointer"
              >
                {isLogin ? 'Создать аккаунт' : 'Войти'}
              </button>
            </p>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-6 max-w-xs mx-auto leading-relaxed font-semibold">
              Нажимая кнопку, вы соглашаетесь с условиями использования и политикой конфиденциальности.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
