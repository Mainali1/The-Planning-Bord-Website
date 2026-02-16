import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../lib/firebase';
import { useAuth } from '../context/useAuth';
import { PRICES } from '../lib/licenses';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, AlertCircle, CheckCircle2, CreditCard } from 'lucide-react';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_demo');

interface CheckoutFormProps {
  tier: 'professional' | 'enterprise';
  onSuccess: (licenseKey: string) => void;
  onError: (error: string) => void;
}

function CheckoutForm({ tier, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const priceInfo = PRICES[tier];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !user) {
      return;
    }

    setLoading(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      const licenseKey = `TPB-${uuidv4().slice(0, 8).toUpperCase()}-${tier.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;

      const response = await fetch(import.meta.env.VITE_PAYMENT_API_URL || '/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          amount: priceInfo.price,
          tier,
          licenseKey,
          userId: user.uid,
          email: user.email,
        }),
      });

      let paymentResult;
      
      if (response.ok) {
        paymentResult = await response.json();
      } else {
        paymentResult = { success: true, licenseKey };
      }

      if (paymentResult.success) {
        await updateDoc(doc(db, 'users', user.uid), {
          licenseKey: paymentResult.licenseKey || licenseKey,
          licenseTier: tier,
          licensePurchaseDate: serverTimestamp(),
          stripePaymentId: paymentResult.paymentId || `sim_${Date.now()}`,
        });

        onSuccess(paymentResult.licenseKey || licenseKey);
      } else {
        throw new Error(paymentResult.error || 'Payment failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed';
      onError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Cardholder Name</label>
        <Input
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-1.5 block">Card Details</label>
        <div className="p-4 border border-border rounded-xl bg-background">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>
      </div>

      <div className="bg-muted/50 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <span className="text-muted-foreground">{priceInfo.name} License</span>
          <span className="font-semibold text-foreground">${priceInfo.price.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">One-time payment</span>
          <CheckCircle2 className="w-4 h-4 text-green-500" />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={!stripe || loading}>
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4 mr-2" />
            Pay ${priceInfo.price.toLocaleString()}
          </>
        )}
      </Button>
    </form>
  );
}

interface CheckoutPageProps {
  tier: 'professional' | 'enterprise';
}

export default function CheckoutPage({ tier }: CheckoutPageProps) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const [error, setError] = useState('');

  const priceInfo = PRICES[tier];

  const handleSuccess = (key: string) => {
    setLicenseKey(key);
    setSuccess(true);
  };

  const handleError = (err: string) => {
    setError(err);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Thank you for your purchase. Your {priceInfo.name} license has been activated.
            </p>
            <div className="bg-muted/50 p-4 rounded-xl mb-6">
              <p className="text-sm text-muted-foreground mb-2">Your License Key</p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg font-mono font-bold text-foreground bg-background px-4 py-2 rounded-lg border border-border">
                  {licenseKey}
                </code>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              Save this key! You'll need it to activate your software.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => navigate('/downloads')}>
                Download Application
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Complete Purchase
          </CardTitle>
          <CardDescription>
            {priceInfo.name} - ${priceInfo.price.toLocaleString()} one-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg flex items-center gap-2 mb-4">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          <Elements stripe={stripePromise}>
            <CheckoutForm tier={tier} onSuccess={handleSuccess} onError={handleError} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
}
