import { useState, useEffect } from 'react';
import type { GameConfig } from './types/game.types';
import { useGameState } from './hooks/useGameState';
import { IntroStory } from './components/IntroStory';
import { TeamSelection } from './components/TeamSelection';
import { PuzzleScreen } from './components/PuzzleScreen';
import { ClueReveal } from './components/ClueReveal';
import { CongratsScreen } from './components/CongratsScreen';

function App() {
  const [gameConfig, setGameConfig] = useState<GameConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    currentScreen,
    selectedTeam,
    currentPuzzleIndex,
    selectTeam,
    validateCode,
    onCorrectCode,
    continueToNext,
    resetGame,
    goToTeamSelection,
    getCurrentPuzzle,
  } = useGameState();

  // Load game configuration
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/data/game-config.json');
        if (!response.ok) {
          throw new Error('No se pudo cargar la configuración del juego');
        }
        const config: GameConfig = await response.json();
        setGameConfig(config);
        setLoading(false);
      } catch (err) {
        console.error('Error loading game config:', err);
        setError(
          err instanceof Error ? err.message : 'Error desconocido'
        );
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mystery-darker">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-pulse">🔍</div>
          <p className="text-amber-light font-mystery text-xl">
            Cargando investigación...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !gameConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mystery-darker p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-crimson font-elegant text-2xl mb-4">
            Error al Cargar
          </h2>
          <p className="text-sepia-light mb-6">
            {error || 'No se pudo cargar la configuración del juego.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mystery-btn"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Handle code submission
  const handleCodeSubmit = (code: string) => {
    if (validateCode(code)) {
      onCorrectCode();
    }
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return (
          <IntroStory
            intro={gameConfig.intro}
            onStart={goToTeamSelection}
          />
        );

      case 'team-selection':
        return (
          <TeamSelection
            teams={gameConfig.teams}
            onSelectTeam={selectTeam}
          />
        );

      case 'puzzle':
        if (!selectedTeam) {
          goToTeamSelection();
          return null;
        }
        return (
          <PuzzleScreen
            team={selectedTeam}
            currentPuzzleIndex={currentPuzzleIndex}
            onCodeSubmit={handleCodeSubmit}
            onValidateCode={validateCode}
          />
        );

      case 'clue':
        if (!selectedTeam) {
          goToTeamSelection();
          return null;
        }
        const currentPuzzle = getCurrentPuzzle();
        if (!currentPuzzle) {
          goToTeamSelection();
          return null;
        }
        return (
          <ClueReveal
            puzzle={currentPuzzle}
            team={selectedTeam}
            onContinue={continueToNext}
            isLastPuzzle={
              currentPuzzleIndex === selectedTeam.puzzles.length - 1
            }
          />
        );

      case 'congratulations':
        if (!selectedTeam) {
          goToTeamSelection();
          return null;
        }
        return (
          <CongratsScreen
            team={selectedTeam}
            finalWord={gameConfig.finalWord}
            onReset={resetGame}
          />
        );

      default:
        return (
          <IntroStory
            intro={gameConfig.intro}
            onStart={goToTeamSelection}
          />
        );
    }
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;
