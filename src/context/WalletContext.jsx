import { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext(null);

const PLANS = [
  { id: 'basic', name: 'Базовый', duration: '1 месяц', price: 9.99 },
  { id: 'standard', name: 'Стандарт', duration: '6 месяцев', price: 49.99, popular: true },
  { id: 'premium', name: 'Премиум', duration: '12 месяцев', price: 89.99 },
];

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('azhariya_wallet');
    return saved ? JSON.parse(saved).balance : 0;
  });

  const [subscription, setSubscription] = useState(() => {
    const saved = localStorage.getItem('azhariya_wallet');
    return saved ? JSON.parse(saved).subscription : null;
  });

  useEffect(() => {
    localStorage.setItem('azhariya_wallet', JSON.stringify({ balance, subscription }));
  }, [balance, subscription]);

  const topUp = (amount) => {
    setBalance(prev => prev + amount);
  };

  const purchasePlan = (planId) => {
    const plan = PLANS.find(p => p.id === planId);
    if (plan && balance >= plan.price) {
      setBalance(prev => +(prev - plan.price).toFixed(2));
      setSubscription({
        planId: plan.id,
        planName: plan.name,
        activatedAt: new Date().toISOString(),
        duration: plan.duration,
      });
      return true;
    }
    return false;
  };

  const hasSubscription = !!subscription;

  return (
    <WalletContext.Provider value={{
      balance, subscription, hasSubscription,
      topUp, purchasePlan, PLANS,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
