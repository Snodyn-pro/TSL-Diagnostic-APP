
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Calendar, BookOpen, TrendingUp, AlertTriangle, CheckCircle, ArrowLeft, Euro, Award, Target, Users, Sparkles } from "lucide-react";
import { analyzeFinancialData } from "@/utils/financialAnalysis";
import { useLanguage } from "@/hooks/use-language";

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
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
    { category: 'Controlo', score: analysis.detailedScores.control, fullMark: 100 },
    { category: 'Poupança', score: analysis.detailedScores.savings, fullMark: 100 },
    { category: 'Dívidas', score: analysis.detailedScores.debts, fullMark: 100 },
    { category: 'Planeamento', score: analysis.detailedScores.planning, fullMark: 100 }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/quiz', { state: { userType } })}
              className="hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 font-medium rounded-full px-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Refazer Diagnóstico
            </Button>
            
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-green-800 dark:text-green-400">
                  {t('results.title')}
                </h1>
              </div>
              <p className="text-green-600 dark:text-green-400 font-medium">
                Relatório personalizado baseado nas suas respostas
              </p>
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
              <Card className="border-none shadow-2xl mb-6 bg-gradient-to-br from-card to-green-50 dark:from-card dark:to-green-950/30 rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Award className="h-6 w-6" />
                    Pontuação Geral
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="text-6xl font-bold text-green-700 dark:text-green-400 mb-2">{analysis.score}</div>
                      <div className="absolute -top-2 -right-8">
                        <Sparkles className="h-8 w-8 text-yellow-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-muted-foreground">de 100 pontos</div>
                    <Badge 
                      className={`text-lg px-6 py-2 mt-4 font-bold rounded-full ${getScoreColor(analysis.score)} border-2`}
                    >
                      {analysis.profile}
                    </Badge>
                  </div>

                  {/* Score Breakdown */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Detalhamento por Área
                    </h4>
                    {Object.entries(analysis.detailedScores).map(([key, score]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                        <span className="font-medium text-foreground capitalize">{key}:</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
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
              <Card className="border-none shadow-xl bg-card rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2">
                    <Euro className="h-5 w-5" />
                    Distribuição Orçamentária
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {budgetData.map((item) => (
                      <div key={item.name} className="flex justify-between items-center p-4 rounded-xl bg-muted/30">
                        <span className="text-foreground font-medium">{item.label}:</span>
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
                <Card className="border-none shadow-xl bg-card rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-foreground">Distribuição do Orçamento</CardTitle>
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

                <Card className="border-none shadow-xl bg-card rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-foreground">Análise por Categoria</CardTitle>
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
              <Card className="border-none shadow-xl bg-card rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-2xl">
                  <CardTitle className="text-xl">Recomendações Personalizadas TSL</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {analysis.recommendations.map((rec, index) => (
                      <div key={index} className={`flex items-start gap-4 p-6 rounded-2xl border-l-4 transition-all duration-300 hover:shadow-lg ${
                        rec.priority === 'high' ? 'bg-red-50 dark:bg-red-950/30 border-red-400 hover:bg-red-100 dark:hover:bg-red-950/50' :
                        rec.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-950/30 border-yellow-400 hover:bg-yellow-100 dark:hover:bg-yellow-950/50' :
                        'bg-blue-50 dark:bg-blue-950/30 border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-950/50'
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
                            <h4 className="font-bold text-foreground text-lg">{rec.title}</h4>
                            <Badge variant={rec.priority === 'high' ? 'destructive' : rec.priority === 'medium' ? 'secondary' : 'default'} className="text-xs">
                              {rec.priority === 'high' ? 'Urgente' : rec.priority === 'medium' ? 'Importante' : 'Sugestão'}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
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
                  className="flex-1 hover:bg-green-50 dark:hover:bg-green-950/30 border-2 border-green-200 dark:border-green-800 rounded-xl py-4 font-semibold"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Material Educativo
                </Button>
                <Button 
                  onClick={() => navigate('/schedule')}
                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl py-4 font-semibold"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Consultoria Especializada
                </Button>
                <Button 
                  onClick={() => window.open('https://www.tslparceiros.pt', '_blank')}
                  variant="outline"
                  className="flex-1 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl py-4 font-semibold"
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
