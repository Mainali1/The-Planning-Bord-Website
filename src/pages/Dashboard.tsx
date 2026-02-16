import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Key, Download, CreditCard, User, LogOut, Copy, CheckCircle2 } from 'lucide-react';
import { PRICES, type LicenseTier } from '../lib/licenses';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, signOut, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);
  const [licenseKey, setLicenseKey] = useState<string | null>(null);
  const [licenseTier, setLicenseTier] = useState<LicenseTier | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    async function fetchLicense() {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setLicenseKey(data.licenseKey || null);
          setLicenseTier(data.licenseTier || null);
          setPurchaseDate(data.licensePurchaseDate?.toDate?.().toISOString() || null);
        }
      } catch (error) {
        console.error('Error fetching license:', error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchLicense();
    }
  }, [user]);

  const handleCopyKey = () => {
    if (licenseKey) {
      navigator.clipboard.writeText(licenseKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getTierInfo = () => {
    if (!licenseTier || licenseTier === 'single') {
      return {
        name: 'Single User',
        price: 'Free',
        description: 'For individuals and solo business owners',
        features: ['1 user', 'Up to 5 clients', 'Up to 75 items and 10 services', 'No employee system'],
      };
    }
    return PRICES[licenseTier];
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const tierInfo = getTierInfo();

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
          >
            <img src="/images/logo.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain" />
            <span className="text-lg font-bold text-foreground">The Planning Bord</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your account and license</p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="font-medium">{user.displayName || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="font-medium">{user.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  License Information
                </CardTitle>
                <CardDescription>
                  {licenseTier === 'single' ? 'Free tier - No license key required' : 'Your license details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {licenseTier && licenseTier !== 'single' ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-lg font-semibold">{tierInfo.name}</div>
                        <div className="text-sm text-muted-foreground">{tierInfo.description}</div>
                      </div>
                      <div className="text-2xl font-bold text-primary">${tierInfo.price.toLocaleString()}</div>
                    </div>

                    {licenseKey && (
                      <div className="bg-muted/50 p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">License Key</span>
                          <Button variant="ghost" size="sm" onClick={handleCopyKey}>
                            {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                        <code className="text-lg font-mono font-bold text-foreground break-all">
                          {licenseKey}
                        </code>
                      </div>
                    )}

                    {purchaseDate && (
                      <div className="text-sm text-muted-foreground">
                        Purchased on {new Date(purchaseDate).toLocaleDateString()}
                      </div>
                    )}

                    <div className="pt-4 border-t border-border">
                      <h4 className="font-medium mb-3">License Features</h4>
                      <ul className="space-y-2">
                        {tierInfo.features?.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-lg font-semibold mb-2">Free Single User Edition</div>
                    <p className="text-muted-foreground mb-4">
                      1 user, up to 5 clients, 75 items, 10 services
                    </p>
                    <Button onClick={() => navigate('/downloads')}>
                      <Download className="w-4 h-4 mr-2" />
                      Download Free Version
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Upgrade License
                </CardTitle>
                <CardDescription>
                  Unlock more features and users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {licenseTier !== 'professional' && (
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center"
                      onClick={() => navigate('/checkout/professional')}
                    >
                      <div className="font-semibold">Professional</div>
                      <div className="text-sm text-muted-foreground">$1,495</div>
                      <div className="text-xs text-muted-foreground">2-100 users</div>
                    </Button>
                  )}
                  {licenseTier !== 'enterprise' && (
                    <Button 
                      variant="outline" 
                      className="h-auto py-4 flex flex-col items-center"
                      onClick={() => navigate('/checkout/enterprise')}
                    >
                      <div className="font-semibold">Enterprise</div>
                      <div className="text-sm text-muted-foreground">$4,995</div>
                      <div className="text-xs text-muted-foreground">Unlimited users</div>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
