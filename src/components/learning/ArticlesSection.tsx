
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";

interface Article {
  title: string;
  readTime: string;
  category: string;
  description: string;
  key: string;
}

interface ArticlesSectionProps {
  articles: Article[];
  onArticleClick: (article: Article) => void;
}

const ArticlesSection = ({ articles, onArticleClick }: ArticlesSectionProps) => {
  return (
    <Card className="border-none shadow-lg bg-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <CardHeader className="tsl-gradient text-white rounded-t-lg mobile-padding">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <FileText className="h-5 w-5" />
          Artigos e Guias
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          {articles.map((article, index) => (
            <Card 
              key={index} 
              className="border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-green-400 hover-lift animate-scale-in"
              onClick={() => onArticleClick(article)}
              style={{ animationDelay: `${(index + 3) * 0.1}s` }}
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs border-green-200 text-green-700">
                        {article.category}
                      </Badge>
                      <span className="text-xs text-slate-500">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">{article.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{article.description}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-green-400 ml-4 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticlesSection;
