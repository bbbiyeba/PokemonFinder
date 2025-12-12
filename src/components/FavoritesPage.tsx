<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Trash2 } from 'lucide-react';
import { TypeBadge } from './TypeBadge';

interface FavoritePokemon {
  _id: string;
  pokemonId: number;
=======
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Search } from 'lucide-react';
import { PokemonCard } from './PokemonCard';

interface FavoritePokemon {
  id: number;
>>>>>>> 9fac65baa7f5f3e8741a87dfbf7cf80e0d999988
  name: string;
  types: string[];
  sprite: string;
  note: string;
}

<<<<<<< HEAD
const API_URL = import.meta.env.PROD 
  ? 'https://pokemonfinder.onrender.com/api/favorites'
  : 'http://localhost:5000/api/favorites';
export function FavoritesPage() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setFavorites(data);
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (pokemonId: number) => {
    if (!confirm('Remove this Pokémon from favorites?')) return;

    try {
      const response = await fetch(`${API_URL}/${pokemonId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(favorites.filter((fav) => fav.pokemonId !== pokemonId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert('Failed to remove favorite');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
        <p className="text-center text-slate-600">Loading favorites...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-12 h-12 text-slate-400" />
          </div>
          <h1 className="text-3xl font-medium text-slate-800 mb-4">No Favorites Yet</h1>
          <p className="text-slate-600 mb-8">
            Start searching for Pokémon and add them to your favorites!
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
          >
            Search Pokémon
=======
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
>>>>>>> 9fac65baa7f5f3e8741a87dfbf7cf80e0d999988
          </button>
        </div>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-display text-slate-800 mb-2">My Favorites</h1>
        <p className="text-slate-600">
          You have {favorites.length} favorite Pokémon
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => (
          <div
            key={favorite._id}
            className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div
              className="bg-gradient-to-br from-slate-100 to-slate-200 p-6 cursor-pointer"
              onClick={() => navigate(`/pokemon/${favorite.pokemonId}`)}
            >
              <img
                src={favorite.sprite}
                alt={favorite.name}
                className="w-40 h-40 mx-auto drop-shadow-lg"
              />
            </div>
            <div className="p-6">
              <h2
                className="text-2xl font-medium text-slate-800 mb-2 capitalize cursor-pointer hover:text-red-600 transition-colors"
                onClick={() => navigate(`/pokemon/${favorite.pokemonId}`)}
              >
                {favorite.name}
              </h2>
              <div className="flex gap-2 mb-4">
                {favorite.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </div>
              {favorite.note && (
                <div className="bg-slate-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-slate-700">{favorite.note}</p>
                </div>
              )}
              <button
                onClick={() => handleRemove(favorite.pokemonId)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
=======
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
>>>>>>> 9fac65baa7f5f3e8741a87dfbf7cf80e0d999988
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 9fac65baa7f5f3e8741a87dfbf7cf80e0d999988
