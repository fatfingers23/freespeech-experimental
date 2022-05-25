import { createSignal, onMount } from "solid-js";

import TilePad from './components/TilePad';
import styles from './styles/App.module.css';

function App() {
  const [tileData, setTileData] = createSignal([]);

  onMount(async () => {
    // Fetches data from a dummy api server
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=20`);
    setTileData(await res.json());
  });

  return (
    <div class={styles.app}>
      <TilePad tileData={tileData} />
    </div>
  );
}

export default App;
