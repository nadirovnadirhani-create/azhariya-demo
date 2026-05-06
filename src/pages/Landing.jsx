import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { alphabet } from '../data/alphabet';
import './Landing.css';

export default function Landing() {
  const { isAuthenticated } = useAuth();

  const playSound = (audioPath) => {
    if (!audioPath) return;
    const audio = new Audio(audioPath);
    audio.play().catch(e => console.error("Error playing audio:", e));
  };

  return (
    <div className="landing">
      {/* Hero Section */}
      <section className="hero islamic-pattern-bg">
        <div className="hero-content container">
          <div className="hero-text animate-fade-in-up">
            <div className="hero-badge badge badge-accent">Методика Аль-Азхар</div>
            <h1 className="hero-title">
              Изучайте арабский язык
              <span className="hero-title-accent"> по методике Азхария</span>
            </h1>
            <p className="hero-arabic arabic" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <p className="hero-subtitle">
              Интерактивная платформа для изучения арабского алфавита, 
              правил чтения и основ таджвида. От нуля до уверенного чтения Корана.
            </p>
            <div className="hero-actions">
              <Link 
                to={isAuthenticated ? '/dashboard' : '/auth'} 
                className="btn btn-accent btn-lg"
              >
                {isAuthenticated ? 'Перейти к обучению' : 'Начать обучение'}
                <span>→</span>
              </Link>
              <a href="#alphabet" className="btn btn-outline btn-lg">
                Послушать алфавит
              </a>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-value">28</span>
                <span className="hero-stat-label">букв алфавита</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">25+</span>
                <span className="hero-stat-label">уроков</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="hero-stat-value">3</span>
                <span className="hero-stat-label">курса</span>
              </div>
            </div>
          </div>
          <div className="hero-visual animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="hero-calligraphy arabic">
              <span className="hero-calligraphy-word">أزهـرية</span>
            </div>
          </div>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,64 C360,120 720,0 1080,64 C1260,96 1380,80 1440,64 L1440,120 L0,120 Z" 
                  fill="var(--color-surface)" />
          </svg>
        </div>
      </section>

      {/* Interactive Alphabet Section */}
      <section id="alphabet" className="alphabet-section section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">Интерактивный алфавит</h2>
            <p className="section-subtitle">Нажмите на букву, чтобы услышать правильное произношение</p>
          </div>
          
          <div className="alphabet-grid stagger-children">
            {alphabet.map((item) => (
              <button 
                key={item.id} 
                className="alphabet-card"
                onClick={() => playSound(item.audio)}
              >
                <div className="alphabet-letter arabic">{item.letter}</div>
                <div className="alphabet-info">
                  <span className="alphabet-name">{item.name}</span>
                  <span className="alphabet-translit">[{item.translit}]</span>
                </div>
                <div className="alphabet-play-icon">🔊</div>
              </button>
            ))}
          </div>
          
          <div className="alphabet-cta">
            <Link to="/course/alphabet" className="btn btn-primary">
              Перейти к курсу по алфавиту
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section section">
        <div className="container">
          <div className="section-header animate-fade-in-up">
            <h2 className="section-title">Почему Азхария?</h2>
            <p className="section-subtitle">Проверенная методика из университета Аль-Азхар</p>
          </div>
          <div className="features-grid stagger-children">
            <div className="feature-card card">
              <div className="feature-icon">🎓</div>
              <h3>Методика Аль-Азхар</h3>
              <p>Учебная программа разработана выпускником старейшего исламского университета мира</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🔤</div>
              <h3>Интерактивный алфавит</h3>
              <p>Нажимайте на буквы, слушайте произношение и изучайте все 4 формы написания</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🎥</div>
              <h3>Видеоуроки</h3>
              <p>Профессиональные видеоуроки с подробным объяснением каждой темы</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📊</div>
              <h3>Отслеживание прогресса</h3>
              <p>Система фиксирует ваш прогресс и мотивирует продолжать обучение</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">📱</div>
              <h3>Мобильный доступ</h3>
              <p>Учитесь где угодно — платформа адаптирована для смартфонов и планшетов</p>
            </div>
            <div className="feature-card card">
              <div className="feature-icon">🕌</div>
              <h3>Основы таджвида</h3>
              <p>Освойте правила красивого чтения Корана с нуля до уверенного уровня</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section islamic-pattern-bg">
        <div className="container">
          <div className="cta-content animate-fade-in-up">
            <div className="cta-arabic arabic" dir="rtl">اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ</div>
            <h2>Начните свой путь к знаниям сегодня</h2>
            <p>Присоединяйтесь к тысячам студентов, изучающих арабский язык по методике Азхария</p>
            <Link to={isAuthenticated ? '/dashboard' : '/auth'} className="btn btn-accent btn-lg">
              Начать бесплатно
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <img src="/logo.png" alt="Azhariya" className="footer-logo" />
              <span className="footer-title">AZHARIYA</span>
            </div>
            <p className="footer-text">Демонстрационная платформа для изучения арабского языка</p>
            <div className="arabesque-divider" />
            <p className="footer-copyright">© 2026 Azhariya. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
