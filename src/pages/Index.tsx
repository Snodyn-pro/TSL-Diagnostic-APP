
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { User, Building2, TrendingUp, Shield, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'individual' | 'business' | null>(null);

  const handleStartDiagnosis = () => {
    if (userType) {
      navigate('/quiz', { state: { userType } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Bem-vindo
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Comece a transformação da sua vida financeira
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-8 border-none shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-slate-800 mb-6 text-center">
                Selecione seu perfil
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    userType === 'individual' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setUserType('individual')}
                >
                  <CardContent className="p-6 text-center">
                    <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Pessoa Física
                    </h3>
                    <p className="text-slate-600">
                      Diagnóstico financeiro pessoal e familiar
                    </p>
                  </CardContent>
                </Card>

                <Card 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    userType === 'business' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setUserType('business')}
                >
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-800 mb-2">
                      Empresa
                    </h3>
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
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-full"
                >
                  Começar Diagnóstico
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-none shadow-md">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Análise Completa</h3>
                <p className="text-sm text-slate-600">
                  Avaliação detalhada da sua situação financeira atual
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6 text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Seguro e Privado</h3>
                <p className="text-sm text-slate-600">
                  Seus dados são protegidos e mantidos em sigilo
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6 text-center">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-slate-800 mb-2">Recomendações</h3>
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

export default Index;
