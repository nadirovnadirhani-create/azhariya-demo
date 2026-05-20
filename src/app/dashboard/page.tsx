"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useWalletStore } from '@/store/useWalletStore';
import { lessons } from '@/data/lessons';
import { isLessonUnlocked } from '@/shared/lib/access';
import ProgressRing from '@/shared/ui/ProgressRing';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { Flame, Crown, LogOut, CheckCircle2, Lock, Grid, Layers, Sparkles, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { completedLessons, streak } = useProgressStore();
  const { subscription } = useWalletStore();
  const [isIsometric, setIsIsometric] = useState(false);

  const totalLessons = lessons.length;
  const totalCompleted = completedLessons.length;
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
  const hasSubscription = !!subscription;

  // Next lesson to take
  const nextLessonId = Math.min(totalCompleted + 1, totalLessons);
  const isNextLessonLocked = nextLessonId > 5 && !hasSubscription;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] hero-mesh islamic-pattern-bg pb-32 pt-28">
      {/* Mesh Glow elements */}
      <div className="absolute top-[5%] right-[5%] w-[45vw] h-[45vw] rounded-full bg-[var(--color-accent)]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-5xl relative z-10">
        
        {/* Welcome Header Panel */}
        <section className="relative glass-premium p-8 md:p-12 rounded-3xl overflow-hidden shadow-2xl mb-12 animate-fade-in-up border border-white/20 dark:border-white/5">
          {/* Radial light overlays */}
          <div className="absolute -top-[30%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent)]/10 blur-[90px] pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left flex-1">
              <Badge variant="accent" className="mb-5 px-3.5 py-1.5 text-[9px] uppercase tracking-[0.2em] font-extrabold flex items-center gap-1.5 w-fit mx-auto md:mx-0">
                <Sparkles className="w-2.5 h-2.5" />
                Академия Азхария
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight text-[var(--color-primary)] dark:text-white tracking-tight">
                Ас-саляму алейкум, <br />
                <span className="text-gold-gradient drop-shadow-sm">{user?.name || 'Студент'}</span>!
              </h1>
              
              <p className="text-slate-500 dark:text-slate-350 text-sm md:text-base max-w-md mb-8 leading-relaxed font-semibold">
                Ваш текущий прогресс: <span className="text-[var(--color-primary)] dark:text-[var(--color-accent)] font-bold">Урок {nextLessonId}</span> из {totalLessons}. Продолжайте в том же духе!
              </p>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button 
                  variant="accent" 
                  size="md"
                  onClick={() => router.push(isNextLessonLocked ? '/wallet' : `/lesson/${nextLessonId}`)}
                  className="shadow-lg hover:-translate-y-1 text-[#0A3C2F] font-bold"
                >
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {isNextLessonLocked ? 'Купить Премиум' : 'Продолжить обучение'}
                </Button>
                <Button 
                  variant="outline" 
                  size="md"
                  onClick={() => { logout(); router.push('/'); }}
                  className="border-slate-200 text-slate-700 dark:border-slate-800 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850 font-bold"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Выйти
                </Button>
              </div>
            </div>
            
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-[var(--color-accent)] blur-[40px] opacity-15 rounded-full"></div>
              <ProgressRing progress={overallProgress} size={170} strokeWidth={10} />
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 stagger-children">
          <Card variant="glass" className="p-6 flex items-center gap-6 hover:-translate-y-1 transition-all duration-300 border border-white/10 dark:border-white/5 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/20 text-orange-500 flex items-center justify-center shadow-inner">
              <Flame className="w-6.5 h-6.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Ударный режим</p>
              <p className="text-2xl font-black">{streak.count} дн.</p>
            </div>
          </Card>
          
          <Card variant="glass" className="p-6 flex items-center gap-6 hover:-translate-y-1 transition-all duration-300 border border-white/10 dark:border-white/5 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 flex items-center justify-center shadow-inner">
              <CheckCircle2 className="w-6.5 h-6.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Пройдено уроков</p>
              <p className="text-2xl font-black">{totalCompleted} из {totalLessons}</p>
            </div>
          </Card>
          
          <Card variant="glass" className="p-6 flex items-center gap-6 hover:-translate-y-1 transition-all duration-300 border border-white/10 dark:border-white/5 shadow-md">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/20 text-[#B89222] dark:text-[var(--color-accent)] flex items-center justify-center shadow-inner">
              <Crown className="w-6.5 h-6.5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Статус аккаунта</p>
              <div className="flex items-center gap-2">
                <p className="text-xl font-extrabold">{hasSubscription ? 'Полный курс' : 'Демо-доступ'}</p>
                {!hasSubscription && (
                  <Button variant="ghost" size="sm" onClick={() => router.push('/wallet')} className="p-1 h-auto text-xs underline text-[var(--color-primary)] dark:text-[var(--color-accent)] font-bold cursor-pointer">
                    Улучшить
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Lessons Section */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-black text-[var(--color-primary)] dark:text-[var(--color-accent)] tracking-tight">
                Программа курса
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-bold uppercase tracking-wider">
                31 интерактивный урок по книге Азхария
              </p>
            </div>

            {/* Isometric view switcher */}
            <button
              onClick={() => setIsIsometric(!isIsometric)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl border border-slate-200/60 bg-white/60 dark:border-slate-800/80 dark:bg-slate-900/60 backdrop-blur-md shadow-sm hover:border-[var(--color-accent)]/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-98 transition-all duration-200 text-xs font-bold cursor-pointer text-slate-700 dark:text-slate-350 uppercase tracking-wider"
            >
              {isIsometric ? <Grid size={14} /> : <Layers size={14} />}
              <span>{isIsometric ? 'Обычная сетка' : '3D Изометрия'}</span>
            </button>
          </div>
          
          <div className={`${isIsometric ? 'perspective-container overflow-visible py-12 md:py-24' : ''}`}>
            <Card 
              variant="glass" 
              className={`p-6 md:p-10 border border-white/20 dark:border-white/5 shadow-2xl transition-all duration-500 overflow-visible ${
                isIsometric ? 'rotateX-[24deg] rotateZ-[-12deg] shadow-[0_45px_100px_rgba(10,60,47,0.12)]' : ''
              }`}
            >
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3.5 md:gap-5 overflow-visible">
                {lessons.map((lesson) => {
                  const isCompleted = completedLessons.includes(lesson.id);
                  const isAvailable = isLessonUnlocked(lesson.id, hasSubscription);
                  const isLocked = !isAvailable;

                  return (
                    <div 
                      key={lesson.id} 
                      className={`aspect-square rounded-2xl flex flex-col items-center justify-center transition-all duration-300 cursor-pointer ${
                        isIsometric ? 'will-change-transform transform-style-3d shadow-sm hover:shadow-xl' : 'hover:-translate-y-1 hover:shadow-md'
                      } ${
                        isCompleted 
                          ? 'bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white border border-[var(--color-primary-dark)]' 
                          : isAvailable
                            ? 'bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0F4C3A] border border-[#c19b2e]' 
                            : 'bg-slate-100/40 dark:bg-slate-900/30 text-slate-400 dark:text-slate-655 border border-slate-200/50 dark:border-slate-800/50 opacity-80 hover:border-[var(--color-accent)]/30'
                      }`}
                      style={{
                        transform: isIsometric
                          ? isCompleted
                            ? 'translateZ(30px) translateY(-5px)'
                            : isAvailable
                              ? 'translateZ(15px) translateY(-2px)'
                              : 'translateZ(0px)'
                          : undefined
                      }}
                      onClick={() => {
                        if (isLocked) {
                          router.push('/wallet');
                        } else {
                          router.push(`/lesson/${lesson.id}`);
                        }
                      }}
                    >
                      {isLocked ? (
                        <Lock className="w-5 h-5 mb-1 text-slate-400 dark:text-slate-600" />
                      ) : (
                        <span className="text-xl md:text-2xl font-black tracking-tighter">{lesson.id}</span>
                      )}
                      <span className={`text-[8px] uppercase tracking-widest mt-1 font-black ${isCompleted ? 'text-white/80' : isAvailable ? 'text-[#0F4C3A]/70' : 'text-slate-400'}`}>
                        {isLocked ? 'Купить' : 'Урок'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>

      </div>
    </div>
  );
}
