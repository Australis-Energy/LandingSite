// Transforms the standalone Lovable "Launch Video" export into the version we
// embed on the marketing site (public/launch-video.html).
//
// The export is a self-contained bundle: a base64 (gzipped) asset manifest plus
// a template that unpacks into blob URLs at runtime. The video itself is a React
// animation framework ("Stage") — not an mp4. To make it feel native to the site
// we patch the framework source inside the manifest to:
//   - drop the dark Stage chrome (#0a0a0a background + canvas drop shadow)
//   - remove the PlaybackBar (play/pause/scrubber)
//   - let the canvas fill the frame (no reserved control-bar height)
//   - slow playback to SPEED so it reads as ambient motion, not a demo reel
//
// Re-run after re-exporting from Lovable:  node scripts/patch-launch-video.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { gunzipSync, gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(root, 'src/static-pages/Australis Launch Video (standalone).html');
const OUT = resolve(root, 'public/launch-video.html');

const SPEED = 0.6; // playback rate; 1 = original speed

// The animation framework lives in the one text/jsx manifest entry.
const FRAMEWORK_MIME = 'text/jsx';

const patches = [
  // Outer Stage container: let the site show through instead of black letterbox.
  ["background: '#0a0a0a',", "background: 'transparent',"],
  // Canvas: drop the heavy drop shadow (the site already frames the panel).
  ["boxShadow: '0 20px 60px rgba(0,0,0,0.4)',", "boxShadow: 'none',"],
  // Scale-to-fit no longer needs to reserve room for the (removed) control bar.
  ['const barH = 44; // playback bar height', 'const barH = 0; // controls removed'],
  // Slow the timeline.
  ['const dt = (ts - lastTsRef.current) / 1000;', 'const dt = ((ts - lastTsRef.current) / 1000) * speed;'],
  ['  autoplay = true,', '  autoplay = true,\n  speed = 1,'],
  // Drop the playback controls entirely.
  [
    `      {/* Playback bar — stacked below canvas, never overlapping */}
      <PlaybackBar
        time={displayTime}
        actualTime={time}
        duration={duration}
        playing={playing}
        onPlayPause={() => setPlaying(p => !p)}
        onReset={() => { setTime(0); }}
        onSeek={(t) => setTime(t)}
        onHover={(t) => setHoverTime(t)}
      />`,
    '      {/* controls removed for embedded site use */}',
  ],
];

const html = readFileSync(SRC, 'utf8');

const manifestRe = /(<script type="__bundler\/manifest">)([\s\S]*?)(<\/script>)/;
const m = html.match(manifestRe);
if (!m) throw new Error('manifest script tag not found');
const manifest = JSON.parse(m[2]);

const entry = Object.values(manifest).find((e) => e.mime === FRAMEWORK_MIME);
if (!entry) throw new Error(`no ${FRAMEWORK_MIME} manifest entry`);

let source = Buffer.from(entry.data, 'base64');
if (entry.compressed) source = gunzipSync(source);
let code = source.toString('utf8');

for (const [from, to] of patches) {
  const count = code.split(from).length - 1;
  if (count !== 1) throw new Error(`expected exactly 1 match, found ${count} for:\n${from.slice(0, 80)}`);
  code = code.replace(from, () => to);
}
// Set the framework's default speed without touching the bundled bootstrap.
code = code.replace('  autoplay = true,\n  speed = 1,', `  autoplay = true,\n  speed = ${SPEED},`);

entry.data = gzipSync(Buffer.from(code, 'utf8')).toString('base64');
entry.compressed = true;

const patchedManifest = JSON.stringify(manifest);
let out = html.replace(manifestRe, () => m[1] + patchedManifest + m[3]);
// Match the unpack/loading wrapper background to the canvas so there's no
// cream flash while the bundle decodes. Only the outer wrapper CSS uses this
// literal (the template is base64-encoded inside the manifest).
out = out.split('#faf9f5').join('#EDF0F5');
writeFileSync(OUT, out);

console.log(`Patched launch video written to ${OUT} (speed ${SPEED}x, controls + dark frame removed)`);
