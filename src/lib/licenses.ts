export const PRICES = {
  professional: {
    name: 'Professional',
    price: 1495,
    billingCycle: 'monthly',
    description: 'For teams between 2 and 100 users',
  },
  enterprise: {
    name: 'Enterprise',
    price: 4995,
    billingCycle: 'monthly',
    description: 'For organizations with 100+ users',
  }
};

export type LicenseTier = 'single' | 'professional' | 'enterprise';

export interface LicenseInfo {
  licenseKey: string | null;
  licenseTier: LicenseTier | null;
  purchaseDate: string | null;
  paddleCustomerId: string | null;
  paddleSubscriptionId: string | null;
}

// Paddle configuration - use environment variables
export const PADDLE_CONFIG = {
  eventType: 'subscription.created',
  credentials: {
    vendorId: import.meta.env.VITE_PADDLE_VENDOR_ID || '',
    apiKey: import.meta.env.VITE_PADDLE_API_KEY || '',
  },
};

// Price IDs for Paddle (configure these in your Paddle dashboard)
export const PADDLE_PRICE_IDS = {
  professional_monthly: import.meta.env.VITE_PADDLE_PROFESSIONAL_MONTHLY_PRICE_ID || 'pri_pro_monthly',
  professional_annual: import.meta.env.VITE_PADDLE_PROFESSIONAL_ANNUAL_PRICE_ID || 'pri_pro_annual',
  enterprise_monthly: import.meta.env.VITE_PADDLE_ENTERPRISE_MONTHLY_PRICE_ID || 'pri_ent_monthly',
  enterprise_annual: import.meta.env.VITE_PADDLE_ENTERPRISE_ANNUAL_PRICE_ID || 'pri_ent_annual',
};
