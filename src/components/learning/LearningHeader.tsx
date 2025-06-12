
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LearningHeaderProps {
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const LearningHeader = ({ user, onAuthClick, onLogout }: LearningHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-fade-in">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover-lift"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Voltar</span>
        </Button>
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/8ed86441-2db3-419d-8cd6-866b57db3813.png" 
            alt="TSL Parceiros Logo" 
            className="h-10 w-auto tsl-logo"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Aprendizagem</h1>
            <p className="text-slate-600 text-sm sm:text-base">Materiais para melhorar sua educação financeira</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-800 hidden sm:inline">Olá, {user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout} className="text-xs sm:text-sm">
              Sair
            </Button>
          </div>
        ) : (
          <Button 
            onClick={onAuthClick}
            className="tsl-button flex items-center gap-2 text-xs sm:text-sm"
          >
            <LogIn className="h-4 w-4" />
            Entrar
          </Button>
        )}
        <a 
          href="https://www.tslparceiros.pt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-green-600 hover:underline text-xs sm:text-sm flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">Site Principal</span>
        </a>
      </div>
    </div>
  );
};

export default LearningHeader;
