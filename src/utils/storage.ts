import type { GameProgress } from '../types/game.types';

const STORAGE_KEY = 'elmisteriodelcrespin_progress';

/**
 * Get all saved progress
 */
const getAllProgress = (): Record<string, GameProgress> => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return {};
  }
};

/**
 * Save game progress to localStorage
 */
export const saveProgress = (progress: GameProgress): void => {
  try {
    const allProgress = getAllProgress();
    const progressWithTimestamp = {
      ...progress,
      lastUpdated: new Date().toISOString(),
    };
    allProgress[progress.teamId] = progressWithTimestamp;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
  } catch (error) {
    console.error('Error saving progress to localStorage:', error);
  }
};

/**
 * Load game progress from localStorage
 */
export const loadProgress = (teamId: string): GameProgress | null => {
  try {
    const allProgress = getAllProgress();
    return allProgress[teamId] || null;
  } catch (error) {
    console.error('Error loading progress from localStorage:', error);
    return null;
  }
};

/**
 * Clear progress for a specific team or all progress
 */
export const clearProgress = (teamId?: string): void => {
  try {
    if (teamId) {
      const allProgress = getAllProgress();
      delete allProgress[teamId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allProgress));
    } else {
      // Clear all progress
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error clearing progress from localStorage:', error);
  }
};

/**
 * Check if there's saved progress for a team
 */
export const hasProgress = (teamId: string): boolean => {
  const progress = loadProgress(teamId);
  return progress !== null && progress.currentPuzzleIndex > 0;
};

/**
 * Create initial progress for a team
 */
export const createInitialProgress = (teamId: string): GameProgress => {
  return {
    teamId,
    currentPuzzleIndex: 0,
    completedPuzzles: [],
    startedAt: new Date().toISOString(),
    lastUpdated: new Date().toISOString(),
  };
};

/**
 * Update progress when a puzzle is completed
 */
export const markPuzzleComplete = (
  progress: GameProgress,
  puzzleId: number
): GameProgress => {
  const updatedProgress = {
    ...progress,
    completedPuzzles: [...progress.completedPuzzles, puzzleId],
    currentPuzzleIndex: progress.currentPuzzleIndex + 1,
    lastUpdated: new Date().toISOString(),
  };

  saveProgress(updatedProgress);
  return updatedProgress;
};

/**
 * Reset progress to continue from a specific puzzle
 */
export const resetToTeamStart = (teamId: string): void => {
  const initialProgress = createInitialProgress(teamId);
  saveProgress(initialProgress);
};
