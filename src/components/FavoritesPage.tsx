import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { PokemonCard } from './PokemonCard';

interface FavoritePokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  note: string;
}

export function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    const stored = localStorage.getItem('pokemonFavorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  };

  const handleRemove = (id: number) => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updated));
  };

  if (favorites.length === 0) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-red-500" />
          </div>
          <h2 className="text-2xl font-medium text-slate-800 mb-3">No favorites yet</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            Start exploring Pokémon and add your favorites to build your personal collection!
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-5 h-5" />
            Start Searching
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="font-display text-4xl text-slate-800 mb-2">My Favorites</h1>
        <p className="text-slate-600">
          You have <span className="font-medium text-slate-800">{favorites.length}</span> favorite Pokémon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            sprite={pokemon.sprite}
            note={pokemon.note}
            onRemove={() => handleRemove(pokemon.id)}
          />
        ))}
      </div>
    </div>
  );
}
