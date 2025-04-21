
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Leaderboard from '@/components/Leaderboard';
import { getAllLeaderboard, getCurrentUser } from '@/utils/quizData';
import { User } from '@/utils/types';

const LeaderboardPage = () => {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const leaderboardEntries = getAllLeaderboard();

  const handleLogout = () => {
    setUser({
      id: 'guest',
      name: 'Guest User',
      email: '',
      isAuthenticated: false,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2">Global Leaderboard</h1>
              <p className="text-muted-foreground">
                See where you stand among the QuizMaster community
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-quiz-primary/10 to-quiz-highlight/10 p-8 rounded-xl mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-quiz-primary mb-1">
                    {leaderboardEntries.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quiz Attempts
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-quiz-primary mb-1">
                    {new Set(leaderboardEntries.map(entry => entry.userId)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Players
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-quiz-primary mb-1">
                    {new Set(leaderboardEntries.map(entry => entry.quizId)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Quizzes Completed
                  </div>
                </div>
              </div>
            </div>
            
            <Leaderboard 
              entries={leaderboardEntries} 
              title="Top Performers Overall"
              filterByQuiz={true}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LeaderboardPage;
