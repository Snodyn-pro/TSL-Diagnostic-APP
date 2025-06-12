
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Users, Award, ArrowRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16 pt-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            TSL Parceiros
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Sua jornada para a liberdade financeira começa aqui
          </p>
          <div className="mt-8">
            <Button 
              onClick={() => navigate('/welcome')}
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 text-lg px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Começar Diagnóstico
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <TrendingUp className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Análise Inteligente
              </h3>
              <p className="text-blue-100">
                Algoritmo avançado que analisa sua situação financeira em minutos
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Consultoria Especializada
              </h3>
              <p className="text-blue-100">
                Acesso direto aos melhores consultores financeiros
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <Award className="h-12 w-12 text-blue-200 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-3">
                Resultados Comprovados
              </h3>
              <p className="text-blue-100">
                +10.000 clientes já transformaram suas finanças conosco
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-white/5 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                Pronto para começar?
              </h2>
              <p className="text-blue-100 mb-6">
                Descubra seu perfil financeiro em menos de 5 minutos
              </p>
              <Button 
                onClick={() => navigate('/welcome')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Iniciar Diagnóstico Gratuito
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
