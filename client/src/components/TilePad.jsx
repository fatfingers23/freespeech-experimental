import { createSignal, Show } from "solid-js";
import { styled } from "solid-styled-components";

import styles from "../styles/TilePad.module.css";

import Tile from "./Tile";

/* TilePad Component 
   - This renders a grid of tiles based on an array of tiles
     provided by the server.
   - The grid is rendered as a div with a class of tilepad.
   - The grid is built based on some flex box css, in the future
     users will be able to customize the flex properties.
*/

function TilePad(props) {
	const [page, setPage] = createSignal("Home");
	const [sessionHistory, setSessionHistory] = createSignal(["Home"]);
	const [futureHistory, setFutureHistory] = createSignal([]);
	const [editMode, setEditMode] = createSignal(false);
	const [muted, setMuted] = createSignal(false);
	const [tilePadSettings, setTilePadSettings] = createSignal({
		fontSize: "18",
		iconSize: "50",
		tileWidth: "100",
	});

	// Callback function for the <Tile> component. Updates the pages when user clicks a folder.
	function updatePage(page) {
		if (futureHistory().length > 0)
			// Clear the future history if there is any.
			setFutureHistory([]);

		setPage(page); // Update the page state.
		setSessionHistory([...sessionHistory(), page]); // Update the session history.
	}

	/*
		Navigation Functions
	*/

	function navigateBack() {
		let currentPage = sessionHistory().pop(); // Remove the current page from the history
		setFutureHistory([...futureHistory(), currentPage]); // Add the current page to the future history
		setPage(sessionHistory()[sessionHistory().length - 1]); // Set the page to the previous page
	}

	function navigateForwards() {
		let nextPage = futureHistory().pop(); // Remove the next page from the future history
		setSessionHistory([...sessionHistory(), nextPage]); // Add the next page to the session history
		setPage(nextPage); // Set the page to the next page
	}

	/*
		Action Button Functions
	*/

	function toggleEditMode() {
		if (editMode()) setEditMode(false);
		else setEditMode(true);
	}

	function toggleMute() {
		if (muted()) setMuted(false);
		else setMuted(true);
	}

	/*
		Tile Pad Settings Functions
	*/

	function updateFontSize(e) {
		setTilePadSettings({ ...tilePadSettings(), fontSize: e.target.value });
	}

	function updateIconSize(e) {
		setTilePadSettings({ ...tilePadSettings(), iconSize: e.target.value });
	}

	function updateTileWidth(e) {
		setTilePadSettings({ ...tilePadSettings(), tileWidth: e.target.value });
	}

	const NavigationWrapper = styled("div")`
		--navigation-ribbon-color: ${props.theme.tileColor};
		--text-color: ${props.theme.textColor};
		margin-bottom: 5px;
		position: relative;
	`;

	return (
		<div style={{
			"--text-color": props.theme.textColor,
			"--background-color": props.theme.backgroundColor,
			"--font-size": `${tilePadSettings().fontSize}px`,
			"--navigation-color": props.theme.navigationColor,
			"--navigation-color-disable": props.theme.tileColor,
			"--edit-button-color": props.theme.editButtonColor,
			"--volume-button-color": props.theme.volumeButtonColor,
			"--volume-muted-button-color": props.theme.volumeMutedButtonColor
			
		}}>
			<NavigationWrapper class={styles.app_header}>
				<button
					onclick={toggleEditMode}
					class={`${styles.edit_button} ${
						editMode() ? styles.edit_active : ""
					}`}
				>
					<span class="material-symbols-outlined">edit</span>
				</button>

				<button
					onclick={toggleMute}
					class={`${styles.volume_button} ${
						muted() ? styles.volume_active : ""
					}`}
				>
					<span class="material-symbols-outlined">
						{muted() ? "volume_off" : "volume_up"}
					</span>
				</button>

				<div class={styles.navigation_bar}>
					<button
						disabled={sessionHistory().length < 2}
						onClick={navigateBack}
					>
						<span class="material-symbols-outlined">
							arrow_back
						</span>
					</button>
					<p>{page()}</p>
					<button
						disabled={futureHistory().length < 1}
						onClick={navigateForwards}
					>
						<span class="material-symbols-outlined">
							arrow_forward
						</span>
					</button>
				</div>
			</NavigationWrapper>

			<Show when={editMode()}>
				<div
					
					class={styles.edit_mode_ribbon}
				>
					<div>
						<p>Text size:</p>
						<input
							onchange={updateFontSize}
							type="number"
							value={tilePadSettings().fontSize}
						/>
					</div>
					<div>
						<p>Icon size:</p>
						<input
							onchange={updateIconSize}
							type="number"
							value={tilePadSettings().iconSize}
						/>
					</div>
					<div>
						<p>Tile width:</p>
						<input
							onchange={updateTileWidth}
							type="number"
							value={tilePadSettings().tileWidth}
						/>
					</div>
				</div>
			</Show>

			<div
				class={styles.tilepad}
			>
				<For
					each={props.tileData()[page()]}
					fallback={
						<div class={styles.loader}>
							<p>We're getting things ready for you!</p>
						</div>
					}
				>
					{(item) => (
						<Tile
							{...item}
							muted={muted()}
							iconSize={tilePadSettings().iconSize}
							tileWidth={tilePadSettings().tileWidth}
							theme={props.theme}
							callback={updatePage}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

export default TilePad;
