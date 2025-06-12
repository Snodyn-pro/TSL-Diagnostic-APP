
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Plus, Trash2, Download } from "lucide-react";

interface BudgetItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
}

const BudgetSpreadsheet = () => {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: '1', category: 'Salário', description: 'Salário mensal', amount: 2500, type: 'income' },
    { id: '2', category: 'Habitação', description: 'Renda', amount: 800, type: 'expense' },
    { id: '3', category: 'Alimentação', description: 'Supermercado', amount: 300, type: 'expense' },
  ]);
  
  const [newItem, setNewItem] = useState({
    category: '',
    description: '',
    amount: '',
    type: 'expense' as 'income' | 'expense'
  });

  const addItem = () => {
    if (newItem.category && newItem.description && newItem.amount) {
      const item: BudgetItem = {
        id: Date.now().toString(),
        category: newItem.category,
        description: newItem.description,
        amount: parseFloat(newItem.amount),
        type: newItem.type
      };
      setItems([...items, item]);
      setNewItem({ category: '', description: '', amount: '', type: 'expense' });
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalIncome = items.filter(item => item.type === 'income').reduce((sum, item) => sum + item.amount, 0);
  const totalExpenses = items.filter(item => item.type === 'expense').reduce((sum, item) => sum + item.amount, 0);
  const balance = totalIncome - totalExpenses;

  const exportToCsv = () => {
    const headers = ['Categoria', 'Descrição', 'Valor', 'Tipo'];
    const csvContent = [
      headers.join(','),
      ...items.map(item => [
        item.category,
        item.description,
        item.amount.toString(),
        item.type === 'income' ? 'Receita' : 'Despesa'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orcamento_pessoal.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Planilha de Orçamento Pessoal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add new item form */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 bg-slate-50 rounded-lg">
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Input
              id="category"
              value={newItem.category}
              onChange={(e) => setNewItem({...newItem, category: e.target.value})}
              placeholder="Ex: Habitação"
            />
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={newItem.description}
              onChange={(e) => setNewItem({...newItem, description: e.target.value})}
              placeholder="Ex: Renda"
            />
          </div>
          <div>
            <Label htmlFor="amount">Valor (€)</Label>
            <Input
              id="amount"
              type="number"
              value={newItem.amount}
              onChange={(e) => setNewItem({...newItem, amount: e.target.value})}
              placeholder="0,00"
              step="0.01"
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo</Label>
            <select
              id="type"
              value={newItem.type}
              onChange={(e) => setNewItem({...newItem, type: e.target.value as 'income' | 'expense'})}
              className="w-full p-2 border border-input rounded-md"
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button onClick={addItem} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>

        {/* Budget items table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-slate-200">
            <thead>
              <tr className="bg-slate-100">
                <th className="border border-slate-200 p-2 text-left">Categoria</th>
                <th className="border border-slate-200 p-2 text-left">Descrição</th>
                <th className="border border-slate-200 p-2 text-right">Valor</th>
                <th className="border border-slate-200 p-2 text-center">Tipo</th>
                <th className="border border-slate-200 p-2 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="border border-slate-200 p-2">{item.category}</td>
                  <td className="border border-slate-200 p-2">{item.description}</td>
                  <td className={`border border-slate-200 p-2 text-right font-medium ${
                    item.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    €{item.amount.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="border border-slate-200 p-2 text-center">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.type === 'income' ? 'Receita' : 'Despesa'}
                    </span>
                  </td>
                  <td className="border border-slate-200 p-2 text-center">
                    <Button
                      onClick={() => removeItem(item.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-800">Total Receitas</h3>
            <p className="text-2xl font-bold text-green-600">
              €{totalIncome.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="font-semibold text-red-800">Total Despesas</h3>
            <p className="text-2xl font-bold text-red-600">
              €{totalExpenses.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className={`p-4 rounded-lg ${balance >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
            <h3 className={`font-semibold ${balance >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
              Saldo
            </h3>
            <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
              €{balance.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        <Button onClick={exportToCsv} className="w-full">
          <Download className="h-4 w-4 mr-2" />
          Exportar para CSV
        </Button>
      </CardContent>
    </Card>
  );
};

export default BudgetSpreadsheet;
