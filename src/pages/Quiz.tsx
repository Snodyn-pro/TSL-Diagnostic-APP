
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { questionsData } from "@/data/questions";

const Quiz = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userType = location.state?.userType || 'individual';
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState(questionsData[userType]);

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
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Navigate to results with answers
      navigate('/results', { state: { answers, userType } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const currentAnswer = answers[question.id];

  if (!question) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-slate-800">
                Diagnóstico Financeiro
              </h1>
              <span className="text-sm text-slate-600">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">
                {question.question}
              </CardTitle>
              {question.subtitle && (
                <p className="text-slate-600">{question.subtitle}</p>
              )}
            </CardHeader>
            <CardContent>
              {question.type === 'radio' && question.options && (
                <RadioGroup
                  value={currentAnswer || ''}
                  onValueChange={handleAnswer}
                  className="space-y-3"
                >
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === 'number' && (
                <Input
                  type="number"
                  placeholder={question.placeholder}
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="mt-2"
                />
              )}

              {question.type === 'text' && (
                <Input
                  type="text"
                  placeholder={question.placeholder}
                  value={currentAnswer || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="mt-2"
                />
              )}

              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>

                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center"
                >
                  {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
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
