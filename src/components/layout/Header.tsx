interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
      
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-semibold">{title}</h1>

        {subtitle && (
          <p className="text-sm text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm">
          Start Deep Work
        </button>
      </div>

    </header>
  );
};

export default Header;