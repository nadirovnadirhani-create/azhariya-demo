import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

export default function Profile() {
  const { user, logout } = useAuth();
  const { totalCompleted, learnedLetters, streak } = useProgress();
  const { hasSubscription, subscription } = useWallet();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const joinDate = user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : '';

  return (
    <div className="page profile islamic-pattern-bg">
      <div className="container">
        <h1 className="profile-title animate-fade-in-up">Профиль</h1>

        {/* User Card */}
        <div className="profile-card card animate-fade-in-up">
          <div className="profile-avatar">
            <span className="profile-avatar-letter">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <h2 className="profile-name">{user?.name || 'Студент'}</h2>
          <p className="profile-email">{user?.email || 'demo@azhariya.com'}</p>
          <p className="profile-joined">На платформе с {joinDate}</p>
        </div>

        {/* Stats */}
        <div className="profile-stats stagger-children">
          <div className="profile-stat card">
            <span className="profile-stat-icon">🔥</span>
            <span className="profile-stat-value">{streak.count}</span>
            <span className="profile-stat-label">Дней подряд</span>
          </div>
          <div className="profile-stat card">
            <span className="profile-stat-icon">📚</span>
            <span className="profile-stat-value">{totalCompleted}</span>
            <span className="profile-stat-label">Уроков пройдено</span>
          </div>
          <div className="profile-stat card">
            <span className="profile-stat-icon">🔤</span>
            <span className="profile-stat-value">{learnedLetters.length}</span>
            <span className="profile-stat-label">Букв изучено</span>
          </div>
          <div className="profile-stat card">
            <span className="profile-stat-icon">⏱</span>
            <span className="profile-stat-value">{totalCompleted * 12}</span>
            <span className="profile-stat-label">Минут обучения</span>
          </div>
        </div>

        {/* Subscription */}
        <div className="profile-section card animate-fade-in-up">
          <h3 className="profile-section-title">Подписка</h3>
          {hasSubscription ? (
            <div className="profile-sub-active">
              <span className="badge badge-success">Активна</span>
              <span>{subscription.planName} • {subscription.duration}</span>
            </div>
          ) : (
            <div className="profile-sub-inactive">
              <p>Подписка не оформлена</p>
              <button className="btn btn-accent btn-sm" onClick={() => navigate('/wallet')}>
                Оформить подписку
              </button>
            </div>
          )}
        </div>

        {/* Logout */}
        <button className="btn btn-ghost profile-logout animate-fade-in-up" onClick={handleLogout}>
          🚪 Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
