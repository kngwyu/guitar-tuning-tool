export const SHARPS = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
export const FLATS = ['C', 'D♭', 'D', 'E♭', 'E', 'F', 'G♭', 'G', 'A♭', 'A', 'B♭', 'B'];
export const TUNINGS = [
  { id: 'standard', name: 'Standard', notes: [40, 45, 50, 55, 59, 64], description: 'Standard guitar tuning: E A D G B E.' },
  { id: 'drop-d', name: 'Drop D', notes: [38, 45, 50, 55, 59, 64], description: 'Standard tuning with the sixth string lowered to D.' },
  { id: 'drop-c-sharp', name: 'Drop C♯', notes: [37, 44, 49, 54, 58, 63], description: 'Drop D lowered a half step: C♯ G♯ C♯ F♯ A♯ D♯.' },
  { id: 'drop-c', name: 'Drop C', notes: [36, 43, 48, 53, 57, 62], description: 'Drop D lowered a whole step: C G C F A D.' },
  { id: 'drop-b', name: 'Drop B', notes: [35, 42, 47, 52, 56, 61], description: 'Low to high: B F♯ B E G♯ C♯.' },
  { id: 'drop-a', name: 'Drop A', notes: [33, 40, 45, 50, 54, 59], description: 'Low to high: A E A D F♯ B.' },
  { id: 'double-drop-d', name: 'Double drop D', notes: [38, 45, 50, 55, 59, 62], description: 'Both E strings lowered to D: D A D G B D.' },
  { id: 'dadgad', name: 'DADGAD', notes: [38, 45, 50, 55, 57, 62], description: 'Open strings form a D suspended fourth chord.' },
  { id: 'open-g', name: 'Open G', notes: [38, 43, 50, 55, 59, 62], description: 'Open strings form a G major chord.' },
  { id: 'open-d', name: 'Open D', notes: [38, 45, 50, 54, 57, 62], description: 'Open strings form a D major chord.' },
  { id: 'open-c', name: 'Open C', notes: [36, 43, 48, 55, 60, 64], description: 'Open C major: C G C G C E.' },
  { id: 'open-e', name: 'Open E', notes: [40, 47, 52, 56, 59, 64], description: 'Open E major: E B E G♯ B E.' },
  { id: 'open-a', name: 'Open A', notes: [40, 45, 52, 57, 61, 64], description: 'Open A major: E A E A C♯ E.' },
  { id: 'open-d-minor', name: 'Open D minor', notes: [38, 45, 50, 53, 57, 62], description: 'Open D minor: D A D F A D.' },
  { id: 'open-g-minor', name: 'Open G minor', notes: [38, 43, 50, 55, 58, 62], description: 'Open G minor: D G D G B♭ D.' },
  { id: 'dadead', name: 'DADEAD', notes: [38, 45, 50, 52, 57, 62], description: 'Low to high: D2 A2 D3 E3 A3 D4.' },
  { id: 'dgddgd', name: 'DGDDGD', notes: [38, 43, 50, 50, 55, 62], description: 'Low to high: D2 G2 D3 D3 G3 D4; the middle strings share D3.' },
  { id: 'gbdgbd', name: 'GBDGBD', notes: [43, 47, 50, 55, 59, 62], description: 'Open G major, low to high: G2 B2 D3 G3 B3 D4.' },
  { id: 'half-down', name: 'Half step down', notes: [39, 44, 49, 54, 58, 63], description: 'Each string is one semitone below standard tuning.' },
];
export function pitchClass(midi) { return ((midi % 12) + 12) % 12; }
export function noteName(midi, flats = false) { return (flats ? FLATS : SHARPS)[pitchClass(midi)]; }
export function octave(midi) { return Math.floor(midi / 12) - 1; }

export const SCALES = [
  { id: 'major', name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11] },
  { id: 'natural-minor', name: 'Natural minor', intervals: [0, 2, 3, 5, 7, 8, 10] },
  { id: 'harmonic-minor', name: 'Harmonic minor', intervals: [0, 2, 3, 5, 7, 8, 11] },
  { id: 'melodic-minor', name: 'Melodic minor (ascending)', intervals: [0, 2, 3, 5, 7, 9, 11] },
  { id: 'dorian', name: 'Dorian', intervals: [0, 2, 3, 5, 7, 9, 10] },
  { id: 'phrygian', name: 'Phrygian', intervals: [0, 1, 3, 5, 7, 8, 10] },
  { id: 'lydian', name: 'Lydian', intervals: [0, 2, 4, 6, 7, 9, 11] },
  { id: 'mixolydian', name: 'Mixolydian', intervals: [0, 2, 4, 5, 7, 9, 10] },
  { id: 'locrian', name: 'Locrian', intervals: [0, 1, 3, 5, 6, 8, 10] },
  { id: 'major-pentatonic', name: 'Major pentatonic', intervals: [0, 2, 4, 7, 9] },
  { id: 'minor-pentatonic', name: 'Minor pentatonic', intervals: [0, 3, 5, 7, 10] },
  { id: 'blues', name: 'Minor blues', intervals: [0, 3, 5, 6, 7, 10] },
];
export function scaleNotes(root, scaleId) {
  const scale = SCALES.find(scale => scale.id === scaleId);
  if (!scale) throw new Error(`Unknown scale: ${scaleId}`);
  return scale.intervals.map(interval => pitchClass(root + interval));
}

export const CHORDS = [
  { id: 'major', name: 'Major', intervals: [0, 4, 7] },
  { id: 'minor', name: 'Minor', intervals: [0, 3, 7] },
  { id: 'diminished', name: 'Diminished', intervals: [0, 3, 6] },
  { id: 'augmented', name: 'Augmented', intervals: [0, 4, 8] },
  { id: 'sus2', name: 'Sus2', intervals: [0, 2, 7] },
  { id: 'sus4', name: 'Sus4', intervals: [0, 5, 7] },
  { id: 'major-7', name: 'Major 7', intervals: [0, 4, 7, 11] },
  { id: 'minor-7', name: 'Minor 7', intervals: [0, 3, 7, 10] },
  { id: 'dominant-7', name: 'Dominant 7', intervals: [0, 4, 7, 10] },
  { id: 'half-diminished-7', name: 'Half-diminished 7', intervals: [0, 3, 6, 10] },
];
export function chordNotes(root, chordId) {
  if (chordId === 'none') return [];
  const chord = CHORDS.find(chord => chord.id === chordId);
  if (!chord) throw new Error(`Unknown chord: ${chordId}`);
  return chord.intervals.map(interval => pitchClass(root + interval));
}
/** @param {number[]} notes @param {number[]} selection */
export function notesOutsideSelection(notes, selection) {
  return notes.filter(note => !selection.includes(note));
}

/** Classify primary chord roots; this is a scale-degree label, not contextual harmonic analysis.
 * @param {number} scaleRoot @param {string} scaleId
 * @param {number} chordRoot @param {string} chordId
 */
export function chordFunction(scaleRoot, scaleId, chordRoot, chordId) {
  if (chordId === 'none') return null;
  const scale = SCALES.find(scale => scale.id === scaleId);
  if (!scale || scale.intervals.length !== 7) return 'Function unavailable for this selection';
  const interval = pitchClass(chordRoot - scaleRoot);
  // A primary root can still carry borrowed notes; membership is shown separately.
  if (interval === 0) return 'Tonic · I';
  if (interval === 5) return 'Subdominant · IV';
  if (interval === 7) return 'Dominant · V';
  const degree = scale.intervals.indexOf(interval);
  if (degree === -1) return 'Root outside scale';
  return `Other degree · ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][degree]}`;
}
