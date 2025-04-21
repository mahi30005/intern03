
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'register';
  onSuccess: (role: 'job_seeker' | 'employer') => void;
}

const AuthModal = ({ isOpen, onClose, type, onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<string>(type);
  const [userRole, setUserRole] = useState<'job_seeker' | 'employer'>('job_seeker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to authenticate
    console.log('Logging in with:', { email, password });
    onSuccess(userRole);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to register
    console.log('Registering with:', { name, email, password, userRole });
    onSuccess(userRole);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to JobMatch</DialogTitle>
          <DialogDescription>
            Find your dream job or the perfect candidate.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue={type} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input 
                  id="login-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input 
                  id="login-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup 
                  defaultValue={userRole} 
                  value={userRole}
                  onValueChange={(value) => setUserRole(value as 'job_seeker' | 'employer')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="job_seeker" id="login-job-seeker" />
                    <Label htmlFor="login-job-seeker">Job Seeker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="login-employer" />
                    <Label htmlFor="login-employer">Employer</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                Login
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Don't have an account? </span>
                <button 
                  type="button" 
                  className="text-brand-600 hover:underline" 
                  onClick={() => setActiveTab('register')}
                >
                  Register
                </button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input 
                  id="register-name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input 
                  id="register-email" 
                  type="email" 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input 
                  id="register-password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am a</Label>
                <RadioGroup 
                  defaultValue={userRole} 
                  value={userRole}
                  onValueChange={(value) => setUserRole(value as 'job_seeker' | 'employer')}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="job_seeker" id="register-job-seeker" />
                    <Label htmlFor="register-job-seeker">Job Seeker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="register-employer" />
                    <Label htmlFor="register-employer">Employer</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button type="submit" className="w-full bg-brand-600 hover:bg-brand-700">
                Register
              </Button>
              
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Already have an account? </span>
                <button 
                  type="button" 
                  className="text-brand-600 hover:underline" 
                  onClick={() => setActiveTab('login')}
                >
                  Login
                </button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
