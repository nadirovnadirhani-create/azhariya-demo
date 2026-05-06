import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check for Admin Credentials
    if (email === 'admin@azharia.com' && password === 'admin123') {
      login('Администратор', email);
      navigate('/admin');
      return;
    }

    if (isLogin) {
      login(name || 'Студент', email);
    } else {
      register(name, email);
    }
    navigate('/dashboard');
  };

  return (
    <div className="auth-page islamic-pattern-bg">
      <div className="auth-container animate-scale-in">
        <div className="auth-header">
          <img src="./logo.png" alt="Azhariya" className="auth-logo" />
          <h1 className="auth-title">AZHARIYA</h1>
          <p className="auth-arabic arabic" dir="rtl">أزهرية</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Вход
          </button>
          <button 
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Регистрация
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label htmlFor="name">Имя</label>
              <input
                id="name"
                type="text"
                className="input-field"
                placeholder="Ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input-field"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              className="input-field"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-lg auth-submit">
            {isLogin ? 'Войти' : 'Создать аккаунт'}
          </button>
        </form>

        <div className="auth-divider">
          <span>или</span>
        </div>

        <button className="btn btn-outline auth-google" onClick={() => {
          login('Студент', 'demo@azhariya.com');
          navigate('/dashboard');
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 2.58 9 3.58z" fill="#EA4335"/></svg>
          Войти через Google
        </button>

        <p className="auth-demo-hint">
          💡 Это демо-версия. Введите любые данные для входа.
        </p>
      </div>
    </div>
  );
}
