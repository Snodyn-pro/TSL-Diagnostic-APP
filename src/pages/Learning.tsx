
import { useState, useEffect } from "react";
import { Calculator, FileSpreadsheet, Smartphone } from "lucide-react";
import ToolsModal from "@/components/tools/ToolsModal";
import VideoPlayer from "@/components/learning/VideoPlayer";
import ArticleModal from "@/components/learning/ArticleModal";
import AuthModal from "@/components/auth/AuthModal";
import LearningHeader from "@/components/learning/LearningHeader";
import VideosSection from "@/components/learning/VideosSection";
import ArticlesSection from "@/components/learning/ArticlesSection";
import ToolsSidebar from "@/components/learning/ToolsSidebar";
import { articlesContent } from "@/data/articlesContent";

const Learning = () => {
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-slate-100">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <LearningHeader 
            user={user}
            onAuthClick={() => setIsAuthModalOpen(true)}
            onLogout={handleLogout}
          />

          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Content Section */}
            <div className="lg:col-span-2 space-y-6">
              <VideosSection videos={videos} onVideoClick={openVideo} />
              <ArticlesSection articles={articles} onArticleClick={openArticle} />
            </div>

            {/* Tools Sidebar */}
            <div className="lg:col-span-1">
              <ToolsSidebar tools={tools} onToolClick={openTool} />
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
