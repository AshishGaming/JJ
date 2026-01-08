import { useMemo, useState } from "react";
import Modal from "./Modal";
import { compliments } from "./data";
import { playClick } from "./sound";

export default function Kitchen({ onConfetti }) {
  const list = useMemo(() => compliments, []);
  const [candleOn, setCandleOn] = useState(false);
  const [compliment, setCompliment] = useState(
    "Klik op het hart voor een boodschap 💜"
  );
  const [cakeCount, setCakeCount] = useState(0);

  function randomCompliment() {
    playClick();
    const pick = list[Math.floor(Math.random() * list.length)];
    setCompliment(pick);
  }

  function toggleCandle() {
    playClick();
    setCandleOn((v) => !v);
  }

  function cake() {
    playClick();
    setCakeCount((c) => c + 1);
    onConfetti?.();
  }

  return (
    <Modal title="🍰 Keuken">
      {/* HEART BUTTONS */}
      <div className="kitchenActions">

        <button className="heartBtn" onClick={randomCompliment}>
          💜
          <span>Complimentje</span>
        </button>

        <button className="heartBtn" onClick={cake}>
          🍰
          <span>Taart x{cakeCount}</span>
        </button>
      </div>



      {/* MESSAGE CARD */}
      <div className={"messageCard " + (candleOn ? "glow" : "")}>
        {compliment}
      </div>

      <small className="hint">
        Taart = confetti 🎉
      </small>
    </Modal>
  );
}
