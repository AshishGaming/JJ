import { useMemo, useState } from "react";
import Modal from "./Modal";
import { photobookPages } from "./data";
import { playFlip } from "./sound";

export default function Photobook() {
  // filter optionele foto4/5 eruit als ze niet bestaan (simpel: laat ze gewoon staan; browser toont broken image)
  const pages = useMemo(() => photobookPages, []);
  const [page, setPage] = useState(0);

  function prev() {
    playFlip();
    setPage((p) => Math.max(p - 1, 0));
  }
  function next() {
    playFlip();
    setPage((p) => Math.min(p + 1, pages.length - 1));
  }

  return (
    <Modal title="📚 Fotoboek">
      <div className="card">
        <img className="photo" src={pages[page].img} alt="memory" />
        <p className="caption">{pages[page].text}</p>

        <div className="controls">
          <button onClick={prev} disabled={page === 0}>←</button>
          <span className="pager">{page + 1} / {pages.length}</span>
          <button onClick={next} disabled={page === pages.length - 1}>→</button>
        </div>
      </div>
      <small className="hint">Tip: klik buiten het venster om te sluiten</small>
    </Modal>
  );
}
