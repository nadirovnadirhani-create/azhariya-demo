"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { useTheme } from 'next-themes';
import { useSettingsStore, type Language, type LearningGoal } from '@/store/useSettingsStore';
import { Sparkles, ArrowLeft, ArrowRight, Check, Compass, BookOpen, PenTool, Globe, Eye, Moon, Sun } from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { setTheme } = useTheme();
  const setLanguageStore = useSettingsStore((s) => s.setLanguage);
  const setGoalsStore = useSettingsStore((s) => s.setGoals);
  const completeOnboarding = useSettingsStore((s) => s.completeOnboarding);

  // Selections
  const [language, setLanguage] = useState<Language>('ru');
  const [goals, setGoals] = useState<LearningGoal[]>([]);
  const [themePref, setThemePref] = useState('light');

  const toggleGoal = (goal: LearningGoal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleFinish = () => {
    setLanguageStore(language);
    setGoalsStore(goals);
    setTheme(themePref);
    completeOnboarding();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] hero-mesh islamic-pattern-bg py-12 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-emerald-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-[var(--color-accent)]/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg">
        {/* Step Indicator */}
        <div className="flex gap-3 mb-8 justify-center items-center">
          {[1, 2, 3].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                s === step 
                  ? 'bg-gradient-to-r from-[#B89222] to-[var(--color-accent)] w-10 shadow-[0_0_15px_var(--color-accent)]' 
                  : s < step 
                    ? 'bg-[var(--color-primary)] w-4' 
                    : 'bg-slate-200 dark:bg-slate-800 w-3'
              }`} 
            />
          ))}
        </div>

        <Card variant="glass" className="p-8 md:p-10 border border-white/20 dark:border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[var(--color-accent)]/5 blur-2xl pointer-events-none" />

          {/* Step 1: Language */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <Badge variant="accent" className="px-4 py-1.5 text-[9px] tracking-widest font-black uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  Шаг 1 из 3
                </Badge>
              </div>
              <h1 className="text-3xl font-black mb-3 text-center text-[var(--color-primary)] dark:text-white tracking-tight">Добро пожаловать!</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-center text-xs font-bold uppercase tracking-wider">Выберите язык интерфейса</p>
              
              <div className="space-y-4 mb-8">
                {([
                  { id: 'ru', label: 'Русский', native: 'Русский', desc: 'Интерфейс на русском языке' },
                  { id: 'en', label: 'English', native: 'English', desc: 'Interface in English language' },
                  { id: 'ar', label: 'العربية', native: 'العربية', desc: 'الواجهة باللغة العربية' },
                ] as const).map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      language === lang.id 
                        ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-bold scale-[1.01] shadow-lg shadow-[var(--color-accent)]/5' 
                        : 'border-slate-100 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/40 dark:hover:bg-slate-900/40'
                    }`}
                  >
                    <div>
                      <p className={`text-base ${language === lang.id ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)] font-extrabold' : 'text-[var(--color-text)] font-semibold'}`}>
                        {lang.label}
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">{lang.desc}</p>
                    </div>
                    
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                      language === lang.id 
                        ? 'bg-[var(--color-accent)] text-[#0A3C2F] shadow-md shadow-[var(--color-accent)]/20' 
                        : 'bg-slate-100 dark:bg-slate-800/80 text-transparent'
                    }`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                  </button>
                ))}
              </div>
              
              <Button variant="primary" onClick={() => setStep(2)} className="w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                Далее
                <ArrowRight size={14} />
              </Button>
            </div>
          )}

          {/* Step 2: Goals */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <Badge variant="accent" className="px-4 py-1.5 text-[9px] tracking-widest font-black uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  Шаг 2 из 3
                </Badge>
              </div>
              <h1 className="text-3xl font-black mb-3 text-center text-[var(--color-primary)] dark:text-white tracking-tight">Какая ваша цель?</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-center text-xs font-bold uppercase tracking-wider">Выберите интересующие вас направления</p>
              
              <div className="space-y-4 mb-8">
                {[
                  { id: 'quran', label: 'Научиться читать Коран', desc: 'Чтение с правильным таджвидом', icon: <Compass className="w-5 h-5 text-emerald-500" /> },
                  { id: 'understand', label: 'Понимать арабский язык', desc: 'Понимание устной речи и текстов', icon: <BookOpen className="w-5 h-5 text-blue-500" /> },
                  { id: 'write', label: 'Писать на арабском', desc: 'Написание и прописи букв', icon: <PenTool className="w-5 h-5 text-amber-500" /> },
                ].map((goal) => {
                  const isSelected = goals.includes(goal.id as LearningGoal);
                  return (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id as LearningGoal)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-bold scale-[1.01] shadow-lg shadow-[var(--color-accent)]/5' 
                          : 'border-slate-100 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/40 dark:hover:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-all ${isSelected ? 'bg-[var(--color-accent)]/20 text-[#0a3c2f] dark:text-[var(--color-accent)]' : 'bg-slate-100 dark:bg-slate-800/80'}`}>
                          {goal.icon}
                        </div>
                        <div>
                          <span className={`text-sm ${isSelected ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)] font-extrabold' : 'text-[var(--color-text)] font-semibold'}`}>
                            {goal.label}
                          </span>
                          <p className="text-[10px] text-slate-450 dark:text-slate-500 font-bold mt-0.5">{goal.desc}</p>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                        isSelected 
                          ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-[#0A3C2F]' 
                          : 'border-slate-300 dark:border-slate-650 bg-transparent'
                      }`}>
                        {isSelected && <Check size={12} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <ArrowLeft size={14} />
                  Назад
                </Button>
                <Button variant="primary" onClick={() => setStep(3)} className="flex-[2] py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  Далее
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Theme */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <Badge variant="accent" className="px-4 py-1.5 text-[9px] tracking-widest font-black uppercase flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 animate-pulse" />
                  Шаг 3 из 3
                </Badge>
              </div>
              <h1 className="text-3xl font-black mb-3 text-center text-[var(--color-primary)] dark:text-white tracking-tight">Тема оформления</h1>
              <p className="text-slate-500 dark:text-slate-400 mb-8 text-center text-xs font-bold uppercase tracking-wider">Выберите комфортный режим для занятий</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { id: 'light', label: 'Светлая', desc: 'Классический контраст', icon: <Sun size={20} /> },
                  { id: 'dark', label: 'Тёмная', desc: 'Бережёт зрение ночью', icon: <Moon size={20} /> },
                ].map((t) => {
                  const isSelected = themePref === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setThemePref(t.id)}
                      className={`text-center p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/10 font-bold scale-[1.02] shadow-lg shadow-[var(--color-accent)]/5' 
                          : 'border-slate-100 dark:border-slate-800/80 bg-white/20 dark:bg-slate-900/20 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/40 dark:hover:bg-slate-900/40'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all ${
                        isSelected 
                          ? 'bg-[var(--color-accent)] text-[#0A3C2F] shadow-lg shadow-[var(--color-accent)]/20' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                      }`}>
                        {t.icon}
                      </div>
                      <span className={`text-sm ${isSelected ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)] font-extrabold' : 'text-[var(--color-text)] font-semibold'}`}>
                        {t.label}
                      </span>
                      <span className="text-[9px] font-bold text-slate-450 dark:text-slate-500 mt-1 leading-normal uppercase tracking-wider">{t.desc}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1 py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                  <ArrowLeft size={14} />
                  Назад
                </Button>
                <Button 
                  variant="accent" 
                  onClick={handleFinish} 
                  className="flex-[2] py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 text-[#0A3C2F] shadow-lg shadow-[var(--color-accent)]/20"
                >
                  Начать обучение
                  <ArrowRight size={14} />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
