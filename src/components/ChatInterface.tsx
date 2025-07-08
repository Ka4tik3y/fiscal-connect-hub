
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Send, Phone, Video, Mic, MicOff, Users } from 'lucide-react';

export const ChatInterface = () => {
  const [selectedClient, setSelectedClient] = useState<string | null>('client1');
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'client', content: 'Hi, I have a question about my GST filing.', time: '10:30 AM', clientId: 'client1' },
    { id: 2, sender: 'ca', content: 'Hello! I\'d be happy to help. What specific question do you have?', time: '10:32 AM', clientId: 'client1' },
    { id: 3, sender: 'client', content: 'When is the deadline for this quarter\'s filing?', time: '10:35 AM', clientId: 'client1' },
    { id: 4, sender: 'client', content: 'Need help with income tax calculation.', time: '09:15 AM', clientId: 'client2' },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const clients = [
    { id: 'client1', name: 'ABC Corporation', status: 'online', lastMessage: 'When is the deadline for this quarter\'s filing?' },
    { id: 'client2', name: 'XYZ Industries', status: 'offline', lastMessage: 'Need help with income tax calculation.' },
    { id: 'client3', name: 'DEF Enterprises', status: 'online', lastMessage: 'Thank you for the help!' },
  ];

  const sendMessage = () => {
    if (message.trim() && selectedClient) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'ca',
        content: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        clientId: selectedClient
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const getClientMessages = (clientId: string) => {
    return messages.filter(msg => msg.clientId === clientId);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Client Communication</h2>
        <p className="text-gray-600">Chat and voice communication with your clients</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Client List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {clients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => setSelectedClient(client.id)}
                  className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-b ${
                    selectedClient === client.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{client.name}</h4>
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        client.status === 'online' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                      <Badge variant={client.status === 'online' ? 'default' : 'secondary'} className="text-xs">
                        {client.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 truncate">{client.lastMessage}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 flex flex-col">
          {selectedClient && (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {clients.find(c => c.id === selectedClient)?.name}
                    </CardTitle>
                    <CardDescription>
                      {clients.find(c => c.id === selectedClient)?.status === 'online' ? 'Online' : 'Last seen recently'}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {getClientMessages(selectedClient).map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'ca' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === 'ca'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{msg.content}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender === 'ca' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>

              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button
                    onClick={() => setIsRecording(!isRecording)}
                    variant={isRecording ? 'destructive' : 'outline'}
                    size="sm"
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={sendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                {isRecording && (
                  <div className="mt-2 flex items-center space-x-2 text-red-600">
                    <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                    <span className="text-sm">Recording voice message...</span>
                  </div>
                )}
              </div>
            </>
          )}
          
          {!selectedClient && (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Select a client to start chatting</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};
