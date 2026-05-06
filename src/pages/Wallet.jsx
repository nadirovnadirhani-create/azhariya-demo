import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import './Wallet.css';

export default function Wallet() {
  const { balance, subscription, hasSubscription, topUp, purchasePlan, PLANS } = useWallet();
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(50);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTopUp = () => {
    setIsProcessing(true);
    setTimeout(() => {
      topUp(topUpAmount);
      setShowTopUp(false);
      setIsProcessing(false);
    }, 1500);
  };

  const handlePurchase = (planId) => {
    setIsProcessing(true);
    setTimeout(() => {
      const success = purchasePlan(planId);
      setIsProcessing(false);
      if (success) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
      }
    }, 2000);
  };

  return (
    <div className="page wallet islamic-pattern-bg">
      <div className="container">
        <h1 className="wallet-title animate-fade-in-up">Wallet</h1>

        {/* Balance Card */}
        <div className="balance-card card animate-fade-in-up">
          <div className="balance-header">
            <span className="balance-label">Баланс</span>
            <span className="balance-amount">${balance.toFixed(2)}</span>
          </div>
          <button className="btn btn-accent" onClick={() => setShowTopUp(true)}>
            💳 Пополнить
          </button>
          {hasSubscription && (
            <div className="balance-sub">
              <span className="badge badge-success">Подписка активна</span>
              <span className="balance-sub-info">{subscription.planName} • {subscription.duration}</span>
            </div>
          )}
        </div>

        {/* Plans */}
        {!hasSubscription && (
          <div className="plans-section animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="plans-title">Тарифные планы</h2>
            <p className="plans-subtitle">Получите доступ ко всем курсам и урокам</p>
            <div className="plans-grid">
              {PLANS.map((plan) => (
                <div key={plan.id} className={`plan-card card ${plan.popular ? 'popular' : ''}`}>
                  {plan.popular && <div className="plan-badge">Популярный</div>}
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-duration">{plan.duration}</p>
                  <div className="plan-price">
                    <span className="plan-currency">$</span>
                    <span className="plan-amount">{plan.price}</span>
                  </div>
                  <ul className="plan-features">
                    <li>✓ Все видеоуроки</li>
                    <li>✓ Интерактивные задания</li>
                    <li>✓ Курс таджвида</li>
                    <li>✓ Отслеживание прогресса</li>
                  </ul>
                  <button
                    className={`btn ${plan.popular ? 'btn-accent' : 'btn-primary'} plan-btn`}
                    onClick={() => handlePurchase(plan.id)}
                    disabled={balance < plan.price || isProcessing}
                  >
                    {isProcessing ? '⏳ Обработка...' : (
                      balance < plan.price ? `Пополните баланс ($${plan.price})` : 'Оформить'
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Up Modal */}
        {showTopUp && (
          <div className="modal-overlay" onClick={() => !isProcessing && setShowTopUp(false)}>
            <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
              <h2 className="topup-title">Пополнение баланса</h2>
              <div className="topup-amounts">
                {[10, 25, 50, 100].map(amount => (
                  <button
                    key={amount}
                    className={`topup-chip ${topUpAmount === amount ? 'active' : ''}`}
                    onClick={() => setTopUpAmount(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <div className="topup-summary">
                <span>Сумма пополнения:</span>
                <span className="topup-total">${topUpAmount}</span>
              </div>
              <button
                className="btn btn-primary btn-lg topup-confirm"
                onClick={handleTopUp}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <span className="processing">
                    <span className="spinner" /> Обработка платежа...
                  </span>
                ) : (
                  'Подтвердить оплату'
                )}
              </button>
              <p className="topup-hint">💡 Это демо-версия. Реальная оплата не производится.</p>
            </div>
          </div>
        )}

        {/* Success Toast */}
        {showSuccess && (
          <div className="toast">🎉 Подписка успешно оформлена! Все курсы разблокированы.</div>
        )}
      </div>
    </div>
  );
}
