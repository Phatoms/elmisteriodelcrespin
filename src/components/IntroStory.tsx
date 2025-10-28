import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { IntroData } from '../types/game.types';

interface IntroStoryProps {
  intro: IntroData;
  onStart: () => void;
}

export const IntroStory = ({ intro, onStart }: IntroStoryProps) => {
  const [showRules, setShowRules] = useState(false);
  return (
    <div className="min-h-screen flex items-center justify-center p-4 fingerprint-bg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl w-full"
      >
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-elegant text-5xl md:text-6xl text-center mb-8 text-amber-light text-shadow-mystery"
        >
          {intro.title}
        </motion.h1>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mystery-divider"
        />

        {/* Story Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="glass rounded-xl p-8 mb-8 border border-amber-dark/30"
        >
          <div className="space-y-4">
            {intro.story.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                className="text-lg text-sepia-light leading-relaxed text-center md:text-left whitespace-pre-line"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Mystery Icon */}
          <motion.div
            initial={{ opacity: 0, rotate: -10 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 1.8, duration: 0.6 }}
            className="flex justify-center mt-8"
          >
            <div className="text-6xl text-amber">🔍</div>
          </motion.div>
        </motion.div>

        {/* Rules Section - Collapsible */}
        {intro.rules && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex justify-center mb-4"
            >
              <button
                onClick={() => setShowRules(!showRules)}
                className="mystery-btn-secondary text-base px-8 py-3 font-mystery no-select"
              >
                📋 {showRules ? 'Ocultar' : 'Ver'} Instrucciones
              </button>
            </motion.div>

            <AnimatePresence>
              {showRules && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden mb-8"
                >
                  <div className="parchment-card">
                    <div className="space-y-4">
                      {intro.rules.split('\n\n').map((paragraph, index) => (
                        <p
                          key={index}
                          className="text-base text-mystery-darker leading-relaxed whitespace-pre-line"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="flex justify-center"
        >
          <button
            onClick={onStart}
            className="mystery-btn text-xl px-12 py-4 font-elegant no-select"
          >
            Comenzar Investigación
          </button>
        </motion.div>

        {/* Subtitle hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.6, duration: 0.8 }}
          className="text-center text-amber-dark mt-6 text-sm font-mystery"
        >
          Selecciona tu equipo para empezar...
        </motion.p>
      </motion.div>
    </div>
  );
};
