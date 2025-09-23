import type { User } from "firebase/auth";
import React from "react";

export type AuthContextValue = {
    currentUser: User | null;          // expose the Firebase user directly
    userLoggedIn: boolean;
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
    loading: boolean;
  };
  
export const AuthContext = React.createContext<AuthContextValue>({
    currentUser: null,
    userLoggedIn: false,
    setCurrentUser: () => {},
    loading: true,
  });