
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { mockUsers, mockApplications, getJobById } from '../data/mockData';
import { Job } from '../types';

const Profile = () => {
  // Mock user data (in a real app, this would come from an auth context)
  const user = mockUsers.find(u => u.id === '1');
  
  const [name, setName] = useState(user?.name || '');
  const [title, setTitle] = useState(user?.title || '');
  const [email, setEmail] = useState(user?.email || '');
  const [location, setLocation] = useState(user?.location || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [saving, setSaving] = useState(false);
  
  // Get job applications
  const userApplications = mockApplications.filter(app => app.userId === '1');
  const applicationJobs: (Job | undefined)[] = userApplications.map(app => 
    getJobById(app.jobId)
  ).filter(Boolean);
  
  // Save profile
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      setSaving(false);
    }, 1000);
  };
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Please Log In</h2>
            <p className="text-muted-foreground">You need to be logged in to view your profile.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-brand-700 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-xl mt-1 opacity-90">{user.title}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="profile" className="max-w-4xl mx-auto">
            <TabsList className="mb-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="applications">Job Applications</TabsTrigger>
              <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <div className="bg-white rounded-lg shadow border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
                
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-sm font-medium">
                        Full Name
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="block text-sm font-medium">
                        Professional Title
                      </label>
                      <Input
                        id="title"
                        placeholder="e.g. Senior Software Engineer"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="location" className="block text-sm font-medium">
                        Location
                      </label>
                      <Input
                        id="location"
                        placeholder="e.g. San Francisco, CA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="bio" className="block text-sm font-medium">
                      Bio
                    </label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself and your professional experience"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="resume" className="block text-sm font-medium">
                      Resume
                    </label>
                    <div className="flex items-center space-x-4">
                      <Button type="button" variant="outline">
                        Upload Resume
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        No file selected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      PDF or Word documents only (max 5MB)
                    </p>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button
                      type="submit"
                      className="bg-brand-600 hover:bg-brand-700"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="mr-2">Saving...</span>
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        </>
                      ) : (
                        'Save Profile'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            <TabsContent value="applications">
              <div className="bg-white rounded-lg shadow border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Your Job Applications</h2>
                
                {applicationJobs.length > 0 ? (
                  <div className="space-y-6">
                    {applicationJobs.map((job, index) => job && (
                      <div key={index} className="border border-border rounded-lg p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">{job.title}</h3>
                            <p className="text-muted-foreground">{job.company}</p>
                            <div className="text-sm mt-2">
                              <span className="bg-brand-100 text-brand-800 px-2 py-1 rounded">
                                {userApplications.find(app => app.jobId === job.id)?.status.replace(/^\w/, c => c.toUpperCase())}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              View Application
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                    <p className="text-muted-foreground mb-6">
                      You haven't applied to any jobs yet. Start searching and applying!
                    </p>
                    <Button className="bg-brand-600 hover:bg-brand-700">
                      Browse Jobs
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="saved">
              <div className="bg-white rounded-lg shadow border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Saved Jobs</h2>
                
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold mb-2">No saved jobs</h3>
                  <p className="text-muted-foreground mb-6">
                    You haven't saved any jobs yet. Save jobs to apply later!
                  </p>
                  <Button className="bg-brand-600 hover:bg-brand-700">
                    Browse Jobs
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white rounded-lg shadow border border-border p-8">
                <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="current-password" className="block text-sm font-medium">
                          Current Password
                        </label>
                        <Input
                          id="current-password"
                          type="password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="new-password" className="block text-sm font-medium">
                          New Password
                        </label>
                        <Input
                          id="new-password"
                          type="password"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="confirm-password" className="block text-sm font-medium">
                          Confirm New Password
                        </label>
                        <Input
                          id="confirm-password"
                          type="password"
                        />
                      </div>
                      
                      <Button>
                        Update Password
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about new jobs matching your profile
                          </p>
                        </div>
                        <div className="flex items-center h-6 mt-2">
                          <input
                            id="email-notifications"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Application Updates</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about your job applications
                          </p>
                        </div>
                        <div className="flex items-center h-6 mt-2">
                          <input
                            id="application-updates"
                            type="checkbox"
                            defaultChecked
                            className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-600"
                          />
                        </div>
                      </div>
                      
                      <Button>
                        Save Preferences
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-lg font-medium mb-4 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
