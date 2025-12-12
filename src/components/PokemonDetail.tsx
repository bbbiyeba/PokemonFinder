import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Loader2 } from 'lucide-react';
import { TypeBadge } from './TypeBadge';
import { StatBar } from './StatBar';

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  stats: { base_stat: number; stat: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string }; is_hidden: boolean }[];
}

interface FavoritePokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  note: string;
}

export function PokemonDetail() {
  const { nameOrId } = useParams<{ nameOrId: string }>();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${nameOrId?.toLowerCase()}`
        );
        if (!response.ok) {
          throw new Error('Pokémon not found');
        }
        const data = await response.json();
        setPokemon(data);

        // Check if already in favorites
        const favorites = JSON.parse(localStorage.getItem('pokemonFavorites') || '[]');
        const existingFav = favorites.find((fav: FavoritePokemon) => fav.id === data.id);
        if (existingFav) {
          setIsFavorite(true);
          setNote(existingFav.note || '');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch Pokémon');
      } finally {
        setLoading(false);
      }
    };

    if (nameOrId) {
      fetchPokemon();
    }
  }, [nameOrId]);

  const handleAddToFavorites = () => {
    if (!pokemon) return;

    const favorites: FavoritePokemon[] = JSON.parse(
      localStorage.getItem('pokemonFavorites') || '[]'
    );

    const existingIndex = favorites.findIndex((fav) => fav.id === pokemon.id);

    if (existingIndex !== -1) {
      // Update note if already exists
      favorites[existingIndex].note = note;
    } else {
      // Add new favorite
      const newFavorite: FavoritePokemon = {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types.map((t) => t.type.name),
        sprite: pokemon.sprites.other['official-artwork'].front_default,
        note,
      };
      favorites.push(newFavorite);
    }

    localStorage.setItem('pokemonFavorites', JSON.stringify(favorites));
    setIsFavorite(true);
  };

  const handleRemoveFromFavorites = () => {
    if (!pokemon) return;

    const favorites: FavoritePokemon[] = JSON.parse(
      localStorage.getItem('pokemonFavorites') || '[]'
    );
    const filtered = favorites.filter((fav) => fav.id !== pokemon.id);
    localStorage.setItem('pokemonFavorites', JSON.stringify(filtered));
    setIsFavorite(false);
    setNote('');
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-4" />
          <p className="text-slate-600">Loading Pokémon data...</p>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-slate-200">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-medium text-slate-800 mb-2">Pokémon Not Found</h2>
          <p className="text-slate-600 mb-6">
            {error || "We couldn't find that Pokémon. Please try another name or ID."}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  const statColors: Record<string, string> = {
    hp: 'bg-red-500',
    attack: 'bg-orange-500',
    defense: 'bg-yellow-500',
    'special-attack': 'bg-blue-500',
    'special-defense': 'bg-green-500',
    speed: 'bg-pink-500',
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back to Search</span>
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-100 to-slate-200 p-12 text-center">
          <div className="mb-4">
            <span className="text-slate-500 font-medium">#{pokemon.id.toString().padStart(3, '0')}</span>
          </div>
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-72 h-72 mx-auto drop-shadow-2xl"
          />
          <h1 className="font-display text-4xl text-slate-800 mb-4 capitalize">
            {pokemon.name}
          </h1>
          <div className="flex items-center justify-center gap-3">
            {pokemon.types.map((typeInfo) => (
              <TypeBadge key={typeInfo.type.name} type={typeInfo.type.name} size="lg" />
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
          {/* Info Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Height</p>
              <p className="text-2xl font-medium text-slate-800">{pokemon.height / 10} m</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Weight</p>
              <p className="text-2xl font-medium text-slate-800">{pokemon.weight / 10} kg</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm text-slate-600 mb-1">Abilities</p>
              <p className="text-sm font-medium text-slate-800 capitalize">
                {pokemon.abilities
                  .filter((a) => !a.is_hidden)
                  .map((a) => a.ability.name.replace('-', ' '))
                  .join(', ')}
              </p>
            </div>
          </div>

          {/* Base Stats */}
          <div>
            <h2 className="text-xl font-medium text-slate-800 mb-4">Base Stats</h2>
            <div className="space-y-3">
              {pokemon.stats.map((statInfo) => (
                <StatBar
                  key={statInfo.stat.name}
                  label={statInfo.stat.name.replace('-', ' ')}
                  value={statInfo.base_stat}
                  color={statColors[statInfo.stat.name] || 'bg-slate-500'}
                />
              ))}
            </div>
          </div>

          {/* User Notes */}
          <div>
            <label
              htmlFor="note"
              className="block text-lg font-medium text-slate-800 mb-2"
            >
              Why do you like this Pokémon?
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add your personal notes here..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-200 transition-all resize-none"
            />
          </div>

          {/* Action Button */}
          <div className="flex gap-4">
            {!isFavorite ? (
              <button
                onClick={handleAddToFavorites}
                className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <Heart className="w-5 h-5" />
                Add to Favorites
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddToFavorites}
                  className="flex-1 flex items-center justify-center gap-3 bg-green-500 text-white py-4 rounded-xl font-medium shadow-lg hover:shadow-xl hover:bg-green-600 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  Update Notes
                </button>
                <button
                  onClick={handleRemoveFromFavorites}
                  className="px-8 py-4 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:border-red-400 hover:bg-red-50 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Remove
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
