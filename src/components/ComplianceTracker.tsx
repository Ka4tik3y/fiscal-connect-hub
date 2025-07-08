
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, CheckCircle2, Calendar, Clock } from 'lucide-react';

export const ComplianceTracker = () => {
  const [complianceItems, setComplianceItems] = useState([
    {
      id: 1,
      title: 'GST Return Filing - March 2024',
      client: 'ABC Corporation',
      dueDate: '2024-04-20',
      status: 'pending',
      priority: 'high',
      type: 'gst',
      description: 'Monthly GST return filing for March 2024'
    },
    {
      id: 2,
      title: 'Income Tax Return - FY 2023-24',
      client: 'John Doe',
      dueDate: '2024-07-31',
      status: 'in-progress',
      priority: 'medium',
      type: 'income-tax',
      description: 'Annual income tax return filing'
    },
    {
      id: 3,
      title: 'TDS Return - Q4 2023-24',
      client: 'XYZ Industries',
      dueDate: '2024-05-30',
      status: 'completed',
      priority: 'medium',
      type: 'tds',
      description: 'Quarterly TDS return filing'
    },
    {
      id: 4,
      title: 'ROC Annual Filing',
      client: 'DEF Enterprises',
      dueDate: '2024-09-30',
      status: 'pending',
      priority: 'high',
      type: 'roc',
      description: 'Annual filing with Registrar of Companies'
    },
    {
      id: 5,
      title: 'ESI Returns - March 2024',
      client: 'GHI Limited',
      dueDate: '2024-04-15',
      status: 'overdue',
      priority: 'high',
      type: 'esi',
      description: 'Employee State Insurance monthly return'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'overdue': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-blue-500" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const pendingItems = complianceItems.filter(item => item.status === 'pending' || item.status === 'in-progress');
  const overdueItems = complianceItems.filter(item => item.status === 'overdue');
  const completedItems = complianceItems.filter(item => item.status === 'completed');

  const upcomingDeadlines = complianceItems
    .filter(item => item.status !== 'completed' && getDaysUntilDue(item.dueDate) <= 30)
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Compliance Tracker</h2>
        <p className="text-gray-600">Stay on top of all regulatory filings and deadlines</p>
      </div>

      {/* Compliance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingItems.length}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{overdueItems.length}</p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedItems.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{upcomingDeadlines.length}</p>
                <p className="text-sm text-gray-600">Due Soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Items */}
      {(overdueItems.length > 0 || upcomingDeadlines.length > 0) && (
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Urgent Attention Required</span>
            </CardTitle>
            <CardDescription>Items that are overdue or due soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...overdueItems, ...upcomingDeadlines.slice(0, 3)].map((item) => (
                <div key={item.id} className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(item.status)}
                        <h4 className="font-semibold text-sm">{item.title}</h4>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Client: {item.client}</span>
                        <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        <span className={`font-medium ${getDaysUntilDue(item.dueDate) < 0 ? 'text-red-600' : 'text-blue-600'}`}>
                          {getDaysUntilDue(item.dueDate) < 0 
                            ? `${Math.abs(getDaysUntilDue(item.dueDate))} days overdue`
                            : `${getDaysUntilDue(item.dueDate)} days left`
                          }
                        </span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Take Action
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Compliance Items */}
      <Card>
        <CardHeader>
          <CardTitle>All Compliance Items</CardTitle>
          <CardDescription>Complete list of regulatory filings and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceItems.map((item) => (
              <div key={item.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {getStatusIcon(item.status)}
                      <h4 className="font-semibold">{item.title}</h4>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-500">
                      <div>
                        <span className="font-medium">Client:</span> {item.client}
                      </div>
                      <div>
                        <span className="font-medium">Type:</span> {item.type.toUpperCase()}
                      </div>
                      <div>
                        <span className="font-medium">Due Date:</span> {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Days Left:</span> 
                        <span className={`ml-1 ${getDaysUntilDue(item.dueDate) < 7 ? 'text-red-600 font-semibold' : ''}`}>
                          {getDaysUntilDue(item.dueDate) < 0 
                            ? `${Math.abs(getDaysUntilDue(item.dueDate))} overdue`
                            : getDaysUntilDue(item.dueDate)
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    {item.status !== 'completed' && (
                      <Button size="sm" variant="outline">
                        Update Status
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Calendar View</CardTitle>
          <CardDescription>Upcoming deadlines in calendar format</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingDeadlines.slice(0, 6).map((item) => (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">{new Date(item.dueDate).toLocaleDateString()}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.client}</p>
                <div className="mt-2">
                  <Badge className={getStatusColor(item.status)} >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
