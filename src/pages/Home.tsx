
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, Award, ArrowRight, Sparkles, Shield, Clock } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

const Home = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features = [
    {
      icon: TrendingUp,
      title: t('home.feature1.title'),
      description: t('home.feature1.desc'),
      gradient: "from-emerald-500 to-green-600"
    },
    {
      icon: Users,
      title: t('home.feature2.title'),
      description: t('home.feature2.desc'),
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Award,
      title: t('home.feature3.title'),
      description: t('home.feature3.desc'),
      gradient: "from-teal-500 to-green-600"
    }
  ];

  const benefits = [
    { icon: Sparkles, text: "Diagnóstico em 5 minutos" },
    { icon: Shield, text: "100% Seguro e Confidencial" },
    { icon: Clock, text: "Resultados Imediatos" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-green-50/30 to-emerald-50/20 dark:from-background dark:via-green-950/10 dark:to-emerald-950/5">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              Consultoria Financeira Certificada
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-fade-in-up">
              {t('home.title')}
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {t('home.subtitle')}
            </p>

            {/* Benefits Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-green-200 dark:border-green-800">
                  <benefit.icon className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-foreground">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={() => navigate('/welcome')}
                size="lg"
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 group"
              >
                {t('home.cta')}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <div className="text-sm text-muted-foreground">
                ✨ Gratuito • Sem compromisso
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Porquê escolher a TSL Parceiros?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tecnologia avançada aliada à expertise humana para transformar as suas finanças
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-8 text-center relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-green-700 dark:group-hover:text-green-300 transition-colors">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-r from-green-600 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+Cjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-fade-in">
              {t('home.ready.title')}
            </h2>
            
            <p className="text-xl text-green-100 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t('home.ready.subtitle')}
            </p>
            
            <Button 
              onClick={() => navigate('/welcome')}
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 font-bold text-lg px-12 py-4 rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-105 animate-scale-in"
              style={{ animationDelay: '0.2s' }}
            >
              {t('home.ready.cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="mt-6 text-green-100 text-sm animate-fade-in" style={{ animationDelay: '0.3s' }}>
              🔒 Os seus dados estão seguros • 🚀 Resultados imediatos
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
