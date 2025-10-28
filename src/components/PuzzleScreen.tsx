import { motion } from 'framer-motion';
import type { Team } from '../types/game.types';
import { ProgressBar } from './ProgressBar';
import { CodeInput } from './CodeInput';

interface PuzzleScreenProps {
  team: Team;
  currentPuzzleIndex: number;
  onCodeSubmit: (code: string) => void;
  onValidateCode: (code: string) => boolean;
}

export const PuzzleScreen = ({
  team,
  currentPuzzleIndex,
  onCodeSubmit,
  onValidateCode,
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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fingerprint-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Team Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-full"
              style={{
                backgroundColor: team.color,
                boxShadow: `0 0 20px ${team.color}80`,
              }}
            />
            <h2
              className="font-elegant text-3xl font-bold"
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
          className="text-center mb-8"
        >
          <h3 className="font-elegant text-2xl text-amber-light mb-2">
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
          className="flex justify-center mb-8"
        >
          <div
            className="text-7xl"
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

        {/* Hint Box */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 glass rounded-lg p-6 border border-amber-dark/30"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="text-amber font-bold mb-2 font-mystery">
                Instrucción:
              </h4>
              <p className="text-sepia-light text-sm leading-relaxed">
                Busca las pistas físicas en el taller de cerámica. Los números
                que encuentres formarán el código de 3 dígitos que necesitas
                ingresar aquí.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-8 flex justify-center gap-6 text-amber-dark/50 text-3xl"
        >
          <span>🔍</span>
          <span>📋</span>
          <span>🧩</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
