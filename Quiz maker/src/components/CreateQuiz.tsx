
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, Save, X } from 'lucide-react';
import { Quiz, QuizQuestion } from '@/utils/types';

interface CreateQuizProps {
  onQuizCreated: (quiz: Quiz) => void;
  userId: string;
  userName: string;
}

const CreateQuiz = ({ onQuizCreated, userId, userName }: CreateQuizProps) => {
  const [quizData, setQuizData] = useState<Partial<Quiz>>({
    title: '',
    description: '',
    category: '',
    difficulty: 'medium',
    questions: [],
    tags: [],
  });
  
  const [currentTag, setCurrentTag] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState<Partial<QuizQuestion>>({
    question: '',
    options: [
      { id: `opt-${Date.now()}-1`, text: '', isCorrect: true },
      { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
      { id: `opt-${Date.now()}-3`, text: '', isCorrect: false },
      { id: `opt-${Date.now()}-4`, text: '', isCorrect: false },
    ],
    explanation: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleQuizDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuizData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleAddTag = () => {
    if (currentTag.trim() && !quizData.tags?.includes(currentTag.trim())) {
      setQuizData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setQuizData(prev => ({
      ...prev,
      tags: prev.tags?.filter(t => t !== tag) || []
    }));
  };
  
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({ ...prev, [name]: value }));
  };
  
  const handleOptionChange = (index: number, value: string) => {
    setCurrentQuestion(prev => {
      const newOptions = [...(prev.options || [])];
      if (newOptions[index]) {
        newOptions[index] = { ...newOptions[index], text: value };
      }
      return { ...prev, options: newOptions };
    });
  };
  
  const handleCorrectOptionChange = (index: number) => {
    setCurrentQuestion(prev => {
      const newOptions = (prev.options || []).map((option, i) => ({
        ...option,
        isCorrect: i === index
      }));
      return { ...prev, options: newOptions };
    });
  };
  
  const handleAddQuestion = () => {
    // Validate current question
    const newErrors: Record<string, string> = {};
    
    if (!currentQuestion.question?.trim()) {
      newErrors.question = 'Question text is required';
    }
    
    const emptyOptions = (currentQuestion.options || []).filter(opt => !opt.text.trim());
    if (emptyOptions.length > 0) {
      newErrors.options = 'All options must have text';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Add question to quiz
    const newQuestion: QuizQuestion = {
      id: `q-${Date.now()}`,
      question: currentQuestion.question || '',
      options: (currentQuestion.options || []).map(opt => ({
        id: opt.id,
        text: opt.text,
        isCorrect: opt.isCorrect
      })),
      explanation: currentQuestion.explanation,
    };
    
    setQuizData(prev => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion]
    }));
    
    // Reset current question form
    setCurrentQuestion({
      question: '',
      options: [
        { id: `opt-${Date.now()}-1`, text: '', isCorrect: true },
        { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-3`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-4`, text: '', isCorrect: false },
      ],
      explanation: '',
    });
    
    setErrors({});
    
    toast({
      title: "Question added!",
      description: "Your question has been added to the quiz.",
      duration: 3000,
    });
  };
  
  const handleRemoveQuestion = (index: number) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions?.filter((_, i) => i !== index) || []
    }));
    
    toast({
      title: "Question removed",
      description: "The question has been removed from the quiz.",
      duration: 3000,
    });
  };
  
  const handleCreateQuiz = () => {
    // Validate quiz data
    const newErrors: Record<string, string> = {};
    
    if (!quizData.title?.trim()) {
      newErrors.title = 'Quiz title is required';
    }
    
    if (!quizData.description?.trim()) {
      newErrors.description = 'Quiz description is required';
    }
    
    if (!quizData.category?.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (!quizData.questions?.length) {
      newErrors.questions = 'At least one question is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      window.scrollTo(0, 0);
      return;
    }
    
    setIsSubmitting(true);
    
    // Create quiz
    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      title: quizData.title || '',
      description: quizData.description || '',
      category: quizData.category || '',
      difficulty: quizData.difficulty as 'easy' | 'medium' | 'hard',
      createdBy: userName,
      createdAt: new Date().toISOString(),
      questions: quizData.questions || [],
      tags: quizData.tags || [],
      timeLimit: quizData.timeLimit,
      imageUrl: quizData.imageUrl,
    };
    
    // Simulate API call
    setTimeout(() => {
      onQuizCreated(newQuiz);
      setIsSubmitting(false);
      
      toast({
        title: "Quiz created!",
        description: "Your quiz has been created successfully.",
        duration: 5000,
      });
      
      navigate('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create a New Quiz</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Quiz Title</Label>
            <Input 
              id="title" 
              name="title" 
              value={quizData.title || ''} 
              onChange={handleQuizDataChange} 
              placeholder="Enter quiz title"
            />
            {errors.title && <p className="text-xs text-red-500">{errors.title}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={quizData.description || ''} 
              onChange={handleQuizDataChange} 
              placeholder="Describe what this quiz is about"
              rows={3}
            />
            {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input 
                id="category" 
                name="category" 
                value={quizData.category || ''} 
                onChange={handleQuizDataChange} 
                placeholder="e.g., Science, History, Entertainment"
              />
              {errors.category && <p className="text-xs text-red-500">{errors.category}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select 
                value={quizData.difficulty} 
                onValueChange={(value) => setQuizData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Cover Image URL (optional)</Label>
            <Input 
              id="imageUrl" 
              name="imageUrl" 
              value={quizData.imageUrl || ''} 
              onChange={handleQuizDataChange} 
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {quizData.tags?.map(tag => (
                <div key={tag} className="flex items-center bg-muted px-3 py-1 rounded-full text-sm">
                  {tag}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input 
                value={currentTag} 
                onChange={(e) => setCurrentTag(e.target.value)} 
                placeholder="Add a tag"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Questions Section */}
      <Card>
        <CardHeader>
          <CardTitle>Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Questions List */}
          {quizData.questions && quizData.questions.length > 0 ? (
            <div className="space-y-4 mb-6">
              <h3 className="font-medium">Quiz Questions ({quizData.questions.length})</h3>
              {quizData.questions.map((question, index) => (
                <div key={question.id} className="p-4 border rounded-md bg-muted/50">
                  <div className="flex justify-between items-start">
                    <div className="font-medium">Question {index + 1}</div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveQuestion(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-100 p-1 h-auto"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <p className="mt-1">{question.question}</p>
                  <div className="mt-2 space-y-1">
                    {question.options.map((option) => (
                      <div key={option.id} className={`text-sm ${option.isCorrect ? 'text-green-600 font-medium' : ''}`}>
                        {option.isCorrect && '✓ '}{option.text}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-6 border border-dashed rounded-md bg-muted/50">
              <p className="text-muted-foreground">No questions added yet. Add your first question below.</p>
            </div>
          )}
          
          {errors.questions && <p className="text-sm text-red-500">{errors.questions}</p>}
          
          {/* Add Question Form */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Add a New Question</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question Text</Label>
                <Textarea 
                  id="question" 
                  name="question" 
                  value={currentQuestion.question} 
                  onChange={handleQuestionChange} 
                  placeholder="Enter your question"
                  rows={2}
                />
                {errors.question && <p className="text-xs text-red-500">{errors.question}</p>}
              </div>
              
              <div className="space-y-3">
                <Label>Answer Options</Label>
                {currentQuestion.options?.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input 
                        value={option.text} 
                        onChange={(e) => handleOptionChange(index, e.target.value)} 
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        id={`correct-${index}`} 
                        name="correctOption" 
                        checked={option.isCorrect} 
                        onChange={() => handleCorrectOptionChange(index)} 
                        className="mr-2"
                      />
                      <Label htmlFor={`correct-${index}`} className="text-sm cursor-pointer">
                        Correct
                      </Label>
                    </div>
                  </div>
                ))}
                {errors.options && <p className="text-xs text-red-500">{errors.options}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="explanation">Explanation (Optional)</Label>
                <Textarea 
                  id="explanation" 
                  name="explanation" 
                  value={currentQuestion.explanation} 
                  onChange={handleQuestionChange} 
                  placeholder="Explain the correct answer (shown after quiz completion)"
                  rows={2}
                />
              </div>
              
              <Button 
                type="button" 
                onClick={handleAddQuestion}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => navigate('/dashboard')}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateQuiz} 
            disabled={isSubmitting || !quizData.questions?.length}
          >
            {isSubmitting ? 'Creating Quiz...' : (
              <>
                <Save className="mr-2 h-4 w-4" /> Create Quiz
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateQuiz;
