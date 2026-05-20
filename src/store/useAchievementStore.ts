import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

export interface AchievementState {
  unlockedAchievements: string[];
  unlockAchievement: (id: string) => void;
  isAchievementUnlocked: (id: string) => boolean;
}

export const ACHIEVEMENTS = [
  {
    id: 'first_letter',
    title: 'Первая буква',
    description: 'Завершили первый урок',
    icon: '🎯',
  },
  {
    id: 'five_letters',
    title: 'Пять букв',
    description: 'Завершили 5 уроков',
    icon: '🔥',
  },
  {
    id: 'ten_letters',
    title: 'Десять букв',
    description: 'Завершили 10 уроков',
    icon: '⚡',
  },
  {
    id: 'twenty_letters',
    title: 'Двадцать букв',
    description: 'Завершили 20 уроков',
    icon: '💎',
  },
  {
    id: 'all_lessons',
    title: 'Мастер алфавита',
    description: 'Завершили все 31 урок',
    icon: '👑',
  },
  {
    id: 'three_day_streak',
    title: 'Три дня подряд',
    description: 'Занимались 3 дня подряд',
    icon: '🔥',
  },
  {
    id: 'one_week_streak',
    title: 'Неделя упорства',
    description: 'Занимались 7 дней подряд',
    icon: '🌟',
  },
  {
    id: 'perfect_quiz',
    title: 'Идеальный тест',
    description: 'Набрали 100% на тесте',
    icon: '💯',
  },
  {
    id: 'handwriting_master',
    title: 'Каллиграф',
    description: 'Получили "Отлично" за почерк 5 раз',
    icon: '✍️',
  },
  {
    id: 'speed_learner',
    title: 'Быстрый ученик',
    description: 'Завершили 5 уроков за один день',
    icon: '⚡',
  },
];

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      unlockedAchievements: [],

      unlockAchievement: (id: string) => {
        const { unlockedAchievements } = get();
        if (!unlockedAchievements.includes(id)) {
          set({ unlockedAchievements: [...unlockedAchievements, id] });
        }
      },

      isAchievementUnlocked: (id: string) => {
        const { unlockedAchievements } = get();
        return unlockedAchievements.includes(id);
      },
    }),
    { name: 'azhariya_achievements' }
  )
);
