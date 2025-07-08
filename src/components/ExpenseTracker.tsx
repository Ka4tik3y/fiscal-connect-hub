
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Plus, TrendingUp, TrendingDown, PieChart } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      description: 'Office Rent',
      amount: 25000,
      category: 'office',
      date: '2024-04-01',
      type: 'fixed',
      client: 'General'
    },
    {
      id: 2,
      description: 'Software Subscriptions',
      amount: 8500,
      category: 'software',
      date: '2024-04-05',
      type: 'recurring',
      client: 'General'
    },
    {
      id: 3,
      description: 'Client Meeting - Lunch',
      amount: 2500,
      category: 'meals',
      date: '2024-04-10',
      type: 'variable',
      client: 'ABC Corporation'
    },
    {
      id: 4,
      description: 'Professional Books',
      amount: 3200,
      category: 'education',
      date: '2024-04-12',
      type: 'variable',
      client: 'General'
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: 'office',
    date: '',
    type: 'variable',
    client: 'General'
  });

  const categories = [
    { id: 'office', name: 'Office Expenses', color: 'blue' },
    { id: 'software', name: 'Software & Tools', color: 'purple' },
    { id: 'meals', name: 'Meals & Entertainment', color: 'green' },
    { id: 'travel', name: 'Travel', color: 'orange' },
    { id: 'education', name: 'Education & Training', color: 'indigo' },
    { id: 'professional', name: 'Professional Services', color: 'red' },
    { id: 'utilities', name: 'Utilities', color: 'gray' },
    { id: 'other', name: 'Other', color: 'pink' }
  ];

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.date) {
      setExpenses([...expenses, {
        id: expenses.length + 1,
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        type: newExpense.type,
        client: newExpense.client
      }]);
      setNewExpense({
        description: '',
        amount: '',
        category: 'office',
        date: '',
        type: 'variable',
        client: 'General'
      });
    }
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const thisMonthExpenses = expenses
    .filter(expense => new Date(expense.date).getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByCategory = categories.map(category => ({
    ...category,
    amount: expenses
      .filter(expense => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0)
  })).filter(category => category.amount > 0);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? `bg-${category.color}-100 text-${category.color}-800` : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Expense Tracker</h2>
          <p className="text-gray-600">Monitor and manage your business expenses</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>Record a new business expense</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  placeholder="Enter expense description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={newExpense.type} onValueChange={(value) => setNewExpense({...newExpense, type: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      <SelectItem value="variable">Variable</SelectItem>
                      <SelectItem value="recurring">Recurring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="client">Client (if applicable)</Label>
                <Input
                  id="client"
                  value={newExpense.client}
                  onChange={(e) => setNewExpense({...newExpense, client: e.target.value})}
                  placeholder="General or specific client"
                />
              </div>
              <Button onClick={addExpense} className="w-full">Add Expense</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expense Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Calculator className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{totalExpenses.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Expenses</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">₹{thisMonthExpenses.toLocaleString()}</p>
                <p className="text-sm text-gray-600">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{expensesByCategory.length}</p>
                <p className="text-sm text-gray-600">Categories</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Expense by Category</CardTitle>
          <CardDescription>Breakdown of expenses by category this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {expensesByCategory.map((category) => (
              <div key={category.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{category.name}</h4>
                  <Badge className={getCategoryColor(category.id)}>
                    {category.id}
                  </Badge>
                </div>
                <p className="text-2xl font-bold">₹{category.amount.toLocaleString()}</p>
                <p className="text-sm text-gray-500">
                  {((category.amount / totalExpenses) * 100).toFixed(1)}% of total
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Latest expense entries</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.slice().reverse().map((expense) => (
              <div key={expense.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <h4 className="font-semibold">{expense.description}</h4>
                      <Badge className={getCategoryColor(expense.category)}>
                        {categories.find(cat => cat.id === expense.category)?.name}
                      </Badge>
                      <Badge variant="outline">{expense.type}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Amount:</span> ₹{expense.amount.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Date:</span> {new Date(expense.date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-medium">Client:</span> {expense.client}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
