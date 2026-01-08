function safeAudio(src, volume = 0.6, loop = false) {
  try {
    const a = new Audio(src);
    a.volume = volume;
    a.loop = loop;
    a.preload = "auto";
    return a;
  } catch {
    return null;
  }
}

const click = safeAudio("/assets/click.mp3", 0.5, false);
const flip = safeAudio("/assets/flip.mp3", 0.6, false);
const jazz = safeAudio("/assets/jazz.mp3", 0.25, true);

export function playClick() {
  if (!click) return;
  try { click.currentTime = 0; click.play(); } catch {}
}

export function playFlip() {
  if (!flip) return;
  try { flip.currentTime = 0; flip.play(); } catch {}
}

export function toggleJazz(on) {
  if (!jazz) return;
  try {
    if (on) jazz.play();
    else { jazz.pause(); jazz.currentTime = 0; }
  } catch {}
}
