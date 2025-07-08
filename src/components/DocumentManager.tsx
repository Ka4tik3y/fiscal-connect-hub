
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Search, Folder, File, Eye } from 'lucide-react';

export const DocumentManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Documents', count: 15 },
    { id: 'tax-returns', name: 'Tax Returns', count: 8 },
    { id: 'gst-filings', name: 'GST Filings', count: 12 },
    { id: 'audit-reports', name: 'Audit Reports', count: 5 },
    { id: 'client-docs', name: 'Client Documents', count: 20 },
  ];

  const documents = [
    {
      id: 1,
      name: 'ABC Corp - GST Return March 2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      client: 'ABC Corporation',
      category: 'gst-filings',
      uploadDate: '2024-04-15',
      status: 'approved'
    },
    {
      id: 2,
      name: 'XYZ Industries - Tax Audit Report.pdf',
      type: 'PDF',
      size: '5.8 MB',
      client: 'XYZ Industries',
      category: 'audit-reports',
      uploadDate: '2024-04-14',
      status: 'pending'
    },
    {
      id: 3,
      name: 'John Doe - ITR Form 2024.pdf',
      type: 'PDF',
      size: '1.2 MB',
      client: 'John Doe',
      category: 'tax-returns',
      uploadDate: '2024-04-12',
      status: 'approved'
    },
    {
      id: 4,
      name: 'DEF Enterprises - Financial Statements.xlsx',
      type: 'Excel',
      size: '3.6 MB',
      client: 'DEF Enterprises',
      category: 'client-docs',
      uploadDate: '2024-04-10',
      status: 'approved'
    },
    {
      id: 5,
      name: 'Monthly Expense Report April.pdf',
      type: 'PDF',
      size: '890 KB',
      client: 'Internal',
      category: 'client-docs',
      uploadDate: '2024-04-08',
      status: 'draft'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = selectedFolder === 'all' || doc.category === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (type: string) => {
    return <File className="h-4 w-4 text-blue-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600">Organize and manage all your client documents</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
          <Upload className="h-4 w-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Folder className="h-5 w-5" />
              <span>Folders</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center justify-between ${
                    selectedFolder === folder.id ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <span className="font-medium text-sm">{folder.name}</span>
                  <Badge variant="secondary">{folder.count}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search */}
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Document List */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedFolder === 'all' ? 'All Documents' : folders.find(f => f.id === selectedFolder)?.name}
              </CardTitle>
              <CardDescription>
                {filteredDocuments.length} document(s) found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map((doc) => (
                  <div key={doc.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {getFileIcon(doc.type)}
                        <div>
                          <h4 className="font-semibold text-sm">{doc.name}</h4>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Client: {doc.client}</span>
                            <span>Size: {doc.size}</span>
                            <span>Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500">Try adjusting your search terms or upload new documents.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card>
            <CardContent className="p-8">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Documents</h3>
                <p className="text-gray-500 mb-4">Drag and drop your files here, or click to browse</p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-xs text-gray-400 mt-2">Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max 10MB)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
