import { motion } from 'framer-motion';
import type { Puzzle, Team } from '../types/game.types';

interface ClueRevealProps {
  puzzle: Puzzle;
  team: Team;
  onContinue: () => void;
  isLastPuzzle: boolean;
  isFirstPuzzle?: boolean;
}

export const ClueReveal = ({
  puzzle,
  team,
  onContinue,
  isLastPuzzle,
  isFirstPuzzle = false,
}: ClueRevealProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-3 fingerprint-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl pt-4"
      >
        {/* Success Header */}
        {!isFirstPuzzle ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-center mb-4"
          >
            <div className="text-4xl mb-2">✅</div>
            <h2 className="font-elegant text-2xl text-amber-light mb-1">
              ¡Código Correcto!
            </h2>
            <p className="text-sepia-light text-sm">
              Has resuelto el Enigma {puzzle.id - 1}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-center mb-4"
          >
            <h2 className="font-elegant text-2xl text-amber-light mb-1">
              ¡Comencemos la investigación!
            </h2>
            <p className="text-sepia-light text-sm">
              Equipo {team.name}
            </p>
          </motion.div>
        )}

        <div className="mystery-divider mb-4" />

        {/* Clue Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-4"
        >
          <h3 className="font-elegant text-xl mb-1" style={{ color: team.color }}>
            Pista Revelada
          </h3>
          <p className="text-amber-dark text-xs font-mystery">
            Esta es tu siguiente indicación
          </p>
        </motion.div>

        {/* Parchment Clue Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-4"
        >
          <div className="parchment-card">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-2xl">🔍</span>
              <h4 className="font-mystery text-lg font-bold text-mystery-darker">
                Próxima Pista:
              </h4>
            </div>
            <p className="text-mystery-darker leading-relaxed text-base font-body">
              {puzzle.clueText}
            </p>

            {/* Decorative seal */}
            <div className="mt-3 flex justify-end">
              <div
                className="w-10 h-10 rounded-full border-3 flex items-center justify-center font-bold text-sm"
                style={{
                  borderColor: team.color,
                  color: team.color,
                }}
              >
                {puzzle.id}
              </div>
            </div>
          </div>
        </motion.div>

      </motion.div>

      {/* Continue Button - Fixed at Bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="w-full max-w-xl pb-6 px-4"
      >
        <button
          onClick={onContinue}
          className="mystery-btn text-lg px-8 py-3 font-elegant no-select w-full"
          style={{
            backgroundColor: team.color,
            boxShadow: `0 4px 20px ${team.color}60`,
          }}
        >
          {isLastPuzzle ? '➜ Ingresar Código Final' : '➜ Continuar Investigación'}
        </button>

        {/* Progress Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center text-amber-dark text-xs mt-3"
        >
          {isLastPuzzle
            ? 'Este es el último enigma. Resuelve el código para descubrir tu letra secreta.'
            : 'Sigue la pista para encontrar el próximo enigma'}
        </motion.p>
      </motion.div>
    </div>
  );
};
