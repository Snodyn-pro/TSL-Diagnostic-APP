
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, ArrowRight, TrendingUp, ShieldCheck, Users } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleStart = () => {
    if (selectedType) {
      navigate('/quiz', { state: { userType: selectedType } });
    }
  };

  const userTypes = [
    {
      id: 'individual',
      title: 'Pessoa Física',
      description: 'Diagnóstico para gestão das suas finanças pessoais e familiares',
      icon: User,
      features: ['Controle de gastos pessoais', 'Planejamento de poupança', 'Gestão de dívidas', 'Objetivos financeiros'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'business',
      title: 'Empresa',
      description: 'Análise financeira completa para sua empresa ou negócio',
      icon: Building,
      features: ['Fluxo de caixa', 'Controle operacional', 'Gestão de capital', 'Crescimento empresarial'],
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center mb-6">
              <img 
                src="/lovable-uploads/8ed86441-2db3-419d-8cd6-866b57db3813.png" 
                alt="TSL Parceiros" 
                className="h-16 sm:h-20 w-auto drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-green-800 mb-4 sm:mb-6 animate-fade-in">
              Diagnóstico Financeiro
            </h1>
            <p className="text-lg sm:text-xl text-green-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Descubra sua saúde financeira atual e receba um plano personalizado para alcançar seus objetivos financeiros
            </p>
          </div>

          {/* Features Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 sm:mb-16">
            {[
              { icon: TrendingUp, title: 'Análise Profunda', desc: 'Diagnóstico completo da sua situação financeira' },
              { icon: ShieldCheck, title: '100% Seguro', desc: 'Seus dados são protegidos e confidenciais' },
              { icon: Users, title: 'Suporte Expert', desc: 'Acesso a consultores financeiros certificados' }
            ].map((feature, index) => (
              <Card key={index} className="border-none shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.15}s` }}>
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-green-800 mb-2">{feature.title}</h3>
                  <p className="text-green-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* User Type Selection */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800 text-center mb-8 sm:mb-12">
              Escolha seu Perfil
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {userTypes.map((type, index) => (
                <Card 
                  key={type.id}
                  className={`border-3 cursor-pointer transition-all duration-300 hover:shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up ${
                    selectedType === type.id 
                      ? 'border-green-500 shadow-2xl scale-105' 
                      : 'border-gray-200 hover:border-green-300 shadow-lg'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                  style={{ animationDelay: `${0.4 + index * 0.2}s` }}
                >
                  <CardHeader className={`bg-gradient-to-r ${type.color} text-white p-6 sm:p-8`}>
                    <CardTitle className="flex items-center gap-4 text-xl sm:text-2xl font-bold">
                      <type.icon className="h-8 w-8 sm:h-10 sm:w-10" />
                      {type.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8">
                    <p className="text-gray-700 mb-6 text-base sm:text-lg leading-relaxed">
                      {type.description}
                    </p>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800 mb-3">Incluindo:</h4>
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600 text-sm sm:text-base">{feature}</span>
                        </div>
                      ))}
                    </div>
                    {selectedType === type.id && (
                      <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200 animate-scale-in">
                        <p className="text-green-700 font-medium text-center flex items-center justify-center gap-2">
                          <ShieldCheck className="h-5 w-5" />
                          Perfil selecionado
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
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold text-lg px-12 py-4 rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              Iniciar Diagnóstico
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
            <p className="text-green-600 text-sm mt-4 font-medium">
              ⏱️ Tempo estimado: 5-8 minutos
            </p>
          </div>

          {/* Footer */}
          <div className="text-center mt-16 p-6 bg-white/60 backdrop-blur-sm rounded-2xl">
            <p className="text-green-700 text-sm mb-2">
              Desenvolvido pela equipe de especialistas da{' '}
              <a 
                href="https://www.tslparceiros.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-semibold hover:underline"
              >
                TSL Parceiros
              </a>
            </p>
            <p className="text-green-600 text-xs">
              Consultoria financeira certificada | Dados protegidos com segurança bancária
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
