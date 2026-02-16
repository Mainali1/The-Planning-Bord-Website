import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { tier } = useParams<{ tier?: 'professional' | 'enterprise' }>();

  useEffect(() => {
    const url =
      tier === 'enterprise'
        ? import.meta.env.VITE_PAYMENT_ENTERPRISE_API_URL
        : import.meta.env.VITE_PAYMENT_PROFESSIONAL_API_URL;

    if (!url) {
      console.error('Checkout URL not configured for tier', tier);
      navigate('/');
      return;
    }

    window.location.href = url;
  }, [tier, navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">Redirecting to checkout...</p>
      </div>
    </div>
  );
}
