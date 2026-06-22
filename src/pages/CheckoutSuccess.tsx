import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const { tier } = useParams<{ tier?: 'professional' | 'enterprise' }>();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait a moment to allow webhook processing
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-primary" />
          <h2 className="text-xl font-semibold mb-2">Processing Payment</h2>
          <p className="text-muted-foreground">Please wait while we confirm your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-3">Payment Successful!</h2>
        <p className="text-muted-foreground mb-6">
          Your {tier === 'enterprise' ? 'Enterprise' : 'Professional'} subscription is now active.
          Your license key has been sent to your email.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Go to Dashboard
          </button>
          <p className="text-sm text-muted-foreground">
            Didn't receive an email?{' '}
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary hover:underline"
            >
              Check your dashboard
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}