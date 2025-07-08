
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, DollarSign, Users, FileText, Download, Calendar, PieChart } from 'lucide-react';

export const ReportsAnalytics = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 45000, expenses: 28000, clients: 18 },
    { month: 'Feb', revenue: 52000, expenses: 31000, clients: 20 },
    { month: 'Mar', revenue: 48000, expenses: 29000, clients: 22 },
    { month: 'Apr', revenue: 58000, expenses: 35000, clients: 24 }
  ];

  const clientMetrics = [
    { category: 'Corporate', count: 12, revenue: 180000, percentage: 65 },
    { category: 'Individual', count: 18, revenue: 72000, percentage: 26 },
    { category: 'Partnership', count: 4, revenue: 28000, percentage: 9 }
  ];

  const serviceBreakdown = [
    { service: 'GST Filing', revenue: 85000, clients: 15, avgValue: 5667 },
    { service: 'Income Tax', revenue: 95000, clients: 20, avgValue: 4750 },
    { service: 'Audit Services', revenue: 120000, clients: 8, avgValue: 15000 },
    { service: 'Compliance', revenue: 45000, clients: 12, avgValue: 3750 }
  ];

  const performanceMetrics = [
    { metric: 'Client Satisfaction', value: '94%', trend: '+5%', color: 'green' },
    { metric: 'On-time Delivery', value: '96%', trend: '+3%', color: 'green' },
    { metric: 'Revenue Growth', value: '18%', trend: '+12%', color: 'blue' },
    { metric: 'Client Retention', value: '92%', trend: '+2%', color: 'green' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into your practice performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Date Range
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{metric.metric}</p>
                  <p className="text-3xl font-bold">{metric.value}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className={`h-4 w-4 text-${metric.color}-500`} />
                  <span className={`text-sm text-${metric.color}-600 font-medium`}>
                    {metric.trend}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Revenue vs Expenses</span>
          </CardTitle>
          <CardDescription>Monthly financial performance overview</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{data.month} 2024</h4>
                  <Badge variant="outline">{data.clients} clients</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Revenue</p>
                    <p className="text-xl font-bold text-green-600">₹{data.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Expenses</p>
                    <p className="text-xl font-bold text-red-600">₹{data.expenses.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Profit</p>
                    <p className="text-xl font-bold text-blue-600">₹{(data.revenue - data.expenses).toLocaleString()}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${((data.revenue - data.expenses) / data.revenue) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Profit Margin: {(((data.revenue - data.expenses) / data.revenue) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Client Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Client Breakdown</span>
            </CardTitle>
            <CardDescription>Distribution by client type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientMetrics.map((client, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{client.category}</h4>
                    <Badge variant="secondary">{client.count} clients</Badge>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Revenue</span>
                    <span className="font-semibold">₹{client.revenue.toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${client.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{client.percentage}% of total revenue</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Service Performance</span>
            </CardTitle>
            <CardDescription>Revenue breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {serviceBreakdown.map((service, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{service.service}</h4>
                    <Badge variant="outline">{service.clients} clients</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Total Revenue</p>
                      <p className="font-semibold">₹{service.revenue.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Avg Value</p>
                      <p className="font-semibold">₹{service.avgValue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Productivity Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Productivity Dashboard</span>
          </CardTitle>
          <CardDescription>Work efficiency and output metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">127</p>
              <p className="text-sm text-gray-600">Documents Processed</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
              <p className="text-2xl font-bold">45</p>
              <p className="text-sm text-gray-600">Client Meetings</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-2 text-purple-500" />
              <p className="text-2xl font-bold">38</p>
              <p className="text-sm text-gray-600">Invoices Generated</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-500" />
              <p className="text-2xl font-bold">94%</p>
              <p className="text-sm text-gray-600">Task Completion</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reports</CardTitle>
          <CardDescription>Generate specific reports for different purposes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <FileText className="h-6 w-6" />
              <span>Monthly Summary</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <Users className="h-6 w-6" />
              <span>Client Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <DollarSign className="h-6 w-6" />
              <span>Financial Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <BarChart3 className="h-6 w-6" />
              <span>Performance Report</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <TrendingUp className="h-6 w-6" />
              <span>Growth Analysis</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2">
              <PieChart className="h-6 w-6" />
              <span>Custom Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
