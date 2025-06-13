
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  pt: {
    // Navigation
    'nav.home': 'Início',
    'nav.quiz': 'Diagnóstico',
    'nav.learning': 'Aprender',
    'nav.schedule': 'Agendar',
    
    // Home Page
    'home.title': 'TSL Parceiros',
    'home.subtitle': 'A sua jornada para a liberdade financeira começa aqui',
    'home.cta': 'Começar Diagnóstico',
    'home.feature1.title': 'Análise Inteligente',
    'home.feature1.desc': 'Algoritmo avançado que analisa a sua situação financeira em minutos',
    'home.feature2.title': 'Consultoria Especializada',
    'home.feature2.desc': 'Acesso direto aos melhores consultores financeiros',
    'home.feature3.title': 'Resultados Comprovados',
    'home.feature3.desc': '+10.000 clientes já transformaram as suas finanças connosco',
    'home.ready.title': 'Pronto para começar?',
    'home.ready.subtitle': 'Descubra o seu perfil financeiro em menos de 5 minutos',
    'home.ready.cta': 'Iniciar Diagnóstico Gratuito',
    
    // Welcome Page
    'welcome.title': 'Diagnóstico Financeiro',
    'welcome.subtitle': 'Descubra a sua saúde financeira actual e receba um plano personalizado para alcançar os seus objectivos financeiros',
    'welcome.feature1.title': 'Análise Profunda',
    'welcome.feature1.desc': 'Diagnóstico completo da sua situação financeira',
    'welcome.feature2.title': '100% Seguro',
    'welcome.feature2.desc': 'Os seus dados são protegidos e confidenciais',
    'welcome.feature3.title': 'Suporte Expert',
    'welcome.feature3.desc': 'Acesso a consultores financeiros certificados',
    'welcome.profile.title': 'Escolha o seu Perfil',
    'welcome.individual.title': 'Pessoa Singular',
    'welcome.individual.desc': 'Diagnóstico para gestão das suas finanças pessoais e familiares',
    'welcome.business.title': 'Empresa',
    'welcome.business.desc': 'Análise financeira completa para a sua empresa ou negócio',
    'welcome.cta': 'Iniciar Diagnóstico',
    'welcome.time': 'Tempo estimado: 5-8 minutos',
    'welcome.footer': 'Desenvolvido pela equipa de especialistas da TSL Parceiros',
    'welcome.security': 'Consultoria financeira certificada | Dados protegidos com segurança bancária',
    
    // Common
    'common.loading': 'A carregar...',
    'common.error': 'Erro',
    'common.success': 'Sucesso',
    'common.cancel': 'Cancelar',
    'common.confirm': 'Confirmar',
    'common.close': 'Fechar',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.quiz': 'Assessment',
    'nav.learning': 'Learn',
    'nav.schedule': 'Schedule',
    
    // Home Page
    'home.title': 'TSL Partners',
    'home.subtitle': 'Your journey to financial freedom starts here',
    'home.cta': 'Start Assessment',
    'home.feature1.title': 'Smart Analysis',
    'home.feature1.desc': 'Advanced algorithm that analyses your financial situation in minutes',
    'home.feature2.title': 'Expert Consulting',
    'home.feature2.desc': 'Direct access to the best financial consultants',
    'home.feature3.title': 'Proven Results',
    'home.feature3.desc': '+10,000 clients have already transformed their finances with us',
    'home.ready.title': 'Ready to start?',
    'home.ready.subtitle': 'Discover your financial profile in less than 5 minutes',
    'home.ready.cta': 'Start Free Assessment',
    
    // Welcome Page
    'welcome.title': 'Financial Assessment',
    'welcome.subtitle': 'Discover your current financial health and receive a personalised plan to achieve your financial goals',
    'welcome.feature1.title': 'Deep Analysis',
    'welcome.feature1.desc': 'Complete diagnosis of your financial situation',
    'welcome.feature2.title': '100% Secure',
    'welcome.feature2.desc': 'Your data is protected and confidential',
    'welcome.feature3.title': 'Expert Support',
    'welcome.feature3.desc': 'Access to certified financial consultants',
    'welcome.profile.title': 'Choose Your Profile',
    'welcome.individual.title': 'Individual',
    'welcome.individual.desc': 'Assessment for managing your personal and family finances',
    'welcome.business.title': 'Business',
    'welcome.business.desc': 'Complete financial analysis for your company or business',
    'welcome.cta': 'Start Assessment',
    'welcome.time': 'Estimated time: 5-8 minutes',
    'welcome.footer': 'Developed by the TSL Partners expert team',
    'welcome.security': 'Certified financial consulting | Data protected with banking security',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.close': 'Close',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['pt']] || key;
  };

  return (
    <LanguageContext.Provider value={ { language, setLanguage, t } }>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
