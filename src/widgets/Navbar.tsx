"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { Sun, Moon, Sparkles } from 'lucide-react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user } = useAuthStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isAuthenticated = !!user;

  if (!mounted) return null;

  return (
    <nav className="fixed top-4 left-0 w-full z-50 px-4 transition-all duration-300">
      <div className="max-w-6xl mx-auto glass rounded-2xl md:rounded-full px-6 py-3 shadow-[0_12px_40px_-10px_rgba(10,60,47,0.12)] border border-white/25 dark:border-white/5 flex items-center justify-between transition-all hover:border-[var(--color-accent)]/20">
        <Link href={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B89222] to-[var(--color-accent)] flex items-center justify-center text-[#0A3C2F] font-black group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            A
          </div>
          <span className="text-lg font-black tracking-[0.2em] text-[var(--color-primary)] dark:text-[var(--color-accent)] group-hover:text-gold-gradient transition-colors">
            AZHARIYA
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <button
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors text-slate-600 dark:text-slate-300 cursor-pointer"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={18} className="text-[var(--color-accent)]" /> : <Moon size={18} />}
          </button>

          {isAuthenticated ? (
            <Link 
              href="/profile" 
              className="flex items-center justify-center w-9.5 h-9.5 rounded-xl bg-gradient-to-tr from-[var(--color-primary-dark)] to-[var(--color-primary)] text-white shadow-md hover:ring-2 hover:ring-[var(--color-accent)] transition-all font-bold text-sm"
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Link>
          ) : (
            <Link 
              href="/auth" 
              className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white px-5 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg hover:scale-103 group"
            >
              <span className="relative z-10 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Sparkles size={12} className="text-[var(--color-accent)]" />
                Войти
              </span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
