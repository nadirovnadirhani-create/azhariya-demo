"use client";

import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useProgressStore } from '@/store/useProgressStore';
import { useWalletStore } from '@/store/useWalletStore';
import { User, LogOut, Settings, Award, ChevronRight, Bell, Shield, ArrowLeft, CreditCard, Sparkles } from 'lucide-react';
import { Card } from '@/shared/ui/Card';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { completedLessons, streak } = useProgressStore();
  const { subscription } = useWalletStore();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

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
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-slate-600 dark:text-slate-350 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-grow text-center pr-9">
            <h1 className="text-base font-black text-[var(--color-primary)] dark:text-white uppercase tracking-wider">
              Профиль
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 max-w-lg relative z-10">
        
        {/* Profile Details Card */}
        <Card variant="glass" className="p-8 mb-8 text-center relative shadow-2xl border border-white/10 dark:border-white/5">
          <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[var(--color-accent)]/5 blur-xl pointer-events-none" />
          
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] dark:from-[var(--color-primary)] dark:to-emerald-950/40 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-white/50 dark:border-slate-800 shadow-lg relative">
            <User className="w-10 h-10 text-white dark:text-[var(--color-accent)]" />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] rounded-xl flex items-center justify-center shadow-md">
              <Award className="w-4 h-4 text-[#0a3c2f]" />
            </div>
          </div>
          
          <h2 className="text-2xl font-black text-[var(--color-primary)] dark:text-white mb-1.5 tracking-tight">
            {user?.name || 'Иван Иванов'}
          </h2>
          <p className="text-xs text-slate-450 dark:text-slate-400 mb-6 font-bold uppercase tracking-wider">
            {user?.email || 'student@azhariya.com'}
          </p>

          <div className="text-left mt-6 mb-2 border-t border-slate-100 dark:border-slate-850 pt-6">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Статистика обучения</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <p className="text-3xl font-black text-[var(--color-primary)] dark:text-[var(--color-accent)] mb-1 tracking-tight">
                  {completedLessons.length}
                </p>
                <p className="text-[8px] font-black text-slate-450 dark:text-slate-450 uppercase tracking-widest text-center leading-normal">
                  Пройдено уроков
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center p-4 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800/80">
                <p className="text-3xl font-black text-orange-500 mb-1 tracking-tight">
                  {streak.count} дн.
                </p>
                <p className="text-[8px] font-black text-slate-450 dark:text-slate-450 uppercase tracking-widest text-center leading-normal">
                  Ударный режим
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Subscription Block */}
        <Card variant="glass" className="p-6 mb-8 shadow-md flex flex-col sm:flex-row items-center justify-between border-2 border-[var(--color-accent)]/20 dark:border-[var(--color-accent)]/10 gap-4">
          <div className="text-center sm:text-left">
            <p className="text-[10px] text-slate-450 dark:text-slate-500 font-black uppercase tracking-wider mb-1">Тарифный план</p>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="font-extrabold text-base text-[var(--color-primary)] dark:text-white">
                {subscription ? subscription.planName : 'Демо-доступ'}
              </span>
              <Badge variant="accent" className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider flex items-center gap-0.5">
                <Sparkles className="w-2 h-2" />
                {subscription ? 'PRO' : 'FREE'}
              </Badge>
            </div>
          </div>
          
          <Button 
            variant={subscription ? "outline" : "accent"}
            onClick={() => router.push('/wallet')}
            className={`w-full sm:w-auto shadow-md ${!subscription ? 'text-[#0a3c2f] font-bold' : ''}`}
            size="sm"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Купить подписку
          </Button>
        </Card>

        {/* Menu Items */}
        <Card variant="glass" className="p-0 overflow-hidden mb-8 shadow-lg border border-white/10 dark:border-white/5">
          {[
            { icon: <User className="w-5 h-5" />, label: 'Личные данные', color: 'text-blue-500 bg-blue-500/10', action: () => alert('Редактирование личных данных (будет реализовано)') },
            { icon: <Bell className="w-5 h-5" />, label: 'Уведомления', color: 'text-purple-500 bg-purple-500/10', action: () => alert('Управление уведомлениями (будет реализовано)') },
            { icon: <Shield className="w-5 h-5" />, label: 'Безопасность', color: 'text-emerald-500 bg-emerald-500/10', action: () => alert('Настройки безопасности: смена пароля (будет реализовано)') },
            { icon: <Settings className="w-5 h-5" />, label: 'Настройки приложения', color: 'text-amber-500 bg-amber-500/10', action: () => router.push('/onboarding') },
          ].map((item, i) => (
            <button
              key={i}
              onClick={item.action}
              className="w-full flex items-center justify-between p-4.5 border-b border-slate-100 dark:border-slate-850 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-900/35 transition-all duration-200 group active:scale-98 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-all duration-300`}>
                  {item.icon}
                </div>
                <span className="font-bold text-sm text-[var(--color-text)] group-hover:text-[var(--color-primary)] dark:group-hover:text-[var(--color-accent)] transition-colors">
                  {item.label}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-350 group-hover:text-[var(--color-accent)] dark:text-slate-600 dark:group-hover:text-[var(--color-accent)] transition-all duration-250 group-hover:translate-x-1" />
            </button>
          ))}
        </Card>

        {/* Logout Button */}
        <Button 
          variant="outline"
          size="lg"
          onClick={handleLogout}
          className="w-full text-rose-500 border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-600 dark:border-rose-500/10 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 shadow-sm gap-3 font-bold text-xs uppercase tracking-wider"
        >
          <LogOut className="w-4.5 h-4.5" />
          Выйти из аккаунта
        </Button>
      </div>
    </div>
  );
}
