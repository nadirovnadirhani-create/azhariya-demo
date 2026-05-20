import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: number;
  popular?: boolean;
}

export const PLANS: Plan[] = [
  { id: 'basic', name: 'Базовый', duration: '1 месяц', price: 9.99 },
  { id: 'standard', name: 'Стандарт', duration: '6 месяцев', price: 49.99, popular: true },
  { id: 'premium', name: 'Премиум', duration: '12 месяцев', price: 89.99 },
];

interface Subscription {
  planId: string;
  planName: string;
  activatedAt: string;
  duration: string;
}

interface WalletState {
  balance: number;
  subscription: Subscription | null;
  topUp: (amount: number) => void;
  purchasePlan: (planId: string) => boolean;
  hasSubscription: () => boolean;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      balance: 0,
      subscription: null,
      topUp: (amount) => set((state) => ({ balance: +(state.balance + amount).toFixed(2) })),
      purchasePlan: (planId) => {
        const plan = PLANS.find((p) => p.id === planId);
        const { balance } = get();
        if (plan && balance >= plan.price) {
          set((state) => ({
            balance: +(state.balance - plan.price).toFixed(2),
            subscription: {
              planId: plan.id,
              planName: plan.name,
              activatedAt: new Date().toISOString(),
              duration: plan.duration,
            },
          }));
          return true;
        }
        return false;
      },
      hasSubscription: () => !!get().subscription,
    }),
    {
      name: 'wallet-storage',
    }
  )
);
