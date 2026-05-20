import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CourseProgress {
  courseId: string;
  completedLessons: number[];
}

interface ProgressState {
  completedLessons: number[]; // Flat list of all completed lesson IDs
  streak: {
    count: number;
    lastActiveDate: string | null;
  };
  completeLesson: (lessonId: number) => void;
  incrementStreak: () => void;
  getOverallProgress: () => number; // Out of 31
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      streak: {
        count: 0,
        lastActiveDate: null,
      },
      completeLesson: (lessonId) => {
        const { completedLessons, streak } = get();
        if (completedLessons.includes(lessonId)) return;

        const today = new Date().toISOString().split('T')[0];
        let newStreakCount = streak.count;

        if (streak.lastActiveDate === null) {
          newStreakCount = 1;
        } else {
          const lastDate = new Date(streak.lastActiveDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreakCount += 1;
          } else if (diffDays > 1) {
            newStreakCount = 1;
          }
        }

        set({
          completedLessons: [...completedLessons, lessonId],
          streak: {
            count: newStreakCount,
            lastActiveDate: today,
          },
        });
      },
      incrementStreak: () => {
        const { streak } = get();
        const today = new Date().toISOString().split('T')[0];
        
        if (streak.lastActiveDate === today) return; // Already incremented today

        let newStreakCount = streak.count;
        if (streak.lastActiveDate === null) {
          newStreakCount = 1;
        } else {
          const lastDate = new Date(streak.lastActiveDate);
          const currentDate = new Date(today);
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            newStreakCount += 1;
          } else if (diffDays > 1) {
            newStreakCount = 1;
          }
        }

        set({
          streak: {
            count: newStreakCount,
            lastActiveDate: today,
          },
        });
      },
      getOverallProgress: () => {
        const { completedLessons } = get();
        return Math.round((completedLessons.length / 31) * 100);
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);
