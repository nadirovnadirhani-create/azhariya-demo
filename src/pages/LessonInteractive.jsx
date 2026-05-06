import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { alphabet } from '../data/alphabet';
import { useProgress } from '../context/ProgressContext';
import './LessonInteractive.css';

// Generate pronunciation using Web Speech API
function speak(letter) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(letter);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.7;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }
}

export default function LessonInteractive() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const { markLetterLearned, isLetterLearned, completeLesson } = useProgress();
  const learnedCount = alphabet.filter(l => isLetterLearned(l.id)).length;
  const progress = Math.round((learnedCount / alphabet.length) * 100);

  const handleLetterClick = useCallback((letter) => {
    setSelectedLetter(letter);
    speak(letter.letter);
    markLetterLearned(letter.id);
  }, [markLetterLearned]);

  const handleClose = () => {
    setSelectedLetter(null);
  };

  // Mark lesson complete when all learned
  if (learnedCount === alphabet.length) {
    completeLesson('alpha-interactive');
  }

  return (
    <div className="page lesson-interactive islamic-pattern-bg">
      <div className="container">
        <Link to="/course/alphabet" className="back-link-dark">← Арабский алфавит</Link>

        <div className="interactive-header animate-fade-in-up">
          <div>
            <h1 className="interactive-title">Арабский алфавит</h1>
            <p className="interactive-subtitle">
              Нажимайте на буквы, чтобы услышать произношение и увидеть формы написания
            </p>
          </div>
          <div className="interactive-progress">
            <span className="interactive-progress-text">{learnedCount} / {alphabet.length}</span>
            <div className="interactive-progress-bar">
              <div className="interactive-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* Letters Grid */}
        <div className="letters-grid stagger-children">
          {alphabet.map((letter) => {
            const learned = isLetterLearned(letter.id);
            const isSelected = selectedLetter?.id === letter.id;
            return (
              <button
                key={letter.id}
                className={`letter-card ${learned ? 'learned' : ''} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleLetterClick(letter)}
              >
                <span className="letter-char arabic-letter">{letter.letter}</span>
                <span className="letter-name">{letter.name}</span>
                {learned && <span className="letter-check">✓</span>}
              </button>
            );
          })}
        </div>

        {/* Selected Letter Modal */}
        {selectedLetter && (
          <div className="modal-overlay" onClick={handleClose}>
            <div className="letter-modal animate-scale-in" onClick={e => e.stopPropagation()}>
              <button className="letter-modal-close" onClick={handleClose}>✕</button>
              
              <div className="letter-modal-main">
                <span className="letter-modal-char arabic-letter">{selectedLetter.letter}</span>
                <h2 className="letter-modal-name">{selectedLetter.name}</h2>
                <p className="letter-modal-translit">{selectedLetter.translit}</p>
              </div>

              <button className="btn btn-accent btn-sm letter-modal-sound" onClick={() => speak(selectedLetter.letter)}>
                🔊 Произнести
              </button>

              <div className="letter-forms">
                <h3>Формы написания</h3>
                <div className="forms-grid">
                  <div className="form-item">
                    <span className="form-char arabic-letter">{selectedLetter.forms.isolated}</span>
                    <span className="form-label">Отдельная</span>
                  </div>
                  <div className="form-item">
                    <span className="form-char arabic-letter">{selectedLetter.forms.initial}</span>
                    <span className="form-label">Начальная</span>
                  </div>
                  <div className="form-item">
                    <span className="form-char arabic-letter">{selectedLetter.forms.medial}</span>
                    <span className="form-label">Срединная</span>
                  </div>
                  <div className="form-item">
                    <span className="form-char arabic-letter">{selectedLetter.forms.final}</span>
                    <span className="form-label">Конечная</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
