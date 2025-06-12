
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mr-4 hover:bg-blue-100"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              TSL Parceiros
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Diagnóstico Financeiro Personalizado
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Bem-vindo ao seu diagnóstico financeiro
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Descubra seu perfil financeiro e receba recomendações personalizadas
            </p>
          </div>

          <Card className="mb-8 border-none shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
                Selecione seu perfil
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    userType === 'individual' ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('individual')}
                >
                  <CardContent className="p-6 text-center">
                    <User className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-slate-800 mb-3">
                      Pessoa Física
                    </h4>
                    <p className="text-slate-600">
                      Diagnóstico financeiro pessoal e familiar
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    userType === 'business' ? 'ring-2 ring-blue-500 bg-blue-50 shadow-lg' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setUserType('business')}
                >
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-xl font-semibold text-slate-800 mb-3">
                      Empresa
                    </h4>
                    <p className="text-slate-600">
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  Começar Diagnóstico
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-10 w-10 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Análise Completa</h4>
                <p className="text-sm text-slate-600">
                  Avaliação detalhada da sua situação financeira atual
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Shield className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Seguro e Privado</h4>
                <p className="text-sm text-slate-600">
                  Seus dados são protegidos e mantidos em sigilo
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md bg-white/70 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <Target className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                <h4 className="font-semibold text-slate-800 mb-2">Recomendações</h4>
                <p className="text-sm text-slate-600">
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
