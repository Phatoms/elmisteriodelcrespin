import { useState, useEffect, useCallback } from 'react';
import type { Team, GameScreen, GameProgress } from '../types/game.types';
import {
  loadProgress,
  saveProgress,
  createInitialProgress,
  markPuzzleComplete,
} from '../utils/storage';

export const useGameState = () => {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('intro');
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState<number>(0);
  const [showClue, setShowClue] = useState<boolean>(false);
  const [progress, setProgress] = useState<GameProgress | null>(null);

  // Load saved progress when a team is selected
  useEffect(() => {
    if (selectedTeam) {
      const savedProgress = loadProgress(selectedTeam.id);
      if (savedProgress) {
        setProgress(savedProgress);
        setCurrentPuzzleIndex(savedProgress.currentPuzzleIndex);
      } else {
        const newProgress = createInitialProgress(selectedTeam.id);
        setProgress(newProgress);
        saveProgress(newProgress);
      }
    }
  }, [selectedTeam]);

  /**
   * Select a team and navigate to puzzle screen
   */
  const selectTeam = useCallback((team: Team) => {
    setSelectedTeam(team);
    setCurrentScreen('puzzle');
    setShowClue(false);
  }, []);

  /**
   * Validate a code for the current puzzle
   */
  const validateCode = useCallback(
    (code: string): boolean => {
      if (!selectedTeam || currentPuzzleIndex >= selectedTeam.puzzles.length) {
        return false;
      }

      const currentPuzzle = selectedTeam.puzzles[currentPuzzleIndex];
      return code === currentPuzzle.code;
    },
    [selectedTeam, currentPuzzleIndex]
  );

  /**
   * Handle correct code submission - show clue or go to finish
   */
  const onCorrectCode = useCallback(() => {
    if (!selectedTeam || !progress) return;

    const currentPuzzle = selectedTeam.puzzles[currentPuzzleIndex];
    const updatedProgress = markPuzzleComplete(progress, currentPuzzle.id);
    setProgress(updatedProgress);

    const nextIndex = currentPuzzleIndex + 1;

    // If this is the last puzzle, go straight to congratulations
    if (nextIndex >= selectedTeam.puzzles.length) {
      setCurrentScreen('congratulations');
    } else {
      // Otherwise, show the clue for the next puzzle location
      setShowClue(true);
      setCurrentScreen('clue');
    }
  }, [selectedTeam, currentPuzzleIndex, progress]);

  /**
   * Continue to next puzzle (from clue screen)
   */
  const continueToNext = useCallback(() => {
    if (!selectedTeam) return;

    // Move to next puzzle (this is only called when NOT the last puzzle)
    setCurrentPuzzleIndex(currentPuzzleIndex + 1);
    setShowClue(false);
    setCurrentScreen('puzzle');
  }, [selectedTeam, currentPuzzleIndex]);

  /**
   * Reset game to intro
   */
  const resetGame = useCallback(() => {
    setCurrentScreen('intro');
    setSelectedTeam(null);
    setCurrentPuzzleIndex(0);
    setShowClue(false);
    setProgress(null);
  }, []);

  /**
   * Go to team selection
   */
  const goToTeamSelection = useCallback(() => {
    setCurrentScreen('team-selection');
    setSelectedTeam(null);
    setCurrentPuzzleIndex(0);
    setShowClue(false);
    setProgress(null);
  }, []);

  /**
   * Get current puzzle data
   */
  const getCurrentPuzzle = useCallback(() => {
    if (!selectedTeam || currentPuzzleIndex >= selectedTeam.puzzles.length) {
      return null;
    }
    return selectedTeam.puzzles[currentPuzzleIndex];
  }, [selectedTeam, currentPuzzleIndex]);

  /**
   * Check if all puzzles are completed
   */
  const isGameComplete = useCallback(() => {
    if (!selectedTeam) return false;
    return currentPuzzleIndex >= selectedTeam.puzzles.length;
  }, [selectedTeam, currentPuzzleIndex]);

  return {
    // State
    currentScreen,
    selectedTeam,
    currentPuzzleIndex,
    showClue,
    progress,

    // Actions
    setCurrentScreen,
    selectTeam,
    validateCode,
    onCorrectCode,
    continueToNext,
    resetGame,
    goToTeamSelection,
    getCurrentPuzzle,
    isGameComplete,
  };
};
