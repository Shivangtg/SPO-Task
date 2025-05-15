'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const userContext = createContext();


export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('User');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse stored insightData:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('User', JSON.stringify(user));
    }
  }, [user]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  return useContext(userContext);
}