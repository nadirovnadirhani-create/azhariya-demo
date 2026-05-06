import { createContext, useContext, useState, useEffect } from 'react';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [completedLessons, setCompletedLessons] = useState(() => {
    const saved = localStorage.getItem('azhariya_progress');
    return saved ? JSON.parse(saved) : [];
  });

  const [learnedLetters, setLearnedLetters] = useState(() => {
    const saved = localStorage.getItem('azhariya_letters');
    return saved ? JSON.parse(saved) : [];
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('azhariya_streak');
    return saved ? JSON.parse(saved) : { count: 3, lastDate: new Date().toDateString() };
  });

  useEffect(() => {
    localStorage.setItem('azhariya_progress', JSON.stringify(completedLessons));
  }, [completedLessons]);

  useEffect(() => {
    localStorage.setItem('azhariya_letters', JSON.stringify(learnedLetters));
  }, [learnedLetters]);

  useEffect(() => {
    localStorage.setItem('azhariya_streak', JSON.stringify(streak));
  }, [streak]);

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      const today = new Date().toDateString();
      if (streak.lastDate !== today) {
        setStreak({ count: streak.count + 1, lastDate: today });
      }
    }
  };

  const markLetterLearned = (letterId) => {
    if (!learnedLetters.includes(letterId)) {
      setLearnedLetters(prev => [...prev, letterId]);
    }
  };

  const isLessonCompleted = (lessonId) => completedLessons.includes(lessonId);
  const isLetterLearned = (letterId) => learnedLetters.includes(letterId);

  const getCourseProgress = (lessons) => {
    if (!lessons || lessons.length === 0) return 0;
    const completed = lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / lessons.length) * 100);
  };

  const totalCompleted = completedLessons.length;

  return (
    <ProgressContext.Provider value={{
      completedLessons, learnedLetters, streak,
      completeLesson, markLetterLearned,
      isLessonCompleted, isLetterLearned,
      getCourseProgress, totalCompleted,
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
