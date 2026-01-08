export default function Modal({ title, children }) {
  return (
    <div className="modal" onClick={(e) => e.stopPropagation()}>
      {title && <h2>{title}</h2>}
      <div className="modalBody">{children}</div>
    </div>
  );
}
