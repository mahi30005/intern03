
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CreateQuiz from '@/components/CreateQuiz';
import { getCurrentUser } from '@/utils/quizData';
import { User, Quiz } from '@/utils/types';

const CreatePage = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const navigate = useNavigate();
  
  // Check if user is authenticated
  if (!user?.isAuthenticated) {
    navigate('/auth');
    return null;
  }
  
  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
    navigate('/');
  };
  
  const handleQuizCreated = (quiz: Quiz) => {
    console.log('Quiz created:', quiz);
    // In a real app, this would save the quiz to a database
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold">Create a New Quiz</h1>
              <p className="text-muted-foreground mt-1">
                Design your own interactive quiz to share with others
              </p>
            </div>
            
            <CreateQuiz 
              onQuizCreated={handleQuizCreated}
              userId={user.id}
              userName={user.name}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatePage;
