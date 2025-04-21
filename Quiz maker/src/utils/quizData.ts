
import { Quiz, QuizAttempt, LeaderboardEntry } from './types';

export const sampleQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'General Knowledge Quiz',
    description: 'Test your knowledge across a variety of topics.',
    createdBy: 'admin',
    createdAt: '2025-04-01T12:00:00Z',
    category: 'Miscellaneous',
    difficulty: 'medium',
    tags: ['general', 'knowledge', 'trivia'],
    imageUrl: 'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=2000&auto=format&fit=crop',
    questions: [
      {
        id: '1-1',
        question: 'What is the capital of France?',
        options: [
          { id: '1-1-1', text: 'London', isCorrect: false },
          { id: '1-1-2', text: 'Berlin', isCorrect: false },
          { id: '1-1-3', text: 'Paris', isCorrect: true },
          { id: '1-1-4', text: 'Madrid', isCorrect: false },
        ],
        explanation: 'Paris is the capital and most populous city of France.',
      },
      {
        id: '1-2',
        question: 'Which planet is known as the Red Planet?',
        options: [
          { id: '1-2-1', text: 'Venus', isCorrect: false },
          { id: '1-2-2', text: 'Mars', isCorrect: true },
          { id: '1-2-3', text: 'Jupiter', isCorrect: false },
          { id: '1-2-4', text: 'Saturn', isCorrect: false },
        ],
        explanation: 'Mars is called the Red Planet because it appears reddish in color due to iron oxide (rust) on its surface.',
      },
      {
        id: '1-3',
        question: 'What is the largest ocean on Earth?',
        options: [
          { id: '1-3-1', text: 'Atlantic Ocean', isCorrect: false },
          { id: '1-3-2', text: 'Indian Ocean', isCorrect: false },
          { id: '1-3-3', text: 'Arctic Ocean', isCorrect: false },
          { id: '1-3-4', text: 'Pacific Ocean', isCorrect: true },
        ],
        explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering more than 30% of the Earth\'s surface.',
      },
    ],
  },
  {
    id: '2',
    title: 'Science Quiz',
    description: 'Challenge yourself with these science questions!',
    createdBy: 'admin',
    createdAt: '2025-04-10T14:30:00Z',
    category: 'Science',
    difficulty: 'hard',
    tags: ['science', 'biology', 'physics', 'chemistry'],
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2000&auto=format&fit=crop',
    questions: [
      {
        id: '2-1',
        question: 'What is the chemical symbol for gold?',
        options: [
          { id: '2-1-1', text: 'Go', isCorrect: false },
          { id: '2-1-2', text: 'Au', isCorrect: true },
          { id: '2-1-3', text: 'Ag', isCorrect: false },
          { id: '2-1-4', text: 'Gd', isCorrect: false },
        ],
        explanation: 'The chemical symbol Au comes from the Latin word for gold, "aurum".',
      },
      {
        id: '2-2',
        question: 'Which of the following is NOT a state of matter?',
        options: [
          { id: '2-2-1', text: 'Solid', isCorrect: false },
          { id: '2-2-2', text: 'Liquid', isCorrect: false },
          { id: '2-2-3', text: 'Gas', isCorrect: false },
          { id: '2-2-4', text: 'Mineral', isCorrect: true },
        ],
        explanation: 'The four common states of matter are solid, liquid, gas, and plasma. Mineral is a type of solid, not a state of matter.',
      },
    ],
  },
  {
    id: '3',
    title: 'Movie Trivia',
    description: 'How well do you know your films?',
    createdBy: 'filmBuff22',
    createdAt: '2025-03-25T09:15:00Z',
    category: 'Entertainment',
    difficulty: 'easy',
    tags: ['movies', 'cinema', 'trivia', 'entertainment'],
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2000&auto=format&fit=crop',
    questions: [
      {
        id: '3-1',
        question: 'Which film won the Oscar for Best Picture in 2020?',
        options: [
          { id: '3-1-1', text: '1917', isCorrect: false },
          { id: '3-1-2', text: 'Joker', isCorrect: false },
          { id: '3-1-3', text: 'Parasite', isCorrect: true },
          { id: '3-1-4', text: 'Once Upon a Time in Hollywood', isCorrect: false },
        ],
        explanation: 'Parasite, directed by Bong Joon-ho, was the first non-English language film to win Best Picture.',
      },
      {
        id: '3-2',
        question: 'Who played Tony Stark/Iron Man in the Marvel Cinematic Universe?',
        options: [
          { id: '3-2-1', text: 'Chris Evans', isCorrect: false },
          { id: '3-2-2', text: 'Robert Downey Jr.', isCorrect: true },
          { id: '3-2-3', text: 'Chris Hemsworth', isCorrect: false },
          { id: '3-2-4', text: 'Mark Ruffalo', isCorrect: false },
        ],
        explanation: 'Robert Downey Jr. played the role of Tony Stark/Iron Man from 2008 to 2019.',
      },
    ],
  },
];

export const sampleLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    userId: 'user1',
    userName: 'QuizMaster',
    quizId: '1',
    quizTitle: 'General Knowledge Quiz',
    score: 3,
    totalQuestions: 3,
    dateAttempted: '2025-04-15T10:30:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'BrainiacAlex',
    quizId: '1',
    quizTitle: 'General Knowledge Quiz',
    score: 2,
    totalQuestions: 3,
    dateAttempted: '2025-04-14T14:22:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'QuizWizard',
    quizId: '2',
    quizTitle: 'Science Quiz',
    score: 2,
    totalQuestions: 2,
    dateAttempted: '2025-04-16T09:45:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'TriviaKing',
    quizId: '3',
    quizTitle: 'Movie Trivia',
    score: 2,
    totalQuestions: 2,
    dateAttempted: '2025-04-13T16:10:00Z',
  },
  {
    id: '5',
    userId: 'user5',
    userName: 'KnowledgeNinja',
    quizId: '2',
    quizTitle: 'Science Quiz',
    score: 1,
    totalQuestions: 2,
    dateAttempted: '2025-04-15T11:05:00Z',
  },
];

export const getCurrentUser = () => {
  // In a real app, this would check local storage or a session
  return {
    id: 'guest',
    name: 'Guest User',
    email: '',
    isAuthenticated: false,
  };
};

export const login = (email: string, password: string) => {
  // Mock login - in a real app, this would call an API
  if (email && password) {
    return {
      id: 'user1',
      name: 'QuizMaster',
      email: email,
      isAuthenticated: true,
    };
  }
  return null;
};

export const register = (name: string, email: string, password: string) => {
  // Mock registration - in a real app, this would call an API
  if (name && email && password) {
    return {
      id: 'new-user',
      name: name,
      email: email,
      isAuthenticated: true,
    };
  }
  return null;
};

export const getQuizById = (id: string) => {
  return sampleQuizzes.find(quiz => quiz.id === id);
};

export const getLeaderboardForQuiz = (quizId: string) => {
  return sampleLeaderboard.filter(entry => entry.quizId === quizId);
};

export const getAllLeaderboard = () => {
  return sampleLeaderboard;
};
