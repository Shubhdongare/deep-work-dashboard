import { useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';

interface HeaderProps {
  title: string;
  subtitle?: string;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout?: () => void;
}

const Header = ({ title, subtitle, isDarkMode, onToggleTheme, onLogout }: HeaderProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-semibold text-slate-950 dark:text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleTheme}
          className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          title="Toggle theme"
        >
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-3">
          {user?.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName} 
              className="w-9 h-9 rounded-full object-cover border-2 border-slate-700"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
              {user?.displayName?.charAt(0).toUpperCase() || 'U'}
            </div>
          )}
          
          {/* Logout Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              title="Sign Out"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
