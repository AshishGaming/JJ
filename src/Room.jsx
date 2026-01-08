import { useEffect, useMemo, useRef, useState } from "react";
import Photobook from "./Photobook";
import Kitchen from "./Kitchen";
import Magazines from "./Magazines";
import MiniGame from "./MiniGame";
import Surprise from "./Surprise";
import { hearts as heartsData } from "./data";
import { playClick, toggleJazz } from "./sound";

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 1080;

export default function Room() {
  const stageRef = useRef(null);

  const hearts = useMemo(() => heartsData, []);
  const [active, setActive] = useState(null);

  const [debug, setDebug] = useState(true);

  const [questActive, setQuestActive] = useState(false);
  const [foundHearts, setFoundHearts] = useState(() => new Set());

  const [secretUnlocked, setSecretUnlocked] = useState(false);

  const [easterClicks, setEasterClicks] = useState(0);

  const [jazzOn, setJazzOn] = useState(false);

  // scale-to-fit
  useEffect(() => {
    function resize() {
      const scaleX = window.innerWidth / DESIGN_WIDTH;
      const scaleY = window.innerHeight / DESIGN_HEIGHT;
      const scale = Math.min(scaleX, scaleY);

      if (stageRef.current) stageRef.current.style.transform = `scale(${scale})`;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // debug toggle via D
  useEffect(() => {
    function onKey(e) {
      if (e.key.toLowerCase() === "d") setDebug((v) => !v);
      if (e.key.toLowerCase() === "m") {
        setJazzOn((v) => {
          const nv = !v;
          toggleJazz(nv);
          return nv;
        });
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // unlock secret when all hearts found
  useEffect(() => {
    if (!questActive) return;
    if (foundHearts.size === hearts.length) {
      setSecretUnlocked(true);
      setActive("secret");
      setQuestActive(false);
    }
  }, [foundHearts, hearts.length, questActive]);

  function confettiBurst() {
    // Zonder dependency: simpel “fake confetti” via emoji burst
    playClick();
    const root = document.createElement("div");
    root.className = "emojiBurst";
    root.textContent = "🎉✨💜🎉✨💜";
    document.body.appendChild(root);
    setTimeout(() => root.remove(), 900);
  }

  function open(name) {
    playClick();
    setActive(name);
  }

  function close() {
    setActive(null);
  }

  function startHeartsQuest() {
    playClick();
    setQuestActive(true);
    setFoundHearts(new Set());
    setActive("minigame");
  }

  function clickHeart(id) {
    playClick();
    setFoundHearts((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }

  // Easter egg: klik 5x op geheim vlak
  function secretClick() {
    playClick();
    setEasterClicks((c) => {
      const n = c + 1;
      if (n >= 5) {
        setActive("cat");
        return 0;
      }
      return n;
    });
  }

  return (
    <div className="viewport">
      <div className={"stage " + (debug ? "debug" : "")} ref={stageRef}>
        {/* UI toggles */}
        <div className="topUI">
          <button
            className={"pill " + (jazzOn ? "on" : "")}
            onClick={() => {
              const nv = !jazzOn;
              setJazzOn(nv);
              toggleJazz(nv);
            }}
          >
            🎶 Jazz: {jazzOn ? "On" : "Off"} <span className="tiny">(M)</span>
          </button>
          <button className="pill" onClick={() => setDebug((v) => !v)}>
            🔧 Debug: {debug ? "On" : "Off"} <span className="tiny">(D)</span>
          </button>
        </div>

        {/* HOTSPOTS — pas de posities aan in CSS */}
        <div className="hotspot bookshelf" onClick={() => open("photos")} title="Bookshelf" />
        <div className="hotspot kitchen" onClick={() => open("kitchen")} title="Kitchen" />
        <div className="hotspot table" onClick={() => open("magazines")} title="Table" />

        {/* Optional: een “window” hotspot voor sfeer toggle later (placeholder) */}
        <div className="hotspot window" onClick={() => open("vibe")} title="Window" />

        {/* Easter egg hotspot (onzichtbaar) */}
        <div className="hotspot easter" onClick={secretClick} title="???" />

        {/* Hearts (alleen zichtbaar tijdens quest) */}
        {questActive &&
          hearts.map((h) =>
            foundHearts.has(h.id) ? null : (
              <button
                key={h.id}
                className="heart"
                style={{ left: h.x, top: h.y }}
                onClick={() => clickHeart(h.id)}
              >
                💜
              </button>
            )
          )}

        {/* OVERLAY */}
        {active && (
          <div className="overlay" onClick={close}>
            {active === "photos" && <Photobook />}
            {active === "kitchen" && (
  <Kitchen onConfetti={fullScreenConfetti} />
)}

            {active === "magazines" && <Magazines onStartHeartsQuest={startHeartsQuest} />}

            {active === "minigame" && (
              <MiniGame found={foundHearts.size} total={hearts.length} />
            )}

            {active === "secret" && (
              <Surprise
                title="🔓 Gelukt!"
                text={"Je vond alle hartjes 😭💜\n\nDit is je secret message:\n\nJij bent echt één van mijn favoriete mensen.\nHappy birthday! ✨"}
              />
            )}

            {active === "cat" && (
              <Surprise
                title="🐱 Easter egg!"
                text={"MEOW! Je hebt de geheime plek gevonden 😼\n\nOké oké… je bent officieel te slim 💜"}
              />
            )}

            {active === "vibe" && (
              <Surprise
                title="🪟 Vibe"
                text={"Hier kun je later een day/night toggle doen 🌙\n\n(Als je wilt maak ik die ook met echte lighting.)"}
              />
            )}
          </div>
        )}

        {/* little hint */}
        <div className="bottomHint">
          <span>Hotspots: 📚 bookshelf = photobook • 🍳 kitchen • 📰 table</span>
        </div>
      </div>
    </div>
  );
}

function fullScreenConfetti() {
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;

  function resize() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["#c9a6ff", "#5b2a86", "#ffffff", "#e6c98f"];
  const pieces = Array.from({ length: 220 }).map(() => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * -window.innerHeight,
    size: 6 + Math.random() * 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 4,
    tilt: Math.random() * 10,
    tiltSpeed: Math.random() * 0.1,
    rot: Math.random() * Math.PI
  }));

  let start = performance.now();

  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.y += p.speed;
      p.rot += p.tiltSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
    });

    if (t - start < 2200) {
      requestAnimationFrame(draw);
    } else {
      document.body.removeChild(canvas);
      window.removeEventListener("resize", resize);
    }
  }

  requestAnimationFrame(draw);
}
