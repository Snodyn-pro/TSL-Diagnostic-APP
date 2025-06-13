
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { questionsData } from "@/data/questions";
import { toast } from "sonner";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'individual';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState(questionsData[userType]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);

  useEffect(() => {
    const updatedQuestions = questionsData[userType].filter(question => {
      if (!question.condition) return true;
      return question.condition(answers);
    });
    setQuestions(updatedQuestions);
  }, [answers, userType]);

  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    
    // Show feedback animation
    setShowAnswerFeedback(true);
    setTimeout(() => setShowAnswerFeedback(false), 600);
    
    toast.success("Resposta registrada!", {
      duration: 1000,
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    } else {
      navigate('/results', { state: { answers, userType } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-3xl mx-auto">
          {/* Enhanced Header */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/welcome')}
                className="hover:bg-green-100 text-green-700 font-medium rounded-full px-6"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/8ed86441-2db3-419d-8cd6-866b57db3813.png" 
                  alt="TSL Parceiros" 
                  className="h-8 w-auto"
                />
                <h1 className="text-xl sm:text-2xl font-bold text-green-800">
                  Diagnóstico Financeiro
                </h1>
              </div>
              
              <div className="text-sm text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-full">
                {currentQuestion + 1} / {questions.length}
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-green-700 font-medium">
                <span>Progresso do diagnóstico</span>
                <span>{Math.round(progress)}% completo</span>
              </div>
              <div className="relative">
                <Progress 
                  value={progress} 
                  className="h-3 bg-green-100 rounded-full overflow-hidden" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                     style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-0 h-full w-2 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Question Card */}
          <Card className={`border-none shadow-2xl bg-white/95 backdrop-blur-sm transition-all duration-500 rounded-2xl overflow-hidden ${
            isAnimating ? 'opacity-40 scale-95 translate-x-4' : 'opacity-100 scale-100 translate-x-0'
          }`}>
            <CardHeader className="pb-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl leading-relaxed font-semibold mb-2">
                    {question.question}
                  </CardTitle>
                  {question.subtitle && (
                    <p className="text-green-100 text-sm sm:text-base opacity-90">
                      {question.subtitle}
                    </p>
                  )}
                </div>
                {showAnswerFeedback && (
                  <CheckCircle className="h-8 w-8 text-green-200 animate-bounce" />
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-6 sm:p-8">
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={currentAnswer || ''}
                  onValueChange={handleAnswer}
                  className="space-y-3 sm:space-y-4"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className={`flex items-center space-x-4 p-4 sm:p-5 rounded-xl border-2 transition-all duration-300 cursor-pointer hover:shadow-md ${
                      currentAnswer === option.value 
                        ? 'bg-green-50 border-green-400 shadow-lg' 
                        : 'bg-gray-50 border-gray-200 hover:bg-green-25 hover:border-green-300'
                    }`}>
                      <RadioGroupItem value={option.value} id={option.value} className="text-green-600" />
                      <Label 
                        htmlFor={option.value} 
                        className="cursor-pointer flex-1 text-gray-800 font-medium text-sm sm:text-base"
                      >
                        {option.label}
                      </Label>
                      {currentAnswer === option.value && (
                        <CheckCircle className="h-5 w-5 text-green-600 animate-scale-in" />
                      )}
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'number' && (
                <div className="space-y-4">
                  <Label className="text-gray-700 font-semibold text-lg">Valor em Euros (€)</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder={question.placeholder}
                      value={currentAnswer || ''}
                      onChange={(e) => handleAnswer(e.target.value)}
                      className="text-xl p-6 border-2 border-gray-200 focus:border-green-500 rounded-xl transition-all duration-300"
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-semibold">
                      €
                    </div>
                  </div>
                </div>
              )}

              {question.type === 'text' && (
                <div className="space-y-4">
                  <Label className="text-gray-700 font-semibold text-lg">Sua resposta</Label>
                  <Input
                    type="text"
                    placeholder={question.placeholder}
                    value={currentAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="text-lg p-6 border-2 border-gray-200 focus:border-green-500 rounded-xl transition-all duration-300"
                  />
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center hover:bg-gray-100 border-2 rounded-xl px-6 py-3 font-semibold disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center px-8 py-3 font-semibold rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Diagnóstico'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Progress Indicator Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index <= currentQuestion 
                    ? 'bg-green-500 w-8' 
                    : 'bg-gray-300 w-2'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
