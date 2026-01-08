import Modal from "./Modal";

export default function MiniGame({ found, total }) {
  return (
    <Modal title="💜 Mini-game">
      <p>Vind alle hartjes in de kamer!</p>
      <div className="progress">
        <div className="bar" style={{ width: `${(found / total) * 100}%` }} />
      </div>
      <p><b>{found}</b> / <b>{total}</b> gevonden</p>
      <small className="hint">Klik op de hartjes die je ziet ✨</small>
    </Modal>
  );
}
