"use client";

import { useRouter } from 'next/navigation';
import { useProgressStore } from '@/store/useProgressStore';
import { useWalletStore } from '@/store/useWalletStore';
import { lessons } from '@/data/lessons';
import { isLessonUnlocked } from '@/shared/lib/access';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';
import { ArrowLeft, CheckCircle2, Lock, Play, Sparkles } from 'lucide-react';

export default function LessonsPage() {
  const router = useRouter();
  const { completedLessons } = useProgressStore();
  const { subscription } = useWalletStore();
  const hasSubscription = !!subscription;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] hero-mesh islamic-pattern-bg py-8 pb-20 pt-24">
      {/* Decorative gradient overlays */}
      <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[var(--color-accent)]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 max-w-3xl relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()} 
            className="px-3.5 py-2 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-350 cursor-pointer"
          >
            <ArrowLeft className="w-4.5 h-4.5 mr-2" />
            Назад
          </Button>
          
          <div className="text-center flex-grow pr-20 md:pr-24">
            <div className="flex justify-center mb-2">
              <Badge variant="accent" className="px-3 py-1 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Программа
              </Badge>
            </div>
            <h1 className="text-3xl font-black text-[var(--color-primary)] dark:text-white tracking-tight">
              Каталог уроков
            </h1>
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          {lessons.map((lesson) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isAvailable = isLessonUnlocked(lesson.id, hasSubscription);
            const isLocked = !isAvailable;

            return (
              <Card 
                key={lesson.id} 
                variant="glass"
                className={`flex items-center justify-between p-5 transition-all border border-white/15 dark:border-white/5 hover:border-[var(--color-accent)]/40 hover:shadow-lg shadow-sm cursor-pointer ${
                  isLocked ? 'opacity-85' : ''
                }`}
                onClick={() => {
                  if (isLocked) {
                    router.push('/wallet');
                  } else {
                    router.push(`/lesson/${lesson.id}`);
                  }
                }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-md ${
                    isCompleted 
                      ? 'bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white' 
                      : isAvailable
                        ? 'bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0F4C3A]'
                        : 'bg-slate-100 dark:bg-slate-900 text-slate-400 dark:text-slate-600 border border-slate-200 dark:border-slate-800/80'
                  }`}>
                    <span className="font-black text-lg tracking-tighter">{lesson.id}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[var(--color-text)]">
                      {lesson.title}
                    </h3>
                    <p className="text-[10px] uppercase tracking-wider text-slate-450 dark:text-slate-500 font-bold mt-1">
                      Страницы: {lesson.pdfPageStart} - {lesson.pdfPageEnd}
                    </p>
                  </div>
                </div>

                <div className="flex-shrink-0 ml-4">
                  {isCompleted ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none flex items-center gap-1.5 px-3.5 py-1.5 font-bold text-[10px] uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Пройдено
                      </Badge>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/quiz/${lesson.id}`)}
                        className="text-xs uppercase tracking-wider border-[var(--color-accent)] text-[var(--color-primary)] dark:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 font-bold"
                      >
                        Тест
                      </Button>
                    </div>
                  ) : isAvailable ? (
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button 
                        onClick={() => router.push(`/lesson/${lesson.id}`)}
                        className="bg-[var(--color-primary)] text-white hover:bg-[#0a3528] font-bold text-xs uppercase tracking-wider shadow-md"
                        size="sm"
                      >
                        <Play className="w-3.5 h-3.5 mr-1.5 hidden sm:block fill-current" />
                        Начать
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/quiz/${lesson.id}`)}
                        className="border-slate-200 text-slate-550 dark:border-slate-800 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs uppercase tracking-wider font-bold"
                      >
                        Тест
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 flex items-center gap-1.5 font-black uppercase text-[10px] tracking-wider cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push('/wallet');
                      }}
                    >
                      <Lock className="w-3.5 h-3.5" />
                      Купить
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </div>
  );
}
