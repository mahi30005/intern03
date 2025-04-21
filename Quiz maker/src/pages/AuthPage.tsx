
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AuthForm from '@/components/AuthForm';
import { User } from '@/utils/types';
import { getCurrentUser } from '@/utils/quizData';

const AuthPage = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());

  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
  };

  const handleAuthSuccess = (userData: User) => {
    setUser(userData);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-full md:w-1/2 md:order-2">
                <div className="p-8 bg-gradient-to-br from-quiz-primary/10 to-quiz-highlight/10 rounded-xl">
                  <h2 className="text-2xl font-bold mb-6">
                    Join the QuizMaster Community
                  </h2>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 bg-quiz-primary text-white rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Create your own custom quizzes</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 bg-quiz-primary text-white rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Track your quiz scores and progress</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 bg-quiz-primary text-white rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Challenge friends and compare scores</span>
                    </li>
                    <li className="flex gap-3">
                      <div className="flex-shrink-0 h-6 w-6 bg-quiz-primary text-white rounded-full flex items-center justify-center">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span>Join leaderboards and show off your knowledge</span>
                    </li>
                  </ul>
                  <div className="mt-8 p-4 bg-white dark:bg-quiz-dark/50 rounded-lg border border-muted">
                    <p className="text-sm text-muted-foreground">
                      "QuizMaster has become my go-to platform for creating engaging quizzes for my classroom. My students love it!"
                    </p>
                    <div className="mt-3 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-quiz-secondary flex items-center justify-center text-white">
                        T
                      </div>
                      <div className="ml-2">
                        <p className="text-sm font-medium">Teacher123</p>
                        <p className="text-xs text-muted-foreground">Science Teacher</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full md:w-1/2 md:order-1">
                <AuthForm onAuthSuccess={handleAuthSuccess} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
