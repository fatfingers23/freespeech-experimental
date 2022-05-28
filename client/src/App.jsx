import { createSignal, onMount, Show } from "solid-js";
import { styled } from "solid-styled-components";

import styles from './styles/App.module.css';

import TilePad from './components/TilePad';
import MenuBar from './components/MenuBar';
import Settings from './components/Settings';

function App() {
  const [navigation, setNavigation] = createSignal('tiles');

  // Tile data
  const [tileData, setTileData] = createSignal([]);
  
  // Theme
  const themeLight = {
    name: 'Light',
    tileColor: '#f8f9fa',
    backgroundColor: '#e9ecef',
    textColor: 'black',
    navigationColor: '#228be6'
  };

  const themeDark = {
    name: 'Dark',
    tileColor: '#343a40',
    backgroundColor: '#212529',
    textColor: 'white',
    navigationColor: '#228be6'
  };

  const [theme, setTheme] = createSignal(themeDark);

  // Changes the background color of the app to match the theme.
  const AppWrapper = styled("div")`
    background-color: ${theme().backgroundColor};
  `;

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
    <AppWrapper class={styles.app}>
      {/* {<MenuBar theme={theme()} callback={navigate} />} */}

      {/* Tiles page */}
      <Show when={navigation() == 'tiles'}>
        <TilePad theme={theme()} tileData={tileData} />
      </Show>

      {/* Settings page */}
      <Show when={navigation() == 'settings'}>
        <Settings themeCallback={themeChange} />
      </Show>
    </AppWrapper>
    </>
  );
}

export default App;
