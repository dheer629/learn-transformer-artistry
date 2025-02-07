
import { useMemo } from 'react';

export const useVisualPlaygroundAnimations = () => {
  const containerAnimation = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  }), []);

  const tabContentAnimation = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  }), []);

  return {
    containerAnimation,
    tabContentAnimation
  };
};

