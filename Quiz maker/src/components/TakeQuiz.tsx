
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { Quiz, QuizAttempt, QuizQuestion, QuizOption } from '@/utils/types';
import { Award, ChevronLeft, ChevronRight, Check, X } from 'lucide-react';

interface TakeQuizProps {
  quiz: Quiz;
  onCompleteQuiz: (attempt: QuizAttempt) => void;
}

const TakeQuiz = ({ quiz, onCompleteQuiz }: TakeQuizProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  
  // Timer
  useEffect(() => {
    if (quizComplete) return;
    
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [quizComplete]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    
    // Calculate score
    const answers = quiz.questions.map(question => {
      const selectedOptionId = selectedAnswers[question.id] || '';
      const selectedOption = question.options.find(option => option.id === selectedOptionId);
      const isCorrect = !!selectedOption?.isCorrect;
      
      return {
        questionId: question.id,
        selectedOptionId,
        isCorrect
      };
    });
    
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    
    setScore({
      correct: correctAnswers,
      total: quiz.questions.length
    });
    
    const quizAttempt: QuizAttempt = {
      id: Date.now().toString(),
      userId: 'user1', // This would be the actual user ID in a real app
      quizId: quiz.id,
      score: correctAnswers,
      totalQuestions: quiz.questions.length,
      dateAttempted: new Date().toISOString(),
      timeSpent,
      answers
    };
    
    // Simulate API call delay
    setTimeout(() => {
      setShowResults(true);
      setQuizComplete(true);
      onCompleteQuiz(quizAttempt);
      setIsSubmitting(false);
      
      toast({
        title: "Quiz completed!",
        description: `You scored ${correctAnswers} out of ${quiz.questions.length}`,
        duration: 5000,
      });
    }, 1000);
  };
  
  if (showResults) {
    const percentage = Math.round((score.correct / score.total) * 100);
    
    return (
      <Card className="quiz-container animate-scale-in">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 dark:text-gray-700"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-quiz-primary"
                  strokeWidth="10"
                  strokeDasharray={250}
                  strokeDashoffset={250 - (250 * percentage) / 100}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{percentage}%</span>
                <Award className="text-quiz-primary mt-1" size={20} />
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-xl font-semibold">
              You scored {score.correct} out of {score.total}
            </h3>
            <p className="text-muted-foreground">
              Time taken: {formatTime(timeSpent)}
            </p>
          </div>
          
          <div className="space-y-6 mt-8">
            <h3 className="text-lg font-semibold border-b pb-2">Your Answers</h3>
            {quiz.questions.map((question, index) => {
              const selectedOptionId = selectedAnswers[question.id];
              const selectedOption = question.options.find(option => option.id === selectedOptionId);
              const correctOption = question.options.find(option => option.isCorrect);
              const isCorrect = selectedOption?.isCorrect;
              
              return (
                <div key={question.id} className="space-y-2">
                  <div className="flex gap-2">
                    <div className={`flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center mt-0.5 ${isCorrect ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'}`}>
                      {isCorrect ? <Check size={14} /> : <X size={14} />}
                    </div>
                    <div>
                      <h4 className="font-medium">
                        Question {index + 1}: {question.question}
                      </h4>
                      <div className="mt-1 text-sm">
                        <p className="text-muted-foreground">
                          Your answer: <span className={isCorrect ? 'text-green-600 dark:text-green-400 font-medium' : 'text-red-600 dark:text-red-400 font-medium'}>
                            {selectedOption?.text || 'Not answered'}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            Correct answer: {correctOption?.text}
                          </p>
                        )}
                      </div>
                      {question.explanation && (
                        <p className="mt-1 text-sm italic bg-muted p-2 rounded">
                          {question.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter className="flex gap-3 justify-center">
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
          <Button variant="outline" onClick={() => navigate('/leaderboard')}>
            View Leaderboard
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="quiz-container">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium text-muted-foreground">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
          <div className="text-sm font-medium">
            Time: {formatTime(timeSpent)}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="text-xl mt-4">{currentQuestion.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {currentQuestion.options.map(option => (
            <div
              key={option.id}
              className={`answer-option ${selectedAnswers[currentQuestion.id] === option.id ? 'selected' : ''}`}
              onClick={() => handleSelectAnswer(currentQuestion.id, option.id)}
            >
              {option.text}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion.id] || isSubmitting}
        >
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            isSubmitting ? 'Submitting...' : 'Finish Quiz'
          ) : (
            <>Next <ChevronRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TakeQuiz;
