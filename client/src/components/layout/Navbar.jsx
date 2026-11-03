import { Link, useLocation } from 'react-router-dom';
import { Activity, Network, BarChart2, Settings, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  
  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Simulator', path: '/simulator', icon: Network },
    { name: 'Dashboard', path: '/dashboard', icon: BarChart2 },
  ];

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-yellow-500 p-2 rounded-lg shadow-[0_0_10px_rgba(234,179,8,0.3)]">
                <Activity className="h-6 w-6 text-black" />
              </div>
              <span className="font-bold text-xl text-zinc-100 tracking-tight">NetSim Pro</span>
            </Link>
          </div>
          
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'text-yellow-500 bg-zinc-900/80 border border-zinc-800' 
                      : 'text-zinc-400 hover:text-yellow-400 hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center">
            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-bold transition-all shadow-[0_0_10px_rgba(234,179,8,0.2)] hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
