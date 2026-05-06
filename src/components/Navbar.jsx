import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

export default function Navbar() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  const isLanding = location.pathname === '/';

  return (
    <nav className={`navbar ${isLanding ? 'navbar-transparent' : ''}`}>
      <div className="navbar-inner container">
        <Link to={isAuthenticated ? '/dashboard' : '/'} className="navbar-brand">
          <img src="/logo.png" alt="Azhariya" className="navbar-logo" />
          <span className="navbar-title">AZHARIYA</span>
        </Link>

        <div className="navbar-actions">
          <button
            className="btn-icon theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {isAuthenticated ? (
            <Link to="/profile" className="navbar-avatar">
              <span className="avatar-circle">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </Link>
          ) : (
            <Link to="/auth" className="btn btn-primary btn-sm">
              Войти
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
