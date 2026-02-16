import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo';

export const stripePromise = loadStripe(stripePublicKey);

export const PRICES = {
  professional: {
    priceId: import.meta.env.VITE_STRIPE_PROFESSIONAL_PRICE_ID || 'price_professional',
    name: 'Professional',
    price: 1495,
    description: 'For teams between 2 and 100 users',
  },
  enterprise: {
    priceId: import.meta.env.VITE_STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise',
    name: 'Enterprise',
    price: 4995,
    description: 'For organizations with 100+ users',
  }
};

export type LicenseTier = 'single' | 'professional' | 'enterprise';

export interface LicenseInfo {
  licenseKey: string | null;
  licenseTier: LicenseTier | null;
  purchaseDate: string | null;
  stripePaymentId: string | null;
}
