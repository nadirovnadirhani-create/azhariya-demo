import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useWallet } from '../context/WalletContext';
import { courses } from '../data/courses';
import CourseCard from '../components/CourseCard';
import ProgressRing from '../components/ProgressRing';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { totalCompleted, streak } = useProgress();
  const { hasSubscription } = useWallet();

  const totalLessons = courses.reduce((sum, c) => sum + c.lessons.length, 0);
  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="page dashboard islamic-pattern-bg">
      <div className="container">
        {/* Welcome */}
        <div className="dashboard-welcome animate-fade-in-up">
          <div className="welcome-text">
            <p className="welcome-greeting">Ас-саляму алейкум! 👋</p>
            <h1 className="welcome-name">{user?.name || 'Студент'}</h1>
            <p className="welcome-subtitle">Продолжайте изучение арабского языка</p>
          </div>
          <ProgressRing progress={overallProgress} />
        </div>

        {/* Stats */}
        <div className="dashboard-stats stagger-children">
          <div className="stat-card card">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{streak.count}</span>
            <span className="stat-label">дней подряд</span>
          </div>
          <div className="stat-card card">
            <span className="stat-icon">✅</span>
            <span className="stat-value">{totalCompleted}</span>
            <span className="stat-label">уроков пройдено</span>
          </div>
          <div className="stat-card card">
            <span className="stat-icon">💎</span>
            <span className="stat-value">{hasSubscription ? 'Активна' : 'Нет'}</span>
            <span className="stat-label">подписка</span>
          </div>
        </div>

        {/* Courses */}
        <div className="dashboard-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="dashboard-section-title">Ваши курсы</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>

        {/* Daily reminder */}
        <div className="daily-card card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="daily-content">
            <span className="daily-icon">📿</span>
            <div>
              <h3 className="daily-title">Аят дня</h3>
              <p className="daily-arabic arabic" dir="rtl">
                إِنَّ مَعَ الْعُسْرِ يُسْرًا
              </p>
              <p className="daily-translation">
                «Поистине, за трудностью — облегчение» (94:6)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
