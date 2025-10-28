/**
 * Type definitions for El Misterio del Crespín escape room game
 */

export interface Puzzle {
  id: number;
  code: string;
  clueImage: string;
  clueText: string;
}

export interface Team {
  id: string;
  name: string;
  number: number;
  color: string;
  letter: string;
  puzzles: Puzzle[];
}

export interface IntroData {
  title: string;
  story: string;
  rules?: string;
  image: string;
}

export interface GameConfig {
  teams: Team[];
  intro: IntroData;
  finalWord: string;
}

export interface GameProgress {
  teamId: string;
  currentPuzzleIndex: number;
  completedPuzzles: number[];
  startedAt: string;
  lastUpdated: string;
}

export type GameScreen =
  | 'intro'
  | 'team-selection'
  | 'puzzle'
  | 'clue'
  | 'congratulations';

export interface GameState {
  currentScreen: GameScreen;
  selectedTeam: Team | null;
  currentPuzzleIndex: number;
  showClue: boolean;
  progress: GameProgress | null;
}
