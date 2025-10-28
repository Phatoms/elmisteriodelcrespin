import { motion } from 'framer-motion';
import type { Team } from '../types/game.types';
import { ProgressBar } from './ProgressBar';
import { CodeInput } from './CodeInput';

interface PuzzleScreenProps {
  team: Team;
  currentPuzzleIndex: number;
  onCodeSubmit: (code: string) => void;
  onValidateCode: (code: string) => boolean;
  onBackToClue: () => void;
  onBackToInicio: () => void;
}

export const PuzzleScreen = ({
  team,
  currentPuzzleIndex,
  onCodeSubmit,
  onValidateCode,
  onBackToClue,
  onBackToInicio,
}: PuzzleScreenProps) => {
  const puzzle = team.puzzles[currentPuzzleIndex];

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-crimson text-xl">Error: Puzzle no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-3 fingerprint-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl pt-4"
      >
        {/* Team Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-3"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundColor: team.color,
                boxShadow: `0 0 20px ${team.color}80`,
              }}
            />
            <h2
              className="font-elegant text-2xl font-bold"
              style={{ color: team.color }}
            >
              Equipo {team.name}
            </h2>
          </div>
          <div className="mystery-divider" />
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <ProgressBar
            current={currentPuzzleIndex}
            total={team.puzzles.length}
            teamColor={team.color}
          />
        </motion.div>

        {/* Puzzle Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-3"
        >
          <h3 className="font-elegant text-2xl text-amber-light mb-1">
            Enigma {puzzle.id}
          </h3>
          <p className="text-sepia-light text-sm">
            Encuentra el código de 3 dígitos
          </p>
        </motion.div>

        {/* Mystery Icon */}
        <motion.div
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex justify-center my-6"
        >
          <div
            className="text-5xl"
            style={{
              filter: `drop-shadow(0 0 10px ${team.color})`,
            }}
          >
            🔐
          </div>
        </motion.div>

        {/* Code Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <CodeInput
            onSubmit={onCodeSubmit}
            onValidate={onValidateCode}
            teamColor={team.color}
          />
        </motion.div>
      </motion.div>

      {/* Action Buttons - Fixed at Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="w-full max-w-xl pb-6 px-4 flex flex-col gap-3"
      >
        {/* Back to Clue Button */}
        <button
          onClick={onBackToClue}
          className="mystery-btn-secondary text-sm px-6 py-2 opacity-70 hover:opacity-100"
        >
          ← Ver Pista de Nuevo
        </button>

        {/* Back to Inicio Button */}
        <button
          onClick={onBackToInicio}
          className="mystery-btn-secondary text-sm px-6 py-2 opacity-70 hover:opacity-100"
        >
          🏠 Volver al Inicio
        </button>
      </motion.div>
    </div>
  );
};
