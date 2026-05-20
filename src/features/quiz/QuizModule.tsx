"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { lessons } from '@/data/lessons';
import { CheckCircle2, XCircle, ArrowRight, Award, Volume2, Sparkles } from 'lucide-react';
import { useProgressStore } from '@/store/useProgressStore';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { playArabic } from '@/shared/lib/audio';
import { Badge } from '@/shared/ui/Badge';

interface Question {
  id: number;
  type: 'identify_letter' | 'reading' | 'audio' | 'form';
  prompt: string;
  correctAnswer: string;
  options: string[];
  audioSrc?: string;
}

export default function QuizModule({ lessonId }: { lessonId: number }) {
  const router = useRouter();
  const { incrementStreak } = useProgressStore();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return;

    let allItems: any[] = [];
    let writingBlock: any = null;
    
    lesson.blocks.forEach(b => {
      if (b.type === 'writing') writingBlock = b;
      if (b.items) {
        allItems = [...allItems, ...b.items];
      }
    });

    const generatedQuestions: Question[] = [];
    const qCount = Math.min(5, Math.max(3, allItems.length));
    
    const fallbackLetters = ['ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ'];
    const fallbackWords = ['بَاب', 'تُوت', 'تِين', 'بِيب', 'أَب'];

    for (let i = 0; i < qCount; i++) {
      const qTypeRandom = Math.random();
      let type: Question['type'] = 'reading';
      
      if (qTypeRandom < 0.25 && writingBlock && writingBlock.forms) {
        type = 'form';
      } else if (qTypeRandom < 0.5) {
        type = 'audio';
      } else if (qTypeRandom < 0.75) {
        type = 'identify_letter';
      }

      const item = allItems[Math.floor(Math.random() * allItems.length)] || { text: 'بَ' };
      const isObj = typeof item === 'object';
      const text = isObj ? item.text : item;
      const audioSrc = isObj ? item.audio : null;

      let prompt = '';
      let correctAnswer = text;
      let optionsSet = new Set<string>();
      optionsSet.add(correctAnswer);

      if (type === 'form' && writingBlock && writingBlock.forms) {
        prompt = `Какая форма буквы ${writingBlock.letter} в середине слова?`;
        correctAnswer = writingBlock.forms[2] || writingBlock.forms[0];
        optionsSet = new Set(writingBlock.forms);
      } else if (type === 'audio' && audioSrc) {
        prompt = 'Что вы слышите?';
        while (optionsSet.size < 4) {
          const randomFallback = fallbackLetters[Math.floor(Math.random() * fallbackLetters.length)];
          optionsSet.add(randomFallback);
        }
      } else if (type === 'identify_letter') {
        prompt = `Как пишется этот элемент?`;
        while (optionsSet.size < 4) {
          const randomFallback = text.length > 2 
            ? fallbackWords[Math.floor(Math.random() * fallbackWords.length)]
            : fallbackLetters[Math.floor(Math.random() * fallbackLetters.length)];
          optionsSet.add(randomFallback);
        }
      } else {
        type = 'reading';
        prompt = `Прочитайте вслух: ${text}`;
        correctAnswer = 'Правильно';
        optionsSet = new Set(['Правильно', 'Неправильно']);
      }

      while (optionsSet.size < 4 && type !== 'reading') {
        const randomFallback = fallbackLetters[Math.floor(Math.random() * fallbackLetters.length)];
        optionsSet.add(randomFallback);
      }

      generatedQuestions.push({
        id: i,
        type,
        prompt,
        correctAnswer,
        options: Array.from(optionsSet).sort(() => Math.random() - 0.5),
        audioSrc: type === 'audio' ? audioSrc : undefined
      });
    }

    setQuestions(generatedQuestions);
  }, [lessonId]);

  const playAudio = (src: string | undefined, fallbackText?: string) => {
    setIsPlayingAudio(true);
    playArabic(src ?? null, fallbackText, {
      onEnd: () => setIsPlayingAudio(false),
    });
  };

  const handleSelect = (option: string) => {
    if (selectedAnswer !== null) return;
    
    const correct = option === questions[currentQuestionIndex].correctAnswer;
    setSelectedAnswer(option);
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      incrementStreak();
      setQuizFinished(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-t-transparent border-[var(--color-primary)] mb-4"></span>
        <p className="text-[var(--color-primary)] font-bold tracking-widest text-xs uppercase">Подготовка теста...</p>
      </div>
    );
  }

  if (quizFinished) {
    const isPerfect = score === questions.length;
    return (
      <Card variant="glass" className="p-10 text-center animate-scale-in border border-white/20 dark:border-white/5 max-w-md mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-48 h-48 rounded-full bg-[var(--color-accent)]/10 blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0A3C2F] rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-[var(--color-accent)]/20 animate-float">
            <Award className="w-10 h-10" />
          </div>
          
          <Badge variant="accent" className="mb-4 uppercase tracking-[0.2em] text-[9px] px-3.5 py-1">Результат</Badge>
          
          <h2 className="text-3xl font-black text-[var(--color-primary)] dark:text-white mb-2 leading-none">
            {isPerfect ? 'Идеально!' : 'Тест пройден!'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-8 font-semibold">
            {isPerfect ? 'Вы ответили на все вопросы без ошибок.' : 'Хороший результат, продолжайте практиковаться.'}
          </p>
          
          <div className="bg-slate-50/55 dark:bg-slate-900/30 rounded-2xl p-5 mb-8 border border-slate-100 dark:border-slate-800/80">
            <span className="text-4xl font-black text-[var(--color-primary)] dark:text-[var(--color-accent)]">{score}</span>
            <span className="text-slate-400 dark:text-slate-500 font-extrabold mx-2 text-2xl">/</span>
            <span className="text-slate-400 dark:text-slate-500 font-extrabold text-2xl">{questions.length}</span>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-black mt-2">Верных ответов</p>
          </div>

          <Button 
            size="lg"
            variant="primary"
            onClick={() => router.push('/dashboard')}
            className="w-full shadow-lg"
          >
            Вернуться на главную
          </Button>
        </div>
      </Card>
    );
  }

  const question = questions[currentQuestionIndex];

  return (
    <Card variant="glass" className="p-8 md:p-10 border border-white/20 dark:border-white/5 animate-scale-in max-w-lg mx-auto shadow-2xl">
      <div className="flex justify-between items-center mb-8 border-b border-slate-100 dark:border-slate-800/60 pb-5">
        <Badge variant="accent" className="px-3.5 py-1 text-[9px] font-black uppercase tracking-wider">
          Вопрос {currentQuestionIndex + 1} из {questions.length}
        </Badge>
        <span className="text-[var(--color-accent)] font-bold text-xs uppercase tracking-wider">Счет: {score}</span>
      </div>

      <div className="text-center mb-10">
        <h3 className="text-2xl md:text-3xl font-black text-[var(--color-primary)] dark:text-white leading-snug mb-6">
          {question.prompt}
        </h3>
        
        {question.type === 'audio' && (
          <div className="relative inline-block">
            {/* Pulsing ring overlays */}
            {isPlayingAudio && (
              <>
                <div className="absolute inset-0 rounded-full border border-[var(--color-accent)] animate-ping opacity-75" />
                <div className="absolute -inset-4 rounded-full border border-[var(--color-accent)]/40 animate-ping opacity-45" style={{ animationDelay: '0.2s' }} />
              </>
            )}
            
            <button
              onClick={() => playAudio(question.audioSrc, question.correctAnswer)}
              className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all cursor-pointer relative z-10 ${
                isPlayingAudio 
                  ? 'bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0F4C3A] scale-105 shadow-xl shadow-[var(--color-accent)]/20' 
                  : 'bg-[var(--color-primary)] text-white hover:scale-105 shadow-lg shadow-[var(--color-primary)]/15'
              }`}
            >
              <Volume2 className={`w-8 h-8 ${isPlayingAudio ? 'animate-pulse' : ''}`} />
            </button>
          </div>
        )}
      </div>

      <div className={`grid gap-4 mb-8 ${question.type === 'reading' ? 'grid-cols-2' : 'grid-cols-2'}`}>
        {question.options.map((option, idx) => {
          let btnClass = "p-5 md:p-6.5 rounded-2xl border transition-all duration-300 text-xl md:text-3xl font-extrabold cursor-pointer flex items-center justify-center ";
          
          if (selectedAnswer === null) {
            btnClass += "border-slate-100 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/20 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5 text-[var(--color-text)]";
            if (question.type !== 'reading') btnClass += " arabic-text";
          } else {
            if (option === question.correctAnswer) {
              btnClass += "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 scale-[1.02] shadow-md shadow-emerald-500/5";
              if (question.type !== 'reading') btnClass += " arabic-text";
            } else if (option === selectedAnswer) {
              btnClass += "border-rose-500 bg-rose-500/10 text-rose-600 dark:text-rose-450";
              if (question.type !== 'reading') btnClass += " arabic-text";
            } else {
              btnClass += "border-slate-100 dark:border-slate-900/80 bg-white/10 dark:bg-slate-900/10 opacity-30 text-[var(--color-text)]";
              if (question.type !== 'reading') btnClass += " arabic-text";
            }
          }

          return (
            <button 
              key={idx} 
              onClick={() => handleSelect(option)}
              disabled={selectedAnswer !== null}
              className={btnClass}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer !== null && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 animate-scale-in p-5 bg-slate-50/80 dark:bg-slate-950/20 rounded-2xl border border-slate-100 dark:border-slate-900/80">
          <div className="flex items-center gap-3">
            {isCorrect ? (
              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                <XCircle className="w-5 h-5 shrink-0" />
              </div>
            )}
            <div className="text-left">
              <p className={`font-black text-sm ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {isCorrect ? 'Правильно!' : 'Не совсем верно.'}
              </p>
              {!isCorrect && (
                <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-0.5 font-bold">Правильный ответ: {question.correctAnswer}</p>
              )}
            </div>
          </div>
          
          <Button 
            size="md"
            variant="primary"
            onClick={handleNext}
            className="w-full sm:w-auto shadow-md"
          >
            Далее <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </Card>
  );
}
