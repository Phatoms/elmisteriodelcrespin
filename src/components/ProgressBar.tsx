import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
  teamColor: string;
}

export const ProgressBar = ({ current, total, teamColor }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Progress Text */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-amber-light font-mystery text-sm">
          Enigma {current + 1} de {total}
        </span>
        <span className="text-sepia-light text-xs">
          {Math.round(((current) / total) * 100)}% completado
        </span>
      </div>

      {/* Progress Dots */}
      <div className="flex justify-between items-center gap-2">
        {Array.from({ length: total }).map((_, index) => {
          const isCompleted = index < current;
          const isActive = index === current;

          return (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex-1 flex flex-col items-center gap-1"
            >
              {/* Dot */}
              <motion.div
                className={`progress-dot ${isActive ? 'active' : ''} ${
                  isCompleted ? 'completed' : ''
                }`}
                animate={
                  isActive
                    ? {
                        boxShadow: [
                          `0 0 0px ${teamColor}`,
                          `0 0 15px ${teamColor}`,
                          `0 0 0px ${teamColor}`,
                        ],
                      }
                    : {}
                }
                transition={
                  isActive
                    ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }
                    : {}
                }
                style={
                  isCompleted || isActive
                    ? { backgroundColor: teamColor, borderColor: teamColor }
                    : {}
                }
              />

              {/* Number */}
              <span
                className={`text-xs font-bold ${
                  isActive || isCompleted
                    ? 'opacity-100'
                    : 'opacity-40'
                }`}
                style={
                  isActive || isCompleted
                    ? { color: teamColor }
                    : { color: '#8b6f47' }
                }
              >
                {index + 1}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Bar Line */}
      <div className="mt-4 h-2 bg-mystery-medium rounded-full overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(current / total) * 100}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ backgroundColor: teamColor }}
        />
      </div>
    </div>
  );
};
