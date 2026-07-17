import React, { useEffect, useState } from 'react';
import R from 'ramda';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Button from 'react-bulma-companion/lib/Button';
import Container from 'react-bulma-companion/lib/Container';
import Navbar from 'react-bulma-companion/lib/Navbar';
import Title from 'react-bulma-companion/lib/Title';

import UserDropdown from './UserDropdown';

export default function Navigation() {
  const { pathname } = useLocation();
  const user = useSelector(state => state.user);

  const [auth, setAuth] = useState(!R.isEmpty(user));
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('ns-theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    setAuth(!R.isEmpty(user));
  }, [user]);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
      localStorage.setItem('ns-theme', 'dark');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
      localStorage.setItem('ns-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const isHome = pathname.length === 5 ? pathname === '/home' : R.slice(0, 6, pathname) === '/home/';
  const isTodo = pathname.length === 5 ? pathname === '/todo' : R.slice(0, 6, pathname) === '/todo/';
  const isSettings = pathname.length === 9 ? pathname === '/settings' : R.slice(0, 10, pathname) === '/settings/';

  const ThemeToggleButton = () => (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
      {isDarkMode ? (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 14.05a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm-.707-8.485a1 1 0 011.414 0l.707.707a1 1 0 11-1.414 1.414l-.707-.707a1 1 0 010-1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" clipRule="evenodd"/></svg>
      ) : (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
      )}
    </button>
  );

  return (
    <Navbar fixed="top" className="novasphere-nav">
      <style>
        {`
          .novasphere-nav {
            background-color: #000000 !important;
            border-bottom: 1px solid #e2e8f0;
            transition: background-color 0.4s ease, border-color 0.4s ease;
            padding: 2px 0;
          }

          /* New Logo Wrapping Container */
          .nav-logo {
            display: flex;
            align-items: baseline;
            margin: 0 !important;
          }

          /* Premium Highly Stylized First Letter 'N' */
          .logo-first-letter {
            font-size: 2.15rem;
            font-weight: 900 !important;
            background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-right: 1px;
            letter-spacing: -2px;
            font-family: 'Inter', sans-serif;
            text-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          }

          /* Sleek, Smaller Following Typography */
          .logo-rest-letters {
            color: aliceBlue !important;
            font-size: 1.25rem;
            font-weight: 700 !important;
            letter-spacing: -0.5px;
            opacity: 0.95;
          }

          .theme-toggle-btn {
            background: transparent !important;
            border: none !important;
            cursor: pointer;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            outline: none;
            color: #2563eb;
            transition: transform 0.2s ease, color 0.3s ease;
            margin-left: 0.75rem;
            margin-right: 0.5rem;
          }

          .theme-toggle-btn:hover {
            transform: scale(1.1);
          }

          .novasphere-nav .navbar-item {
            color: #2563eb !important; 
            font-weight: 500;
          }
          
          .novasphere-nav .navbar-item.is-active-tab {
            color: #1d4ed8 !important; /* Richer Dark Blue active link */
            font-weight: 700;
          }

          .signup-btn {
            background-color: #2563eb !important;
            color: #ffffff !important;
            border: none !important;
            font-weight: 600 !important;
            border-radius: 8px !important;
            transition: background-color 0.2s ease;
          }

          .signup-btn:hover {
            background-color: #1d4ed8 !important;
          }

          /* System Dark Mode Override Fallbacks */
          @media (prefers-color-scheme: dark) {
            html:not(.light-theme) .novasphere-nav {
              background-color: #1e1e1f !important; /* Slightly lighter surface card color */
              border-bottom: 1px solid #2d2d30;
            }
            html:not(.light-theme) .logo-rest-letters {
              color: #ffffff !important;
            }
            html:not(.light-theme) .logo-first-letter {
              background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
            }
            html:not(.light-theme) .novasphere-nav .navbar-item {
              color: #3b82f6 !important; /* Vibrant light blue for readability */
            }
            html:not(.light-theme) .theme-toggle-btn {
              color: #3b82f6;
            }
            html:not(.light-theme) .novasphere-nav .navbar-item.is-active-tab {
              color: #ffffff !important;
            }
            html:not(.light-theme) .signup-btn {
              background-color: #3b82f6 !important;
            }
          }

          /* Hard Class Dark Theme Overrides */
          .dark-theme .novasphere-nav {
            background-color: #1e1e1f !important;
            border-bottom: 1px solid #2d2d30;
          }
          .dark-theme .logo-rest-letters {
            color: #ffffff !important;
          }
          .dark-theme .logo-first-letter {
            background: linear-gradient(135deg, #60a5fa 0%, #c084fc 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          .dark-theme .novasphere-nav .navbar-item {
            color: #3b82f6 !important;
          }
          .dark-theme .theme-toggle-btn {
            color: #3b82f6;
          }
          .dark-theme .novasphere-nav .navbar-item.is-active-tab {
            color: #ffffff !important;
          }
          .dark-theme .signup-btn {
            background-color: #3b82f6 !important;
          }
        `}
      </style>

      <Container>
        <Navbar.Brand>
          <Navbar.Item to={auth ? '/home' : '/'} aria-label="main navigation" component={Link}>
            <Title className="nav-logo">
              <span className="logo-first-letter">N</span>
              <span className="logo-rest-letters">ovaSphere</span>
            </Title>
          </Navbar.Item>
          <div className="navbar-brand-right" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="is-hidden-desktop" style={{ display: 'flex', alignItems: 'center' }}>
              <ThemeToggleButton />
              {!auth && (
                <Navbar.Item to="/login" component={Link}>
                  <Title size="6" style={{ margin: 0, color: 'inherit' }}>Login</Title>
                </Navbar.Item>
              )}
              {!auth && (
                <Navbar.Item to="/register" component={Link}>
                  <Button className="signup-btn">Sign Up</Button>
                </Navbar.Item>
              )}
              {auth && (
                <Navbar.Item hoverable clickable>
                  <UserDropdown />
                </Navbar.Item>
              )}
            </div>
          </div>
        </Navbar.Brand>

        {auth ? (
          <Navbar.Menu>
            <Navbar.Start>
              <Navbar.Item className={`is-hidden-mobile ${isHome ? 'is-active-tab' : ''}`} to="/home" component={Link}>
                <Title size="6" style={{ margin: 0, color: 'inherit' }}>Home</Title>
              </Navbar.Item>
              <Navbar.Item className={`is-hidden-mobile ${isTodo ? 'is-active-tab' : ''}`} to="/todo" component={Link}>
                <Title size="6" style={{ margin: 0, color: 'inherit' }}>Todo</Title>
              </Navbar.Item>
              <Navbar.Item className={`is-hidden-mobile ${isSettings ? 'is-active-tab' : ''}`} to="/settings" component={Link}>
                <Title size="6" style={{ margin: 0, color: 'inherit' }}>Settings</Title>
              </Navbar.Item>
            </Navbar.Start>
            <Navbar.End style={{ alignItems: 'center' }}>
              <Navbar.Item hoverable clickable>
                <UserDropdown />
              </Navbar.Item>
              <div className="is-hidden-mobile">
                <ThemeToggleButton />
              </div>
            </Navbar.End>
          </Navbar.Menu>
        ) : (
          <Navbar.Menu>
            <Navbar.End style={{ alignItems: 'center' }}>
              <Navbar.Item to="/login" component={Link}>
                <Title size="6" style={{ margin: 0, color: 'inherit' }}>Login</Title>
              </Navbar.Item>
              <Navbar.Item to="/register" component={Link}>
                <Button className="signup-btn">Sign Up</Button>
              </Navbar.Item>
              <div className="is-hidden-mobile">
                <ThemeToggleButton />
              </div>
            </Navbar.End>
          </Navbar.Menu>
        )}
      </Container>
    </Navbar>
  );
}