'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const InsightContext = createContext();


export function InsightProvider({ children }) {
  const [insightData, setInsightData] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('insightData');
    if (stored) {
      try {
        setInsightData(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse stored insightData:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (insightData) {
      sessionStorage.setItem('insightData', JSON.stringify(insightData));
    }
  }, [insightData]);

  return (
    <InsightContext.Provider value={{ insightData, setInsightData }}>
      {children}
    </InsightContext.Provider>
  );
}

export function useInsight() {
  return useContext(InsightContext);
}