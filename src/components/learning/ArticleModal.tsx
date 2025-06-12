
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    readTime: string;
    category: string;
    description: string;
    content: string;
  };
}

const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline">{article.category}</Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>
          <DialogTitle className="text-2xl">{article.title}</DialogTitle>
        </DialogHeader>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-gray-600 mb-6">{article.description}</p>
          <div className="whitespace-pre-line text-gray-800 leading-relaxed">
            {article.content}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-8 pt-4 border-t">
          <User className="h-5 w-5 text-gray-500" />
          <span className="text-sm text-gray-600">Por TSL Parceiros</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleModal;
