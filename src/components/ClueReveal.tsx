import { motion } from 'framer-motion';
import type { Puzzle, Team } from '../types/game.types';

interface ClueRevealProps {
  puzzle: Puzzle;
  team: Team;
  onContinue: () => void;
  isLastPuzzle: boolean;
}

export const ClueReveal = ({
  puzzle,
  team,
  onContinue,
  isLastPuzzle,
}: ClueRevealProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fingerprint-bg">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        {/* Success Header */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="text-center mb-8"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="font-elegant text-3xl text-amber-light mb-2">
            ¡Código Correcto!
          </h2>
          <p className="text-sepia-light">
            Has resuelto el Enigma {puzzle.id}
          </p>
        </motion.div>

        <div className="mystery-divider mb-8" />

        {/* Clue Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="font-elegant text-2xl mb-2" style={{ color: team.color }}>
            Pista Revelada
          </h3>
          <p className="text-amber-dark text-sm font-mystery">
            Esta es tu siguiente indicación
          </p>
        </motion.div>

        {/* Polaroid Image */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotateZ: -5 }}
          animate={{ opacity: 1, y: 0, rotateZ: 2 }}
          transition={{ delay: 0.9, type: 'spring' }}
          className="mb-8 flex justify-center"
        >
          <div className="polaroid-frame max-w-md">
            <div className="aspect-[4/3] bg-mystery-medium rounded overflow-hidden relative">
              {/* Placeholder for image - will show actual image when provided */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-amber-dark text-sm">
                    Imagen de pista
                    <br />
                    <span className="text-xs opacity-70">
                      ({puzzle.clueImage})
                    </span>
                  </p>
                </div>
              </div>

              {/* Try to load actual image */}
              <img
                src={puzzle.clueImage}
                alt={`Pista ${puzzle.id}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Hide image if not found, show placeholder instead
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            {/* Polaroid caption */}
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-mystery-dark font-mystery text-sm">
                Enigma {puzzle.id}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Parchment Clue Text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2 }}
          className="mb-8"
        >
          <div className="parchment-card">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">🔍</span>
              <h4 className="font-mystery text-xl font-bold text-mystery-darker">
                Próxima Pista:
              </h4>
            </div>
            <p className="text-mystery-darker leading-relaxed text-lg font-body">
              {puzzle.clueText}
            </p>

            {/* Decorative seal */}
            <div className="mt-6 flex justify-end">
              <div
                className="w-12 h-12 rounded-full border-4 flex items-center justify-center font-bold"
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

        {/* Continue Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center"
        >
          <button
            onClick={onContinue}
            className="mystery-btn text-xl px-10 py-4 font-elegant no-select"
            style={{
              backgroundColor: team.color,
              boxShadow: `0 4px 20px ${team.color}60`,
            }}
          >
            {isLastPuzzle ? '🎉 Ver Resultado Final' : '➜ Continuar Investigación'}
          </button>
        </motion.div>

        {/* Progress Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="text-center text-amber-dark text-sm mt-6"
        >
          {isLastPuzzle
            ? '¡Estás a punto de descubrir tu letra secreta!'
            : 'Sigue la pista para encontrar el próximo enigma'}
        </motion.p>
      </motion.div>
    </div>
  );
};
