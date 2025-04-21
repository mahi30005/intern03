
import { useState } from 'react';
import { LeaderboardEntry } from '@/utils/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Award, Medal, Trophy } from 'lucide-react';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  title?: string;
  filterByQuiz?: boolean;
}

const Leaderboard = ({ entries, title = "Top Scores", filterByQuiz = false }: LeaderboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quizFilter, setQuizFilter] = useState<string>('all');

  const getUniqueQuizzes = () => {
    const quizzes = entries.map(entry => ({
      id: entry.quizId,
      title: entry.quizTitle
    }));
    
    // Remove duplicates
    return Array.from(new Map(quizzes.map(quiz => [quiz.id, quiz])).values());
  };

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.userName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesQuiz = quizFilter === 'all' || entry.quizId === quizFilter;
    return matchesSearch && matchesQuiz;
  });

  // Sort by score and date
  const sortedEntries = [...filteredEntries].sort((a, b) => {
    // Sort by percentage score (descending)
    const scoreA = (a.score / a.totalQuestions) * 100;
    const scoreB = (b.score / b.totalQuestions) * 100;
    
    if (scoreB !== scoreA) {
      return scoreB - scoreA;
    }
    
    // If scores are equal, sort by date (most recent first)
    return new Date(b.dateAttempted).getTime() - new Date(a.dateAttempted).getTime();
  });

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="text-yellow-500" size={18} />;
      case 1:
        return <Medal className="text-slate-400" size={18} />;
      case 2:
        return <Medal className="text-amber-600" size={18} />;
      default:
        return <span className="text-sm font-medium">{index + 1}</span>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Award className="text-quiz-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          {filterByQuiz && (
            <div>
              <Select value={quizFilter} onValueChange={setQuizFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by quiz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Quizzes</SelectItem>
                  {getUniqueQuizzes().map(quiz => (
                    <SelectItem key={quiz.id} value={quiz.id}>
                      {quiz.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <Input
            placeholder="Search by player name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {sortedEntries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted dark:bg-muted/20 text-left">
                  <th className="p-3 text-muted-foreground text-sm font-medium">Rank</th>
                  <th className="p-3 text-muted-foreground text-sm font-medium">Player</th>
                  <th className="p-3 text-muted-foreground text-sm font-medium">Quiz</th>
                  <th className="p-3 text-muted-foreground text-sm font-medium text-right">Score</th>
                  <th className="p-3 text-muted-foreground text-sm font-medium text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                {sortedEntries.map((entry, index) => (
                  <tr 
                    key={entry.id} 
                    className={`border-b last:border-0 dark:border-gray-700 ${index < 3 ? 'bg-muted/50 dark:bg-muted/10' : ''}`}
                  >
                    <td className="p-3">
                      <div className="flex justify-center items-center w-8 h-8 bg-muted dark:bg-muted/20 rounded-full">
                        {getRankIcon(index)}
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      {entry.userName}
                    </td>
                    <td className="p-3">
                      {entry.quizTitle}
                    </td>
                    <td className="p-3 text-right">
                      <span className="font-bold">{entry.score}</span>
                      <span className="text-muted-foreground">/{entry.totalQuestions}</span>
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({Math.round((entry.score / entry.totalQuestions) * 100)}%)
                      </span>
                    </td>
                    <td className="p-3 text-right text-sm text-muted-foreground">
                      {formatDate(entry.dateAttempted)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center p-6 text-muted-foreground">
            {searchTerm || quizFilter !== 'all' 
              ? "No results match your search criteria." 
              : "No scores recorded yet. Be the first to take a quiz!"}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
