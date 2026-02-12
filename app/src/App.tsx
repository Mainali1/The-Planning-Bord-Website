import { useEffect, useState } from 'react';
import './App.css';
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
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

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

  return (
    <div className="min-h-screen bg-[#F4F6FA] font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#F4F6FA]/90 backdrop-blur-md border-b border-[#0B1A3F]/6' 
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4B6DFF] rounded-lg flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-[#0B1A3F]">The Planning Bord</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="#features" className="text-[#0B1A3F]/70 hover:text-[#0B1A3F] transition-colors text-sm font-medium">Product</a>
              <a href="#solutions" className="text-[#0B1A3F]/70 hover:text-[#0B1A3F] transition-colors text-sm font-medium">Solutions</a>
              <a href="#pricing" className="text-[#0B1A3F]/70 hover:text-[#0B1A3F] transition-colors text-sm font-medium">Pricing</a>
              <a href="#testimonials" className="text-[#0B1A3F]/70 hover:text-[#0B1A3F] transition-colors text-sm font-medium">Resources</a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-4">
              <Button variant="ghost" className="text-[#0B1A3F] hover:text-[#4B6DFF]">Sign in</Button>
              <Button className="bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-full px-6">
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
          <div className="lg:hidden bg-[#F4F6FA] border-t border-[#0B1A3F]/6 px-6 py-4">
            <div className="flex flex-col gap-4">
              <a href="#features" className="text-[#0B1A3F] py-2">Product</a>
              <a href="#solutions" className="text-[#0B1A3F] py-2">Solutions</a>
              <a href="#pricing" className="text-[#0B1A3F] py-2">Pricing</a>
              <a href="#testimonials" className="text-[#0B1A3F] py-2">Resources</a>
              <hr className="border-[#0B1A3F]/10" />
              <Button variant="ghost" className="justify-start">Sign in</Button>
              <Button className="bg-[#4B6DFF] text-white">Get started</Button>
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
                <Badge className="bg-[#4B6DFF]/10 text-[#4B6DFF] hover:bg-[#4B6DFF]/20 mb-6 rounded-full px-4 py-1.5">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Now with AI-powered insights
                </Badge>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0B1A3F] leading-[1.1] tracking-tight mb-6">
                  Plan together.{" "}
                  <span className="text-[#4B6DFF]">Finish faster.</span>
                </h1>
                
                <p className="text-lg text-[#6B7A99] mb-8 leading-relaxed">
                  A comprehensive ERP system that brings inventory, HR, projects, and finance into one powerful platform. Built for modern teams who move fast.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    size="lg" 
                    className="bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-full px-8 h-14 text-base font-semibold group"
                  >
                    Get started free
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full px-8 h-14 text-base font-semibold border-[#0B1A3F]/20 hover:bg-[#0B1A3F]/5 group"
                  >
                    <Play className="w-5 h-5 mr-2 fill-[#0B1A3F]" />
                    See how it works
                  </Button>
                </div>

                {/* ERP Modules Grid */}
                <div className="grid grid-cols-3 gap-3">
                  {erpModules.map((module, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center gap-2 p-2.5 bg-white rounded-xl border border-[#0B1A3F]/8 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="text-[#4B6DFF]">{module.icon}</div>
                      <div>
                        <div className="text-xs font-semibold text-[#0B1A3F]">{module.name}</div>
                        <div className="text-[10px] text-[#6B7A99]">{module.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Dashboard Image */}
              <div className="order-1 lg:order-2 relative">
                <div className="relative">
                  {/* Main Dashboard Card */}
                  <Card className="overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(11,26,63,0.12)] border border-[#0B1A3F]/8">
                    <img 
                      src="/images/hero_dashboard.jpg" 
                      alt="The Planning Bord Dashboard"
                      className="w-full h-auto"
                    />
                  </Card>

                  {/* Floating Stats Card */}
                  <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#0B1A3F]/8 animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-[#6B7A99]">Revenue Growth</div>
                        <div className="text-lg font-bold text-[#0B1A3F]">+24.5%</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Notification */}
                  <div className="absolute -top-4 -right-4 bg-white rounded-xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-[#0B1A3F]/8 animate-float-delayed">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#4B6DFF] rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                      </div>
                      <div className="text-sm font-medium text-[#0B1A3F]">Task completed!</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#4B6DFF]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#2EE8B3]/5 rounded-full blur-3xl pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 lg:py-32">
        <div className="w-full px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge className="bg-[#2EE8B3]/10 text-[#0B1A3F] hover:bg-[#2EE8B3]/20 mb-4 rounded-full">
              All-in-One Platform
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-4">
              All your work in one place
            </h2>
            <p className="text-lg text-[#6B7A99]">
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
                      ? 'bg-white shadow-[0_10px_30px_rgba(11,26,63,0.08)] border border-[#4B6DFF]/20' 
                      : 'bg-transparent hover:bg-white/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl ${
                      activeFeature === idx ? 'bg-[#4B6DFF] text-white' : 'bg-[#0B1A3F]/5 text-[#0B1A3F]'
                    }`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`text-lg font-semibold mb-1 ${
                        activeFeature === idx ? 'text-[#4B6DFF]' : 'text-[#0B1A3F]'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className="text-[#6B7A99] text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Feature Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.12)] border border-[#0B1A3F]/8">
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
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-[#C8B8FF] rounded-full border-2 border-white shadow-lg animate-float" />
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-[#2EE8B3] rounded-2xl border-2 border-white shadow-lg rotate-12 animate-float-delayed" />
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
              <Card className="relative z-10 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.10)] border border-[#0B1A3F]/8 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="/images/card_list.jpg" 
                  alt="Task List View"
                  className="w-full h-auto"
                />
              </Card>

              {/* After Card - Overlapping */}
              <Card className="absolute top-1/4 -right-4 lg:right-8 w-3/4 rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.15)] border-2 border-[#4B6DFF]/20 transform rotate-3 hover:rotate-0 transition-transform duration-500 z-20">
                <img 
                  src="/images/card_board.jpg" 
                  alt="Kanban Board View"
                  className="w-full h-auto"
                />
              </Card>

              {/* Arrow Sticker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <div className="w-20 h-20 bg-[#2EE8B3] rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-pulse">
                  <ArrowRight className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <Badge className="bg-[#FF6A5A]/10 text-[#FF6A5A] hover:bg-[#FF6A5A]/20 mb-4 rounded-full">
                Clear & Focused
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-6 leading-tight">
                Clear priorities.{" "}
                <span className="text-[#4B6DFF]">Zero noise.</span>
              </h2>
              <p className="text-lg text-[#6B7A99] mb-8 leading-relaxed">
                See what matters now—and what can wait. Switch between list and board views instantly without losing context.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Smart task prioritization" },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Multiple view modes (List, Board, Timeline)" },
                  { icon: <CheckCircle2 className="w-5 h-5" />, text: "Custom filters and saved views" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="text-[#2EE8B3]">{item.icon}</div>
                    <span className="text-[#0B1A3F] font-medium">{item.text}</span>
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
              <Badge className="bg-[#7DD3FC]/20 text-[#0B1A3F] hover:bg-[#7DD3FC]/30 mb-4 rounded-full">
                <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
                Real-time Collaboration
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-6 leading-tight">
                Talk where the{" "}
                <span className="text-[#4B6DFF]">work happens.</span>
              </h2>
              <p className="text-lg text-[#6B7A99] mb-8 leading-relaxed">
                Comments, updates, and decisions—right on the card. No more switching between apps to get things done.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: <MessageSquare className="w-5 h-5" />, title: "In-context comments", desc: "Discuss tasks without leaving the board" },
                  { icon: <Zap className="w-5 h-5" />, title: "Real-time updates", desc: "See changes as they happen" },
                  { icon: <Users className="w-5 h-5" />, title: "@mentions", desc: "Notify teammates instantly" },
                  { icon: <Clock className="w-5 h-5" />, title: "Activity history", desc: "Track every change" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-xl border border-[#0B1A3F]/8">
                    <div className="text-[#4B6DFF] mb-2">{item.icon}</div>
                    <div className="font-semibold text-[#0B1A3F] text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-[#6B7A99]">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.12)] border border-[#0B1A3F]/8">
                <img 
                  src="/images/card_chat.jpg" 
                  alt="Collaboration Features"
                  className="w-full h-auto"
                />
              </Card>

              {/* Speech Bubble Sticker */}
              <div className="absolute -top-6 -left-6 bg-[#7DD3FC] rounded-2xl p-4 border-2 border-white shadow-xl animate-float">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>

              {/* Decorative */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-[#FF6A5A]/20 rounded-full blur-2xl" />
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
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.12)] border border-[#0B1A3F]/8">
                <img 
                  src="/images/card_timeline.jpg" 
                  alt="Project Timeline"
                  className="w-full h-auto"
                />
              </Card>

              {/* Arrow Sticker */}
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-[#2EE8B3] rounded-full flex items-center justify-center border-4 border-white shadow-xl animate-bounce">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Right: Content */}
            <div className="order-1 lg:order-2">
              <Badge className="bg-[#4B6DFF]/10 text-[#4B6DFF] hover:bg-[#4B6DFF]/20 mb-4 rounded-full">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                Project Timeline
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-6 leading-tight">
                See the path from{" "}
                <span className="text-[#4B6DFF]">to-do to done.</span>
              </h2>
              <p className="text-lg text-[#6B7A99] mb-8 leading-relaxed">
                Interactive Gantt charts and timelines that keep the team moving forward. Visualize dependencies and hit every deadline.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Gantt Charts", "Milestone Tracking", "Resource Planning", "Dependency Mapping"].map((tag, idx) => (
                  <span 
                    key={idx}
                    className="px-4 py-2 bg-white rounded-full text-sm font-medium text-[#0B1A3F] border border-[#0B1A3F]/10"
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
              <Badge className="bg-[#C8B8FF]/30 text-[#0B1A3F] hover:bg-[#C8B8FF]/40 mb-4 rounded-full">
                <Users className="w-3.5 h-3.5 mr-1.5" />
                Scalable
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-6 leading-tight">
                Made for teams of{" "}
                <span className="text-[#4B6DFF]">all sizes.</span>
              </h2>
              <p className="text-lg text-[#6B7A99] mb-8 leading-relaxed">
                Start solo. Scale to your whole company. From startups to enterprises, The Planning Bord grows with you.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Zap className="w-5 h-5" />, title: "Free for small teams", desc: "Up to 5 users, no credit card required" },
                  { icon: <Shield className="w-5 h-5" />, title: "Admin controls & permissions", desc: "Role-based access control for enterprise security" },
                  { icon: <CreditCard className="w-5 h-5" />, title: "SSO & security at scale", desc: "SAML, OAuth, and advanced security features" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#0B1A3F]/8">
                    <div className="text-[#4B6DFF] mt-0.5">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-[#0B1A3F]">{item.title}</div>
                      <div className="text-sm text-[#6B7A99]">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Image */}
            <div className="relative">
              <Card className="rounded-3xl overflow-hidden shadow-[0_18px_50px_rgba(11,26,63,0.12)] border border-[#0B1A3F]/8">
                <img 
                  src="/images/card_team.jpg" 
                  alt="Team Management"
                  className="w-full h-auto"
                />
              </Card>

              {/* Team Size Badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#0B1A3F] text-white rounded-2xl p-4 shadow-xl">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-sm text-white/70">Teams trust us</div>
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
            <Badge className="bg-[#FF6A5A]/10 text-[#FF6A5A] hover:bg-[#FF6A5A]/20 mb-4 rounded-full">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-4">
              Loved by modern teams
            </h2>
            <p className="text-lg text-[#6B7A99]">
              See what industry leaders say about The Planning Bord.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, idx) => (
              <Card 
                key={idx}
                className="p-6 lg:p-8 rounded-3xl bg-white border border-[#0B1A3F]/8 shadow-[0_10px_30px_rgba(11,26,63,0.06)] hover:shadow-[0_18px_50px_rgba(11,26,63,0.10)] transition-shadow"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#4B6DFF] text-[#4B6DFF]" />
                  ))}
                </div>
                <p className="text-[#0B1A3F] text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-[#0B1A3F]">{testimonial.author}</div>
                    <div className="text-sm text-[#6B7A99]">{testimonial.role}</div>
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
            <Badge className="bg-[#2EE8B3]/10 text-[#0B1A3F] hover:bg-[#2EE8B3]/20 mb-4 rounded-full">
              <CreditCard className="w-3.5 h-3.5 mr-1.5" />
              Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1A3F] mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-[#6B7A99]">
              Start free, upgrade when you need more power.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-white border border-[#0B1A3F]/8">
              <div className="mb-6">
                <div className="text-lg font-semibold text-[#0B1A3F] mb-2">Starter</div>
                <div className="text-4xl font-bold text-[#0B1A3F] mb-2">Free</div>
                <div className="text-sm text-[#6B7A99]">For small teams getting started</div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Up to 5 team members",
                  "3 active projects",
                  "Basic task management",
                  "Community support",
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#0B1A3F]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EE8B3]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-[#0B1A3F]/20">
                Get started
              </Button>
            </Card>

            {/* Pro - Highlighted */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-[#0B1A3F] text-white border-0 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#4B6DFF] text-white text-xs font-semibold px-4 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <div className="mb-6">
                <div className="text-lg font-semibold mb-2">Professional</div>
                <div className="text-4xl font-bold mb-2">$12<span className="text-lg font-normal text-white/60">/user/mo</span></div>
                <div className="text-sm text-white/60">For growing teams</div>
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
                    <CheckCircle2 className="w-4 h-4 text-[#2EE8B3]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full rounded-full bg-[#4B6DFF] hover:bg-[#3a5aee] text-white">
                Start free trial
              </Button>
            </Card>

            {/* Enterprise */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-white border border-[#0B1A3F]/8">
              <div className="mb-6">
                <div className="text-lg font-semibold text-[#0B1A3F] mb-2">Enterprise</div>
                <div className="text-4xl font-bold text-[#0B1A3F] mb-2">Custom</div>
                <div className="text-sm text-[#6B7A99]">For large organizations</div>
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
                  <li key={idx} className="flex items-center gap-3 text-sm text-[#0B1A3F]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EE8B3]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full rounded-full border-[#0B1A3F]/20">
                Contact sales
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-[#0B1A3F] relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4B6DFF]/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2EE8B3]/10 rounded-full blur-3xl" />

        <div className="w-full px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                Ready to plan{" "}
                <span className="text-[#4B6DFF]">better?</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                Get started free. No credit card required. Join thousands of teams already using The Planning Bord to ship faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-full px-8 h-14 text-base font-semibold"
                >
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="rounded-full px-8 h-14 text-base font-semibold border-white/20 text-white hover:bg-white/10"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Read documentation
                </Button>
              </div>
            </div>

            {/* Right: Form Card */}
            <Card className="p-6 lg:p-8 rounded-3xl bg-white border-0 shadow-[0_18px_50px_rgba(0,0,0,0.20)]">
              <h3 className="text-xl font-semibold text-[#0B1A3F] mb-6">Contact Sales</h3>
              <form className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#0B1A3F] mb-1.5 block">Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-[#0B1A3F]/10 focus:border-[#4B6DFF] focus:ring-2 focus:ring-[#4B6DFF]/20 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[#0B1A3F] mb-1.5 block">Work email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#0B1A3F]/10 focus:border-[#4B6DFF] focus:ring-2 focus:ring-[#4B6DFF]/20 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0B1A3F] mb-1.5 block">Company</label>
                  <input 
                    type="text" 
                    placeholder="Acme Inc."
                    className="w-full px-4 py-3 rounded-xl border border-[#0B1A3F]/10 focus:border-[#4B6DFF] focus:ring-2 focus:ring-[#4B6DFF]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#0B1A3F] mb-1.5 block">Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about your needs..."
                    className="w-full px-4 py-3 rounded-xl border border-[#0B1A3F]/10 focus:border-[#4B6DFF] focus:ring-2 focus:ring-[#4B6DFF]/20 outline-none transition-all resize-none"
                  />
                </div>
                <Button className="w-full bg-[#4B6DFF] hover:bg-[#3a5aee] text-white rounded-full h-12">
                  Send message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0B1A3F] border-t border-white/10 py-16">
        <div className="w-full px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#4B6DFF] rounded-lg flex items-center justify-center">
                  <LayoutDashboard className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">The Planning Bord</span>
              </div>
              <p className="text-white/60 mb-6 max-w-sm">
                A comprehensive ERP system for modern teams. Plan, track, and ship—together.
              </p>
              <div className="flex gap-4">
                {['Twitter', 'LinkedIn', 'GitHub', 'Discord'].map((social) => (
                  <a 
                    key={social}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-colors"
                  >
                    <span className="text-xs font-semibold">{social[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              { title: "Product", links: ["Features", "Integrations", "Pricing", "Changelog"] },
              { title: "Resources", links: ["Documentation", "API Reference", "Guides", "Blog"] },
              { title: "Company", links: ["About", "Careers", "Contact", "Privacy"] },
            ].map((group, idx) => (
              <div key={idx}>
                <div className="font-semibold text-white mb-4">{group.title}</div>
                <ul className="space-y-3">
                  {group.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-white/40 text-sm">
              © 2026 The Planning Bord. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Terms</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Privacy</a>
              <a href="#" className="text-white/40 hover:text-white text-sm transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
