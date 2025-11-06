import React, { createContext, useState, useContext, useEffect, FC, useCallback } from 'react';
import type { Theme } from '../types';

interface IThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('app-theme') as Theme) || 'aura';
  });

  useEffect(() => {
    const body = document.body;
    body.classList.remove('theme-aura', 'theme-midnight', 'theme-crimson');
    body.classList.add(`theme-${theme}`);
    localStorage.setItem('app-theme', theme);
  }, [theme]);
  
  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
