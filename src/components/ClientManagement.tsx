
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Plus, Search, Phone, Mail, FileText, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ClientManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'ABC Corporation',
      email: 'contact@abc-corp.com',
      phone: '+91 9876543210',
      type: 'Corporate',
      status: 'Active',
      gstNumber: '27AAAAA0000A1Z5',
      panNumber: 'AAAAA0000A',
      lastActivity: '2 days ago'
    },
    {
      id: 2,
      name: 'XYZ Industries',
      email: 'info@xyz-industries.com',
      phone: '+91 8765432109',
      type: 'Corporate',
      status: 'Active',
      gstNumber: '27BBBBB0000B1Z5',
      panNumber: 'BBBBB0000B',
      lastActivity: '1 week ago'
    },
    {
      id: 3,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+91 7654321098',
      type: 'Individual',
      status: 'Active',
      panNumber: 'CCCCC0000C',
      lastActivity: '3 days ago'
    }
  ]);

  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'Individual',
    gstNumber: '',
    panNumber: ''
  });

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addClient = () => {
    if (newClient.name && newClient.email) {
      setClients([...clients, {
        id: clients.length + 1,
        ...newClient,
        status: 'Active',
        lastActivity: 'Just now'
      }]);
      setNewClient({
        name: '',
        email: '',
        phone: '',
        type: 'Individual',
        gstNumber: '',
        panNumber: ''
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage your client relationships and information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription>Enter client details to add them to your system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="type">Client Type</Label>
                <Select value={newClient.type} onValueChange={(value) => setNewClient({...newClient, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Individual">Individual</SelectItem>
                    <SelectItem value="Corporate">Corporate</SelectItem>
                    <SelectItem value="Partnership">Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  value={newClient.panNumber}
                  onChange={(e) => setNewClient({...newClient, panNumber: e.target.value})}
                  placeholder="Enter PAN number"
                />
              </div>
              {newClient.type !== 'Individual' && (
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input
                    id="gst"
                    value={newClient.gstNumber}
                    onChange={(e) => setNewClient({...newClient, gstNumber: e.target.value})}
                    placeholder="Enter GST number"
                  />
                </div>
              )}
              <Button onClick={addClient} className="w-full">Add Client</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search clients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-blue-500" />
              <p className="text-2xl font-bold">{clients.length}</p>
              <p className="text-sm text-gray-600">Total Clients</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{client.name}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Badge variant={client.type === 'Corporate' ? 'default' : 'secondary'}>
                      {client.type}
                    </Badge>
                    <Badge variant={client.status === 'Active' ? 'default' : 'destructive'}>
                      {client.status}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{client.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{client.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span>PAN: {client.panNumber}</span>
                </div>
                {client.gstNumber && (
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span>GST: {client.gstNumber}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500">Last activity: {client.lastActivity}</span>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-gray-500">Try adjusting your search terms or add a new client.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
