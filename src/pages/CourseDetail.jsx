import { useParams, Link, useNavigate } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { useWallet } from '../context/WalletContext';
import './CourseDetail.css';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { isLessonCompleted, getCourseProgress } = useProgress();
  const { hasSubscription } = useWallet();

  const course = courses.find(c => c.id === courseId);
  if (!course) return <div className="page container"><h1>Курс не найден</h1></div>;

  const progress = getCourseProgress(course.lessons);
  const canAccess = course.isFree || hasSubscription;

  const handleLessonClick = (lesson) => {
    if (!canAccess && !lesson.isFree) {
      navigate('/wallet');
      return;
    }
    if (lesson.type === 'interactive') {
      navigate('/lesson/interactive');
    } else {
      navigate(`/lesson/video/${lesson.id}`);
    }
  };

  return (
    <div className="page course-detail">
      <div className="container">
        {/* Header */}
        <div className="course-detail-header animate-fade-in-up" style={{ '--course-color': course.color }}>
          <Link to="/dashboard" className="back-link">← Назад</Link>
          <div className="course-detail-hero">
            <span className="course-detail-icon">{course.icon}</span>
            <div>
              <p className="course-detail-arabic arabic-ui">{course.titleAr}</p>
              <h1 className="course-detail-title">{course.title}</h1>
              <p className="course-detail-desc">{course.description}</p>
            </div>
          </div>
          <div className="course-detail-progress">
            <div className="course-progress-bar">
              <div className="course-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="course-progress-text">{progress}% завершено</span>
          </div>
        </div>

        {/* Lessons List */}
        <div className="lessons-list stagger-children">
          {course.lessons.map((lesson, index) => {
            const completed = isLessonCompleted(lesson.id);
            const locked = !canAccess && !lesson.isFree;

            return (
              <button
                key={lesson.id}
                className={`lesson-item card ${completed ? 'completed' : ''} ${locked ? 'locked' : ''}`}
                onClick={() => handleLessonClick(lesson)}
              >
                <div className="lesson-number">
                  {completed ? '✅' : locked ? '🔒' : (
                    <span className="lesson-num">{index + 1}</span>
                  )}
                </div>
                <div className="lesson-info">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-meta">
                    <span className="lesson-type">
                      {lesson.type === 'video' ? '🎥 Видеоурок' : '🔤 Интерактив'}
                    </span>
                    <span className="lesson-duration">⏱ {lesson.duration}</span>
                  </p>
                </div>
                <div className="lesson-action">
                  {locked ? (
                    <span className="badge badge-locked">Подписка</span>
                  ) : completed ? (
                    <span className="badge badge-success">Пройден</span>
                  ) : (
                    <span className="lesson-play">▶</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Subscription CTA */}
        {!canAccess && (
          <div className="subscription-cta card animate-fade-in-up">
            <h3>🔓 Откройте полный доступ</h3>
            <p>Оформите подписку, чтобы получить доступ ко всем урокам этого курса</p>
            <Link to="/wallet" className="btn btn-accent">Оформить подписку</Link>
          </div>
        )}
      </div>
    </div>
  );
}
