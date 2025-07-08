
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, AlertTriangle, CheckCircle2, Calendar as CalendarIcon, Clock, FileText } from 'lucide-react';

export const FinanceComplianceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const complianceEvents = [
    {
      id: 1,
      title: 'GST Return Filing Deadline',
      date: new Date(),
      type: 'gst',
      priority: 'high',
      description: 'Monthly GST return filing deadline for all registered businesses',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Income Tax Advance Payment',
      date: new Date(Date.now() + 86400000 * 5),
      type: 'income-tax',
      priority: 'high',
      description: 'Quarterly advance tax payment deadline',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'TDS Return Filing',
      date: new Date(Date.now() + 86400000 * 10),
      type: 'tds',
      priority: 'medium',
      description: 'Quarterly TDS return filing deadline',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'ESI Contribution Deadline',
      date: new Date(Date.now() + 86400000 * 15),
      type: 'esi',
      priority: 'medium',
      description: 'Monthly ESI contribution payment deadline',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'PF Contribution Deadline',
      date: new Date(Date.now() + 86400000 * 20),
      type: 'pf',
      priority: 'medium',
      description: 'Monthly PF contribution payment deadline',
      status: 'upcoming'
    },
    {
      id: 6,
      title: 'ROC Annual Filing',
      date: new Date(Date.now() + 86400000 * 90),
      type: 'roc',
      priority: 'high',
      description: 'Annual filing deadline with Registrar of Companies',
      status: 'upcoming'
    }
  ];

  const getEventsForDate = (date: Date) => {
    return complianceEvents.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gst': return 'bg-blue-100 text-blue-800';
      case 'income-tax': return 'bg-green-100 text-green-800';
      case 'tds': return 'bg-purple-100 text-purple-800';
      case 'esi': return 'bg-orange-100 text-orange-800';
      case 'pf': return 'bg-pink-100 text-pink-800';
      case 'roc': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'low': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getDaysUntil = (date: Date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const upcomingEvents = complianceEvents
    .filter(event => getDaysUntil(event.date) >= 0 && getDaysUntil(event.date) <= 30)
    .sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Finance Compliance Calendar</h2>
        <p className="text-gray-600">Track important financial compliance deadlines and regulatory requirements</p>
      </div>

      {/* Urgent Compliance Alerts */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-orange-700">
            <AlertTriangle className="h-5 w-5" />
            <span>Upcoming Compliance Deadlines</span>
          </CardTitle>
          <CardDescription>Critical deadlines in the next 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingEvents.slice(0, 6).map((event) => (
              <div key={event.id} className="p-4 bg-white rounded-lg border shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getPriorityIcon(event.priority)}
                    <Badge className={getTypeColor(event.type)}>
                      {event.type.toUpperCase()}
                    </Badge>
                  </div>
                  <span className="text-xs font-medium text-gray-500">
                    {getDaysUntil(event.date) === 0 ? 'Today' : `${getDaysUntil(event.date)} days`}
                  </span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                <p className="text-xs text-gray-600 mb-2">{event.description}</p>
                <p className="text-xs text-gray-500">{event.date.toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <span>Compliance Calendar</span>
            </CardTitle>
            <CardDescription>Select a date to view compliance events</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border w-full"
            />
          </CardContent>
        </Card>

        {/* Events for Selected Date */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? selectedDate.toDateString() : 'Select a Date'}
            </CardTitle>
            <CardDescription>Compliance events and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedDate && getEventsForDate(selectedDate).map((event) => (
                <div key={event.id} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(event.priority)}
                      <Badge className={getTypeColor(event.type)}>
                        {event.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{event.title}</h4>
                  <p className="text-xs text-gray-600">{event.description}</p>
                </div>
              ))}
              {selectedDate && getEventsForDate(selectedDate).length === 0 && (
                <p className="text-gray-500 text-center py-4">No compliance events for this date</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Compliance Categories</span>
          </CardTitle>
          <CardDescription>Overview of different compliance types and their requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-semibold">GST Compliance</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monthly return filing (GSTR-1, GSTR-3B)</li>
                <li>• Quarterly returns (GSTR-4, GSTR-9)</li>
                <li>• Annual return filing</li>
                <li>• Input tax credit reconciliation</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="font-semibold">Income Tax</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Annual return filing</li>
                <li>• Quarterly advance tax payments</li>
                <li>• Tax audit requirements</li>
                <li>• Transfer pricing documentation</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="font-semibold">TDS/TCS</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monthly TDS return filing</li>
                <li>• Quarterly TDS statements</li>
                <li>• Annual TDS certificate issuance</li>
                <li>• TCS compliance requirements</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-semibold">ESI/PF</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monthly contribution payments</li>
                <li>• Annual returns and reconciliation</li>
                <li>• Employee registration updates</li>
                <li>• Compliance audits</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <h3 className="font-semibold">ROC Compliance</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Annual return filing (AOC-4)</li>
                <li>• Board resolution filings</li>
                <li>• Director KYC updates</li>
                <li>• Statutory audit requirements</li>
              </ul>
            </div>
            
            <div className="p-4 border rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <h3 className="font-semibold">Labour Laws</h3>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Contract labour compliance</li>
                <li>• Factory license renewals</li>
                <li>• Professional tax payments</li>
                <li>• Minimum wage compliance</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
