import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';

/**
 * Komponen yang memastikan halaman selalu scroll ke posisi paling atas (0, 0)
 * setiap kali terjadi perubahan route (URL).
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll ke posisi (0, 0) setiap kali 'pathname' berubah
    window.scrollTo(0, 0); 
  }, [pathname]);

  // Merender children/nested routes melalui Outlet
  return <Outlet />;
};

export default ScrollToTop;