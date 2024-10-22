import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Theme } from '../interfaces';

export const ThemeContext = createContext<Theme>({
  theme: 'dark',
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const onThemeChange = useCallback((value: 'light' | 'dark') => {
    setTheme(value);
    localStorage.setItem('theme', value);
  }, []);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    switch (theme) {
      case 'light':
        setTheme('light');
        break;
      case 'dark':
        setTheme('dark');
        break;
      default:
        setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
