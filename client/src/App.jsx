import { createSignal, onMount } from "solid-js";

import TilePad from './components/TilePad';
import styles from './styles/App.module.css';

function App() {
  const [tileData, setTileData] = createSignal([]);

  onMount(async () => {
    // Fetches the public default English template
    const res = await fetch(`http://127.0.0.1:5000/public/english`);
    setTileData(await res.json());
  });

  return (
    <div class={styles.app}>
      <TilePad tileData={tileData} />
    </div>
  );
}

export default App;
