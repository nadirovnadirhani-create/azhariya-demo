"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, CheckCircle2, ShieldCheck, Diamond, Sparkles, AlertCircle, ArrowLeft } from 'lucide-react';
import { useWalletStore } from '@/store/useWalletStore';
import { Card } from '@/shared/ui/Card';
import { Button } from '@/shared/ui/Button';
import { Badge } from '@/shared/ui/Badge';

export default function WalletPage() {
  const router = useRouter();
  const { subscription, topUp, purchasePlan } = useWalletStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = () => {
    setIsProcessing(true);
    // Mock processing delay
    setTimeout(() => {
      topUp(100);
      purchasePlan('premium');
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    }, 1500);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] hero-mesh islamic-pattern-bg flex flex-col items-center justify-center p-4">
        <Card variant="glass" className="p-10 text-center animate-scale-in max-w-md w-full border border-white/20 dark:border-white/5 shadow-2xl">
          <div className="w-20 h-20 bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-450 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner animate-float">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-black text-[var(--color-primary)] dark:text-white mb-3 tracking-tight">Оплата успешна!</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-semibold max-w-xs mx-auto leading-relaxed">
            Добро пожаловать в Premium-клуб Академии Азхария. Все уроки теперь полностью разблокированы.
          </p>
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
        <div className="max-w-lg mx-auto glass rounded-2xl px-4 py-3 flex items-center justify-between shadow-[0_12px_30px_rgba(0,0,0,0.06)] border border-white/20 dark:border-white/5 pointer-events-auto">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-slate-650 dark:text-slate-350 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-grow text-center pr-9">
            <h1 className="text-base font-black text-[var(--color-primary)] dark:text-white uppercase tracking-wider">
              Подписка
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-lg relative z-10 animate-fade-in-up">
        {subscription ? (
          <Card variant="glass" className="p-8 text-center relative overflow-hidden border border-white/20 dark:border-white/5 shadow-2xl">
            {/* Giant watermark */}
            <div className="absolute top-0 right-0 p-6 text-[var(--color-accent)] opacity-5 dark:opacity-10 pointer-events-none">
              <Diamond className="w-40 h-40 animate-float" />
            </div>
            
            <div className="relative z-10">
              <div className="w-20 h-20 bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] text-[#0A3C2F] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[var(--color-accent)]/20 animate-float">
                <Sparkles className="w-9 h-9" />
              </div>
              <h2 className="text-3xl font-black text-[var(--color-primary)] dark:text-white mb-1.5 tracking-tight">
                {subscription.planName} активен
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-450 mb-8 font-bold uppercase tracking-wider">
                Оформлен: {new Date(subscription.activatedAt).toLocaleDateString()}
              </p>
              
              <div className="bg-emerald-500/10 dark:bg-emerald-950/20 p-4.5 rounded-2xl flex items-center justify-center gap-3 text-emerald-700 dark:text-emerald-450 border border-emerald-500/10 dark:border-emerald-900/20">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="font-bold text-sm">Все 31 урок полностью открыты</span>
              </div>
            </div>
          </Card>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="flex justify-center mb-2">
                <Badge variant="accent" className="px-3.5 py-1 text-[9px] font-black uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Тарифы
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[var(--color-primary)] dark:text-white mb-3 tracking-tight">
                Полный доступ к курсу
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-450 max-w-sm mx-auto font-bold uppercase tracking-wider">
                Откройте все 31 урок, тесты и каллиграфические прописи.
              </p>
            </div>

            <Card variant="spatial" className="p-8 relative overflow-hidden mb-8 border border-white/20 dark:border-white/5 shadow-2xl">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#B89222] to-[var(--color-accent)] text-[#0A3C2F] text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl shadow-md">
                Популярно
              </div>
              
              <h3 className="text-2xl font-black text-[var(--color-primary)] dark:text-white mb-2">Premium доступ</h3>
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-5xl font-black text-[var(--color-accent)] tracking-tight">999₽</span>
                <span className="text-xs text-slate-500 dark:text-slate-450 font-bold uppercase tracking-wider">/ месяц</span>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  'Все 31 урок курса "Азхария 1"',
                  'Аурой-сопровождение от носителей',
                  'Интерактивная тренировка письма',
                  'Проверочные тесты и сертификаты',
                  'Отсутствие ограничений'
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm text-[var(--color-text)]">
                    <CheckCircle2 className="text-[var(--color-accent)] flex-shrink-0 mt-0.5 w-5 h-5" />
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant="accent"
                size="lg"
                onClick={handleSubscribe}
                disabled={isProcessing}
                className="w-full flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider shadow-xl text-[#0A3C2F] shadow-[var(--color-accent)]/15 py-4"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#0A3C2F]/20 border-t-[#0A3C2F]"></span>
                    Обработка...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Оформить подписку
                  </>
                )}
              </Button>
              
              <div className="mt-5 flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-550 font-black uppercase tracking-wider">
                <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                <span>Безопасная сделка SSL</span>
              </div>
            </Card>

            <div className="flex items-start gap-3.5 bg-amber-500/10 dark:bg-amber-950/20 p-4.5 rounded-2xl text-xs text-amber-700 dark:text-amber-450 border border-amber-500/10 dark:border-amber-900/30 shadow-inner">
              <AlertCircle className="flex-shrink-0 w-5 h-5" />
              <p className="font-semibold leading-relaxed text-left">
                Внимание! Это симуляция оплаты для демонстрации. Списание реальных средств не производится.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
