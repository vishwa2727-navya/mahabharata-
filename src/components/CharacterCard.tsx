import React from 'react';
import { Crown, Star } from 'lucide-react';
import type { Character } from '../types';
import { useTranslation } from '../hooks/useTranslation';

interface CharacterCardProps {
  character: Character;
  onClick: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClick }) => {
  const { getCharacterName } = useTranslation();
  const progressPercentage = (character.completedLevels / character.totalLevels) * 100;
  const name = getCharacterName(character.id);

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer epic-card rounded-2xl overflow-hidden w-full transition-all duration-300 active:scale-95 sm:hover:scale-105"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={character.image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="w-full h-28 sm:h-36 md:h-44 object-cover object-top"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.background = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
            target.style.display = 'flex';
            target.src = `https://placehold.co/300x200/1e3a8a/FFD700?text=${encodeURIComponent(name)}`;
          }}
        />

        {character.completedLevels > 0 && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1.5 rounded-full shadow-lg">
            <Crown className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        )}

        {character.completedLevels === character.totalLevels && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white p-1.5 rounded-full shadow-lg">
            <Star className="w-3 h-3 sm:w-4 sm:h-4" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-2.5 sm:p-4">
        <h3 className="font-epic-heading text-sm sm:text-base md:text-lg font-bold text-gray-800 mb-1 group-hover:text-blue-700 transition-colors line-clamp-1">
          {name}
        </h3>

        <p className="font-epic-body text-xs text-gray-600 mb-2 line-clamp-2 hidden sm:block">
          {character.shortBio}
        </p>

        {character.completedLevels > 0 && (
          <div className="mb-2">
            <div className="flex justify-between text-xs text-gray-600 mb-0.5">
              <span className="text-blue-600 font-semibold">Progress</span>
              <span>{character.completedLevels}/{character.totalLevels}</span>
            </div>
            <div className="w-full bg-gray-200/60 rounded-full h-1.5 border border-blue-300/40">
              <div
                className="bg-gradient-to-r from-blue-400 to-pink-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1">
          <span className="px-1.5 py-0.5 bg-blue-100/80 text-blue-700 text-xs rounded-full border border-blue-300/50 font-medium truncate max-w-full">
            {character.skills[0]}
          </span>
          {character.skills.length > 1 && (
            <span className="px-1.5 py-0.5 bg-gray-100/80 text-gray-600 text-xs rounded-full border border-gray-300/50 font-medium">
              +{character.skills.length - 1}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
