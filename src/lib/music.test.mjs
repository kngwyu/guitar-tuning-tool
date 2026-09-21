import test from 'node:test';
import assert from 'node:assert/strict';
import { TUNINGS, SCALES, scaleNotes, noteName, octave, pitchClass } from './music.mjs';
test('standard tuning runs from E2 to E4', () => {
  assert.deepEqual(TUNINGS[0].notes.map(n => noteName(n) + octave(n)), ['E2', 'A2', 'D3', 'G3', 'B3', 'E4']);
});
test('each fret advances one semitone and the twelfth repeats the open note', () => {
  for (const tuning of TUNINGS) for (const n of tuning.notes) {
    assert.equal(pitchClass(n + 12), pitchClass(n));
    assert.equal(octave(n + 12), octave(n) + 1);
  }
  assert.equal(noteName(41), 'F');
  assert.equal(noteName(46, true), 'B♭');
  assert.equal(noteName(46), 'A♯');
});

test('C major and A natural minor contain the expected notes in scale order', () => {
  assert.deepEqual(scaleNotes(0, 'major'), [0, 2, 4, 5, 7, 9, 11]);
  assert.deepEqual(scaleNotes(9, 'natural-minor'), [9, 11, 0, 2, 4, 5, 7]);
});
test('scales transpose across the octave boundary', () => {
  assert.deepEqual(scaleNotes(11, 'major'), [11, 1, 3, 4, 6, 8, 10]);
  assert.deepEqual(scaleNotes(0, 'major-pentatonic'), [0, 2, 4, 7, 9]);
  assert.deepEqual(scaleNotes(9, 'minor-pentatonic'), [9, 0, 2, 4, 7]);
  assert.deepEqual(scaleNotes(9, 'blues'), [9, 0, 2, 3, 4, 7]);
  for (const scale of SCALES) for (let root = 0; root < 12; root++) {
    const notes = scaleNotes(root, scale.id);
    assert.equal(notes[0], root);
    assert.equal(new Set(notes).size, notes.length);
    assert.ok(notes.every(note => note >= 0 && note < 12));
  }
});

test('major-scale modes reproduce the parent scale from each degree', () => {
  const parent = scaleNotes(0, 'major');
  const modes = ['major', 'dorian', 'phrygian', 'lydian', 'mixolydian', 'natural-minor', 'locrian'];
  modes.forEach((mode, degree) => {
    assert.deepEqual(scaleNotes(parent[degree], mode), [...parent.slice(degree), ...parent.slice(0, degree)]);
  });
});
test('A harmonic and ascending melodic minor have the expected raised degrees', () => {
  assert.deepEqual(scaleNotes(9, 'harmonic-minor').map(n => noteName(n)), ['A', 'B', 'C', 'D', 'E', 'F', 'G♯']);
  assert.deepEqual(scaleNotes(9, 'melodic-minor').map(n => noteName(n)), ['A', 'B', 'C', 'D', 'E', 'F♯', 'G♯']);
});

test('drop presets transpose Drop D and double drop lowers both E strings', () => {
  const dropD = TUNINGS.find(t => t.id === 'drop-d').notes;
  for (const [id, semitones] of [['drop-c-sharp', 1], ['drop-c', 2], ['drop-b', 3], ['drop-a', 5]]) {
    assert.deepEqual(TUNINGS.find(t => t.id === id).notes, dropD.map(n => n - semitones));
  }
  assert.deepEqual(TUNINGS.find(t => t.id === 'double-drop-d').notes, TUNINGS[0].notes.map((n, i) => n - (i === 0 || i === 5 ? 2 : 0)));
});
test('open tuning presets contain the named major or minor triad', () => {
  for (const [id, root, third] of [['open-c', 0, 4], ['open-e', 4, 4], ['open-a', 9, 4], ['open-d-minor', 2, 3], ['open-g-minor', 7, 3]]) {
    const notes = TUNINGS.find(t => t.id === id).notes;
    assert.deepEqual([...new Set(notes.map(n => pitchClass(n - root)))].sort((a, b) => a - b), [0, third, 7]);
  }
});
test('requested alternate tunings use the intended string pitches and octaves', () => {
  for (const [id, expected] of [
    ['dadead', ['D2', 'A2', 'D3', 'E3', 'A3', 'D4']],
    ['dgddgd', ['D2', 'G2', 'D3', 'D3', 'G3', 'D4']],
    ['gbdgbd', ['G2', 'B2', 'D3', 'G3', 'B3', 'D4']],
  ]) {
    assert.deepEqual(TUNINGS.find(t => t.id === id).notes.map(n => noteName(n) + octave(n)), expected);
  }
});
test('every preset has a unique id and six pitches supported by the string controls', () => {
  assert.equal(new Set(TUNINGS.map(t => t.id)).size, TUNINGS.length);
  for (const tuning of TUNINGS) {
    assert.equal(tuning.notes.length, 6);
    assert.ok(tuning.notes.every(n => Number.isInteger(n) && n >= 28 && n <= 64));
  }
});
