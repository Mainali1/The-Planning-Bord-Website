import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { initPaddle, Paddle } from '@paddle/paddle-js';
import { useAuth } from '../context/useAuth';
import { PADDLE_PRICE_IDS, PRICES } from '../lib/licenses';

type CheckoutStatus = 'loading' | 'ready' | 'success' | 'error';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { tier } = useParams<{ tier?: 'professional' | 'enterprise' }>();
  const { user } = useAuth();
  const [status, setStatus] = useState<CheckoutStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  useEffect(() => {
    const vendorId = import.meta.env.VITE_PADDLE_VENDOR_ID;
    const environment = import.meta.env.VITE_PADDLE_ENVIRONMENT || 'sandbox';

    if (!vendorId) {
      setError('Paddle is not configured. Please contact support.');
      setStatus('error');
      return;
    }

    initPaddle({
      vendor: Number(vendorId),
      environment: environment as 'sandbox' | 'production',
      token: import.meta.env.VITE_PADDLE_TOKEN,
    })
      .then((paddleInstance) => {
        if (paddleInstance) {
          setPaddle(paddleInstance);
          setStatus('ready');
        } else {
          setError('Failed to initialize Paddle');
          setStatus('error');
        }
      })
      .catch((err) => {
        console.error('Paddle init error:', err);
        setError('Failed to initialize payment system');
        setStatus('error');
      });
  }, []);

  useEffect(() => {
    if (status !== 'ready' || !paddle || !tier || !user) return;

    const priceIdKey = tier === 'enterprise' ? 'enterprise_monthly' : 'professional_monthly';
    const priceId = PADDLE_PRICE_IDS[priceIdKey as keyof typeof PADDLE_PRICE_IDS];

    if (!priceId || priceId.includes('pri_')) {
      console.warn('Paddle price IDs not configured, using mock mode');
    }

    const tierInfo = PRICES[tier as keyof typeof PRICES];

    paddle.Open({
      items: [{ priceId, quantity: 1 }],
      customer: {
        email: user.email || '',
      },
      customData: {
        tier,
        userId: user.uid,
        licenseKey: '', // Will be set by webhook handler
      },
      settings: {
        displayMode: 'overlay',
        theme: 'light',
        locale: 'en',
        successUrl: `${window.location.origin}/checkout/${tier}/success`,
        alertTimeout: 5000,
      },
    });

    setStatus('loading');
  }, [status, paddle, tier, user]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Preparing Checkout</h2>
          <p className="text-muted-foreground">Setting up secure payment...</p>
        </div>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">
            Your {PRICES[tier as keyof typeof PRICES]?.name} subscription has been activated.
            Check your email for the license key.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Payment Failed</h2>
          <p className="text-muted-foreground mb-6">
            {error || 'Something went wrong. Please try again or contact support.'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Go Home
            </button>
            <button
              onClick={() => setStatus('ready')}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}