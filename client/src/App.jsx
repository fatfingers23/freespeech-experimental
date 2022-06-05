import { createSignal, onMount, Show } from "solid-js";
import createLocalStore from "@solid-primitives/local-store";
import { Routes, Route } from "solid-app-router";

import styles from "./styles/App.module.css";

import TilePad from "./components/TilePad";
import MenuBar from "./components/MenuBar";
import Settings from "./components/Settings";
import Login from "./components/Login";

import { Color } from "./assets/open-color";
import { fetchData, sendEdit } from "./API";

function App() {
	// User data
	const [userData, setUserData] = createSignal({});
	const [userSettings, setUserSettings] = createSignal({});
	const [localSettings, setLocalSettings] = createLocalStore("freespeechaac");

	// Check if localSettings are there, if not add them
	if (!localSettings.toolboxPage) {
		setLocalSettings("fontSize", 18);
		setLocalSettings("iconSize", 50);
		setLocalSettings("tileWidth", 100);
		setLocalSettings("editMode", false);
		setLocalSettings("mute", false);
		setLocalSettings("isToolboxOpen", false);
		setLocalSettings("toolboxPage", "marketplace");
	}

	// Tempral
	// TODO : Find a better way to handle this case
	if (!localSettings.mute) {
		setLocalSettings("mute", false);
	}

	// Tile data
	const [tileData, setTileData] = createSignal([]);

	// Overflow
	const [overflow, setOverflow] = createSignal("scroll");

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
		if (userSelection == "dark") {
			sendEdit({
				type: "theme",
				theme: "dark"
			});
			setTheme(themeDark);
		}
		if (userSelection == "light") {
			sendEdit({
				type: "theme",
				theme: "light"
			});
			setTheme(themeLight);
		}
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
			<div style={{ "--background-color": theme().backgroundColor, overflow: overflow() }} class={styles.app}>
				<Routes>
					{/* Home */}
					<Route
						path="/"
						element={
							<>
								<MenuBar theme={theme()} refresh={refresh} username={userData()["username"]} />
								<TilePad
									theme={theme()}
									refresh={refresh}
									userSettings={userSettings()}
									localSettings={localSettings}
									setLocalSettings={setLocalSettings}
									tileData={tileData}
									setOverflow={setOverflow}
								/>
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
