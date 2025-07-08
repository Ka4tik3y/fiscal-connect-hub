
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Receipt, Plus, Send, Download, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export const InvoiceGenerator = () => {
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-001',
      client: 'ABC Corporation',
      amount: 25000,
      status: 'paid',
      date: '2024-04-15',
      dueDate: '2024-05-15',
      services: 'GST Filing & Compliance'
    },
    {
      id: 'INV-002',
      client: 'XYZ Industries',
      amount: 45000,
      status: 'pending',
      date: '2024-04-12',
      dueDate: '2024-05-12',
      services: 'Tax Audit & Returns'
    },
    {
      id: 'INV-003',
      client: 'DEF Enterprises',
      amount: 15000,
      status: 'draft',
      date: '2024-04-10',
      dueDate: '2024-05-10',
      services: 'Monthly Bookkeeping'
    }
  ]);

  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    services: '',
    dueDate: ''
  });

  const createInvoice = () => {
    if (newInvoice.client && newInvoice.amount) {
      setInvoices([...invoices, {
        id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
        client: newInvoice.client,
        amount: parseFloat(newInvoice.amount),
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        dueDate: newInvoice.dueDate,
        services: newInvoice.services
      }]);
      setNewInvoice({
        client: '',
        amount: '',
        services: '',
        dueDate: ''
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0);
  const pendingAmount = invoices.filter(inv => inv.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Invoice Management</h2>
          <p className="text-gray-600">Generate and manage client invoices</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Invoice</DialogTitle>
              <DialogDescription>Generate a new invoice for your client</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="client">Client Name</Label>
                <Input
                  id="client"
                  value={newInvoice.client}
                  onChange={(e) => setNewInvoice({...newInvoice, client: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <Label htmlFor="services">Services Provided</Label>
                <Input
                  id="services"
                  value={newInvoice.services}
                  onChange={(e) => setNewInvoice({...newInvoice, services: e.target.value})}
                  placeholder="Describe services provided"
                />
              </div>
              <div>
                <Label htmlFor="amount">Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={newInvoice.amount}
                  onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                  placeholder="Enter invoice amount"
                />
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={(e) => setNewInvoice({...newInvoice, dueDate: e.target.value})}
                />
              </div>
              <Button onClick={createInvoice} className="w-full">Create Invoice</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Receipt className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Receipt className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{paidAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Paid Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Receipt className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{pendingAmount.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Pending Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Invoices</CardTitle>
          <CardDescription>Manage your client invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="font-semibold">{invoice.id}</h4>
                      <Badge className={getStatusColor(invoice.status)}>
                        {invoice.status}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Client:</span> {invoice.client}
                      </div>
                      <div>
                        <span className="font-medium">Amount:</span> ₹{invoice.amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {new Date(invoice.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Due:</span> {new Date(invoice.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Services: {invoice.services}</p>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status !== 'paid' && (
                      <Button variant="ghost" size="sm">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Invoice Template Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Templates</CardTitle>
          <CardDescription>Choose from professional invoice templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Receipt className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <h4 className="font-medium">Standard Template</h4>
              <p className="text-sm text-gray-500">Basic invoice layout</p>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Receipt className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <h4 className="font-medium">Professional Template</h4>
              <p className="text-sm text-gray-500">Enhanced design</p>
            </div>
            <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Receipt className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <h4 className="font-medium">Custom Template</h4>
              <p className="text-sm text-gray-500">Your branding</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
