import type { ParsedMusic, BassTab, TabNote, TabMeasure, Note } from './types';
import { BASS_STRINGS, NOTE_TO_SEMITONE } from './types';

/**
 * Convert pitch string (e.g., "C#", "Db", "E") to semitone offset from C
 */
function pitchToSemitone(pitch: string): number {
  const basePitch = pitch.charAt(0).toUpperCase();
  const modifier = pitch.slice(1);

  let semitone = NOTE_TO_SEMITONE[basePitch] ?? 0;

  if (modifier === '#') semitone += 1;
  if (modifier === 'b') semitone -= 1;

  return semitone;
}

/**
 * Convert pitch + octave to MIDI note number
 */
function toMidiNote(pitch: string, octave: number): number {
  const semitone = pitchToSemitone(pitch);
  // MIDI note: C0 = 12, C1 = 24, etc.
  return 12 + (octave + 1) * 12 + semitone;
}

/**
 * Find the best string and fret for a given MIDI note
 * Returns null if note is out of bass range
 */
function findBestPosition(midiNote: number): { string: number; fret: number } | null {
  // Bass range: E1 (28) to roughly G4 (67) with 24 frets
  const MIN_MIDI = 28; // E1
  const MAX_FRET = 24;

  if (midiNote < MIN_MIDI) {
    return null; // Too low
  }

  // Try each string, prefer lower positions (closer to nut)
  let bestString = -1;
  let bestFret = -1;
  let bestScore = Infinity;

  for (let index = 0; index < BASS_STRINGS.length; index++) {
    const bassString = BASS_STRINGS[index];
    const fret = midiNote - bassString.midiNote;

    if (fret >= 0 && fret <= MAX_FRET) {
      // Score: prefer lower frets and middle strings
      const score = fret + Math.abs(index - 1.5) * 2;

      if (score < bestScore) {
        bestString = index + 1;
        bestFret = fret;
        bestScore = score;
      }
    }
  }

  if (bestString !== -1) {
    return { string: bestString, fret: bestFret };
  }

  return null;
}

/**
 * Convert a single note to tab notation
 */
function convertNote(note: Note): TabNote | null {
  if (note.isRest) {
    return { string: 0, fret: -1, duration: note.duration }; // Rest marker
  }

  const midiNote = toMidiNote(note.pitch, note.octave);
  const position = findBestPosition(midiNote);

  if (!position) {
    return null; // Note out of range
  }

  return {
    string: position.string,
    fret: position.fret,
    duration: note.duration,
  };
}

/**
 * Convert parsed MusicXML to bass tab
 */
export function convertToTab(music: ParsedMusic): BassTab {
  const tabMeasures: TabMeasure[] = music.measures.map((measure) => {
    const tabNotes: TabNote[] = [];

    for (const note of measure.notes) {
      const tabNote = convertNote(note);
      if (tabNote) {
        tabNotes.push(tabNote);
      }
    }

    return {
      number: measure.number,
      notes: tabNotes,
    };
  });

  return {
    title: music.title,
    measures: tabMeasures,
  };
}
