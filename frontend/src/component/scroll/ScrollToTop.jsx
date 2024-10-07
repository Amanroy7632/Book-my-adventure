import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    }); // Scroll to the top-left corner
  }, [pathname]);

  return null;
};

export default ScrollToTop;
