import { useNavigate } from 'react-router-dom';
import { Trash2, Eye } from 'lucide-react';
import { TypeBadge } from './TypeBadge';

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
  note?: string;
  onRemove: () => void;
}

export function PokemonCard({ id, name, types, sprite, note, onRemove }: PokemonCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center">
        <img
          src={sprite}
          alt={name}
          className="w-32 h-32 mx-auto drop-shadow-lg transform group-hover:scale-110 transition-transform"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium text-slate-800 capitalize">{name}</h3>
            <span className="text-sm text-slate-500">#{id.toString().padStart(3, '0')}</span>
          </div>
          <div className="flex gap-2">
            {types.map((type) => (
              <TypeBadge key={type} type={type} size="sm" />
            ))}
          </div>
        </div>

        {note && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-sm text-slate-700 line-clamp-2">{note}</p>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <button
            onClick={() => navigate(`/pokemon/${id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
          <button
            onClick={onRemove}
            className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            title="Remove from favorites"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
