"use client";

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { lessons, LessonBlock } from '@/data/lessons';
import { useProgressStore } from '@/store/useProgressStore';
import { useWalletStore } from '@/store/useWalletStore';
import HandwritingCanvas from '@/features/handwriting/HandwritingCanvas';
import { playArabic } from '@/shared/lib/audio';
import { isLessonUnlocked } from '@/shared/lib/access';
import { ArrowLeft, ArrowRight, Volume2, CheckCircle2, ChevronRight, PenTool, Sparkles } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';

export default function LessonPage(props: { params: Promise<{ id: string }> }) {
  const { id } = use(props.params);
  const router = useRouter();
  const { completeLesson, completedLessons } = useProgressStore();
  const { subscription } = useWalletStore();
  const hasSubscription = !!subscription;

  const numericId = parseInt(id);
  const lessonData = lessons.find(l => l.id === numericId);
  const unlocked = isLessonUnlocked(numericId, hasSubscription);

  const [playingItem, setPlayingItem] = useState<string | null>(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (!unlocked) {
      router.replace('/wallet');
    }
  }, [unlocked, router]);

  useEffect(() => {
    if (completedLessons.includes(numericId)) {
      setIsCompleted(true);
    }
  }, [completedLessons, numericId]);

  const playAudio = (src: string | null | undefined, text: string) => {
    setPlayingItem(text);
    playArabic(src ?? null, text, {
      onEnd: () => setPlayingItem(null),
    });
  };

  const handleComplete = () => {
    completeLesson(numericId);
    setIsCompleted(true);

    setTimeout(() => {
      router.push(`/quiz/${numericId}`);
    }, 1500);
  };

  if (!unlocked) {
    return null;
  }

  if (!lessonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] hero-mesh islamic-pattern-bg">
        <Card variant="glass" className="p-10 text-center max-w-md border border-white/20">
          <h2 className="text-2xl font-black mb-3 text-[var(--color-text)]">Урок не найден</h2>
          <Button variant="primary" onClick={() => router.push('/dashboard')} className="w-full">
            На главную
          </Button>
        </Card>
      </div>
    );
  }

  const prevLesson = numericId > 1 ? lessons.find(l => l.id === numericId - 1) : null;
  const nextLesson = numericId < lessons.length ? lessons.find(l => l.id === numericId + 1) : null;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] hero-mesh islamic-pattern-bg pb-32 pt-28">
      {/* Decorative radial glows */}
      <div className="absolute top-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-[var(--color-accent)]/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[35vw] h-[35vw] rounded-full bg-emerald-600/5 blur-[100px] pointer-events-none" />

      {/* Floating Header Capsule */}
      <header className="fixed top-4 left-0 w-full z-45 px-4 pointer-events-none">
        <div className="max-w-2xl mx-auto glass rounded-2xl px-4 py-3 flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-white/20 dark:border-white/5 pointer-events-auto">
          <button 
            onClick={() => router.push('/dashboard')} 
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer text-slate-650 dark:text-slate-350"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex-grow text-center px-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-[var(--color-primary)] dark:text-[var(--color-accent)]">
              Урок {numericId} из {lessons.length}
            </p>
            <div className="w-36 mx-auto mt-1.5 h-1 bg-slate-100 dark:bg-slate-800/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#B89222] to-[var(--color-accent)] rounded-full transition-all duration-700"
                style={{ width: `${(numericId / lessons.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="w-9" /> {/* Spacer */}
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="flex justify-center mb-2">
            <Badge variant="accent" className="px-3.5 py-1 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              книга Азхария
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] dark:text-white tracking-tight">
            {lessonData.title}
          </h1>
          <p className="text-slate-450 dark:text-slate-500 text-[10px] mt-2 font-bold uppercase tracking-widest">
            Страницы книги: {lessonData.pdfPageStart} - {lessonData.pdfPageEnd}
          </p>
        </div>

        {lessonData.blocks.map((block, idx) => (
          <div key={idx} className="mb-8">
            <BlockRenderer 
              block={block} 
              playingItem={playingItem} 
              playAudio={playAudio} 
              showCanvas={showCanvas} 
              setShowCanvas={setShowCanvas}
            />
          </div>
        ))}

        {lessonData.blocks.length === 0 && (
          <Card variant="glass" className="p-12 text-center text-slate-450 italic mb-8 border border-white/10 dark:border-white/5 font-semibold">
            Контент для этого урока находится в разработке. Пожалуйста, обратитесь к PDF-учебнику.
          </Card>
        )}

        {/* ─── Completion ─── */}
        {isCompleted && (
          <div className="bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-450 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-5 border border-emerald-500/20 dark:border-emerald-900/40 animate-scale-in mb-8 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-extrabold text-sm text-[var(--color-primary)] dark:text-emerald-400">Отличная работа!</p>
                <p className="text-xs text-slate-550 dark:text-emerald-400/80 mt-0.5 font-semibold">Урок завершен. Закрепите пройденное:</p>
              </div>
            </div>
            <Button
              variant="accent"
              size="sm"
              onClick={() => router.push(`/quiz/${numericId}`)}
              className="shrink-0 shadow-md text-[#0A3C2F] font-bold"
            >
              Пройти тест
            </Button>
          </div>
        )}

        {!showCanvas && !isCompleted && (
          <Button
            variant="primary"
            size="lg"
            className="w-full text-xs font-bold uppercase tracking-wider shadow-lg shadow-[var(--color-primary)]/15 hover:-translate-y-0.5 transition-all mb-8 py-4"
            onClick={handleComplete}
          >
            Завершить и начать тест
          </Button>
        )}

        {/* Prev / Next navigation */}
        <div className="flex gap-4">
          {prevLesson && (
            <Button
              variant="outline"
              size="md"
              className="flex-1 text-xs font-bold uppercase tracking-wider border-slate-200 dark:border-slate-800/80"
              onClick={() => router.push(`/lesson/${numericId - 1}`)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Урок {numericId - 1}
            </Button>
          )}
          {nextLesson && (
            <Button
              variant="primary"
              size="md"
              className="flex-1 text-xs font-bold uppercase tracking-wider"
              onClick={() => router.push(`/lesson/${numericId + 1}`)}
            >
              Урок {numericId + 1}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

// Separate component to render individual blocks
function BlockRenderer({ 
  block, 
  playingItem, 
  playAudio, 
  showCanvas, 
  setShowCanvas 
}: {
  block: LessonBlock,
  playingItem: string | null,
  playAudio: (src: string | null | undefined, text: string) => void,
  showCanvas: boolean,
  setShowCanvas: (v: boolean) => void
}) {
  
  if (block.type === 'writing') {
    return (
      <Card variant="glass" className="p-6 md:p-8 border border-white/20 dark:border-white/5 shadow-md">
        <h3 className="text-[10px] font-black text-slate-450 dark:text-slate-400 mb-6 text-center uppercase tracking-[0.2em]">
          Формы написания
        </h3>
        <div className="grid grid-cols-4 gap-4 mb-8" dir="rtl">
          {block.forms?.map((form, i) => (
            <div key={i} className="flex flex-col items-center group">
              <div className="w-full aspect-square rounded-2xl flex items-center justify-center mb-2 bg-white/40 dark:bg-slate-900/30 border border-white/10 dark:border-slate-850 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                <span className="arabic-text text-4xl text-[var(--color-primary)] dark:text-[var(--color-accent)] font-bold">
                  {form}
                </span>
              </div>
              <span className="text-[9px] uppercase text-slate-400 dark:text-slate-500 font-extrabold tracking-wider">
                {i === 0 ? 'Обособ.' : i === 1 ? 'Начало' : i === 2 ? 'Середина' : 'Конец'}
              </span>
            </div>
          ))}
        </div>

        {!showCanvas ? (
          <Card 
            variant="interactive" 
            className="p-5 md:p-6 cursor-pointer bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 dark:border-[var(--color-accent)]/10 shadow-sm" 
            onClick={() => setShowCanvas(true)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0A3C2F] rounded-xl flex items-center justify-center shadow-md">
                  <PenTool className="w-5.5 h-5.5" />
                </div>
                <div className="text-left">
                  <h4 className="font-extrabold text-base text-[var(--color-primary)] dark:text-white">Интерактивные прописи</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">Тренируйте правильные начертания</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-450" />
            </div>
          </Card>
        ) : (
          <div className="animate-fade-in-up mt-6">
            <div className="flex items-center justify-between mb-4 px-1">
              <h4 className="font-extrabold text-base text-[var(--color-primary)] dark:text-white">Практика каллиграфии</h4>
              <Button variant="ghost" size="sm" onClick={() => setShowCanvas(false)} className="text-xs py-1 h-auto cursor-pointer font-bold">Скрыть</Button>
            </div>
            <HandwritingCanvas
              letter={block.letter || 'ا'}
              arabicLetter={block.forms?.[0] || 'ا'}
              onCheck={() => setShowCanvas(false)}
            />
          </div>
        )}
      </Card>
    );
  }

  // All other types that just list items
  const titleMap: Record<string, string> = {
    'intro': 'Знакомство',
    'vowels': 'Огласовки',
    'combinations': 'Комбинации',
    'long_vowels': 'Долгие гласные',
    'words': 'Чтение слов',
    'tanwins': 'Тануины',
    'sukun': 'Сукун',
    'shadda': 'Ташдид',
    'sun_moon': 'Лунные и солнечные'
  };

  const hasItems = (block.items?.length ?? 0) > 0;

  return (
    <Card variant="glass" className="p-6 md:p-8 border border-white/20 dark:border-white/5 shadow-md">
      <h3 className="text-[10px] font-black text-slate-450 dark:text-slate-400 mb-6 text-center uppercase tracking-[0.2em]">
        {titleMap[block.type] || 'Практика'}
      </h3>
      {block.note && (
        <p className="text-xs text-slate-500 dark:text-slate-400 text-center mb-6 max-w-prose mx-auto leading-relaxed font-semibold">
          {block.note}
        </p>
      )}
      {!hasItems && (
        <p className="text-center text-slate-400 italic text-xs py-4 font-semibold">
          Материал готовится — пока доступна только запись буквы.
        </p>
      )}
      <div className="flex flex-wrap justify-center gap-4" dir="rtl">
        {block.items?.map((item, i) => {
          const isObj = typeof item === 'object';
          const text = isObj ? item.text : item;
          const audioSrc = isObj ? item.audio : undefined;
          const isPlaying = playingItem === text;

          return (
            <button
              key={i}
              onClick={() => playAudio(audioSrc, text)}
              className={`relative px-6 py-4 rounded-2xl text-3xl md:text-4xl arabic-text transition-all duration-350 flex items-center justify-center min-w-[70px] ${
                isPlaying
                  ? 'scale-110 shadow-[0_0_25px_rgba(212,175,55,0.35)] z-10 rotate-1'
                  : audioSrc ? 'hover:scale-103 hover:shadow-md cursor-pointer hover:border-[var(--color-accent)]/30' : 'cursor-default'
              } ${
                block.type === 'words' ? 'px-8 bg-white/40 dark:bg-slate-900/30 border border-white/10 dark:border-slate-850' : 
                isPlaying 
                  ? 'bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0F4C3A] font-black border border-[#c19b2e]' 
                  : 'bg-white/70 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900 text-[var(--color-primary)] dark:text-[var(--color-accent)] font-bold'
              }`}
            >
              <span className={`relative z-10 ${isPlaying && block.type === 'words' ? 'text-[#0F4C3A]' : ''}`}>
                {text}
              </span>
              
              {/* Gold pulsing underline for active word items */}
              {block.type === 'words' && isPlaying && (
                <div className="absolute bottom-2 left-4 right-4 h-1 bg-[var(--color-accent)] rounded-full animate-pulse"></div>
              )}
              
              {/* Audio badge */}
              {audioSrc && !isPlaying && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0F4C3A] rounded-xl flex items-center justify-center shadow-[0_2px_8px_rgba(212,175,55,0.3)]">
                  <Volume2 className="w-2.5 h-2.5" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
