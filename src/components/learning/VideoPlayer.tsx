
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Volume2, Maximize } from "lucide-react";

interface VideoPlayerProps {
  video: {
    title: string;
    duration: string;
    level: string;
    thumbnail: string;
    description: string;
    videoUrl?: string;
  };
  onClose: () => void;
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(parseInt(video.duration.split(' ')[0]) * 60); // Convert minutes to seconds

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      // Simulate video progress
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            clearInterval(interval);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl bg-white">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl mb-2">{video.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{video.level}</Badge>
                <span className="text-sm text-gray-600">{video.duration}</span>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>
              ✕
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Video placeholder */}
            <div className="relative bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover rounded-lg opacity-75"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  onClick={togglePlay}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                </Button>
              </div>
            </div>
            
            {/* Video controls */}
            <div className="mt-4 space-y-2">
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              {/* Control buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={togglePlay}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-600">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <Button variant="ghost" size="sm">
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Sobre este vídeo</h3>
            <p className="text-gray-700">{video.description}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoPlayer;
