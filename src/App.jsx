import { useState } from "react";
import Room from "./Room";

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <div className="app">
      {!started ? (
        <div className="start" onClick={() => setStarted(true)}>
          <h1>Voor Jayani</h1>
          <p>21 ✨</p>
          <small>Klik om te beginnen</small>
        </div>
      ) : (
        <Room />
      )}
    </div>
  );
}
