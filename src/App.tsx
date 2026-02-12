import { useEffect, useState } from 'react';
import './App.css';
import DownloadPage from './DownloadPage';
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Calendar, 
  BarChart3, 
  MessageSquare, 
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  CreditCard,
  FileText,
  Star,
  Play,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <LayoutDashboard className="w-6 h-6" />,
      title: "Project Management",
      description: "Interactive Gantt charts, resource planning, and real-time project profitability tracking.",
      image: "/images/card_timeline.jpg"
    },
    {
      icon: <Package className="w-6 h-6" />,
      title: "Inventory Control",
      description: "Real-time stock tracking with batch management, expiration monitoring, and velocity reporting.",
      image: "/images/card_inventory.jpg"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "HR & Time Tracking",
      description: "Employee management, precision clock-in/out, attendance records, and role-based access control.",
      image: "/images/card_team.jpg"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Finance & Reporting",
      description: "General ledger, automated invoicing, financial reporting, and cash flow analysis.",
      image: "/images/card_finance.jpg"
    }
  ];

  const testimonials = [
    {
      quote: "The Planning Bord transformed how we manage projects. The intuitive interface and powerful features saved us countless hours.",
      author: "A. Chen",
      role: "Design Lead",
      avatar: "/images/avatar1.jpg"
    },
    {
      quote: "Finally, an ERP system that our whole team understands. Onboarding took less than a day, and productivity soared.",
      author: "M. Ross",
      role: "Operations Manager",
      avatar: "/images/avatar2.jpg"
    },
    {
      quote: "The inventory management alone paid for itself in the first month. Real-time tracking eliminated our stockout issues.",
      author: "J. Park",
      role: "Engineering Manager",
      avatar: "/images/avatar3.jpg"
    }
  ];

  const erpModules = [
    { icon: <Package className="w-5 h-5" />, name: "Inventory", desc: "Stock & BOM" },
    { icon: <Users className="w-5 h-5" />, name: "HR", desc: "Employees & Time" },
    { icon: <LayoutDashboard className="w-5 h-5" />, name: "Projects", desc: "Planning & Tracking" },
    { icon: <BarChart3 className="w-5 h-5" />, name: "Finance", desc: "Ledger & Reports" },
    { icon: <MessageSquare className="w-5 h-5" />, name: "CRM", desc: "Clients & Quotes" },
    { icon: <Calendar className="w-5 h-5" />, name: "Scheduling", desc: "Timeline & Tasks" },
  ];

  if (showDownload) {
    return <DownloadPage onBack={() => setShowDownload(false)} />;
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="Logo" className="w-10 h-10 rounded-lg object-contain" />
              <span className="text-xl font-bold text-foreground tracking-tight">The Planning Bord</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Product</a>
              <a href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Solutions</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">Pricing</a>
              <button 
                onClick={() => setShowDownload(true)}
                className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
              >
                Downloads
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">Sign in</Button>
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
                Get started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border px-6 py-4">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-foreground py-2">Product</a>
              <a href="#solutions" className="text-foreground py-2">Solutions</a>
              <a href="#pricing" className="text-foreground py-2">Pricing</a>
              <a href="#testimonials" className="text-foreground py-2">Resources</a>
              <hr className="border-border" />
              <Button variant="ghost" className="justify-start">Sign in</Button>
              <Button className="bg-primary text-white">Get started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-20 lg:pt-0 overflow-hidden">
        <div className="w-full min-h-screen flex items-center">
          <div className="w-full px-6 lg:px-12 py-12 lg:py-0">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              {/* Left: Content */}
              <div className="order-2 lg:order-1 max-w-xl">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-6 rounded-full px-4 py-1.5 border-none">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Now with AI-powered insights
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                  Plan together.{" "}
                  <span className="text-primary">Finish faster.</span>
                </h1>
                
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  A comprehensive ERP system that brings inventory, HR, projects, and finance into one powerful platform. Built for modern teams who move fast.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-14 text-base font-semibold group"
                    onClick={() => setShowDownload(true)}
                  >
                    Download Now
                    <Download className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 h-14 text-base font-semibold border-border hover:bg-muted group"
                  >
                    <Play className="w-5 h-5 mr-2 fill-foreground" />
                    See how it works
                  </Button>
                </div>

                {/* ERP Modules Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {erpModules.map((module, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="text-primary">{module.icon}</div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">{module.name}</div>
                        <div className="text-[10px] text-muted-foreground">{module.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dashboard Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  {/* Main Dashboard Card */}
                  <Card className="overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-border">
                    <img 
                      src="/images/hero_dashboard.jpg" 
                      alt="The Planning Bord Dashboard"
                      className="w-full h-auto"
                    />
                  </Card>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-border animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Revenue Growth</div>
                        <div className="text-lg font-bold text-foreground">+24.5%</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Notification */}
                  <div className="absolute -top-4 -right-4 bg-card rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-border animate-float-delayed">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                      </div>
                      <div className="text-sm font-medium text-foreground">Task completed!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
              All-in-One Platform
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              All your work in one place
            </h2>
            <p className="text-lg text-muted-foreground">
              Tasks, docs, timelines, and team management—organized without the overload.
            </p>
          </div>

          {/* Feature Tabs + Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Feature List */}
            <div className="space-y-4">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === idx 
                      ? 'bg-card shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-primary/20' 
                      : 'bg-transparent hover:bg-card/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === idx ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${
                        activeFeature === idx ? 'text-primary' : 'text-foreground'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Feature Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-border">
                {features.map((feature, idx) => (
                  <img
                    key={idx}
                    src={feature.image}
                    alt={feature.title}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      activeFeature === idx ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                ))}
              </div>

              {/* Decorative Stickers */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-primary/20 rounded-full border-2 border-background shadow-lg animate-float" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/20 rounded-2xl border-2 border-background shadow-lg rotate-12 animate-float-delayed" />
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Clear Priorities */}
      <section id="solutions" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Images */}
            <div className="relative order-2 lg:order-1">
              {/* Before Card */}
              <Card className="relative z-10 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.10)] border border-border transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/images/card_list.jpg" 
                  alt="Task List View"
                  className="w-full h-auto"
                />
              </Card>

              {/* After Card - Overlapping */}
              <Card className="absolute top-1/4 -right-4 lg:right-8 w-3/4 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.15)] border-2 border-primary/20 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                <img 
                  src="/images/card_board.jpg" 
                  alt="Kanban Board View"
                  className="w-full h-auto"
                />
              </Card>

              {/* Arrow Sticker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-xl animate-pulse">
                  <ArrowRight className="w-10 h-10 text-primary-foreground" />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
                Clear & Focused
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Clear priorities.{" "}
                <span className="text-primary">Zero noise.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                See what matters now—and what can wait. Switch between list and board views instantly without losing context.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Smart task prioritization" },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Multiple view modes (List, Board, Timeline)" },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Custom filters and saved views" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-primary">{item.icon}</div>
                    <span className="text-foreground font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Real-time Collaboration
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Talk where the{" "}
                <span className="text-primary">work happens.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Comments, updates, and decisions—right on the card. No more switching between apps to get things done.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, title: "In-context comments", desc: "Discuss tasks without leaving the board" },
                  { icon: <Zap className="w-5 h-5" />, title: "Real-time updates", desc: "See changes as they happen" },
                  { icon: <Users className="w-5 h-5" />, title: "@mentions", desc: "Notify teammates instantly" },
                  { icon: <Clock className="w-5 h-5" />, title: "Activity history", desc: "Track every change" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-card rounded-xl border border-border shadow-sm">
                    <div className="text-primary mb-2">{item.icon}</div>
                    <div className="font-semibold text-foreground text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-border">
                <img 
                  src="/images/card_chat.jpg" 
                  alt="Collaboration Features"
                  className="w-full h-auto"
                />
              </Card>

              {/* Speech Bubble Sticker */}
              <div className="absolute -top-6 -left-6 bg-primary rounded-2xl p-4 border-2 border-background shadow-xl animate-float">
                <MessageSquare className="w-8 h-8 text-primary-foreground" />
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Image */}
            <div className="relative order-2 lg:order-1">
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-border">
                <img 
                  src="/images/card_timeline.jpg" 
                  alt="Project Timeline"
                  className="w-full h-auto"
                />
              </Card>

              {/* Arrow Sticker */}
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-primary rounded-full flex items-center justify-center border-4 border-background shadow-xl animate-bounce">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Project Timeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                See the path from{" "}
                <span className="text-primary">to-do to done.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Interactive Gantt charts and timelines that keep the team moving forward. Visualize dependencies and hit every deadline.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Gantt Charts", "Milestone Tracking", "Resource Planning", "Dependency Mapping"].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-card rounded-full text-sm font-medium text-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Size Section */}
      <section className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                Scalable
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Made for teams of{" "}
                <span className="text-primary">all sizes.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Start solo. Scale to your whole company. From startups to enterprises, The Planning Bord grows with you.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, title: "Free for small teams", desc: "Up to 5 users, no credit card required" },
                  { icon: <Shield className="w-5 h-5" />, title: "Admin controls & permissions", desc: "Role-based access control for enterprise security" },
                  { icon: <CreditCard className="w-5 h-5" />, title: "SSO & security at scale", desc: "SAML, OAuth, and advanced security features" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border shadow-sm">
                    <div className="text-primary mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.12)] border border-border">
                <img 
                  src="/images/card_team.jpg" 
                  alt="Team Management"
                  className="w-full h-auto"
                />
              </Card>

              {/* Team Size Badge */}
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sm opacity-90">Teams trust us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Loved by modern teams
            </h2>
            <p className="text-lg text-muted-foreground">
              See what industry leaders say about The Planning Bord.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card 
                key={idx}
                className="p-6 lg:p-8 rounded-3xl bg-card border border-border shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)] transition-shadow"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 mb-4 rounded-full">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Start free, upgrade when you need more power.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-card border border-border shadow-sm">
              <div className="mb-6">
                <div className="text-lg font-semibold text-foreground mb-2">Starter</div>
                <div className="text-4xl font-bold text-foreground mb-2">Free</div>
                <div className="text-sm text-muted-foreground">For small teams getting started</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 5 team members",
                  "3 active projects",
                  "Basic task management",
                  "Community support",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-border">
                Get started
              </Button>
            </Card>

            {/* Pro - Highlighted */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-primary text-primary-foreground border-0 relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 bg-primary-foreground/20 text-primary-foreground text-xs font-semibold px-4 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <div className="mb-6">
                <div className="text-lg font-semibold mb-2">Professional</div>
                <div className="text-4xl font-bold mb-2">$12<span className="text-lg font-normal opacity-70">/user/mo</span></div>
                <div className="text-sm opacity-70">For growing teams</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Unlimited team members",
                  "Unlimited projects",
                  "Advanced reporting",
                  "Priority support",
                  "Custom integrations",
                  "API access",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary-foreground" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-lg">
                Start free trial
              </Button>
            </Card>

            {/* Enterprise */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-card border border-border shadow-sm">
              <div className="mb-6">
                <div className="text-lg font-semibold text-foreground mb-2">Enterprise</div>
                <div className="text-4xl font-bold text-foreground mb-2">Custom</div>
                <div className="text-sm text-muted-foreground">For large organizations</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Everything in Pro",
                  "SSO & SAML",
                  "Advanced security",
                  "Dedicated support",
                  "Custom contracts",
                  "SLA guarantee",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-border">
                Contact sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-primary relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl" />

        <div className="w-full px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Ready to plan{" "}
                <span className="opacity-80">better?</span>
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
                Get started free. No credit card required. Join thousands of teams already using The Planning Bord to ship faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full px-8 h-14 text-base font-semibold shadow-xl"
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 h-14 text-base font-semibold border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Read documentation
                </Button>
              </div>
            </div>

            {/* Right: Form Card */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-card border-0 shadow-[0_18px_50px_rgba(0,0,0,0.20)]">
              <h3 className="text-xl font-semibold text-foreground mb-6">Contact Sales</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Work email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                  <input 
                    type="text" 
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-12 shadow-lg shadow-primary/20">
                  Send message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-bold text-foreground">The Planning Bord</span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                A comprehensive ERP system for modern teams. Plan, track, and ship—together.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <span className="text-xs font-semibold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Documentation", "Downloads", "API Reference", "Guides"] },
              { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
            ].map((group, idx) => (
              <div key={idx}>
                <div className="font-semibold text-foreground mb-4">{group.title}</div>
                <ul className="space-y-3">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {link === "Downloads" ? (
                        <button 
                          onClick={() => {
                            setShowDownload(true);
                            window.scrollTo(0, 0);
                          }}
                          className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        >
                          {link}
                        </button>
                      ) : (
                        <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} The Planning Bord. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
