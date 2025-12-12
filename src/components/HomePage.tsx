import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    // Navigate to the pokemon detail page
    const query = searchQuery.toLowerCase().trim();
    navigate(`/pokemon/${query}`);
    setIsLoading(false);
  };

  const handleRandomPokemon = () => {
    // Generate random ID between 1 and 898 (total Pokémon in API)
    const randomId = Math.floor(Math.random() * 898) + 1;
    navigate(`/pokemon/${randomId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl text-slate-800 mb-4">
          Pokémon Finder
        </h1>
        <p className="text-xl text-slate-600">
          Discover and save your favorite Pokémon
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-200">
        <form onSubmit={handleSearch} className="space-y-6">
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-2">
              Search for a Pokémon
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Pokémon name or ID..."
                className="w-full px-6 py-4 text-lg border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
            </div>
            <p className="mt-2 text-sm text-slate-500">
              Try <span className="font-medium text-slate-700">Pikachu</span>, <span className="font-medium text-slate-700">Charizard</span>, or <span className="font-medium text-slate-700">#25</span>
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={!searchQuery.trim() || isLoading}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? 'Searching...' : 'Search Pokémon'}
            </button>
            <button
              type="button"
              onClick={handleRandomPokemon}
              className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:border-slate-400 hover:bg-slate-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Random Pokémon
            </button>
          </div>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <h2 className="text-sm font-medium text-slate-700 mb-4">Popular Searches</h2>
          <div className="flex flex-wrap gap-2">
            {['Pikachu', 'Charizard', 'Mewtwo', 'Eevee', 'Snorlax', 'Gengar', 'Dragonite', 'Lucario'].map((name) => (
              <button
                key={name}
                onClick={() => navigate(`/pokemon/${name.toLowerCase()}`)}
                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-sm font-medium"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <Search className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-medium text-slate-800 mb-2">Quick Search</h3>
          <p className="text-sm text-slate-600">Find any Pokémon by name or Pokédex number instantly</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>
          <h3 className="font-medium text-slate-800 mb-2">Save Favorites</h3>
          <p className="text-sm text-slate-600">Build your personal collection and add custom notes</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="font-medium text-slate-800 mb-2">View Stats</h3>
          <p className="text-sm text-slate-600">See detailed information, stats, and abilities</p>
        </div>
      </div>
    </div>
  );
}
