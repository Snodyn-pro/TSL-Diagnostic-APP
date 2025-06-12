
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, BookOpen, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Resumo</h1>
            <p className="text-slate-600">Seu diagnóstico financeiro personalizado</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card className="border-none shadow-lg mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Perfil Emocional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <Badge 
                      variant="outline" 
                      className={`text-lg px-4 py-2 ${
                        analysis.profile === 'Equilibrado' ? 'border-green-500 text-green-700' :
                        analysis.profile === 'Gastador por Impulso' ? 'border-red-500 text-red-700' :
                        'border-yellow-500 text-yellow-700'
                      }`}
                    >
                      {analysis.profile}
                    </Badge>
                    <div className="mt-4">
                      <div className="text-3xl font-bold text-slate-800">{analysis.score}/100</div>
                      <div className="text-sm text-slate-600">Pontuação Geral</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Análise do Orçamento</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gastos essenciais:</span>
                      <span className="font-semibold">{analysis.budgetDistribution.essential}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Gastos não essenciais:</span>
                      <span className="font-semibold">{analysis.budgetDistribution.nonEssential}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Poupança:</span>
                      <span className="font-semibold">{analysis.budgetDistribution.savings}%</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button 
                      onClick={() => navigate('/schedule')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agende uma sessão de consultoria
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analysis */}
            <div className="lg:col-span-2">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <Card className="border-none shadow-lg">
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

                <Card className="border-none shadow-lg">
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
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Recomendações Personalizadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        {rec.priority === 'high' ? (
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                        ) : (
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        )}
                        <div>
                          <h4 className="font-semibold text-slate-800">{rec.title}</h4>
                          <p className="text-slate-600 text-sm">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button 
                      onClick={() => navigate('/learning')}
                      variant="outline"
                      className="flex-1"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Aprendizagem
                    </Button>
                    <Button 
                      onClick={() => navigate('/schedule')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Consulta
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
