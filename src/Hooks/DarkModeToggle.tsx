import React, { useEffect } from 'react';
import { usePersistedState } from '../Hooks/usePersistedState';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = usePersistedState<boolean>('darkMode', false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
    >
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;
