import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/lib/types';
import { MessageCircle, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

interface HeaderProps {
  onChatToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onChatToggle }) => {
  const [location, navigate] = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const { user, signOut } = useAuth();

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return next;
    });
  };

  const navItems: NavItem[] = [
    { name: 'Home', href: '/', active: location === '/' },
    { name: 'Resume Tools', href: '/resume-analyzer', active: location === '/resume-analyzer' },
    { name: 'Resources', href: '/resources', active: location === '/resources' },
    { name: 'History', href: '/history', active: location === '/history' },
    { name: 'About', href: '/about', active: location === '/about' },
  ];

  return (
    <header className="bg-white shadow-md dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-2xl font-bold gap-2">
              <img src="/assets/HireIndex.png" alt="HireIndex Logo" className="h-12 w-12" />
              <span>
                <span className="text-blue-600 dark:text-blue-400">Hire</span><span className="text-purple-500 dark:text-purple-300">Index</span>
              </span>
            </Link>
            <nav className="hidden md:flex ml-10 space-x-8">
              {navItems.map((item) => (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`$
                    {item.active 
                      ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400' 
                      : 'text-gray-900 hover:text-blue-600 dark:text-gray-100 dark:hover:text-blue-400'
                    } font-medium`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onChatToggle}
              className="bg-blue-500 hover:bg-blue-600 text-white flex items-center dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              <span className="hidden md:inline">Chat Support</span>
            </Button>
            {user ? (
              <Button
                variant="outline"
                onClick={async () => { await signOut(); navigate('/login'); }}
                className="border-blue-500 text-blue-500 bg-white hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                Sign Out
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-blue-500 text-blue-500 bg-white hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:bg-gray-900 dark:hover:bg-gray-800"
              >
                Log In
              </Button>
            )}
            <Button
              variant="outline"
              onClick={toggleDarkMode}
              className="border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
