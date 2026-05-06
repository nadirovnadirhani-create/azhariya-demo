import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import './CourseCard.css';

export default function CourseCard({ course }) {
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(course.lessons);

  return (
    <Link to={`/course/${course.id}`} className="course-card card card-gold-hover">
      <div className="course-card-header" style={{ '--course-color': course.color }}>
        <span className="course-card-icon">{course.icon}</span>
        <div className="course-card-arabic arabic-ui">{course.titleAr}</div>
        {!course.isFree && (
          <span className="badge badge-accent">Подписка</span>
        )}
      </div>
      <div className="course-card-body">
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-desc">{course.description}</p>
        <div className="course-card-meta">
          <span>{course.lessonsCount} уроков</span>
          {progress > 0 && (
            <div className="course-card-progress">
              <div className="course-card-progress-bar">
                <div className="course-card-progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="course-card-progress-text">{progress}%</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
