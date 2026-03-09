export type JLPTLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1';

export type CharacterType = 'hiragana' | 'katakana';

export interface Character {
  character: string;
  romaji: string;
  type: CharacterType;
  row: string;
}

export interface VocabWord {
  id: string;
  word: string;
  reading: string;
  romaji: string;
  meaning: string;
  level: JLPTLevel;
  category: string;
}

export type CardStatus = 'new' | 'learning' | 'mastered';

export interface CardProgress {
  id: string;
  status: CardStatus;
  correctCount: number;
  lastSeen: string | null;
}

export type StudyMode = 'characters' | 'vocabulary';

export type CardFilter = 'all' | 'new' | 'learning' | 'mastered';
