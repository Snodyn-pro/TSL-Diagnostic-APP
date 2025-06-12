
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator } from "lucide-react";

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compound, setCompound] = useState('12');
  const [result, setResult] = useState<number | null>(null);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(compound);

    if (p && r && t && n) {
      const amount = p * Math.pow((1 + r / n), n * t);
      const interest = amount - p;
      setResult(amount);
    }
  };

  const reset = () => {
    setPrincipal('');
    setRate('');
    setTime('');
    setCompound('12');
    setResult(null);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Calculadora de Juros Compostos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="principal">Capital Inicial (€)</Label>
          <Input
            id="principal"
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            placeholder="1000"
          />
        </div>
        
        <div>
          <Label htmlFor="rate">Taxa de Juros Anual (%)</Label>
          <Input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="5"
            step="0.1"
          />
        </div>
        
        <div>
          <Label htmlFor="time">Período (anos)</Label>
          <Input
            id="time"
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="10"
          />
        </div>
        
        <div>
          <Label htmlFor="compound">Composição (vezes por ano)</Label>
          <select
            id="compound"
            value={compound}
            onChange={(e) => setCompound(e.target.value)}
            className="w-full p-2 border border-input rounded-md"
          >
            <option value="1">Anual</option>
            <option value="4">Trimestral</option>
            <option value="12">Mensal</option>
            <option value="365">Diário</option>
          </select>
        </div>
        
        <div className="flex gap-2">
          <Button onClick={calculateCompoundInterest} className="flex-1">
            Calcular
          </Button>
          <Button onClick={reset} variant="outline">
            Limpar
          </Button>
        </div>
        
        {result && (
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-600">Valor Final</p>
            <p className="text-2xl font-bold text-green-800">
              €{result.toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-green-600">
              Juros: €{(result - parseFloat(principal)).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompoundInterestCalculator;
