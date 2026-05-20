"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';
import QuizModule from '@/features/quiz/QuizModule';
import { Badge } from '@/shared/ui/Badge';
import { lessons } from '@/data/lessons';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';

export default function QuizPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const router = useRouter();
  const numericId = parseInt(id);
  const lesson = lessons.find(l => l.id === numericId);

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] hero-mesh islamic-pattern-bg">
        <Card variant="glass" className="p-10 text-center max-w-md border border-white/20">
          <h2 className="text-2xl font-black mb-4 text-[var(--color-text)]">Урок не найден</h2>
          <Button variant="primary" onClick={() => router.push('/dashboard')} className="w-full">
            Вернуться на главную
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] hero-mesh islamic-pattern-bg pb-32 pt-28">
      {/* Decorative radial glows */}
      <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[var(--color-accent)]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      {/* Floating Header Capsule */}
      <header className="fixed top-4 left-0 w-full z-45 px-4 pointer-events-none">
        <div className="max-w-2xl mx-auto glass rounded-2xl px-4 py-3 flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-white/20 dark:border-white/5 pointer-events-auto">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer text-slate-650 dark:text-slate-350"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-grow text-center px-4">
            <h1 className="text-base font-black text-[var(--color-primary)] dark:text-white uppercase tracking-wider">
              Проверка знаний
            </h1>
          </div>
          
          <div className="w-9" /> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-3xl relative z-10 animate-fade-in-up">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <Badge variant="accent" className="px-3.5 py-1 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Тест {lesson.id}
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] dark:text-white mb-3 tracking-tight">
            {lesson.title}
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold max-w-lg mx-auto">
            Ответьте на вопросы, чтобы закрепить изученный материал.
          </p>
        </div>

        <QuizModule lessonId={numericId} />
      </div>
    </div>
  );
}
