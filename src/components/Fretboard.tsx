import { useState, type CSSProperties } from 'react';
import { TUNINGS, SHARPS, FLATS, SCALES, scaleNotes, noteName, octave, pitchClass } from '../lib/music.mjs';

export default function Fretboard() {
  const [tuningId, setTuningId] = useState('standard');
  const [strings, setStrings] = useState<number[]>([...TUNINGS[0].notes]);
  const [flats, setFlats] = useState(false);
  const [frets, setFrets] = useState(12);
  const [customNotes, setCustomNotes] = useState<number[]>([]);
  const [scaleId, setScaleId] = useState('major');
  const [root, setRoot] = useState(0);
  const selectedNotes = scaleId === 'custom' ? customNotes : scaleNotes(root, scaleId);
  const [leftHanded, setLeftHanded] = useState(false);
  const tuning = TUNINGS.find(t => t.id === tuningId);
  const names = flats ? FLATS : SHARPS;
  const columns = Array.from({ length: frets + 1 }, (_, i) => i);
  if (leftHanded) columns.reverse();
  function toggleNote(note: number) {
    setCustomNotes(selectedNotes.includes(note)
      ? selectedNotes.filter(selected => selected !== note)
      : [...selectedNotes, note]);
    setScaleId('custom');
  }
  function changeRoot(nextRoot: number) {
    if (scaleId === 'custom') {
      setCustomNotes(previous => previous.map(note => pitchClass(note + nextRoot - root)));
    }
    setRoot(nextRoot);
  }
  function chooseScale(id: string) {
    if (id === 'custom') setCustomNotes([...selectedNotes]);
    setScaleId(id);
  }
  function clearNotes() {
    setCustomNotes([]);
    setScaleId('custom');
  }
  function chooseTuning(id: string) {
    setTuningId(id);
    const preset = TUNINGS.find(t => t.id === id);
    if (preset) setStrings([...preset.notes]);
  }
  function customize(index: number, value: number) {
    setStrings(prev => prev.map((n, i) => i === index ? value : n));
    setTuningId('custom');
  }
  return <div className="site-shell">
    <header className="site-header">
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="Guitar Tuning Tool home"><span className="brand-icon" aria-hidden="true">♮</span>Guitar Tuning Tool</a>
    </header>
    <main>
      <section className="intro">
        <h1>Guitar Tuning Tool</h1>
        <p>Select a guitar tuning and highlight notes in your selected scale.<br className="desktop-break" /> Customize individual tuning and choose any scales and notes.</p>
      </section>
      <section className="workspace" aria-label="Interactive guitar fretboard">
        <div className="controls">
          <div className="tuning-control"><label htmlFor="tuning">YOUR TUNING</label><select id="tuning" value={tuningId} onChange={e => chooseTuning(e.target.value)}>{TUNINGS.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}<option value="custom">Custom tuning</option></select></div>
          <div className="tuning-strings">
            <div className="string-controls" role="group" aria-label="Open string tuning, low to high">{strings.map((n, i) => <label key={i}><span>STRING {6 - i}</span><select aria-label={`String ${6 - i} tuning`} value={n} onChange={e => customize(i, Number(e.target.value))}>{Array.from({ length: 37 }, (_, j) => j + 28).map(midi => <option key={midi} value={midi}>{noteName(midi, flats)}{octave(midi)}</option>)}</select></label>)}</div>
            <p className="tuning-help">Low → high · Edit any string for a custom tuning.</p>
          </div>
          <div className="notation-control"><span className="control-label">NOTATION</span><div className="segmented"><button aria-pressed={!flats} onClick={() => setFlats(false)}>♯ Sharps</button><button aria-pressed={flats} onClick={() => setFlats(true)}>♭ Flats</button></div></div>
        </div>
        <div className="board-header"><div><h2>{tuning?.name ?? 'Custom tuning'} <span>6-string guitar</span></h2><p>{tuning?.description ?? 'Set the pitch of each open string using the controls above.'}</p></div><label className="fret-select" htmlFor="frets">Show <select id="frets" value={frets} onChange={e => setFrets(Number(e.target.value))}><option value={12}>12 frets</option><option value={15}>15 frets</option><option value={24}>24 frets</option></select></label></div>
        <div className="board-scroll" tabIndex={0} role="region" aria-label="Fretboard; scroll horizontally to see all frets">
          <div className="fretboard" style={{ '--columns': frets + 1, minWidth: frets > 15 ? 1560 : frets > 12 ? 1100 : 900 } as CSSProperties}>
            <div className="fret-numbers">{columns.map(f => <span key={f}>{f === 0 ? 'OPEN' : f}</span>)}</div>
            <div className="neck">{[...strings].reverse().map((open, row) => <div className="string-row" key={row} style={{ '--string-width': `${1 + row * .45}px` } as CSSProperties}>{columns.map(f => {
              const n = open + f;
              const selected = selectedNotes.includes(pitchClass(n));
              const dimmed = selectedNotes.length > 0 && !selected;
              return <div className={`fret-cell ${f === 0 ? 'open-cell' : ''} ${leftHanded ? 'reversed' : ''}`} key={f}><button className={`note ${dimmed ? 'dimmed' : ''} ${selected ? 'highlighted' : ''} ${names[pitchClass(n)].length > 1 ? 'accidental' : ''}`} aria-label={`String ${row + 1}, ${f === 0 ? 'open' : `fret ${f}`}: ${noteName(n, flats)}${octave(n)}`} aria-pressed={selected} onClick={() => toggleNote(pitchClass(n))}>{noteName(n, flats)}</button></div>;
            })}</div>)}</div>
            <div className="fret-markers" aria-hidden="true">{columns.map(f => <span key={f}>{f > 0 && f % 12 === 0 ? '● ●' : [3, 5, 7, 9].includes(f % 12) ? '●' : ''}</span>)}</div>
          </div>
        </div>
        <div className="board-footer"><span><i className="legend-dot" /> Click a note to find it across the fretboard</span><label className="toggle-label"><input type="checkbox" checked={leftHanded} onChange={e => setLeftHanded(e.target.checked)} /> Left-handed view</label></div>
        <div className="highlight-panel scale-panel">
          <div className="scale-controls">
            <label htmlFor="scale">SCALE<select id="scale" value={scaleId} onChange={e => chooseScale(e.target.value)}><option value="custom">Custom notes</option>{SCALES.map(scale => <option key={scale.id} value={scale.id}>{scale.name}</option>)}</select></label>
            <label htmlFor="scale-root">ROOT NOTE<select id="scale-root" value={root} onChange={e => changeRoot(Number(e.target.value))}>{names.map((name, i) => <option key={i} value={i}>{name}</option>)}</select></label>
          </div>
          <div className="highlight-heading"><h3>Note highlighting</h3><p>Select a scale or choose custom notes.</p></div>
          <button className="clear-button" onClick={clearNotes} disabled={selectedNotes.length === 0}>Clear ↺</button>
          <div className="note-filters" role="group" aria-label="Notes to highlight">{names.map((name, i) => <button key={i} aria-pressed={selectedNotes.includes(i)} onClick={() => toggleNote(i)}>{name}</button>)}</div>
          <p className="selection-description" aria-live="polite">{scaleId === 'custom'
            ? selectedNotes.length === 0 ? 'All notes shown. Select any combination of notes to highlight.' : `Custom notes: ${selectedNotes.map(note => names[note]).join(' · ')}`
            : `${names[root]} ${SCALES.find(scale => scale.id === scaleId)?.name.toLowerCase()}: ${selectedNotes.map(note => names[note]).join(' · ')}. Edit any note to switch to Custom.`}</p>
        </div>
      </section>
    </main>
    <footer className="site-footer"><span>Guitar Tuning Tool</span><span>6-STRING GUITAR FRETBOARD</span></footer>
  </div>;
}
