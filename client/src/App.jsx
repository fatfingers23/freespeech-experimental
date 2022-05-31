import { createSignal, onMount, Show } from "solid-js";

import styles from './styles/App.module.css';

import TilePad from './components/TilePad';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';

import { Color } from './assets/open-color';

function App() {
  const [navigation, setNavigation] = createSignal('tiles');

  // Tile data
  const [tileData, setTileData] = createSignal([]);
  
  // Theme
  const themeLight = {
    name: 'Light',
    tileColor: Color['gray-0'],
    backgroundColor: Color['gray-2'],
    textColor: Color['gray-9'],
    navigationColor: Color['blue-6'],
    highlightColor: Color['blue-2'],
    editButtonColor: Color['yellow-7'],
    volumeButtonColor: Color['green-7'],
    volumeMutedButtonColor: Color['red-7']
  };

  const themeDark = {
    name: 'Dark',
    tileColor: Color['gray-8'],
    backgroundColor: Color['gray-9'],
    textColor: Color['gray-0'],
    navigationColor: Color['blue-6'],
    highlightColor: Color['blue-2'],
    editButtonColor: Color['yellow-7'],
    volumeButtonColor: Color['green-7'],
    volumeMutedButtonColor: Color['red-7']
  };

  const [theme, setTheme] = createSignal(themeDark);

  function navigate(nav) {
    setNavigation(nav);
  }

  onMount(async () => {
    // Fetches the public default English template
    const res = await fetch(`http://127.0.0.1:5000/public/english`);
    setTileData(await res.json());
  });

  function themeChange(elem) {
    const userSelection = elem.target.value;
    
    if(userSelection == 'Dark')
      setTheme(themeDark);

    if(userSelection == 'Light')
      setTheme(themeLight);

  }

  return (
    <>
    <div style={{'--background-color':theme().backgroundColor}} class={styles.app}>
      <MenuBar theme={theme()} callback={navigate} />

      {/* Tiles page */}
      <Show when={navigation() == 'tiles'}>
        <TilePad theme={theme()} tileData={tileData} />
      </Show>

      {/* Settings page */}
      <Show when={navigation() == 'settings'}>
        <Settings theme={theme()} themeCallback={themeChange} />
      </Show>
    </div>
    </>
  );
}

export default App;
