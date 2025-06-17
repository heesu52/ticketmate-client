import { useEffect, useState } from 'react';

interface UseScrollProps {
  threshold?: number;
}

export const useScroll = ({ threshold = 0 }: UseScrollProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > threshold);
    };

    // 초기 스크롤 위치 체크
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isScrolled;
};
