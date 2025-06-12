
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, BookOpen, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Euro } from "lucide-react";
import { analyzeFinancialData } from "@/utils/financialAnalysis";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { answers, userType } = location.state || {};

  if (!answers) {
    navigate('/');
    return null;
  }

  const analysis = analyzeFinancialData(answers, userType);

  const budgetData = [
    { name: 'Gastos Essenciais', value: analysis.budgetDistribution.essential, fill: '#3B82F6' },
    { name: 'Gastos não Essenciais', value: analysis.budgetDistribution.nonEssential, fill: '#10B981' },
    { name: 'Poupança', value: analysis.budgetDistribution.savings, fill: '#F59E0B' }
  ];

  const scoreData = [
    { category: 'Controle', score: analysis.detailedScores.control },
    { category: 'Poupança', score: analysis.detailedScores.savings },
    { category: 'Dívidas', score: analysis.detailedScores.debts },
    { category: 'Planejamento', score: analysis.detailedScores.planning }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/quiz', { state: { userType } })}
              className="mr-4 hover:bg-blue-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <div className="text-center flex-1">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">TSL Parceiros</h1>
              <p className="text-slate-600">Seu diagnóstico financeiro personalizado</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-xl mb-6 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-slate-800">
                    <TrendingUp className="h-5 w-5" />
                    Perfil Financeiro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`text-lg px-4 py-2 mb-4 ${
                        analysis.profile === 'Equilibrado' ? 'border-green-500 text-green-700 bg-green-50' :
                        analysis.profile === 'Gastador por Impulso' ? 'border-red-500 text-red-700 bg-red-50' :
                        'border-yellow-500 text-yellow-700 bg-yellow-50'
                      }`}
                    >
                      {analysis.profile}
                    </Badge>
                    <div className="mt-4">
                      <div className="text-4xl font-bold text-slate-800 mb-2">{analysis.score}/100</div>
                      <div className="text-sm text-slate-600">Pontuação Geral</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Análise do Orçamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Gastos essenciais:</span>
                      <span className="font-bold text-blue-700">{analysis.budgetDistribution.essential}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Gastos não essenciais:</span>
                      <span className="font-bold text-green-700">{analysis.budgetDistribution.nonEssential}%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="text-slate-700 font-medium">Poupança:</span>
                      <span className="font-bold text-yellow-700">{analysis.budgetDistribution.savings}%</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button 
                      onClick={() => navigate('/schedule')}
                      className="w-full bg-blue-600 hover:bg-blue-700 py-3 font-semibold"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Consultoria TSL
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analysis */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Distribuição Orçamentária</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          dataKey="value"
                        >
                          {budgetData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Pontuação por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={scoreData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" fontSize={12} />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Bar dataKey="score" fill="#3B82F6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations */}
              <Card className="border-none shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recomendações TSL Parceiros</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className={`flex items-start gap-3 p-4 rounded-lg border-l-4 ${
                        rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                        rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                        'bg-blue-50 border-blue-400'
                      }`}>
                        {rec.priority === 'high' ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-semibold text-slate-800 mb-1">{rec.title}</h4>
                          <p className="text-slate-600 text-sm">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button 
                      onClick={() => navigate('/learning')}
                      variant="outline"
                      className="flex-1 hover:bg-blue-50"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Material Educativo
                    </Button>
                    <Button 
                      onClick={() => navigate('/schedule')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Consultoria
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
