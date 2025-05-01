import { useEffect, useState } from 'react';

export default function useDarkMode() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const userTheme = localStorage.getItem('theme');
            const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

            if (userTheme === 'dark' || (!userTheme && systemPrefersDark)) {
                setIsDarkMode(true);
                document.documentElement.classList.add('dark');
            } else {
                setIsDarkMode(false);
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (isDarkMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(prev => !prev);

    return [isDarkMode, toggleDarkMode];
}
