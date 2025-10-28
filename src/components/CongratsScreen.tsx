import { motion } from 'framer-motion';
import type { Team } from '../types/game.types';

interface CongratsScreenProps {
  team: Team;
  finalWord: string;
  onReset: () => void;
}

export const CongratsScreen = ({
  team,
  finalWord: _finalWord,
  onReset,
}: CongratsScreenProps) => {
  // Confetti-like animation particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fingerprint-bg relative overflow-hidden">
      {/* Animated Background Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: '100vh', opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute text-2xl"
          style={{ left: `${particle.x}%` }}
        >
          {['🎉', '✨', '🔍', '🏆'][Math.floor(Math.random() * 4)]}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl relative z-10"
      >
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.3,
            type: 'spring',
            stiffness: 150,
            damping: 15,
          }}
          className="text-center mb-8"
        >
          <div className="text-8xl mb-6">🏆</div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="font-elegant text-5xl md:text-6xl text-amber-light mb-4 text-shadow-mystery"
          >
            ¡Caso Resuelto!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-sepia-light text-xl"
          >
            Equipo {team.name} ha completado todos los enigmas
          </motion.p>
        </motion.div>

        <div className="mystery-divider mb-12" />

        {/* Letter Reveal - The Big Moment */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.3, type: 'spring', stiffness: 200 }}
          className="mb-12"
        >
          <div className="glass rounded-2xl p-12 border-2 border-amber relative overflow-hidden">
            {/* Glow effect */}
            <motion.div
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(circle, ${team.color}40 0%, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center text-amber text-xl font-mystery mb-4"
              >
                Tu letra secreta es:
              </motion.p>

              {/* THE LETTER - Giant and dramatic */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 1.8,
                  type: 'spring',
                  stiffness: 150,
                  damping: 10,
                }}
                className="flex justify-center mb-6"
              >
                <div
                  className="w-48 h-48 rounded-3xl flex items-center justify-center font-elegant text-9xl font-bold shadow-2xl border-4"
                  style={{
                    backgroundColor: team.color,
                    color: '#0a0a0a',
                    borderColor: team.color,
                    boxShadow: `0 0 60px ${team.color}`,
                  }}
                >
                  {team.letter}
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="text-center text-sepia-light text-lg leading-relaxed"
              >
                Guarda esta letra bien. Cuando todos los equipos terminen,
                <br />
                junten sus letras para formar la palabra secreta.
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Final Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="parchment-card mb-8"
        >
          <h3 className="font-mystery text-xl font-bold mb-4 text-mystery-darker">
            📋 Instrucciones Finales:
          </h3>
          <ol className="space-y-2 text-mystery-darker list-decimal list-inside">
            <li>Reúnanse con los otros equipos</li>
            <li>Cada equipo comparte su letra</li>
            <li>Juntos, descubran el orden correcto para formar la palabra secreta</li>
            <li>¡Resuelvan el misterio final!</li>
          </ol>
        </motion.div>

        {/* Team Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex justify-center gap-4 mb-8"
        >
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3 border border-amber-dark/30">
            <div
              className="w-10 h-10 rounded-full"
              style={{
                backgroundColor: team.color,
                boxShadow: `0 0 15px ${team.color}`,
              }}
            />
            <div>
              <p className="text-xs text-amber-dark">Equipo #{team.number}</p>
              <p className="font-bold" style={{ color: team.color }}>
                {team.name}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="flex justify-center"
        >
          <button
            onClick={onReset}
            className="mystery-btn text-lg px-8 py-3 no-select opacity-70 hover:opacity-100"
          >
            ← Volver al Inicio
          </button>
        </motion.div>

        {/* Success Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          className="text-center text-amber-light text-2xl mt-8 font-elegant"
        >
          ¡Excelente trabajo, detectives! 🔍✨
        </motion.p>
      </motion.div>
    </div>
  );
};
