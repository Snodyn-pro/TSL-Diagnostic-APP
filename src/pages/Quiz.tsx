
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { questionsData } from "@/data/questions";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'individual';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState(questionsData[userType]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Update questions based on previous answers (conditional logic)
    const updatedQuestions = questionsData[userType].filter(question => {
      if (!question.condition) return true;
      return question.condition(answers);
    });
    setQuestions(updatedQuestions);
  }, [answers, userType]);

  const handleAnswer = (value: string) => {
    const questionId = questions[currentQuestion].id;
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      // Navigate to results with answers
      navigate('/results', { state: { answers, userType } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/welcome')}
                className="hover:bg-blue-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-slate-800">
                TSL Parceiros
              </h1>
              <span className="text-sm text-slate-600 font-medium">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-slate-600 mb-2">
                <span>Progresso do diagnóstico</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-slate-200" 
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className={`border-none shadow-xl bg-white/80 backdrop-blur-sm transition-all duration-300 ${
            isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-800 leading-relaxed">
                {question.question}
              </CardTitle>
              {question.subtitle && (
                <p className="text-slate-600 mt-2">{question.subtitle}</p>
              )}
            </CardHeader>
            <CardContent>
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={currentAnswer || ''}
                  onValueChange={handleAnswer}
                  className="space-y-4"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label 
                        htmlFor={option.value} 
                        className="cursor-pointer flex-1 text-slate-700"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'number' && (
                <div className="space-y-2">
                  <Label className="text-slate-700">Valor em Euros (€)</Label>
                  <Input
                    type="number"
                    placeholder={question.placeholder}
                    value={currentAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="text-lg p-4 border-2 focus:border-blue-500"
                  />
                </div>
              )}

              {question.type === 'text' && (
                <div className="space-y-2">
                  <Label className="text-slate-700">Sua resposta</Label>
                  <Input
                    type="text"
                    placeholder={question.placeholder}
                    value={currentAnswer || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    className="text-lg p-4 border-2 focus:border-blue-500"
                  />
                </div>
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center hover:bg-slate-100"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center px-6 py-3 font-semibold"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima' : 'Ver Resultados'}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
