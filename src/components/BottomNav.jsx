import { NavLink } from 'react-router-dom';
import './BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <NavLink to="/dashboard" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">🏠</span>
        <span className="bottom-nav-label">Главная</span>
      </NavLink>
      <NavLink to="/course/alphabet" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">📚</span>
        <span className="bottom-nav-label">Курсы</span>
      </NavLink>
      <NavLink to="/wallet" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">💳</span>
        <span className="bottom-nav-label">Wallet</span>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
        <span className="bottom-nav-icon">👤</span>
        <span className="bottom-nav-label">Профиль</span>
      </NavLink>
    </nav>
  );
}
