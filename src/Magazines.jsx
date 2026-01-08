import { useState } from "react";
import Modal from "./Modal";
import { magazines } from "./data";
import { playFlip } from "./sound";

export default function Magazines({ onStartHeartsQuest }) {
  const [i, setI] = useState(0);

  function prev() { playFlip(); setI((v) => Math.max(v - 1, 0)); }
  function next() { playFlip(); setI((v) => Math.min(v + 1, magazines.length - 1)); }

  return (
    <Modal title="📰 Tijdschriften">
      <div className="mag">
        <h3>{magazines[i].title}</h3>
        <p className="magText">{magazines[i].text}</p>

        <div className="controls">
          <button onClick={prev} disabled={i === 0}>←</button>
          <span className="pager">{i + 1} / {magazines.length}</span>
          <button onClick={next} disabled={i === magazines.length - 1}>→</button>
        </div>

        <div className="magActions">
          <button className="primary" onClick={onStartHeartsQuest}>
            💜 Mini-Game: Vind de 3 hartjes
          </button>
        </div>
      </div>

      <small className="hint">Tip: na de mini-game unlock je een secret message</small>
    </Modal>
  );
}
