
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Tool {
  name: string;
  type: string;
  description: string;
  icon: any;
  tabKey: string;
}

interface ToolsSidebarProps {
  tools: Tool[];
  onToolClick: (tabKey: string) => void;
}

const ToolsSidebar = ({ tools, onToolClick }: ToolsSidebarProps) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-white animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader className="tsl-gradient text-white rounded-t-lg mobile-padding">
          <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
            <BookOpen className="h-5 w-5" />
            Ferramentas Úteis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            {tools.map((tool, index) => (
              <div 
                key={index} 
                className="p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all duration-300 cursor-pointer border border-green-200 hover-lift animate-scale-in"
                onClick={() => onToolClick(tool.tabKey)}
                style={{ animationDelay: `${(index + 6) * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <tool.icon className="h-5 w-5 sm:h-6 sm:w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 mb-1 text-sm sm:text-base">{tool.name}</h4>
                    <Badge variant="outline" className="text-xs mb-2 border-green-200 text-green-700">
                      {tool.type}
                    </Badge>
                    <p className="text-xs sm:text-sm text-slate-600">{tool.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={() => navigate('/schedule')}
              className="w-full tsl-button text-sm sm:text-base hover-lift"
            >
              Precisa de Ajuda Personalizada?
            </Button>
          </div>
          
          <div className="mt-4 p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">TSL Parceiros</h4>
            <p className="text-xs sm:text-sm text-slate-600 mb-3">
              Consultoria financeira especializada para pessoas e empresas
            </p>
            <a 
              href="https://www.tslparceiros.pt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:underline text-xs sm:text-sm flex items-center gap-1 hover-green p-2 rounded transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Conheça nossos serviços
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ToolsSidebar;
