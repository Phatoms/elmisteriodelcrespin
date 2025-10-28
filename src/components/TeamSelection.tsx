import { motion } from 'framer-motion';
import type { Team } from '../types/game.types';

interface TeamSelectionProps {
  teams: Team[];
  onSelectTeam: (team: Team) => void;
}

export const TeamSelection = ({ teams, onSelectTeam }: TeamSelectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 fingerprint-bg">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="font-elegant text-4xl md:text-5xl text-amber-light mb-4 text-shadow-mystery">
          Selecciona tu Equipo
        </h2>
        <p className="text-sepia-light text-lg font-body">
          Cada equipo tiene su propio camino hacia la verdad
        </p>
        <div className="mystery-divider mt-6" />
      </motion.div>

      {/* Teams Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl w-full"
      >
        {teams.map((team, index) => (
          <motion.button
            key={team.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectTeam(team)}
            className="team-card no-select relative overflow-hidden"
            style={{
              borderColor: team.color,
              boxShadow: `0 4px 20px ${team.color}40`,
            }}
          >
            {/* Team Number Badge */}
            <div
              className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-mystery-darker text-sm"
              style={{ backgroundColor: team.color }}
            >
              {team.number}
            </div>

            {/* Team Color Circle */}
            <div className="flex flex-col items-center space-y-4">
              <div
                className="w-20 h-20 md:w-24 md:h-24 rounded-full shadow-lg"
                style={{
                  backgroundColor: team.color,
                  boxShadow: `0 0 20px ${team.color}80`,
                }}
              />

              {/* Team Name */}
              <div className="text-center">
                <h3
                  className="font-elegant text-xl md:text-2xl font-bold mb-1"
                  style={{ color: team.color }}
                >
                  {team.name}
                </h3>
                <p className="text-amber-dark text-sm font-mystery">
                  Equipo {team.number}
                </p>
              </div>
            </div>

            {/* Hover Effect Overlay */}
            <motion.div
              className="absolute inset-0 opacity-0 hover:opacity-10 transition-opacity duration-300"
              style={{ backgroundColor: team.color }}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="mt-12 text-center max-w-2xl"
      >
        <p className="text-amber-dark text-sm font-mystery leading-relaxed">
          🔍 Cada equipo resolverá 5 enigmas únicos
          <br />
          Al completarlos, recibirás una letra secreta
          <br />
          Juntos descubrirán el misterio final
        </p>
      </motion.div>
    </div>
  );
};
