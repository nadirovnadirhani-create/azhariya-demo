import { useParams, useNavigate, Link } from 'react-router-dom';
import { courses } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { useState } from 'react';
import './LessonVideo.css';

export default function LessonVideo() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completeLesson, isLessonCompleted } = useProgress();
  const [showComplete, setShowComplete] = useState(false);

  // Find the lesson across all courses
  let currentLesson = null;
  let currentCourse = null;
  let lessonIndex = -1;

  for (const course of courses) {
    const idx = course.lessons.findIndex(l => l.id === lessonId);
    if (idx !== -1) {
      currentLesson = course.lessons[idx];
      currentCourse = course;
      lessonIndex = idx;
      break;
    }
  }

  if (!currentLesson) {
    return <div className="page container"><h1>Урок не найден</h1></div>;
  }

  const nextLesson = currentCourse.lessons[lessonIndex + 1];
  const completed = isLessonCompleted(lessonId);

  const handleComplete = () => {
    completeLesson(lessonId);
    setShowComplete(true);
    setTimeout(() => setShowComplete(false), 3000);
  };

  // Demo video thumbnails - generated lesson-specific patterns
  const colors = ['#0D4A3A', '#1A7D5A', '#C8A84E', '#082E24', '#10B981', '#A68B3A'];
  const color = colors[lessonIndex % colors.length];

  return (
    <div className="page lesson-video">
      <div className="container">
        <Link to={`/course/${currentCourse.id}`} className="back-link-dark">
          ← {currentCourse.title}
        </Link>

        {/* Video Player */}
        <div className="video-wrapper animate-fade-in-up">
          <div className="video-placeholder" style={{ '--video-color': color }}>
            <div className="video-placeholder-content">
              <div className="video-play-btn">▶</div>
              <p className="video-placeholder-title">{currentLesson.title}</p>
              <p className="video-placeholder-duration">⏱ {currentLesson.duration}</p>
            </div>
            <div className="video-pattern islamic-star-bg" />
          </div>
        </div>

        {/* Lesson Info */}
        <div className="lesson-video-info animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          <div className="lesson-video-header">
            <div>
              <span className="lesson-video-number">Урок {lessonIndex + 1}</span>
              <h1 className="lesson-video-title">{currentLesson.title}</h1>
            </div>
            {completed && <span className="badge badge-success">✅ Пройден</span>}
          </div>
          <p className="lesson-video-desc">{currentLesson.description}</p>
        </div>

        {/* Actions */}
        <div className="lesson-video-actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          {!completed && (
            <button className="btn btn-primary btn-lg" onClick={handleComplete}>
              ✅ Отметить как пройденный
            </button>
          )}
          {nextLesson && (
            <button 
              className="btn btn-outline btn-lg"
              onClick={() => {
                if (nextLesson.type === 'interactive') {
                  navigate('/lesson/interactive');
                } else {
                  navigate(`/lesson/video/${nextLesson.id}`);
                }
              }}
            >
              Следующий урок →
            </button>
          )}
        </div>

        {showComplete && (
          <div className="toast">🎉 Урок отмечен как пройденный!</div>
        )}
      </div>
    </div>
  );
}
