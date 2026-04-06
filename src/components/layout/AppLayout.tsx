import { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950 transition-colors duration-300 dark:bg-black dark:text-white">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header 
          title={user?.displayName || 'Deep Work'} 
          subtitle="Let's focus today"
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode((current) => !current)}
          onLogout={handleLogout}
        />
        
        <main
          key={sidebarOpen ? 'open' : 'closed'}
          className="min-h-[calc(100vh-64px)] bg-slate-100 transition-colors duration-300 dark:bg-slate-950"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
