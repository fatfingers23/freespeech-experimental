import { createSignal, onMount, Show } from "solid-js";
import { Routes, Route } from "solid-app-router";

import styles from "./styles/App.module.css";

import TilePad from "./components/TilePad";
import MenuBar from "./components/MenuBar";
import Settings from "./components/Settings";
import Login from "./components/Login";

import { Color } from "./assets/open-color";
import { fetchData } from "./API";

function App() {
	// User data
	const [userData, setUserData] = createSignal({});
	const [userSettings, setUserSettings] = createSignal({});

	// Tile data
	const [tileData, setTileData] = createSignal([]);

	// Theme
	const themeLight = {
		name: "Light",
		tileColor: Color["gray-0"],
		backgroundColor: Color["gray-2"],
		textColor: Color["gray-9"],
		textColorSecondary: Color["gray-5"],
		navigationColor: Color["blue-6"],
		highlightColor: Color["blue-2"],
		editButtonColor: Color["yellow-7"],
		volumeButtonColor: Color["green-7"],
		volumeMutedButtonColor: Color["red-7"],
	};

	const themeDark = {
		name: "Dark",
		tileColor: Color["gray-8"],
		backgroundColor: Color["gray-9"],
		textColor: Color["gray-0"],
		textColorSecondary: Color["gray-5"],
		navigationColor: Color["blue-6"],
		highlightColor: Color["blue-4"],
		editButtonColor: Color["yellow-7"],
		volumeButtonColor: Color["green-7"],
		volumeMutedButtonColor: Color["red-7"],
	};

	const [theme, setTheme] = createSignal(themeDark);

	onMount(async () => {
		refresh();
	});

	const themeChange = (userSelection) => {
		if (userSelection == "dark") setTheme(themeDark);
		if (userSelection == "light") setTheme(themeLight);
	};

	const refresh = async () => {
		// Fetch data for the (mock) user
		setUserData(await fetchData());
		// Set the tile Data to the user's selected layout
		setTileData(userData()["layouts"][userData()["selected-layout"]]);
		// Set the theme to the user's selected theme
		themeChange(userData()["settings"]["theme"]);
		// Set the settings to the user's settings
		setUserSettings(userData()["settings"]);
	};

	return (
		<>
			<div style={{ "--background-color": theme().backgroundColor }} class={styles.app}>
				<Routes>
					{/* Home */}
					<Route
						path="/"
						element={
							<>
								<MenuBar theme={theme()} refresh={refresh} />
								<TilePad theme={theme()} refresh={refresh} userSettings={userSettings()} tileData={tileData} />
							</>
						}
					/>

					{/* Settings */}
					<Route
						path="/settings"
						element={
							<>
								<MenuBar theme={theme()} refresh={refresh} />
								<Settings theme={theme()} themeCallback={themeChange} />
							</>
						}
					/>

					{/* Login */}
					<Route
						path="/login"
						element={
							<>
								<Login theme={theme()} />
							</>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
