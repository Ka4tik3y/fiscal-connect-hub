
import { useState } from 'react';
import { Calendar, TrendingUp, Bell, FileText, Calculator, Zap, Globe, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarComponent } from '@/components/CalendarComponent';
import { MarketUpdates } from '@/components/MarketUpdates';
import { ComplianceTracker } from '@/components/ComplianceTracker';
import { ReportsAnalytics } from '@/components/ReportsAnalytics';
import { FinanceComplianceCalendar } from '@/components/FinanceComplianceCalendar';
import { CalculatorHub } from '@/components/CalculatorHub';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const menuItems = [
    { id: 'overview', label: 'Portal Overview', icon: Globe, gradient: 'from-purple-500 to-pink-500' },
    { id: 'calculators', label: 'Financial Calculators', icon: Calculator, gradient: 'from-blue-500 to-cyan-500' },
    { id: 'calendar', label: 'Meeting Calendar', icon: Calendar, gradient: 'from-green-500 to-emerald-500' },
    { id: 'finance-compliance', label: 'Finance Compliance Calendar', icon: Bell, gradient: 'from-amber-500 to-orange-500' },
    { id: 'market', label: 'Market Updates', icon: TrendingUp, gradient: 'from-red-500 to-rose-500' },
    { id: 'compliance', label: 'Compliance Tracker', icon: Bell, gradient: 'from-indigo-500 to-purple-500' },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, gradient: 'from-teal-500 to-blue-500' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'calculators':
        return <CalculatorHub />;
      case 'calendar':
        return <CalendarComponent />;
      case 'finance-compliance':
        return <FinanceComplianceCalendar />;
      case 'market':
        return <MarketUpdates />;
      case 'compliance':
        return <ComplianceTracker />;
      case 'reports':
        return <ReportsAnalytics />;
      default:
        return <PortalOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
        
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-white opacity-60 rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-32 left-32 w-6 h-6 bg-cyan-400 opacity-40 animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-purple-400 opacity-50 rounded-full animate-ping"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-black/20 backdrop-blur-xl shadow-2xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    CA Portal 3D
                  </h1>
                  <p className="text-sm text-gray-300 flex items-center space-x-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>Dynamic Financial Intelligence Hub</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-lg font-bold text-white">AI-Powered Portal</p>
                <p className="text-sm text-gray-300">Next-Gen Analytics</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-spin-slow">
                <Globe className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Dynamic Sidebar */}
          <div className="w-80 bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl p-6 h-fit sticky top-8 border border-white/10">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>Portal Modules</span>
              </h3>
              <p className="text-gray-300">Advanced CA Tools & Analytics</p>
            </div>
            <nav className="space-y-3">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full group relative overflow-hidden rounded-2xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'transform scale-105 shadow-2xl'
                        : 'hover:scale-102 hover:shadow-lg'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} ${activeTab === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-80'} transition-opacity duration-300`}></div>
                    <div className={`relative flex items-center space-x-4 px-6 py-4 ${activeTab === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors duration-300`}>
                      <div className="relative">
                        <Icon className="h-6 w-6" />
                        {activeTab === item.id && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                        )}
                      </div>
                      <span className="font-semibold text-sm">{item.label}</span>
                    </div>
                    {activeTab === item.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/50 rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 relative">
            <div className="bg-black/20 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 min-h-[600px]">
              <div className="p-8">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortalOverview = ({ setActiveTab }: { setActiveTab: (tab: string) => void }) => {
  const portalSections = [
    {
      id: 'calculators',
      title: 'Financial Calculators',
      description: 'Advanced calculation tools for GST, EMI, SIP, Tax, and complex financial computations',
      icon: Calculator,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['GST Calculator', 'EMI Calculator', 'SIP Calculator', 'Tax Calculator']
    },
    {
      id: 'calendar',
      title: 'Smart Calendar',
      description: 'AI-powered scheduling with intelligent meeting management and automated reminders',
      icon: Calendar,
      gradient: 'from-green-500 to-emerald-500',
      features: ['Smart Scheduling', 'AI Reminders', 'Client Integration']
    },
    {
      id: 'finance-compliance',
      title: 'Compliance Calendar',
      description: 'Real-time tracking of financial compliance deadlines with predictive analytics',
      icon: Bell,
      gradient: 'from-amber-500 to-orange-500',
      features: ['Deadline Tracking', 'Compliance Alerts', 'Regulatory Updates']
    },
    {
      id: 'market',
      title: 'Market Intelligence',
      description: 'Live market data with AI-driven insights and predictive financial analytics',
      icon: TrendingUp,
      gradient: 'from-red-500 to-rose-500',
      features: ['Live Data', 'AI Insights', 'Market Predictions']
    },
    {
      id: 'compliance',
      title: 'Compliance Tracker',
      description: 'Comprehensive compliance monitoring with automated status updates and alerts',
      icon: Bell,
      gradient: 'from-indigo-500 to-purple-500',
      features: ['Status Monitoring', 'Auto Updates', 'Risk Assessment']
    },
    {
      id: 'reports',
      title: 'Analytics Dashboard',
      description: 'Advanced data visualization with interactive charts and predictive modeling',
      icon: BarChart3,
      gradient: 'from-teal-500 to-blue-500',
      features: ['Interactive Charts', 'Predictive Models', 'Custom Reports']
    }
  ];

  return (
    <div className="space-y-10">
      <div className="text-center mb-16">
        <div className="relative inline-block">
          <h2 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            CA Portal 3D
          </h2>
          <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce"></div>
        </div>
        <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
          Experience the future of Chartered Accountancy with our AI-powered, 
          3D-enhanced professional portal featuring advanced analytics and intelligent automation
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {portalSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <Card 
              key={section.id} 
              className="group relative overflow-hidden bg-black/30 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
              onClick={() => setActiveTab(section.id)}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${section.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              <CardHeader className="pb-4 relative z-10">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${section.gradient} shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div>
                    <CardTitle className="text-2xl text-white group-hover:text-cyan-300 transition-colors duration-300">
                      {section.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <CardDescription className="text-gray-300 mb-6 text-lg leading-relaxed">
                  {section.description}
                </CardDescription>
                <div className="space-y-3">
                  <p className="text-sm font-bold text-cyan-400">Advanced Features:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {section.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-sm text-gray-300">
                        <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className={`w-full mt-6 bg-gradient-to-r ${section.gradient} hover:shadow-2xl transform transition-all duration-300 hover:scale-105`}
                  onClick={() => setActiveTab(section.id)}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Launch {section.title}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
        {[
          { title: 'AI-Powered', subtitle: 'Smart Automation', icon: Zap, color: 'from-yellow-400 to-orange-500' },
          { title: '3D Interface', subtitle: 'Immersive Experience', icon: Globe, color: 'from-purple-400 to-pink-500' },
          { title: 'Real-time', subtitle: 'Live Data Updates', icon: TrendingUp, color: 'from-green-400 to-cyan-500' },
          { title: 'Cloud-Based', subtitle: 'Secure & Scalable', icon: FileText, color: 'from-blue-400 to-indigo-500' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-300 group">
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 text-lg">{stat.title}</h3>
                <p className="text-sm text-gray-300">{stat.subtitle}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Index;
