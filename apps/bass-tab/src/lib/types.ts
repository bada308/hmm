export interface Note {
  pitch: string;      // e.g., "E2", "A2", "D3", "G3"
  octave: number;
  duration: number;   // in divisions
  isRest: boolean;
}

export interface TabNote {
  string: number;     // 1-4 (G, D, A, E from high to low)
  fret: number;       // 0-24
  duration: number;
}

export interface Measure {
  number: number;
  notes: Note[];
}

export interface TabMeasure {
  number: number;
  notes: TabNote[];
}

export interface ParsedMusic {
  title: string;
  divisions: number;  // divisions per quarter note
  measures: Measure[];
}

export interface BassTab {
  title: string;
  measures: TabMeasure[];
}

// Standard 4-string bass tuning (low to high): E1, A1, D2, G2
// MIDI note numbers: E1=28, A1=33, D2=38, G2=43
export const BASS_STRINGS = [
  { name: 'G', openPitch: 'G', openOctave: 2, midiNote: 43 },
  { name: 'D', openPitch: 'D', openOctave: 2, midiNote: 38 },
  { name: 'A', openPitch: 'A', openOctave: 1, midiNote: 33 },
  { name: 'E', openPitch: 'E', openOctave: 1, midiNote: 28 },
] as const;

export const NOTE_TO_SEMITONE: Record<string, number> = {
  'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11,
};
