import { useState, useEffect, useMemo } from 'react';
import { 
  Download, 
  Search, 
  ExternalLink, 
  Calendar, 
  Tag, 
  AlertCircle,
  Loader2,
  FileCode,
  Package,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { format } from 'date-fns';

// --- Interfaces ---

interface GitHubAsset {
  id: number;
  name: string;
  browser_download_url: string;
  size: number;
  content_type: string;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  assets: GitHubAsset[];
}

// --- Components ---

export default function DownloadPage({ onBack }: { onBack: () => void }) {
  const [releases, setReleases] = useState<GitHubRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchReleases() {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/repos/Mainali1/The-Planning-Bord/releases');
        if (!response.ok) {
          throw new Error(`Failed to fetch releases: ${response.statusText}`);
        }
        const data = await response.json();
        setReleases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchReleases();
  }, []);

  const filteredReleases = useMemo(() => {
    return releases.filter(release => 
      release.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.tag_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      release.body.toLowerCase().includes(searchQuery.toLowerCase())
    ).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  }, [releases, searchQuery]);

  const formatSize = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  const getInstallerAssets = (assets: GitHubAsset[]) => {
    const exe = assets.find(a => a.name.endsWith('.exe'));
    const msi = assets.find(a => a.name.endsWith('.msi'));
    return { exe, msi };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-foreground font-medium animate-pulse">Fetching latest releases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-destructive/10 p-4 rounded-full mb-6">
          <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Failed to load releases</h2>
        <p className="text-muted-foreground max-w-md mb-8">{error}</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-12 px-8 font-semibold shadow-lg shadow-primary/20"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group transition-transform hover:scale-105 cursor-pointer" onClick={onBack}>
            <img src="/images/logo.png" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
            <span className="text-xl font-bold text-foreground tracking-tight">The Planning Bord</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Home</button>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-10 px-6 font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95">
              <a href="https://github.com/Mainali1/The-Planning-Bord" target="_blank" rel="noopener noreferrer">
                <Package className="w-4 h-4 mr-2" />
                GitHub
              </a>
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Downloads</h1>
            </div>
            <p className="text-lg text-muted-foreground">Get the latest version of The Planning Bord for your device.</p>
          </div>

          {/* Search/Filter */}
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="Search versions..." 
              className="pl-12 h-14 bg-card border-border rounded-2xl focus-visible:ring-primary/20 text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Releases List */}
          <div className="space-y-6">
            {filteredReleases.length > 0 ? (
              filteredReleases.map((release) => {
                const { exe, msi } = getInstallerAssets(release.assets);

                return (
                  <Card key={release.id} className="p-8 border-border bg-card rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h2 className="text-2xl font-bold text-foreground">
                            {release.name || release.tag_name}
                          </h2>
                          {release.id === releases[0]?.id && (
                            <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full">
                              Latest
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1.5">
                            <Tag className="w-4 h-4" />
                            {release.tag_name}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(release.published_at), 'MMMM d, yyyy')}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {exe ? (
                          <Button 
                            asChild
                            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl h-14 px-8 font-semibold shadow-lg shadow-primary/20 transition-all active:scale-95"
                          >
                            <a href={exe.browser_download_url} download>
                              <Download className="w-5 h-5 mr-2" />
                              Download .EXE
                              <span className="ml-2 text-[10px] opacity-70">({formatSize(exe.size)})</span>
                            </a>
                          </Button>
                        ) : (
                          <Button disabled variant="secondary" className="rounded-2xl h-14 px-8 opacity-50">
                            .EXE Unavailable
                          </Button>
                        )}
                        
                        {msi ? (
                          <Button 
                            asChild
                            variant="outline"
                            className="rounded-2xl h-14 px-8 font-semibold border-border hover:bg-muted text-foreground transition-all active:scale-95"
                          >
                            <a href={msi.browser_download_url} download>
                              <Package className="w-5 h-5 mr-2" />
                              Download .MSI
                              <span className="ml-2 text-[10px] opacity-70">({formatSize(msi.size)})</span>
                            </a>
                          </Button>
                        ) : (
                          <Button disabled variant="outline" className="rounded-2xl h-14 px-8 opacity-50 border-dashed">
                            .MSI Unavailable
                          </Button>
                        )}
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="release-notes" className="border-none">
                        <AccordionTrigger className="hover:no-underline py-2 group">
                          <span className="text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                            View Release Notes
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-4 p-6 bg-muted/50 rounded-2xl prose prose-sm max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
                            <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                              {release.body || 'No release notes provided for this version.'}
                            </div>
                            <div className="mt-6 pt-6 border-t border-border">
                              <a 
                                href={release.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
                              >
                                View on GitHub
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                );
              })
            ) : (
              <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border">
                <FileCode className="w-16 h-16 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-foreground mb-2">No versions found</h3>
                <p className="text-muted-foreground">Try adjusting your search filters.</p>
              </div>
            )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 text-center">
        <div className="px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/images/logo.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="text-lg font-bold text-foreground">The Planning Bord</span>
          </div>
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} The Planning Bord. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
