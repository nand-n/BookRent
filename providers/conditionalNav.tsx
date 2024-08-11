'use client';
import { usePathname } from 'next/navigation';
import Nav from '@/components/navBar';
import {
  //  useSetTheme,
  useTheme,
} from '@/store/uistate/theme/themeState';
import { useEffect } from 'react';

/**
 * ConditionalNav component that conditionally renders the Nav component
 * based on the current pathname.
 *
 * @param children The child components to be rendered
 * @returns The Nav component with children inside, or just the children if the pathname is excluded
 */
const ConditionalNav: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const theme = useTheme();
  // const setTheme = useSetTheme();
  const pathname = usePathname();
  useEffect(() => {
    try {
      const localTheme = localStorage.getItem('theme');
      if (localTheme) {
        document.documentElement.setAttribute('data-mode', localTheme);
        document.documentElement.className = localTheme;
      }
    } catch (err) {
      // console.log('error loading the color theme');
    }
  }, [theme]);
  const excludeNavPaths = [
    '/authentication/login',
    '/authentication/signup',
    '/not-found',
  ];

  return (
    <>{excludeNavPaths.includes(pathname) ? children : <Nav>{children}</Nav>}</>
  );
};

export default ConditionalNav;
