"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Home, BookOpen, Wallet, User as UserIcon } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  if (!user) return null;

  const navItems = [
    { href: '/dashboard', label: 'Главная', icon: Home },
    { href: '/lessons', label: 'Уроки', icon: BookOpen },
    { href: '/wallet', label: 'Оплата', icon: Wallet },
    { href: '/profile', label: 'Профиль', icon: UserIcon },
  ];

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm z-50">
      <div className="glass rounded-2xl px-3 py-2 flex justify-around items-center shadow-[0_12px_30px_rgba(0,0,0,0.15)] border border-white/20 dark:border-white/5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 ${
                isActive 
                  ? 'text-[var(--color-primary)] dark:text-[var(--color-accent)]' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
              }`}
            >
              <div className={`p-1.5 rounded-lg transition-all ${isActive ? 'bg-[var(--color-primary)]/10 dark:bg-[var(--color-accent)]/20 scale-110' : 'hover:scale-105'}`}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[9px] mt-0.5 tracking-wider font-semibold ${isActive ? 'font-bold opacity-100' : 'opacity-80'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
