
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, FileText, ExternalLink } from "lucide-react";

const Learning = () => {
  const navigate = useNavigate();

  const videos = [
    {
      title: "Como criar uma reserva de emergência",
      duration: "12 min",
      level: "Iniciante",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
      description: "Aprenda a montar sua reserva de emergência do zero"
    },
    {
      title: "Planejamento financeiro pessoal",
      duration: "18 min",
      level: "Intermediário",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      description: "Estratégias para organizar suas finanças pessoais"
    },
    {
      title: "Investimentos para iniciantes",
      duration: "25 min",
      level: "Iniciante",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
      description: "Primeiros passos no mundo dos investimentos"
    }
  ];

  const articles = [
    {
      title: "50-30-20: A regra de ouro do orçamento",
      readTime: "5 min",
      category: "Planejamento",
      description: "Como dividir sua renda de forma inteligente usando a regra 50-30-20."
    },
    {
      title: "Como sair das dívidas: guia completo",
      readTime: "8 min",
      category: "Dívidas",
      description: "Estratégias eficazes para quitar dívidas e reconquistar a liberdade financeira."
    },
    {
      title: "Controle de gastos: ferramentas essenciais",
      readTime: "6 min",
      category: "Controle",
      description: "Apps e planilhas para monitorar seus gastos e manter o orçamento em dia."
    }
  ];

  const tools = [
    {
      name: "Planilha de Orçamento Pessoal",
      type: "Excel/Google Sheets",
      description: "Planilha completa para controle financeiro pessoal"
    },
    {
      name: "Calculadora de Juros Compostos",
      type: "Ferramenta Online",
      description: "Calcule o poder dos juros compostos nos seus investimentos"
    },
    {
      name: "App de Controle de Gastos",
      type: "Aplicativo Mobile",
      description: "Monitore seus gastos em tempo real"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Aprendizagem</h1>
              <p className="text-slate-600">Materiais para melhorar sua educação financeira</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Videos Section */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Vídeos Educativos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <Card key={index} className="border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg">
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-blue-600">
                            {video.duration}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs">
                            {video.level}
                          </Badge>
                          <h3 className="font-semibold text-slate-800 mb-2">{video.title}</h3>
                          <p className="text-sm text-slate-600">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Articles Section */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Artigos e Guias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.map((article, index) => (
                      <Card key={index} className="border border-slate-200 hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {article.category}
                                </Badge>
                                <span className="text-xs text-slate-500">{article.readTime}</span>
                              </div>
                              <h3 className="font-semibold text-slate-800 mb-2">{article.title}</h3>
                              <p className="text-sm text-slate-600">{article.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-400 ml-4" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tools Sidebar */}
            <div>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Ferramentas Úteis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tools.map((tool, index) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                        <h4 className="font-semibold text-slate-800 mb-1">{tool.name}</h4>
                        <Badge variant="outline" className="text-xs mb-2">
                          {tool.type}
                        </Badge>
                        <p className="text-sm text-slate-600">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <Button 
                      onClick={() => navigate('/schedule')}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Precisa de Ajuda Personalizada?
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

export default Learning;
