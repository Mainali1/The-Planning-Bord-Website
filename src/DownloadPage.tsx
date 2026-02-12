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
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col items-center justify-center p-6">
        <Loader2 className="w-12 h-12 text-[#4B6DFF] animate-spin mb-4" />
        <p className="text-[#0B1A3F] font-medium animate-pulse">Fetching latest releases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex flex-col items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-red-100 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-[#0B1A3F] mb-4">Connection Error</h2>
          <p className="text-[#6B7A99] mb-8">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            className="w-full bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-full py-6"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-sans">
      {/* Mini Nav */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F4F6FA]/90 backdrop-blur-md border-b border-[#0B1A3F]/6' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
              <div className="w-8 h-8 bg-[#4B6DFF] rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0B1A3F]">The Planning Bord</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-[#0B1A3F] hover:text-[#4B6DFF] font-medium"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Badge className="bg-[#4B6DFF]/10 text-[#4B6DFF] hover:bg-[#4B6DFF]/20 mb-4 rounded-full px-4 py-1">
            Downloads
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-4 tracking-tight">
            Get The Planning Bord
          </h1>
          <p className="text-lg text-[#6B7A99] max-w-2xl">
            Choose the version that fits your needs. All releases are automatically fetched from our secure GitHub repository.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7A99]" />
          <Input 
            type="text"
            placeholder="Search versions or features..."
            className="pl-12 py-6 rounded-2xl border-[#0B1A3F]/10 bg-white shadow-sm focus:ring-[#4B6DFF]/20 focus:border-[#4B6DFF] transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Releases Grid */}
        <div className="grid gap-8">
          {filteredReleases.length > 0 ? (
            filteredReleases.map((release) => {
              const { exe, msi } = getInstallerAssets(release.assets);
              return (
                <Card 
                  key={release.id}
                  className="overflow-hidden rounded-3xl border border-[#0B1A3F]/8 shadow-[0_10px_30px_rgba(11,26,63,0.04)] bg-white hover:shadow-[0_18px_50px_rgba(11,26,63,0.08)] transition-all"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold text-[#0B1A3F]">{release.name || release.tag_name}</h2>
                          {release.id === releases[0]?.id && (
                            <Badge className="bg-[#2EE8B3] text-[#0B1A3F] font-semibold rounded-full">Latest</Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-[#6B7A99]">
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
                            className="bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-2xl h-14 px-8 font-semibold shadow-lg shadow-[#4B6DFF]/20 transition-all active:scale-95"
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
                            className="rounded-2xl h-14 px-8 font-semibold border-[#0B1A3F]/10 hover:bg-[#0B1A3F]/5 text-[#0B1A3F] transition-all active:scale-95"
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
                          <span className="text-sm font-semibold text-[#4B6DFF] group-hover:text-[#3a5aee] transition-colors">
                            View Release Notes
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-4 p-6 bg-[#F4F6FA] rounded-2xl prose prose-sm max-w-none prose-headings:text-[#0B1A3F] prose-p:text-[#6B7A99] prose-li:text-[#6B7A99]">
                            <div className="whitespace-pre-wrap break-words leading-relaxed text-sm">
                              {release.body || 'No release notes provided for this version.'}
                            </div>
                            <div className="mt-6 pt-6 border-t border-[#0B1A3F]/5">
                              <a 
                                href={release.html_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-xs font-medium text-[#6B7A99] hover:text-[#4B6DFF] transition-colors"
                              >
                                View on GitHub
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </Card>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#0B1A3F]/10">
              <FileCode className="w-16 h-16 text-[#6B7A99]/20 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#0B1A3F] mb-2">No versions found</h3>
              <p className="text-[#6B7A99]">Try adjusting your search filters.</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0B1A3F] py-12 text-center">
        <div className="px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[#4B6DFF] rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-lg font-bold text-white">The Planning Bord</span>
          </div>
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} The Planning Bord. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
