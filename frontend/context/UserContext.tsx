"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getCurrentUser, User } from "@/lib/api"; // <-- your helper function

interface UserContextType {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user on mount
  useEffect(() => {
    refreshUser();
  }, []);

const refreshUser = async () => {
  setLoading(true);
  const result = await getCurrentUser(); // no userId needed
  if (result.success && result.data) {
    setUser(result.data);
  } else {
    setUser(null);
  }
  setLoading(false);
};


  const logout = () => {
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook for easy access
export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
}
