
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import QuizCard from '@/components/QuizCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Medal } from 'lucide-react';
import { getCurrentUser, sampleQuizzes, sampleLeaderboard } from '@/utils/quizData';
import { User, Quiz, LeaderboardEntry } from '@/utils/types';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [myQuizzes, setMyQuizzes] = useState<Quiz[]>([]);
  const [myAttempts, setMyAttempts] = useState<LeaderboardEntry[]>([]);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // Check authentication
    const currentUser = getCurrentUser();
    if (!currentUser.isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You need to log in to access the dashboard.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    // Simulate API call to fetch user data
    setTimeout(() => {
      setUser(currentUser);
      
      // Get quizzes created by this user
      const userQuizzes = sampleQuizzes.filter(quiz => quiz.createdBy === currentUser.name);
      setMyQuizzes(userQuizzes);
      
      // Get quiz attempts by this user
      const userAttempts = sampleLeaderboard.filter(entry => entry.userId === currentUser.id);
      setMyAttempts(userAttempts);
      
      setIsLoading(false);
    }, 1000);
  }, [navigate, toast]);
  
  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
    navigate('/');
  };
  
  const handleQuizCreated = (newQuiz: Quiz) => {
    setMyQuizzes(prev => [newQuiz, ...prev]);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-pulse-light text-lg">Loading dashboard...</div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground mt-1">
              Manage your quizzes and check your progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-gradient-to-br from-quiz-primary/10 to-quiz-highlight/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">My Quizzes</CardTitle>
                <CardDescription>
                  Quizzes you've created
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {myQuizzes.length}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/create">
                  <Button variant="outline" className="w-full">Create New Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-quiz-primary/10 to-quiz-highlight/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Quiz Attempts</CardTitle>
                <CardDescription>
                  Quizzes you've taken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {myAttempts.length}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/quizzes">
                  <Button variant="outline" className="w-full">Explore Quizzes</Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card className="bg-gradient-to-br from-quiz-primary/10 to-quiz-highlight/10">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-1 text-xl">
                  <Medal size={16} className="text-yellow-500" />
                  <span>Success Rate</span>
                </CardTitle>
                <CardDescription>
                  Your quiz performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {myAttempts.length > 0 
                    ? Math.round(
                        (myAttempts.reduce((sum, attempt) => sum + attempt.score, 0) / 
                         myAttempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0)) * 100
                      ) + '%'
                    : 'N/A'}
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/leaderboard">
                  <Button variant="outline" className="w-full">View Leaderboard</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          
          <Tabs defaultValue="myQuizzes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="myQuizzes">My Quizzes</TabsTrigger>
              <TabsTrigger value="attempts">My Attempts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="myQuizzes">
              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Quizzes You've Created</h2>
                <Link to="/create">
                  <Button>Create New Quiz</Button>
                </Link>
              </div>
              
              {myQuizzes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myQuizzes.map(quiz => (
                    <QuizCard key={quiz.id} quiz={quiz} />
                  ))}
                </div>
              ) : (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="py-8">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">You haven't created any quizzes yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Create your first quiz to share knowledge and challenge others.
                      </p>
                      <Link to="/create">
                        <Button>Create Your First Quiz</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="attempts">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold">Your Quiz Attempts</h2>
              </div>
              
              {myAttempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted dark:bg-muted/20 text-left">
                        <th className="p-3 text-muted-foreground text-sm font-medium">Quiz</th>
                        <th className="p-3 text-muted-foreground text-sm font-medium text-right">Score</th>
                        <th className="p-3 text-muted-foreground text-sm font-medium text-right">Date</th>
                        <th className="p-3 text-muted-foreground text-sm font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myAttempts.map((attempt) => (
                        <tr key={attempt.id} className="border-b last:border-0 dark:border-gray-700">
                          <td className="p-3 font-medium">
                            {attempt.quizTitle}
                          </td>
                          <td className="p-3 text-right">
                            <span className="font-bold">{attempt.score}</span>
                            <span className="text-muted-foreground">/{attempt.totalQuestions}</span>
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({Math.round((attempt.score / attempt.totalQuestions) * 100)}%)
                            </span>
                          </td>
                          <td className="p-3 text-right text-sm text-muted-foreground">
                            {new Date(attempt.dateAttempted).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-right">
                            <Link to={`/quiz/${attempt.quizId}`}>
                              <Button variant="outline" size="sm">Take Again</Button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="py-8">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-2">You haven't taken any quizzes yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Challenge yourself by taking a quiz to test your knowledge.
                      </p>
                      <Link to="/quizzes">
                        <Button>Explore Quizzes</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
