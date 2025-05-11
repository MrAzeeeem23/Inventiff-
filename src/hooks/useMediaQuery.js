import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Initial check for SSR
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      setMatches(media.matches);

      // Add listener to update state whenever the query result changes
      const listener = (e) => setMatches(e.matches);
      
      // Use modern event listener pattern
      media.addEventListener('change', listener);
      
      // Clean up the listener
      return () => media.removeEventListener('change', listener);
    }
    
    // Default to false when SSR
    return () => {};
  }, [query]);

  return matches;
}