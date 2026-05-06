import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { courses as initialCourses } from '../data/courses';
import './Admin.css';

export default function Admin() {
  const { user } = useAuth();
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('azhariya_courses_db');
    return saved ? JSON.parse(saved) : initialCourses;
  });
  
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('azhariya_students_db');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Айша', email: 'aisha@example.com', joinedAt: '2024-03-20', progress: 45 },
      { id: 2, name: 'Марьям', email: 'maryam@example.com', joinedAt: '2024-03-21', progress: 12 },
      { id: 3, name: 'Фатима', email: 'fatima@example.com', joinedAt: '2024-03-22', progress: 88 }
    ];
  });

  useEffect(() => {
    localStorage.setItem('azhariya_courses_db', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('azhariya_students_db', JSON.stringify(students));
  }, [students]);

  const [activeTab, setActiveTab] = useState('courses');

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>AZHARIYA</h2>
          <span>Админ-панель</span>
        </div>
        <nav className="admin-nav">
          <button 
            className={activeTab === 'courses' ? 'active' : ''} 
            onClick={() => setActiveTab('courses')}
          >
            📚 Курсы
          </button>
          <button 
            className={activeTab === 'students' ? 'active' : ''} 
            onClick={() => setActiveTab('students')}
          >
            👥 Студенты
          </button>
          <button 
            className={activeTab === 'analytics' ? 'active' : ''} 
            onClick={() => setActiveTab('analytics')}
          >
            📊 Аналитика
          </button>
        </nav>
      </div>

      <main className="admin-content">
        <header className="admin-header">
          <h1>{activeTab === 'courses' ? 'Управление курсами' : activeTab === 'students' ? 'Список студентов' : 'Аналитика'}</h1>
          <div className="admin-user">
            <span>{user?.name || 'Администратор'}</span>
            <div className="admin-avatar">A</div>
          </div>
        </header>

        <section className="admin-main">
          {activeTab === 'courses' && (
            <div className="admin-table-container">
              <div className="table-actions">
                <button className="btn btn-primary">+ Добавить курс</button>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Тип</th>
                    <th>Уроков</th>
                    <th>Статус</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map(course => (
                    <tr key={course.id}>
                      <td>
                        <div className="course-info">
                          <span className="course-icon">{course.icon}</span>
                          <div>
                            <div className="course-name">{course.title}</div>
                            <div className="course-arabic">{course.titleAr}</div>
                          </div>
                        </div>
                      </td>
                      <td>{course.isFree ? 'Бесплатный' : 'Платный'}</td>
                      <td>{course.lessonsCount}</td>
                      <td>
                        <span className="badge-status success">Активен</span>
                      </td>
                      <td>
                        <button className="btn-icon">✏️</button>
                        <button className="btn-icon danger">🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Дата регистрации</th>
                    <th>Прогресс</th>
                    <th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map(student => (
                    <tr key={student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{new Date(student.joinedAt).toLocaleDateString()}</td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${student.progress}%` }}></div>
                          </div>
                          <span>{student.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <button className="btn-icon">👁️</button>
                        <button className="btn-icon danger">🚫</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'analytics' && (
            <div className="admin-analytics">
              <div className="analytics-grid">
                <div className="stat-card">
                  <div className="stat-label">Всего студентов</div>
                  <div className="stat-value">{students.length}</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Продано курсов</div>
                  <div className="stat-value">124</div>
                </div>
                <div className="stat-card">
                  <div className="stat-label">Доход за месяц</div>
                  <div className="stat-value">45,000 ₽</div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
