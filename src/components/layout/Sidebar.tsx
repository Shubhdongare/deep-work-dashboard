interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
  return (
    <aside
      className={`bg-slate-900 text-white h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        <h2 className={`${!isOpen && "hidden"} font-semibold`}>
          Deep Work
        </h2>

        <button
          onClick={onToggle}
          className="text-sm bg-slate-800 px-2 py-1 rounded"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        <a href="#dashboard" className="block p-2 rounded hover:bg-slate-800">
          Dashboard
        </a>

        <a href="#tasks" className="block p-2 rounded hover:bg-slate-800">
          Tasks
        </a>

        <a href="#analytics" className="block p-2 rounded hover:bg-slate-800">
          Analytics
        </a>

        <a href="#settings" className="block p-2 rounded hover:bg-slate-800">
          Settings
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;