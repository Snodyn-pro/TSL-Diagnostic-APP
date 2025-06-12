
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Smartphone, Plus, TrendingDown, Calendar, Euro } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const categories = [
    'Alimentação', 'Transporte', 'Habitação', 'Saúde', 
    'Entretenimento', 'Compras', 'Educação', 'Outros'
  ];

  // Load expenses from localStorage on component mount
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenseTracker');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('expenseTracker', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = () => {
    if (newExpense.amount && newExpense.category && newExpense.description) {
      const expense: Expense = {
        id: Date.now().toString(),
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        description: newExpense.description,
        date: newExpense.date
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        amount: '',
        category: '',
        description: '',
        date: format(new Date(), 'yyyy-MM-dd')
      });
    }
  };

  const getTotalToday = () => {
    const today = format(new Date(), 'yyyy-MM-dd');
    return expenses
      .filter(expense => expense.date === today)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getTotalThisMonth = () => {
    const currentMonth = format(new Date(), 'yyyy-MM');
    return expenses
      .filter(expense => expense.date.startsWith(currentMonth))
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getCategoryTotals = () => {
    const totals: Record<string, number> = {};
    expenses.forEach(expense => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });
    return totals;
  };

  const recentExpenses = expenses.slice(0, 5);
  const categoryTotals = getCategoryTotals();

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Smartphone className="h-5 w-5" />
          App de Controle de Gastos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new expense form */}
        <div className="p-4 bg-slate-50 rounded-lg space-y-4">
          <h3 className="font-semibold">Adicionar Novo Gasto</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount">Valor (€)</Label>
              <Input
                id="amount"
                type="number"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                placeholder="0,00"
                step="0.01"
              />
            </div>
            <div>
              <Label htmlFor="category">Categoria</Label>
              <select
                id="category"
                value={newExpense.category}
                onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                className="w-full p-2 border border-input rounded-md"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                placeholder="Ex: Almoço no restaurante"
              />
            </div>
            <div>
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
              />
            </div>
          </div>
          <Button onClick={addExpense} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Gasto
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold text-blue-800">Hoje</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">
              €{getTotalToday().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-4 w-4 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Este Mês</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              €{getTotalThisMonth().toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Category breakdown */}
        {Object.keys(categoryTotals).length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Gastos por Categoria</h3>
            <div className="space-y-2">
              {Object.entries(categoryTotals)
                .sort(([,a], [,b]) => b - a)
                .map(([category, total]) => (
                  <div key={category} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="font-medium">{category}</span>
                    <span className="text-slate-600">
                      €{total.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Recent expenses */}
        {recentExpenses.length > 0 && (
          <div>
            <h3 className="font-semibold mb-3">Gastos Recentes</h3>
            <div className="space-y-2">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="flex justify-between items-center p-3 border border-slate-200 rounded-lg">
                  <div>
                    <p className="font-medium">{expense.description}</p>
                    <p className="text-sm text-slate-600">{expense.category} • {expense.date}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Euro className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold">
                      {expense.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {expenses.length === 0 && (
          <div className="text-center py-8 text-slate-500">
            <Smartphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Nenhum gasto registrado ainda.</p>
            <p className="text-sm">Adicione seu primeiro gasto acima!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseTracker;
