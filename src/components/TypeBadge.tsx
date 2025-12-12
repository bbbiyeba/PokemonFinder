const typeColors: Record<string, { bg: string; text: string; border: string }> = {
  normal: { bg: 'bg-gray-400', text: 'text-white', border: 'border-gray-500' },
  fire: { bg: 'bg-orange-500', text: 'text-white', border: 'border-orange-600' },
  water: { bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600' },
  electric: { bg: 'bg-yellow-400', text: 'text-gray-800', border: 'border-yellow-500' },
  grass: { bg: 'bg-green-500', text: 'text-white', border: 'border-green-600' },
  ice: { bg: 'bg-cyan-400', text: 'text-gray-800', border: 'border-cyan-500' },
  fighting: { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700' },
  poison: { bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-600' },
  ground: { bg: 'bg-amber-600', text: 'text-white', border: 'border-amber-700' },
  flying: { bg: 'bg-indigo-400', text: 'text-white', border: 'border-indigo-500' },
  psychic: { bg: 'bg-pink-500', text: 'text-white', border: 'border-pink-600' },
  bug: { bg: 'bg-lime-500', text: 'text-white', border: 'border-lime-600' },
  rock: { bg: 'bg-yellow-600', text: 'text-white', border: 'border-yellow-700' },
  ghost: { bg: 'bg-purple-700', text: 'text-white', border: 'border-purple-800' },
  dragon: { bg: 'bg-indigo-600', text: 'text-white', border: 'border-indigo-700' },
  dark: { bg: 'bg-gray-700', text: 'text-white', border: 'border-gray-800' },
  steel: { bg: 'bg-slate-500', text: 'text-white', border: 'border-slate-600' },
  fairy: { bg: 'bg-pink-400', text: 'text-white', border: 'border-pink-500' },
};

interface TypeBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export function TypeBadge({ type, size = 'md' }: TypeBadgeProps) {
  const colors = typeColors[type.toLowerCase()] || typeColors.normal;
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`${colors.bg} ${colors.text} ${sizeClasses[size]} rounded-lg font-medium uppercase tracking-wide border ${colors.border} shadow-sm inline-block`}
    >
      {type}
    </span>
  );
}
