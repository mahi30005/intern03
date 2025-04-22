
// This is a simulated auth service that would be replaced with a real backend connection
// In a production app, you would use Firebase, Auth0, or a custom backend

interface User {
  id: string;
  email: string;
  name: string;
}

interface Credentials {
  email: string;
  password: string;
}

const STORAGE_KEY = 'bingeByte_auth_user';

// Simulated users database
const mockUsers = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Demo User',
    password: 'password123'
  }
];

// Check if user is logged in
export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem(STORAGE_KEY);
  if (!userJson) return null;
  
  try {
    const user = JSON.parse(userJson);
    return {
      id: user.id,
      email: user.email,
      name: user.name
    };
  } catch (error) {
    console.error('Error parsing user from storage:', error);
    return null;
  }
};

// Login user
export const loginUser = async ({ email, password }: Credentials): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Find user with matching credentials
  const user = mockUsers.find(u => u.email === email && u.password === password);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Store user in localStorage (simulating a session)
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  return userData;
};

// Register user
export const registerUser = async ({ email, password }: Credentials, name: string): Promise<User> => {
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Check if user already exists
  if (mockUsers.some(u => u.email === email)) {
    throw new Error('User with this email already exists');
  }
  
  // Create new user
  const newUser = {
    id: String(mockUsers.length + 1),
    email,
    name,
    password
  };
  
  // Add to mock database
  mockUsers.push(newUser);
  
  // Return user data without password
  const userData = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  return userData;
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
