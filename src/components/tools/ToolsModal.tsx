
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompoundInterestCalculator from './CompoundInterestCalculator';
import BudgetSpreadsheet from './BudgetSpreadsheet';
import ExpenseTracker from './ExpenseTracker';

interface ToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab?: string;
}

const ToolsModal = ({ isOpen, onClose, activeTab = "calculator" }: ToolsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ferramentas Financeiras</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue={activeTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="calculator">Calculadora</TabsTrigger>
            <TabsTrigger value="budget">Orçamento</TabsTrigger>
            <TabsTrigger value="tracker">Controle de Gastos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator" className="flex justify-center">
            <CompoundInterestCalculator />
          </TabsContent>
          
          <TabsContent value="budget">
            <BudgetSpreadsheet />
          </TabsContent>
          
          <TabsContent value="tracker" className="flex justify-center">
            <ExpenseTracker />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ToolsModal;
