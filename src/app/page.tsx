"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useWalletStore } from '@/store/useWalletStore';
import { alphabet } from '@/data/alphabet';
import { 
  ArrowRight, 
  BookOpen, 
  Headphones, 
  PenTool, 
  Zap, 
  CheckCircle2, 
  Sparkles, 
  Diamond, 
  ShieldCheck, 
  Volume2, 
  Wallet, 
  Coins, 
  HelpCircle,
  GraduationCap,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Badge } from '@/shared/ui/Badge';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';

export default function Landing() {
  const { user } = useAuthStore();
  const { subscription, balance } = useWalletStore();
  const isAuthenticated = !!user;
  const isPremium = !!subscription;

  const [activeLetterId, setActiveLetterId] = useState<number | null>(null);

  const playSound = (id: number, audioPath: string) => {
    if (!audioPath) return;
    
    // Stop any currently playing audio if needed
    setActiveLetterId(id);
    
    const audio = new Audio(audioPath);
    audio.play().catch(e => {
      console.error("Error playing audio:", e);
      setActiveLetterId(null);
    });

    audio.onended = () => {
      setActiveLetterId(null);
    };
  };

  return (
    <div className="landing flex flex-col min-h-screen hero-mesh islamic-pattern-bg">
      {/* ══════════════════ HERO SECTION ══════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 pointer-events-none">
          {/* Radial light overlays */}
          <div className="absolute top-[15%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-emerald-600/10 dark:bg-sky-500/5 blur-[130px]" />
          <div className="absolute bottom-[15%] right-[-10%] w-[65vw] h-[65vw] rounded-full bg-[var(--color-accent)]/10 blur-[140px]" />
          
          {/* Watermarked Arabic letters in background */}
          <div className="absolute right-[8%] top-[20%] opacity-5 dark:opacity-[0.08] text-[26rem] font-serif select-none pointer-events-none animate-float text-[var(--color-primary)] dark:text-[var(--color-accent)]">
            أ
          </div>
          <div className="absolute left-[10%] bottom-[12%] opacity-5 dark:opacity-[0.07] text-[20rem] font-serif select-none pointer-events-none animate-float text-[var(--color-accent)]" style={{ animationDelay: '2.5s' }}>
            ب
          </div>
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 text-left space-y-8 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full shadow-md border border-white/30 dark:border-white/5">
                <Sparkles size={14} className="text-[var(--color-accent)] animate-pulse" />
                <span className="text-[var(--color-primary)] dark:text-[var(--color-accent-light)] text-xs font-black uppercase tracking-[0.2em]">
                  Методика Аль-Азхар
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black text-[var(--color-primary)] dark:text-white leading-[1.1] tracking-tight">
                Изучайте арабский язык <br />
                <span className="text-gold-gradient drop-shadow-sm">по методике Азхария</span>
              </h1>

              <p className="text-2xl md:text-3xl font-serif text-[var(--color-primary)]/40 dark:text-[var(--color-accent)]/40 tracking-wider text-right lg:text-left pr-4" dir="rtl">
                بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
              </p>

              <p className="text-md sm:text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl leading-relaxed">
                Интерактивная платформа для изучения арабского алфавита, правил чтения и основ таджвида. Пройдите путь от нуля до уверенного чтения Корана по оригинальному учебнику.
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href={isAuthenticated ? '/dashboard' : '/auth'}>
                  <Button 
                    variant="accent" 
                    size="lg"
                    className="shadow-2xl px-8 py-4.5 rounded-2xl hover:scale-105 transition-all text-sm uppercase tracking-wider font-bold"
                  >
                    {isAuthenticated ? 'Перейти к обучению' : 'Начать бесплатно'}
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
                <a href="#alphabet">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="px-8 py-4.5 rounded-2xl hover:scale-105 transition-all text-sm uppercase tracking-wider font-bold"
                  >
                    Послушать алфавит
                  </Button>
                </a>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-3 gap-4 pt-8 max-w-xl">
                {[
                  { value: '28', label: 'букв алфавита' },
                  { value: '31', label: 'урок по книге' },
                  { value: '3', label: 'курса в MVP' }
                ].map((stat, i) => (
                  <Card key={i} variant="glass" className="p-4 text-center border border-white/20 dark:border-white/5 hover:-translate-y-1 transition-transform">
                    <span className="block text-2xl md:text-3xl font-black text-[var(--color-accent)]">{stat.value}</span>
                    <span className="text-[10px] sm:text-xs text-[var(--color-text-muted)] uppercase tracking-wider font-semibold">{stat.label}</span>
                  </Card>
                ))}
              </div>
            </div>

            {/* Hero Right Visual (Interactive Calligraphy Logo) */}
            <div className="lg:col-span-5 flex justify-center items-center relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative group perspective-container">
                {/* Glowing Aura */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#B89222]/10 to-[var(--color-accent)]/20 rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-700 opacity-80" />
                
                {/* Decorative Pattern behind logo */}
                <div className="absolute inset-0 border border-[var(--color-accent)]/10 dark:border-white/5 rounded-full scale-110 animate-spin-slow pointer-events-none" />
                <div className="absolute inset-4 border border-dashed border-[var(--color-accent)]/20 dark:border-white/10 rounded-full animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse' }} />

                {/* Styled logo calligraphy */}
                <div className="relative z-10 glass-premium border border-white/35 dark:border-white/10 w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center cursor-pointer transition-all duration-700 select-none hover:rotate-[-2deg] hover:scale-105 shadow-2xl hover:shadow-[var(--color-accent)]/10">
                  <div className="text-center">
                    <span className="block text-9xl md:text-[11rem] text-gold-gradient font-serif leading-none tracking-tight select-none transition-all duration-700 hover:drop-shadow-[0_0_35px_rgba(212,175,55,0.4)]" dir="rtl">
                      أزهـرية
                    </span>
                    <span className="block text-xs uppercase tracking-[0.45em] text-[var(--color-text-muted)] font-black mt-2">
                      A Z H A R I Y A
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ INTERACTIVE ALPHABET SECTION ══════════════════ */}
      <section id="alphabet" className="py-28 relative border-t border-slate-200/20 dark:border-slate-800/10">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <Badge variant="accent" className="uppercase tracking-[0.2em] text-[10px] px-3.5 py-1">Интерактив</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--color-primary)] dark:text-white leading-tight">
              Интерактивный алфавит
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium">
              Нажмите на карточку буквы, чтобы услышать правильное произношение носителем языка
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4 stagger-children">
            {alphabet.map((item) => {
              const isActive = activeLetterId === item.id;
              return (
                <Card
                  key={item.id}
                  variant="spatial"
                  onClick={() => playSound(item.id, item.audio)}
                  className={`p-6 text-center flex flex-col items-center justify-between border select-none transition-all duration-300 relative overflow-hidden ${
                    isActive 
                      ? 'border-[var(--color-accent)] ring-2 ring-[var(--color-accent)]/20 scale-105 shadow-xl bg-[var(--color-accent)]/5' 
                      : 'border-white/10 dark:border-white/5 hover:border-[var(--color-accent)]/40 hover:-translate-y-1.5'
                  }`}
                >
                  <div className={`absolute top-2 right-2 transition-opacity ${isActive ? 'opacity-100' : 'opacity-25 group-hover:opacity-100'}`}>
                    <Volume2 size={12} className={isActive ? 'text-[var(--color-accent)] animate-bounce' : 'text-slate-400'} />
                  </div>
                  
                  <div className={`text-5xl md:text-6xl font-serif font-bold mb-4 tracking-normal transition-all duration-300 ${
                    isActive ? 'text-[var(--color-accent)] scale-110 drop-shadow-[0_0_12px_rgba(212,175,55,0.3)]' : 'text-[var(--color-primary)] dark:text-white'
                  }`} dir="rtl">
                    {item.letter}
                  </div>

                  <div className="space-y-0.5 mt-auto">
                    <span className="block text-sm font-extrabold text-[var(--color-text)] dark:text-slate-200">
                      {item.name}
                    </span>
                    <span className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
                      [{item.translit}]
                    </span>
                  </div>

                  {/* Sound Wave Ripple Effect when playing */}
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-1 flex justify-center gap-0.5 px-6 pb-1">
                      <span className="w-1 bg-[var(--color-accent)] rounded-full animate-pulse h-2" style={{ animationDelay: '0.1s' }} />
                      <span className="w-1 bg-[var(--color-accent)] rounded-full animate-pulse h-3" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 bg-[var(--color-accent)] rounded-full animate-pulse h-1" style={{ animationDelay: '0.3s' }} />
                      <span className="w-1 bg-[var(--color-accent)] rounded-full animate-pulse h-3" style={{ animationDelay: '0.4s' }} />
                      <span className="w-1 bg-[var(--color-accent)] rounded-full animate-pulse h-2" style={{ animationDelay: '0.5s' }} />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12 animate-fade-in-up">
            <Link href="/dashboard">
              <Button variant="primary" className="rounded-2xl shadow-xl px-8 py-3.5 hover:scale-103 font-bold uppercase tracking-wider text-xs">
                Перейти к курсу по алфавиту
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ FEATURES SECTION ══════════════════ */}
      <section id="features" className="py-28 relative bg-slate-500/5 dark:bg-slate-950/20 border-t border-slate-200/20 dark:border-slate-800/10">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <Badge variant="accent" className="uppercase tracking-[0.2em] text-[10px] px-3.5 py-1">Почему мы</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--color-primary)] dark:text-white">
              Почему именно Азхария?
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium">
              Проверенная временем академическая методика в современном цифровом формате
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {[
              {
                icon: <GraduationCap className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Методика Аль-Азхар',
                desc: 'Учебная программа строго соответствует академическому стандарту и разработана выпускником старейшего исламского университета.'
              },
              {
                icon: <Headphones className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Озвучка букв и слов',
                desc: 'Встроенные звуковые дорожки для каждого упражнения, записанные профессиональным диктором — носителем арабского языка.'
              },
              {
                icon: <PenTool className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Интерактивные прописи',
                desc: 'Тренировка каллиграфии пальцем или стилусом прямо на холсте экрана с мгновенным сохранением и проверкой.'
              },
              {
                icon: <Zap className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Интерактивные тесты',
                desc: 'Интеллектуальные вопросы после каждого урока для закрепления материала по аудированию, чтению и огласовкам.'
              },
              {
                icon: <Layers className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Отслеживание прогресса',
                desc: 'Игровая система с ежедневными стриками активности, подробным календарем посещений и набором наград.'
              },
              {
                icon: <BookOpen className="w-7 h-7 text-[var(--color-accent)]" />,
                title: 'Основы таджвида',
                desc: 'Разбор правил слияния звуков, долготы гласных, сукуна и ташдида для правильного чтения Священного Корана.'
              }
            ].map((item, i) => (
              <Card key={i} variant="glass" className="p-8 border border-white/25 dark:border-white/5 hover:border-[var(--color-accent)]/30 hover:scale-[1.02] transition-all flex flex-col h-full card-hover">
                <div className="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/10 flex items-center justify-center mb-6 shadow-inner">
                  {item.icon}
                </div>
                <h3 className="text-xl font-extrabold mb-3 text-[var(--color-primary)] dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--color-text-muted)] leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SUBSCRIPTION & WALLET INTEGRATION ══════════════════ */}
      <section id="pricing" className="py-28 relative border-t border-slate-200/20 dark:border-slate-800/10">
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <Badge variant="accent" className="uppercase tracking-[0.2em] text-[10px] px-3.5 py-1">Подписка и Оплата</Badge>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--color-primary)] dark:text-white">
              Выберите ваш план обучения
            </h2>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] font-medium">
              Активация доступа производится через симуляцию внешнего Wallet
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-5xl mx-auto">
            {/* Tariff plans */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {/* Plan 1: Demo */}
              <Card variant="glass" className="p-8 border border-white/20 dark:border-white/5 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300">
                <div>
                  <h3 className="text-2xl font-black text-[var(--color-primary)] dark:text-white mb-2">Демо-доступ</h3>
                  <p className="text-xs text-[var(--color-text-muted)] font-bold mb-6">Базовое знакомство с платформой</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-[var(--color-primary)] dark:text-white tracking-tight">Бесплатно</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>Первые 5 уроков курса</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>Аудио озвучка алфавита</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                      <span>Базовые интерактивные тесты</span>
                    </li>
                  </ul>
                </div>

                <Link href={isAuthenticated ? '/dashboard' : '/auth'} className="w-full">
                  <Button variant="outline" className="w-full text-xs font-bold uppercase tracking-wider rounded-xl">
                    Начать демо
                  </Button>
                </Link>
              </Card>

              {/* Plan 2: Premium */}
              <Card variant="glass" className={`p-8 border-2 ${isPremium ? 'border-emerald-500 bg-emerald-500/5' : 'border-[var(--color-accent)]'} relative flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300 shadow-xl shadow-[var(--color-accent)]/5`}>
                {isPremium ? (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md">
                    Активен
                  </div>
                ) : (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#B89222] to-[var(--color-accent)] text-[#0A3C2F] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md">
                    Рекомендуем
                  </div>
                )}
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-2xl font-black text-[var(--color-primary)] dark:text-white">Полный доступ</h3>
                    <Diamond size={18} className="text-[var(--color-accent)] animate-pulse" />
                  </div>
                  <p className="text-xs text-[var(--color-text-muted)] font-bold mb-6">Полный практический курс без ограничений</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-black text-[var(--color-accent)] tracking-tight">999 ₽</span>
                    <span className="text-xs text-[var(--color-text-muted)] font-bold uppercase tracking-wider">/ месяц</span>
                  </div>

                  <ul className="space-y-3.5 mb-10">
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                      <span>Все 31 интерактивный урок</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                      <span>Полный холст прописей и Canvas</span>
                    </li>
                    <li className="flex items-center gap-3 text-xs font-bold text-[var(--color-text)]">
                      <CheckCircle2 size={16} className="text-[var(--color-accent)] flex-shrink-0" />
                      <span>Все тесты, статистика и достижения</span>
                    </li>
                  </ul>
                </div>

                <Link href="/wallet" className="w-full">
                  <Button variant="accent" className="w-full text-xs font-bold uppercase tracking-wider rounded-xl">
                    {isPremium ? 'Перейти в Кошелек' : 'Купить Premium'}
                  </Button>
                </Link>
              </Card>
            </div>

            {/* Wallet Quick Status Widget */}
            <div className="lg:col-span-4 flex">
              <Card variant="glass" className="p-8 border border-white/20 dark:border-white/5 flex flex-col justify-between w-full relative overflow-hidden bg-slate-500/5">
                {/* Background graphic */}
                <div className="absolute -bottom-8 -right-8 text-[var(--color-primary)] dark:text-white opacity-[0.03] select-none pointer-events-none">
                  <Wallet size={200} />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black text-[var(--color-primary)] dark:text-white uppercase tracking-wider flex items-center gap-2">
                      <Wallet size={18} className="text-[var(--color-accent)]" />
                      Демо-Кошелек
                    </h3>
                    <Badge variant={isPremium ? 'accent' : 'outline'}>
                      {isPremium ? 'Premium' : 'Demo'}
                    </Badge>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-wider block">Виртуальный Баланс</span>
                    <div className="flex items-center gap-2">
                      <Coins className="text-[var(--color-accent)] w-6 h-6" />
                      <span className="text-3xl font-black tracking-tight text-[var(--color-primary)] dark:text-white">
                        ${balance.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Flow pipeline visual */}
                  <div className="border-t border-dashed border-slate-200/40 dark:border-slate-800/40 pt-4 space-y-4">
                    <span className="text-[10px] text-[var(--color-text-muted)] font-black uppercase tracking-wider block">Цепочка оплаты MVP</span>
                    
                    <div className="space-y-3">
                      {[
                        { step: '1', label: 'Выбор плана Premium' },
                        { step: '2', label: 'Переход в Wallet' },
                        { step: '3', label: 'Пополнение баланса' },
                        { step: '4', label: 'Активация подписки' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <span className="w-5 h-5 rounded-full bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/15 text-[var(--color-primary)] dark:text-[var(--color-accent)] text-[10px] font-black flex items-center justify-center">
                            {item.step}
                          </span>
                          <span className="text-xs font-semibold text-[var(--color-text)]">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 pt-6">
                  <Link href="/wallet" className="w-full">
                    <Button variant="outline" className="w-full text-xs font-black uppercase tracking-wider rounded-xl py-3 flex items-center justify-center gap-2">
                      Открыть Wallet
                      <ArrowUpRight size={14} />
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BOTTOM SECTION ══════════════════ */}
      <section className="py-24 relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white border-t border-white/5">
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-repeat bg-center" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0l30 30-30 30L0 30 30 0zm0 10L10 30l20 20 20-20L30 10z\' fill=\'%23ffffff\' fill-opacity=\'0.2\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }} />
        
        <div className="container mx-auto px-6 lg:px-12 text-center relative z-10 space-y-8 animate-fade-in-up">
          <p className="text-2xl md:text-3xl font-serif text-[var(--color-accent-light)] tracking-widest" dir="rtl">
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </p>
          
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Начните свой путь к знаниям сегодня
          </h2>
          
          <p className="text-slate-350 max-w-xl mx-auto font-medium text-sm md:text-base leading-relaxed">
            Присоединяйтесь к студентам платформы, изучающим арабский язык по классической академической книге.
          </p>

          <div className="pt-4">
            <Link href={isAuthenticated ? '/dashboard' : '/auth'}>
              <Button variant="accent" size="lg" className="rounded-2xl shadow-2xl px-10 py-5 hover:scale-105 font-bold uppercase tracking-wider text-sm">
                Начать обучение бесплатно
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="py-12 border-t border-slate-200/40 dark:border-slate-800/40 mt-auto bg-slate-50/50 dark:bg-slate-950/20">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] flex items-center justify-center text-[#0A3C2F] font-black text-sm">
              A
            </div>
            <span className="text-sm font-black tracking-wider text-[var(--color-primary)] dark:text-white">
              AZHARIYA ACADEMY
            </span>
          </div>
          
          <p className="text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider text-center md:text-left">
            © 2026 Azharia. Разработано по оригинальной методике.
          </p>
          
          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] font-semibold uppercase tracking-wider">
            <ShieldCheck size={14} className="text-emerald-500" />
            <span>Защищенная HTTPS сессия</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
