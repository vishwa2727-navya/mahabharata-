import React, { useMemo } from 'react';
import { ArrowLeft, LogOut } from 'lucide-react';
import { CharacterCard } from '../components/CharacterCard';
import { LanguageSelector } from '../components/LanguageSelector';
import { useTranslation } from '../hooks/useTranslation';
import { useGameState } from '../hooks/useGameState';
import { useAuth } from '../contexts/AuthContext';
import { characters } from '../utils/characterData';

interface CharacterSelectionProps {
  onCharacterSelect: (characterId: string) => void;
  onBack: () => void;
}

// Static random-looking values to avoid re-computing on every render
const PETAL_POSITIONS = [
  { left: '8%', top: '15%', delay: '0s' },
  { left: '22%', top: '72%', delay: '2s' },
  { left: '55%', top: '8%', delay: '4s' },
  { left: '78%', top: '45%', delay: '6s' },
  { left: '90%', top: '80%', delay: '8s' },
  { left: '35%', top: '90%', delay: '10s' },
];

const ORB_POSITIONS = [
  { left: '10%', top: '20%', width: '180px', height: '180px', delay: '0s' },
  { left: '70%', top: '60%', width: '240px', height: '240px', delay: '4s' },
  { left: '40%', top: '80%', width: '150px', height: '150px', delay: '8s' },
];

export const CharacterSelection: React.FC<CharacterSelectionProps> = ({
  onCharacterSelect,
  onBack
}) => {
  const { t } = useTranslation();
  const { getCharacterProgress } = useGameState();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  const charactersWithProgress = useMemo(() =>
    characters.map(character => ({
      ...character,
      completedLevels: getCharacterProgress(character.id)
    })),
    [getCharacterProgress]
  );

  return (
    <div className="min-h-screen character-sky-bg relative overflow-hidden">
      {/* Reduced floating elements - desktop only via CSS */}
      <div className="absolute inset-0 pointer-events-none mobile-hide-decorations">
        <div className="cloud-element animate-cloud-float top-20 left-12" style={{animationDelay: '0s'}}>☁️</div>
        <div className="cloud-element animate-cloud-float top-40 right-20" style={{animationDelay: '5s'}}>☁️</div>
        <div className="floating-divine animate-divine-float top-28 left-16" style={{animationDelay: '2s'}}>🏹</div>
        <div className="floating-divine animate-divine-float bottom-40 right-16" style={{animationDelay: '6s'}}>⚔️</div>

        {PETAL_POSITIONS.map((pos, i) => (
          <div
            key={`petal-${i}`}
            className="floating-petal animate-petal-float"
            style={{ left: pos.left, top: pos.top, animationDelay: pos.delay }}
          >
            🌸
          </div>
        ))}

        {ORB_POSITIONS.map((orb, i) => (
          <div
            key={`orb-${i}`}
            className="background-orb animate-orb-pulse"
            style={{
              left: orb.left,
              top: orb.top,
              width: orb.width,
              height: orb.height,
              animationDelay: orb.delay
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 text-white hover:bg-white/20 transition-all duration-300 text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('ui.back')}</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSelector />
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-500/20 backdrop-blur-sm rounded-lg border border-red-400/40 text-red-200 hover:bg-red-500/30 transition-all duration-300 text-sm sm:text-base"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-3 px-4">
            {t('ui.selectCharacter')}
          </h1>
          <p className="text-white/80 text-sm sm:text-lg max-w-2xl mx-auto px-4">
            Choose your hero and embark on their unique journey through the epic Mahabharata
          </p>
        </div>
      </div>

      {/* Character Grid */}
      <div className="px-3 sm:px-6 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {charactersWithProgress.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                onClick={() => onCharacterSelect(character.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
