import { useAppSelector } from '../../redux/hooks';
import type { RootState } from '../../redux/store';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onLogout?: () => void;
}

const Header = ({ title, subtitle, onLogout }: HeaderProps) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle && (
          <p className="text-sm text-gray-400">{subtitle}</p>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
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
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
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
