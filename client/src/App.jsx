import { createSignal, onMount } from "solid-js";

import styles from './styles/App.module.css';

import TilePad from './components/TilePad';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';

function App() {
  const [tileData, setTileData] = createSignal([]);
  const [navigation, setNavigation] = createSignal('tiles');

  function navigate(nav) {
    setNavigation(nav);
  }

  onMount(async () => {
    // Fetches the public default English template
    const res = await fetch(`http://127.0.0.1:5000/public/english`);
    setTileData(await res.json());
  });

  return (
    <div class={styles.app}>
      <MenuBar callback={navigate} />

      {/* Tiles page */}
      <Show when={navigation() == 'tiles'}>
        <TilePad tileData={tileData} />
      </Show>

      {/* Settings page */}
      <Show when={navigation() == 'settings'}>
        <Settings />
      </Show>
    </div>
  );
}

export default App;
