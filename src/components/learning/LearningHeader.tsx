
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/hooks/use-language";

interface LearningHeaderProps {
  user: any;
  onAuthClick: () => void;
  onLogout: () => void;
}

const LearningHeader = ({ user, onAuthClick, onLogout }: LearningHeaderProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-fade-in">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 hover-lift"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">{t('learning.back')}</span>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('learning.title')}</h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t('learning.subtitle')}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground hidden sm:inline">{t('learning.hello')}, {user.name}</span>
            <Button variant="outline" size="sm" onClick={onLogout} className="text-xs sm:text-sm">
              {t('learning.logout')}
            </Button>
          </div>
        ) : (
          <Button 
            onClick={onAuthClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2 text-xs sm:text-sm"
          >
            <LogIn className="h-4 w-4" />
            {t('learning.login')}
          </Button>
        )}
        <a 
          href="https://www.tslparceiros.pt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline text-xs sm:text-sm flex items-center gap-1"
        >
          <ExternalLink className="h-4 w-4" />
          <span className="hidden sm:inline">{t('learning.website')}</span>
        </a>
      </div>
    </div>
  );
};

export default LearningHeader;
