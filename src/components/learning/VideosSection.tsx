
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";

interface Video {
  title: string;
  duration: string;
  level: string;
  thumbnail: string;
  description: string;
}

interface VideosSectionProps {
  videos: Video[];
  onVideoClick: (video: Video) => void;
}

const VideosSection = ({ videos, onVideoClick }: VideosSectionProps) => {
  return (
    <Card className="border-none shadow-lg mb-6 sm:mb-8 bg-white animate-fade-in-up">
      <CardHeader className="tsl-gradient text-white rounded-t-lg mobile-padding">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Play className="h-5 w-5" />
          Vídeos Educativos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video, index) => (
            <Card 
              key={index} 
              className="border border-green-200 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-green-400 hover-lift animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div 
                  className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-t-lg hover:bg-opacity-30 transition-all"
                  onClick={() => onVideoClick(video)}
                >
                  <Play className="h-8 w-8 text-white animate-pulse-slow" />
                </div>
                <Badge className="absolute top-2 right-2 bg-green-600 text-xs">
                  {video.duration}
                </Badge>
              </div>
              <CardContent className="p-3 sm:p-4">
                <Badge variant="outline" className="mb-2 text-xs border-green-200 text-green-700">
                  {video.level}
                </Badge>
                <h3 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">{video.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{video.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideosSection;
