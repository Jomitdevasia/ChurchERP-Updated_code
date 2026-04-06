import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

// Default theme (match your :root)
const defaultTheme = {
  '--primary-gold': '#D4AF37',
  '--primary-gold-dark': '#B8860B',
  '--secondary-crimson': '#027313',
  '--secondary-crimson-dark': '#660000',
  '--white-pure': '#e0f0d7',
  '--gray-light': '#F5F5F5',
  '--gray-medium': '#D3D3D3',
  '--gray-dark': '#808080',
  '--black-soft': '#2C2C2C',
  '--font-heading': "'Playfair Display', serif",
  '--font-body': "'Inter', sans-serif",
  '--radius-sm': '0.25rem',
  '--radius-md': '0.5rem',
  '--radius-lg': '0.75rem',
  '--radius-xl': '1rem',
  '--shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '--shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  '--shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  '--spacing-xs': '0.25rem',
  '--spacing-sm': '0.5rem',
  '--spacing-md': '1rem',
  '--spacing-lg': '1.5rem',
  '--spacing-xl': '2rem',
  '--spacing-2xl': '3rem',
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;
    Object.entries(newTheme).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, []);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem('parish_theme');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTheme(parsed);
        applyTheme(parsed);
      } catch (e) {
        console.error('Failed to load saved theme', e);
        applyTheme(defaultTheme);
      }
    } else {
      applyTheme(defaultTheme);
    }
  }, [applyTheme]);

  const updateTheme = useCallback((newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('parish_theme', JSON.stringify(newTheme));
  }, [applyTheme]);

  const updateVariable = useCallback((variable, value) => {
    const newTheme = { ...theme, [variable]: value };
    updateTheme(newTheme);
  }, [theme, updateTheme]);

  const resetTheme = useCallback(() => {
    updateTheme(defaultTheme);
  }, [updateTheme]);

  return (
    <ThemeContext.Provider value={{ theme, updateVariable, resetTheme, defaultTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
