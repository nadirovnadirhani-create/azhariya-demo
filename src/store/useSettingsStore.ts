import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'ru' | 'en' | 'ar';
type LearningGoal = 'quran' | 'understand' | 'write';

interface SettingsState {
  language: Language;
  dir: 'rtl' | 'ltr';
  setLanguage: (lang: Language) => void;

  /** Goals chosen during onboarding. */
  goals: LearningGoal[];
  setGoals: (goals: LearningGoal[]) => void;

  /** True once the user has completed the /onboarding wizard. */
  onboardingComplete: boolean;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'ru',
      // RTL is auto-enabled when language is Arabic per spec.
      dir: 'ltr',
      setLanguage: (language: Language) =>
        set({ language, dir: language === 'ar' ? 'rtl' : 'ltr' }),

      goals: [],
      setGoals: (goals) => set({ goals }),

      onboardingComplete: false,
      completeOnboarding: () => set({ onboardingComplete: true }),
      resetOnboarding: () => set({ onboardingComplete: false, goals: [] }),
    }),
    {
      name: 'settings-storage',
    },
  ),
);

export type { Language, LearningGoal };
