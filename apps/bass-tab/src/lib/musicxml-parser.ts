import type { Note, Measure, ParsedMusic } from './types';

export function parseMusicXML(xmlString: string): ParsedMusic {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');

  // Check for parse errors
  const parseError = doc.querySelector('parsererror');
  if (parseError) {
    throw new Error('Invalid MusicXML file');
  }

  // Get title
  const titleEl = doc.querySelector('work-title') || doc.querySelector('movement-title');
  const title = titleEl?.textContent || 'Untitled';

  // Get divisions (how many divisions per quarter note)
  const divisionsEl = doc.querySelector('attributes divisions');
  const divisions = divisionsEl ? parseInt(divisionsEl.textContent || '1', 10) : 1;

  // Parse measures
  const measureEls = doc.querySelectorAll('measure');
  const measures: Measure[] = [];

  measureEls.forEach((measureEl, index) => {
    const notes: Note[] = [];
    const noteEls = measureEl.querySelectorAll('note');

    noteEls.forEach((noteEl) => {
      // Skip chord notes (we'll take the lowest note for bass)
      if (noteEl.querySelector('chord')) {
        return;
      }

      const isRest = noteEl.querySelector('rest') !== null;
      const durationEl = noteEl.querySelector('duration');
      const duration = durationEl ? parseInt(durationEl.textContent || '1', 10) : divisions;

      if (isRest) {
        notes.push({ pitch: '', octave: 0, duration, isRest: true });
      } else {
        const pitchEl = noteEl.querySelector('pitch');
        if (pitchEl) {
          const step = pitchEl.querySelector('step')?.textContent || 'C';
          const octave = parseInt(pitchEl.querySelector('octave')?.textContent || '3', 10);
          const alter = parseInt(pitchEl.querySelector('alter')?.textContent || '0', 10);

          let pitch = step;
          if (alter === 1) pitch += '#';
          if (alter === -1) pitch += 'b';

          notes.push({ pitch, octave, duration, isRest: false });
        }
      }
    });

    measures.push({ number: index + 1, notes });
  });

  return { title, divisions, measures };
}
