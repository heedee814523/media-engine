import React, { useState, useEffect } from 'react';
import {
  Users,
  Cpu,
  Target,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import Chatbot from './Chatbot';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Service', href: '#service' },
    { name: 'News', href: '#news' },
    { name: 'Recruit', href: '#recruit' },
  ];

  const features = [
    {
      title: "Co-creation Network",
      subtitle: "共創が生み出す、AIでは創れない価値",
      description: "全国に2,000名以上のエキスパート、インフルエンサー、クリエイターとの強固なネットワークを構築。専門家による一次情報に基づいた\u201c人にしか生み出せない価値\u201dを提供します。",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      tag: "Professionals"
    },
    {
      title: "Professionals",
      subtitle: "多彩なバックグラウンドを持つプロ集団",
      description: "大手出版社の編集長や、Webメディアのグロースハッカーなど、業界を牽引してきたプロフェッショナルが多数在籍。課題を正確に捉え、成果に直結する戦略を立案します。",
      icon: <Target className="w-8 h-8 text-blue-600" />,
      tag: "Expertise"
    },
    {
      title: "AI Driven Systems",
      subtitle: "ノウハウとテクノロジーを融合",
      description: "独自のAIツールを開発・運用。AIによる調査・分析を活用し、精度と効率を高めたマーケティング支援を実現。人の知見とテクノロジーで成果を最大化します。",
      icon: <Cpu className="w-8 h-8 text-blue-600" />,
      tag: "Technology"
    }
  ];

  const services = [
    {
      title: "メディア事業",
      description: "「知る」だけで終わらない体験を届けるメディア。生活者のリアルな関心に向き合い、新しい価値との出会いを生み出します。",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "マーケティングソリューション事業",
      description: "SEO、AIO、SNSトレンドを取り入れ、情報が「届く」だけでなく「語られ、愛される」メディア構築を支援します。",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const newsItems = [
    { date: "2025.12.23", category: "お知らせ", title: "ホームページをリニューアルしました" },
    { date: "2025.11.10", category: "お知らせ", title: "マイナビ社・Hakuhodo DY ONE社と共同で「オウンドメディア総合支援パッケージ」提供開始" },
    { date: "2025.08.27", category: "お知らせ", title: "人気漫画『推しが部下になりました』縦型ショートアニメ化決定" }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MEDIA ENGINE</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-blue-600 transition-colors">
                {link.name}
              </a>
            ))}
            <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200">
              Contact
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center space-y-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-2xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </a>
          ))}
          <button className="bg-blue-600 text-white px-10 py-4 rounded-full text-lg font-bold">
            Contact
          </button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full opacity-10">
          <div className="absolute top-20 right-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-40 w-80 h-80 bg-indigo-600 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter mb-8">
              メディアで、人に、<br />
              <span className="text-blue-600">新しい体験</span>を。
            </h1>
            <p className="text-lg lg:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
              私たちは、2,000名以上のエキスパートネットワークと独自のAIシステムを融合させ、
              本質的な価値を持つコンテンツとコミュニケーションを創出します。
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="group bg-slate-900 text-white px-8 py-4 rounded-full font-bold flex items-center justify-center hover:bg-blue-600 transition-all">
                About Our Services
                <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-full font-bold border border-slate-200 hover:bg-slate-50 transition-all">
                View Case Studies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="about" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Our Features</span>
              <h2 className="text-4xl font-bold mt-2">私たちの強み</h2>
            </div>
            <p className="text-slate-500 max-w-md">
              AIが進化する今だからこそ、一次情報に基づいた「人にしか生み出せない価値」を追求しています。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="group bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100 flex flex-col h-full">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <span className="text-xs font-bold text-blue-500 mb-2 uppercase tracking-tighter">{feature.tag}</span>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-blue-600 text-sm font-semibold mb-4">{feature.subtitle}</p>
                <p className="text-slate-600 leading-relaxed text-sm flex-grow">{feature.description}</p>
                <div className="mt-8 flex items-center text-slate-900 font-bold text-sm group-hover:text-blue-600 transition-colors">
                  Learn More <ArrowUpRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="service" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">Service</span>
            <h2 className="text-4xl font-bold mt-2">事業内容</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service, idx) => (
              <div key={idx} className="group relative rounded-3xl overflow-hidden aspect-[4/3] flex items-end">
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                <div className="relative p-10 text-white">
                  <h3 className="text-3xl font-bold mb-4">{service.title}</h3>
                  <p className="text-slate-200 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {service.description}
                  </p>
                  <button className="flex items-center font-bold text-sm bg-white text-slate-900 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    Service Detail <ChevronRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">News</span>
              <h2 className="text-4xl font-bold mt-2">お知らせ</h2>
            </div>
            <button className="hidden md:flex items-center text-slate-600 hover:text-blue-600 font-semibold transition-colors">
              View All <ExternalLink className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="space-y-0">
            {newsItems.map((item, idx) => (
              <div key={idx} className="group border-b border-slate-100 py-8 flex flex-col md:flex-row md:items-center hover:bg-slate-50 transition-colors px-4 -mx-4 rounded-xl">
                <div className="flex items-center space-x-6 mb-2 md:mb-0 md:w-1/4">
                  <span className="text-slate-400 text-sm font-medium">{item.date}</span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{item.category}</span>
                </div>
                <h3 className="text-lg font-bold flex-grow group-hover:text-blue-600 transition-colors cursor-pointer">
                  {item.title}
                </h3>
                <ChevronRight className="hidden md:block w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-2 transition-all" />
              </div>
            ))}
          </div>

          <button className="mt-8 w-full md:hidden py-4 rounded-xl border border-slate-200 font-bold flex items-center justify-center">
            View All
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            ビジネスの可能性を、<br className="md:hidden" />メディアで加速させる。
          </h2>
          <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
            オウンドメディア制作からSEO、SNSマーケティングまで、<br />
            貴社の課題に合わせた最適なソリューションを提案します。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center">
              <MessageSquare className="mr-2 w-5 h-5" />
              Contact Us
            </button>
            <button className="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-10 py-5 rounded-full font-bold text-lg transition-all">
              Company Profile
            </button>
          </div>
        </div>
      </section>

      {/* Chatbot */}
      <Chatbot />

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">M</span>
                </div>
                <span className="font-bold text-lg">MEDIA ENGINE</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                メディアで、人に、新しい体験を。<br />
                私たちはデジタル領域における<br />
                新しいコミュニケーションを創出します。
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Links</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">News</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Recruit</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Services</h4>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Media Business</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Marketing Solution</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">SEO &amp; AIO</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">SNS Strategy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-slate-400">Social</h4>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
                  <span className="font-bold text-xs">FB</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
                  <span className="font-bold text-xs">TW</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all">
                  <span className="font-bold text-xs">LI</span>
                </a>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0">
            <p>(C) MEDIA ENGINE INC. ALL RIGHTS RESERVED.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
