
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calendar, BookOpen, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Euro, Award, Target, Users, Sparkles } from "lucide-react";
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
    { name: 'Gastos Essenciais', value: analysis.budgetDistribution.essential, fill: '#059669', label: 'Essenciais' },
    { name: 'Gastos não Essenciais', value: analysis.budgetDistribution.nonEssential, fill: '#10B981', label: 'Não Essenciais' },
    { name: 'Poupança', value: analysis.budgetDistribution.savings, fill: '#34D399', label: 'Poupança' }
  ];

  const scoreData = [
    { category: 'Controle', score: analysis.detailedScores.control, fullMark: 100 },
    { category: 'Poupança', score: analysis.detailedScores.savings, fullMark: 100 },
    { category: 'Dívidas', score: analysis.detailedScores.debts, fullMark: 100 },
    { category: 'Planejamento', score: analysis.detailedScores.planning, fullMark: 100 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excelente';
    if (score >= 60) return 'Bom';
    if (score >= 40) return 'Regular';
    return 'Precisa Melhorar';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/quiz', { state: { userType } })}
              className="hover:bg-green-100 text-green-700 font-medium rounded-full px-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Refazer Diagnóstico
            </Button>
            
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-3 mb-2">
                <img 
                  src="/lovable-uploads/8ed86441-2db3-419d-8cd6-866b57db3813.png" 
                  alt="TSL Parceiros" 
                  className="h-10 w-auto"
                />
                <h1 className="text-2xl sm:text-3xl font-bold text-green-800">Seu Diagnóstico Financeiro</h1>
              </div>
              <p className="text-green-600 font-medium">Relatório personalizado baseado nas suas respostas</p>
            </div>

            <Button 
              onClick={() => navigate('/schedule')}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Consultoria
            </Button>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Score Summary - Enhanced */}
            <div className="lg:col-span-4">
              <Card className="border-none shadow-2xl mb-6 bg-gradient-to-br from-white to-green-50 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Award className="h-6 w-6" />
                    Pontuação Geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="text-6xl font-bold text-green-700 mb-2">{analysis.score}</div>
                      <div className="absolute -top-2 -right-8">
                        <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-600">de 100 pontos</div>
                    <Badge 
                      className={`text-lg px-6 py-2 mt-4 font-bold rounded-full ${getScoreColor(analysis.score)} border-2`}
                    >
                      {analysis.profile}
                    </Badge>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Detalhamento por Área
                    </h4>
                    {Object.entries(analysis.detailedScores).map(([key, score]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                        <span className="font-medium text-gray-700 capitalize">{key}:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-1000"
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className={`font-bold text-sm px-2 py-1 rounded ${getScoreColor(score)}`}>
                            {score}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Budget Summary */}
              <Card className="border-none shadow-xl bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Distribuição Orçamentária
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {budgetData.map((item) => (
                      <div key={item.name} className="flex justify-between items-center p-4 rounded-xl" style={{ backgroundColor: `${item.fill}15` }}>
                        <span className="text-gray-700 font-medium">{item.label}:</span>
                        <span className="font-bold text-lg" style={{ color: item.fill }}>{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Analysis - Enhanced */}
            <div className="lg:col-span-8">
              {/* Charts Row */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <Card className="border-none shadow-xl bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-green-800">Distribuição do Orçamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={budgetData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
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

                <Card className="border-none shadow-xl bg-white rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-green-800">Análise por Categoria</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={scoreData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="category" />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} />
                        <Radar name="Pontuação" dataKey="score" stroke="#059669" fill="#059669" fillOpacity={0.3} />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Recommendations - Enhanced */}
              <Card className="border-none shadow-xl bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-2xl">
                  <CardTitle className="text-xl">Recomendações Personalizadas TSL</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className={`flex items-start gap-4 p-6 rounded-2xl border-l-4 transition-all duration-300 hover:shadow-lg ${
                        rec.priority === 'high' ? 'bg-red-50 border-red-400 hover:bg-red-100' :
                        rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400 hover:bg-yellow-100' :
                        'bg-blue-50 border-blue-400 hover:bg-blue-100'
                      }`}>
                        <div className="flex-shrink-0">
                          {rec.priority === 'high' ? (
                            <AlertTriangle className="h-8 w-8 text-red-500" />
                          ) : (
                            <CheckCircle className="h-8 w-8 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-bold text-gray-800 text-lg">{rec.title}</h4>
                            <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'secondary' : 'default'} className="text-xs">
                              {rec.priority === 'high' ? 'Urgente' : rec.priority === 'medium' ? 'Importante' : 'Sugestão'}
                            </Badge>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Button 
                  onClick={() => navigate('/learning')}
                  variant="outline"
                  className="flex-1 hover:bg-green-50 border-2 border-green-200 rounded-xl py-4 font-semibold"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Material Educativo
                </Button>
                <Button 
                  onClick={() => navigate('/schedule')}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-4 font-semibold"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Consultoria Gratuita
                </Button>
                <Button 
                  onClick={() => window.open('https://www.tslparceiros.pt', '_blank')}
                  variant="outline"
                  className="flex-1 hover:bg-emerald-50 border-2 border-emerald-200 rounded-xl py-4 font-semibold"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Conheça a TSL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
