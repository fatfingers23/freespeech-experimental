import { createSignal, onMount, Show } from "solid-js";
import createLocalStore from "@solid-primitives/local-store";
import { Routes, Route } from "solid-app-router";

import styles from "./styles/App.module.css";

import TilePad from "./components/TilePad";
import MenuBar from "./components/MenuBar";
import Settings from "./components/Settings";
import Portal from "./components/Portal";

import { Color } from "./assets/open-color";
import { getLayout, sendEdit, validateSession } from "./API";

function App() {
	// User data
	const [userData, setUserData] = createSignal({});
	const [userSettings, setUserSettings] = createSignal({});
	const [localSettings, setLocalSettings] = createLocalStore("freespeechaac");

	// Check if localSettings are there, if not add them
	if (!localSettings.session) {
		setLocalSettings("fontSize", 18);
		setLocalSettings("iconSize", 50);
		setLocalSettings("tileWidth", 100);
		setLocalSettings("editMode", false);
		setLocalSettings("mute", false);
		setLocalSettings("isToolboxOpen", false);
		setLocalSettings("toolboxPage", "marketplace");
		setLocalSettings("mute", false);
		setLocalSettings("session", "");
	}

	// Tile data
	const [tileData, setTileData] = createSignal({});

	// Overflow
	const [overflow, setOverflow] = createSignal("scroll");

	// Ceck Session
	const checkSession = async () => {
		const res = await validateSession({
			session: localSettings.session,
		});

		if(res.user) {
			setUserData(res.user);
		}

		return res;
	};

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
		//refresh();
		const session = await checkSession();

		console.log(session);

		if (session.success == false && window.location.toString().includes("portal") == false) {
			window.location = "/portal";
		}

		refresh();
	});

	const themeChange = (userSelection) => {
		if (userSelection == "dark") {
			sendEdit({
				type: "theme",
				theme: "dark",
			});
			setTheme(themeDark);
		}
		if (userSelection == "light") {
			sendEdit({
				type: "theme",
				theme: "light",
			});
			setTheme(themeLight);
		}
	};

	const refresh = async () => {
		const layout = await getLayout({
			session: localSettings.session,
			layout: userData()["layouts"][userData()["selectedLayout"]]
		});
		
		setTileData(layout.layout.data);

		console.log(layout.layout);

		console.log(layout.layout.data);

		// Set the theme to the user's selected theme
		// themeChange(userData()["theme"]);
		// console.log(userData()["theme"]);
		// Set the settings to the user's settings
		// setUserSettings(userData()["settings"]);
	};

	function handleChange(page, index, tile) {
		let newTilePad = tileData();
		newTilePad[page][index]['text'] = tile.text;
		setTileData(newTilePad);
	}

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
									checkSession={checkSession}
									theme={theme()}
									refresh={refresh}
									userSettings={userSettings()}
									localSettings={localSettings}
									setLocalSettings={setLocalSettings}
									tileData={tileData}
									setOverflow={setOverflow}
									handleChange={handleChange}
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
						path="/portal"
						element={
							<>
								<Portal
									setLocalSettings={setLocalSettings}
									localSettings={localSettings()}
									theme={theme()}
								/>
							</>
						}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
