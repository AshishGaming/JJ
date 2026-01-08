import Modal from "./Modal";

export default function Surprise({ title = "🎉 Surprise!", text }) {
  return (
    <Modal title={title}>
      <p style={{ whiteSpace: "pre-line" }}>
        {text || "You’re loved. Today & always 💜"}
      </p>
    </Modal>
  );
}
