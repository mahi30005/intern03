
import { Link } from 'react-router-dom';
import { Quiz } from '@/utils/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface QuizCardProps {
  quiz: Quiz;
  className?: string;
}

const QuizCard = ({ quiz, className = '' }: QuizCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <Link to={`/quiz/${quiz.id}`} className={`block transition-transform hover:scale-105 ${className}`}>
      <Card className="quiz-container h-full flex flex-col overflow-hidden">
        {quiz.imageUrl && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={quiz.imageUrl} 
              alt={quiz.title} 
              className="w-full h-full object-cover transition-transform hover:scale-110 duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-4 w-full">
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </div>
              </div>
            </div>
          </div>
        )}
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold line-clamp-2">{quiz.title}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Created on {formatDate(quiz.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-2">
            {quiz.description}
          </p>
          <div className="mt-2">
            <Badge variant="outline" className="mr-1 mb-1 bg-quiz-light dark:bg-quiz-dark">
              {quiz.category}
            </Badge>
            {quiz.questions.length > 0 && (
              <Badge variant="outline" className="mr-1 mb-1">
                {quiz.questions.length} {quiz.questions.length === 1 ? 'question' : 'questions'}
              </Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-2 border-t flex justify-between items-center">
          <div className="flex items-center text-sm text-muted-foreground">
            <span>By {quiz.createdBy}</span>
          </div>
          <Badge className="bg-quiz-primary hover:bg-quiz-secondary">Take Quiz</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default QuizCard;
