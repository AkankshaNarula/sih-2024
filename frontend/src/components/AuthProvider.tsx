import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase/firebase'; // Adjust path as needed
import { onAuthStateChanged, User } from 'firebase/auth';

// Define the shape of the AuthContext value
interface AuthContextType {
  currentUser: User | null;
  userLoggedIn: boolean;  // Add userLoggedIn boolean
}

// Create the AuthContext with default value as undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook for consuming the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Provider component to manage authentication state
export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Subscribe to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading when the user state is set
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  const value = {
    currentUser,
    userLoggedIn: !!currentUser, // Boolean value indicating whether the user is logged in
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Render children only when loading is complete */}
    </AuthContext.Provider>
  );
}




