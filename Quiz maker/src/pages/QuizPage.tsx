
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import TakeQuiz from '@/components/TakeQuiz';
import Leaderboard from '@/components/Leaderboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getQuizById, getLeaderboardForQuiz, getCurrentUser } from '@/utils/quizData';
import { Quiz, User, QuizAttempt } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

const QuizPage = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [leaderboard, setLeaderboard] = useState([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    if (id) {
      // Simulate API call
      setTimeout(() => {
        const fetchedQuiz = getQuizById(id);
        if (fetchedQuiz) {
          setQuiz(fetchedQuiz);
          const quizLeaderboard = getLeaderboardForQuiz(id);
          setLeaderboard(quizLeaderboard);
        } else {
          toast({
            title: "Quiz not found",
            description: "The requested quiz could not be found.",
            variant: "destructive",
          });
          navigate('/quizzes');
        }
        setIsLoading(false);
      }, 1000);
    }
  }, [id, navigate, toast]);
  
  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
  };
  
  const handleCompleteQuiz = (attempt: QuizAttempt) => {
    console.log('Quiz completed:', attempt);
    // In a real app, you would save the attempt to the backend
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-light text-lg">Loading quiz...</div>
        </div>
      </div>
    );
  }
  
  if (!quiz) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Quiz Not Found</h2>
            <p className="mb-6 text-muted-foreground">The quiz you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate('/quizzes')}>Browse Quizzes</Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {activeTab !== 'take' && (
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold">{quiz.title}</h1>
                  <p className="text-muted-foreground mt-1">
                    Created by {quiz.createdBy}
                  </p>
                </div>
                <Button 
                  size="lg" 
                  className="bg-quiz-primary hover:bg-quiz-secondary sm:self-start"
                  onClick={() => setActiveTab('take')}
                >
                  Start Quiz
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-quiz-light text-quiz-secondary dark:bg-quiz-dark">
                  {quiz.category}
                </Badge>
                <Badge variant="outline">
                  {quiz.questions.length} {quiz.questions.length === 1 ? 'Question' : 'Questions'}
                </Badge>
                <Badge variant="outline" className={
                  quiz.difficulty === 'easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' :
                  quiz.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100'
                }>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                </Badge>
                {quiz.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              {quiz.imageUrl && (
                <div className="mb-6 rounded-lg overflow-hidden">
                  <img 
                    src={quiz.imageUrl} 
                    alt={quiz.title} 
                    className="w-full h-auto max-h-80 object-cover"
                  />
                </div>
              )}
            </div>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {activeTab !== 'take' && (
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              </TabsList>
            )}
            
            <TabsContent value="overview">
              <Card>
                <CardHeader>
                  <CardTitle>About this Quiz</CardTitle>
                  <CardDescription>
                    Learn more about what to expect in this quiz.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground">{quiz.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Details</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>
                        <span className="font-medium text-foreground">Number of questions:</span>{' '}
                        {quiz.questions.length}
                      </li>
                      <li>
                        <span className="font-medium text-foreground">Difficulty level:</span>{' '}
                        {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
                      </li>
                      {quiz.timeLimit && (
                        <li>
                          <span className="font-medium text-foreground">Time limit:</span>{' '}
                          {quiz.timeLimit} minutes
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button
                      size="lg"
                      className="w-full md:w-auto bg-quiz-primary hover:bg-quiz-secondary"
                      onClick={() => setActiveTab('take')}
                    >
                      Start the Quiz
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="leaderboard">
              <Leaderboard 
                entries={leaderboard} 
                title={`${quiz.title} - Leaderboard`}
              />
            </TabsContent>
            
            <TabsContent value="take">
              <TakeQuiz quiz={quiz} onCompleteQuiz={handleCompleteQuiz} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
