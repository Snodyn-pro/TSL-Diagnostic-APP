
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Play, BookOpen, FileText, ExternalLink, Calculator, FileSpreadsheet, Smartphone, User, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import ToolsModal from "@/components/tools/ToolsModal";
import VideoPlayer from "@/components/learning/VideoPlayer";
import ArticleModal from "@/components/learning/ArticleModal";
import AuthModal from "@/components/auth/AuthModal";
import { articlesContent } from "@/data/articlesContent";

const Learning = () => {
  const navigate = useNavigate();
  const [isToolsModalOpen, setIsToolsModalOpen] = useState(false);
  const [activeToolTab, setActiveToolTab] = useState("calculator");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('tsl_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const videos = [
    {
      title: "Como criar uma reserva de emergência",
      duration: "12 min",
      level: "Iniciante",
      thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=225&fit=crop",
      description: "Aprenda a montar sua reserva de emergência do zero. Descubra quanto guardar, onde investir e como manter a disciplina para construir sua segurança financeira."
    },
    {
      title: "Planejamento financeiro pessoal",
      duration: "18 min",
      level: "Intermediário",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
      description: "Estratégias para organizar suas finanças pessoais. Aprenda a definir objetivos, criar orçamentos eficazes e tomar decisões financeiras inteligentes."
    },
    {
      title: "Investimentos para iniciantes",
      duration: "25 min",
      level: "Iniciante",
      thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=225&fit=crop",
      description: "Primeiros passos no mundo dos investimentos. Conheça os principais tipos de investimento, riscos e como começar a investir com segurança."
    }
  ];

  const articles = [
    {
      title: "50-30-20: A regra de ouro do orçamento",
      readTime: "5 min",
      category: "Planejamento",
      description: "Como dividir sua renda de forma inteligente usando a regra 50-30-20.",
      key: "50-30-20"
    },
    {
      title: "Como sair das dívidas: guia completo",
      readTime: "8 min",
      category: "Dívidas",
      description: "Estratégias eficazes para quitar dívidas e reconquistar a liberdade financeira.",
      key: "dividas"
    },
    {
      title: "Controle de gastos: ferramentas essenciais",
      readTime: "6 min",
      category: "Controle",
      description: "Apps e planilhas para monitorar seus gastos e manter o orçamento em dia.",
      key: "controle-gastos"
    }
  ];

  const tools = [
    {
      name: "Calculadora de Juros Compostos",
      type: "Ferramenta Online",
      description: "Calcule o poder dos juros compostos nos seus investimentos",
      icon: Calculator,
      tabKey: "calculator"
    },
    {
      name: "Planilha de Orçamento Pessoal",
      type: "Excel/Google Sheets",
      description: "Planilha completa para controle financeiro pessoal",
      icon: FileSpreadsheet,
      tabKey: "budget"
    },
    {
      name: "App de Controle de Gastos",
      type: "Aplicativo Mobile",
      description: "Monitore seus gastos em tempo real",
      icon: Smartphone,
      tabKey: "tracker"
    }
  ];

  const openTool = (tabKey: string) => {
    setActiveToolTab(tabKey);
    setIsToolsModalOpen(true);
  };

  const openVideo = (video: any) => {
    setSelectedVideo(video);
  };

  const openArticle = (article: any) => {
    const fullArticle = {
      ...article,
      ...articlesContent[article.key]
    };
    setSelectedArticle(fullArticle);
  };

  const handleAuth = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('tsl_user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-blue-900">Aprendizagem</h1>
                <p className="text-slate-600">Materiais para melhorar sua educação financeira</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {user ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-blue-900">Olá, {user.name}</span>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Sair
                  </Button>
                </div>
              ) : (
                <Button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <LogIn className="h-4 w-4" />
                  Entrar
                </Button>
              )}
              <a 
                href="https://www.tslparceiros.pt" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1"
              >
                <ExternalLink className="h-4 w-4" />
                Site Principal
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Videos Section */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-lg mb-8 bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Vídeos Educativos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <Card key={index} className="border border-blue-200 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400">
                        <div className="relative">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-32 object-cover rounded-t-lg"
                          />
                          <div 
                            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg hover:bg-opacity-30 transition-all"
                            onClick={() => openVideo(video)}
                          >
                            <Play className="h-8 w-8 text-white" />
                          </div>
                          <Badge className="absolute top-2 right-2 bg-blue-600">
                            {video.duration}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <Badge variant="outline" className="mb-2 text-xs border-blue-200 text-blue-700">
                            {video.level}
                          </Badge>
                          <h3 className="font-semibold text-blue-900 mb-2">{video.title}</h3>
                          <p className="text-sm text-slate-600">{video.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Articles Section */}
              <Card className="border-none shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Artigos e Guias
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {articles.map((article, index) => (
                      <Card 
                        key={index} 
                        className="border border-blue-200 hover:shadow-md transition-shadow cursor-pointer hover:border-blue-400"
                        onClick={() => openArticle(article)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs border-blue-200 text-blue-700">
                                  {article.category}
                                </Badge>
                                <span className="text-xs text-slate-500">{article.readTime}</span>
                              </div>
                              <h3 className="font-semibold text-blue-900 mb-2">{article.title}</h3>
                              <p className="text-sm text-slate-600">{article.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-blue-400 ml-4" />
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
              <Card className="border-none shadow-lg bg-white">
                <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Ferramentas Úteis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {tools.map((tool, index) => (
                      <div 
                        key={index} 
                        className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200"
                        onClick={() => openTool(tool.tabKey)}
                      >
                        <div className="flex items-start gap-3">
                          <tool.icon className="h-6 w-6 text-blue-600 mt-1" />
                          <div className="flex-1">
                            <h4 className="font-semibold text-blue-900 mb-1">{tool.name}</h4>
                            <Badge variant="outline" className="text-xs mb-2 border-blue-200 text-blue-700">
                              {tool.type}
                            </Badge>
                            <p className="text-sm text-slate-600">{tool.description}</p>
                          </div>
                        </div>
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
                  
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">TSL Parceiros</h4>
                    <p className="text-sm text-slate-600 mb-3">
                      Consultoria financeira especializada para pessoas e empresas
                    </p>
                    <a 
                      href="https://www.tslparceiros.pt" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-sm flex items-center gap-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Conheça nossos serviços
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <ToolsModal 
        isOpen={isToolsModalOpen}
        onClose={() => setIsToolsModalOpen(false)}
        activeTab={activeToolTab}
      />

      {selectedVideo && (
        <VideoPlayer 
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {selectedArticle && (
        <ArticleModal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          article={selectedArticle}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuth={handleAuth}
      />
    </div>
  );
};

export default Learning;
