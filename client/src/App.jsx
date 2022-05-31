import { createSignal, onMount, Show } from "solid-js";
import { Routes, Route } from "solid-app-router"

import styles from './styles/App.module.css';

import TilePad from './components/TilePad';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';

import { Color } from './assets/open-color';

function App() {
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
    highlightColor: Color['blue-4'],
    editButtonColor: Color['yellow-7'],
    volumeButtonColor: Color['green-7'],
    volumeMutedButtonColor: Color['red-7']
  };

  const [theme, setTheme] = createSignal(themeDark);

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
      <MenuBar theme={theme()} />

      <Routes>
        <Route path="/" element={ <TilePad theme={theme()} tileData={tileData} />} />
        <Route path="/settings" element={<Settings theme={theme()} themeCallback={themeChange} />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
