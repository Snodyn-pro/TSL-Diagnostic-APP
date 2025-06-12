
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Building2, TrendingUp, Shield, Target, ArrowLeft } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'individual' | 'business' | null>(null);

  const handleStartDiagnosis = () => {
    if (userType) {
      navigate('/quiz', { state: { userType } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-6 sm:mb-8 animate-fade-in">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mr-4 hover:bg-green-100 hover-lift"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Voltar</span>
          </Button>
          <div className="text-center flex-1">
            <div className="flex items-center justify-center gap-3 mb-2">
              <img 
                src="/lovable-uploads/8ed86441-2db3-419d-8cd6-866b57db3813.png" 
                alt="TSL Parceiros Logo" 
                className="h-8 sm:h-12 w-auto tsl-logo"
              />
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800">
                TSL Parceiros
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Diagnóstico Financeiro Personalizado
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
              Descubra seu perfil financeiro e receba recomendações personalizadas
            </p>
          </div>

          <Card className="mb-6 sm:mb-8 border-none shadow-xl bg-white/80 backdrop-blur-sm animate-scale-in">
            <CardContent className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-slate-800 mb-6 text-center">
                Selecione seu perfil
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover-lift ${
                    userType === 'individual' ? 'ring-2 ring-green-500 bg-green-50 shadow-lg' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('individual')}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <User className="h-12 sm:h-16 w-12 sm:w-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                      Pessoa Física
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Diagnóstico financeiro pessoal e familiar
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover-lift ${
                    userType === 'business' ? 'ring-2 ring-green-500 bg-green-50 shadow-lg' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('business')}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <Building2 className="h-12 sm:h-16 w-12 sm:w-16 text-green-600 mx-auto mb-4" />
                    <h4 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                      Empresa
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600">
                      Análise financeira empresarial e fluxo de caixa
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <Button 
                  onClick={handleStartDiagnosis}
                  disabled={!userType}
                  size="lg"
                  className="tsl-button px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 hover-lift"
                >
                  Começar Diagnóstico
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-4 sm:p-6 text-center">
                <TrendingUp className="h-8 sm:h-10 w-8 sm:w-10 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Análise Completa</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Avaliação detalhada da sua situação financeira atual
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-4 sm:p-6 text-center">
                <Shield className="h-8 sm:h-10 w-8 sm:w-10 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Seguro e Privado</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Seus dados são protegidos e mantidos em sigilo
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover-lift animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-4 sm:p-6 text-center">
                <Target className="h-8 sm:h-10 w-8 sm:w-10 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">Recomendações</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sugestões personalizadas para melhorar suas finanças
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
