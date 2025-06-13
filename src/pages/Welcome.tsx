
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, ArrowRight, TrendingUp, ShieldCheck, Users, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleStart = () => {
    if (selectedType) {
      navigate('/quiz', { state: { userType: selectedType } });
    }
  };

  const userTypes = [
    {
      id: 'individual',
      title: t('welcome.individual.title'),
      description: t('welcome.individual.desc'),
      icon: User,
      features: ['Controlo de gastos pessoais', 'Planeamento de poupança', 'Gestão de dívidas', 'Objectivos financeiros'],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'business',
      title: t('welcome.business.title'),
      description: t('welcome.business.desc'),
      icon: Building,
      features: ['Fluxo de caixa', 'Controlo operacional', 'Gestão de capital', 'Crescimento empresarial'],
      gradient: 'from-green-500 to-green-600'
    }
  ];

  const features = [
    { 
      icon: TrendingUp, 
      title: t('welcome.feature1.title'), 
      desc: t('welcome.feature1.desc'),
      color: 'text-green-600'
    },
    { 
      icon: ShieldCheck, 
      title: t('welcome.feature2.title'), 
      desc: t('welcome.feature2.desc'),
      color: 'text-blue-600'
    },
    { 
      icon: Users, 
      title: t('welcome.feature3.title'), 
      desc: t('welcome.feature3.desc'),
      color: 'text-emerald-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-emerald-50/20 dark:from-background dark:via-green-950/10 dark:to-emerald-950/5">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Diagnóstico Personalizado
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-foreground mb-4 sm:mb-6 animate-fade-in">
              {t('welcome.title')}
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('welcome.subtitle')}
            </p>
          </div>

          {/* Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-scale-in group" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Type Selection */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center mb-8 sm:mb-12">
              {t('welcome.profile.title')}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {userTypes.map((type, index) => (
                <Card 
                  key={type.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up border-2 ${
                    selectedType === type.id 
                      ? 'border-green-500 shadow-2xl scale-105 bg-green-50/50 dark:bg-green-950/20' 
                      : 'border-border hover:border-green-300 shadow-lg bg-white/80 dark:bg-gray-800/80'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                >
                  <CardHeader className={`bg-gradient-to-r ${type.gradient} text-white p-6 sm:p-8`}>
                    <CardTitle className="flex items-center gap-4 text-xl sm:text-2xl font-bold">
                      <div className="p-2 bg-white/20 rounded-xl">
                        <type.icon className="h-8 w-8 sm: h-10 sm:w-10" />
                      </div>
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="p-6 sm:p-8">
                    <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
                      {type.description}
                    </p>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground mb-3">Incluindo:</h4>
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-green-500 rounded-full flex-shrink-0"></div>
                          <span className="text-muted-foreground text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {selectedType === type.id && (
                      <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/30 rounded-xl border border-green-200 dark:border-green-800 animate-scale-in">
                        <p className="text-green-700 dark:text-green-300 font-medium text-center flex items-center justify-center gap-2">
                          <ShieldCheck className="h-5 w-5" />
                          Perfil seleccionado
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <Button
              onClick={handleStart}
              disabled={!selectedType}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 group"
            >
              {t('welcome.cta')}
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-muted-foreground text-sm mt-4 font-medium">
              ⏱️ {t('welcome.time')}
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-border">
            <p className="text-muted-foreground text-sm mb-2">
              {t('welcome.footer')}{' '}
              <a 
                href="https://www.tslparceiros.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:underline text-green-600 dark:text-green-400"
              >
                TSL Parceiros
              </a>
            </p>
            <p className="text-muted-foreground text-xs">
              {t('welcome.security')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
