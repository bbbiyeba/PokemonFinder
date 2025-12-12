import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
              <div className="w-4 h-4 bg-white rounded-full border-2 border-red-700"></div>
            </div>
            <span className="font-display text-xl text-slate-800">PokéFinder</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${
                isActive('/') 
                  ? 'text-red-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/favorites" 
              className={`font-medium transition-colors ${
                isActive('/favorites') 
                  ? 'text-red-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Favorites
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
