
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Newspaper, RefreshCw } from 'lucide-react';

export const MarketUpdates = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const marketData = [
    { symbol: 'NIFTY 50', value: '19,674.25', change: '+127.35', changePercent: '+0.65%', trend: 'up' },
    { symbol: 'SENSEX', value: '66,230.15', change: '+394.83', changePercent: '+0.60%', trend: 'up' },
    { symbol: 'BANK NIFTY', value: '44,789.60', change: '-89.45', changePercent: '-0.20%', trend: 'down' },
    { symbol: 'USD/INR', value: '83.15', change: '+0.12', changePercent: '+0.14%', trend: 'up' },
  ];

  const newsUpdates = [
    {
      title: 'New GST Rules Effective from Next Quarter',
      summary: 'Government announces changes to GST filing procedures and compliance requirements.',
      category: 'Tax Policy',
      time: '2 hours ago',
      importance: 'high'
    },
    {
      title: 'Income Tax Deadline Extended for FY 2023-24',
      summary: 'IT Department extends filing deadline by 15 days due to technical issues.',
      category: 'Income Tax',
      time: '4 hours ago',
      importance: 'high'
    },
    {
      title: 'RBI Announces New Banking Regulations',
      summary: 'Reserve Bank introduces new compliance measures for banking sector.',
      category: 'Banking',
      time: '6 hours ago',
      importance: 'medium'
    },
    {
      title: 'Corporate Tax Rate Changes Proposed',
      summary: 'Finance Ministry considers reducing corporate tax rates for small businesses.',
      category: 'Corporate Tax',
      time: '1 day ago',
      importance: 'medium'
    },
  ];

  const economicIndicators = [
    { name: 'Repo Rate', value: '6.50%', status: 'stable' },
    { name: 'CRR', value: '4.50%', status: 'stable' },
    { name: 'Inflation Rate', value: '5.82%', status: 'up' },
    { name: 'GDP Growth', value: '7.20%', status: 'up' },
  ];

  const refreshData = () => {
    setLastUpdated(new Date());
    // In a real app, this would fetch fresh data from APIs
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Market Updates</h2>
          <p className="text-gray-600">Latest financial market data and regulatory updates</p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Market Indices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Market Indices</span>
          </CardTitle>
          <CardDescription>Live market data and indices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((item, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-sm">{item.symbol}</h4>
                  {item.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold">{item.value}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`text-sm ${item.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change}
                  </span>
                  <Badge variant={item.trend === 'up' ? 'default' : 'destructive'}>
                    {item.changePercent}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Economic Indicators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Economic Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {economicIndicators.map((indicator, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm text-gray-600">{indicator.name}</h4>
                    <p className="text-xl font-bold">{indicator.value}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    indicator.status === 'up' ? 'bg-green-500' : 
                    indicator.status === 'down' ? 'bg-red-500' : 'bg-gray-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* News & Updates */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Newspaper className="h-5 w-5" />
            <span>Latest News & Updates</span>
          </CardTitle>
          <CardDescription>Important regulatory and financial news</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsUpdates.map((news, index) => (
              <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-sm">{news.title}</h4>
                      <Badge variant={news.importance === 'high' ? 'destructive' : 'secondary'}>
                        {news.importance}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{news.category}</span>
                      <span>•</span>
                      <span>{news.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Calculators</CardTitle>
          <CardDescription>Quick calculation tools for your practice</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Tax Calculator</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>GST Calculator</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Investment Calculator</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
