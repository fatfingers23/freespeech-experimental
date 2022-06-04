import { createSignal, Show } from "solid-js";

import styles from "../styles/TilePad.module.css";

function TilePadNavigation(props) {
	function toggleEditMode() {
		if (props.editMode()) {
			props.setLocalSettings("editMode", false);
			props.setEditMode(false);
		} else {
			props.setLocalSettings("editMode", true);
			props.setEditMode(true);
		}
	}

	function toggleMute() {
		if (props.muted())  {
			props.setLocalSettings("mute", false);
			props.setMuted(false);
		} 
		else {
			props.setLocalSettings("mute", true);
			props.setMuted(true);
			window.speechSynthesis.cancel();
		}
	}

	/*
		Navigation Functions
	*/

	function navigateBack() {
		let currentPage = props.history().sessionHistory.pop(); // Remove the current page from the history
		props.setHistory({ ...props.history(), futureHistory: [...props.history().futureHistory, currentPage] }); // Add the current page to the future history
		props.setPage(props.history().sessionHistory[props.history().sessionHistory.length - 1]); // Set the page to the previous page
	}

	function navigateForwards() {
		let nextPage = props.history().futureHistory.pop(); // Remove the next page from the future history
		props.setHistory({ ...props.history(), sessionHistory: [...props.history().sessionHistory, nextPage] }); // Add the next page to the session history
		props.setPage(nextPage); // Set the page to the next page
	}

	/*
		Tile Pad Settings Functions
	*/

	function updateFontSize(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), fontSize: e.target.value });
		props.setLocalSettings("fontSize", props.tilePadSettings().fontSize);
	}

	function updateIconSize(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), iconSize: e.target.value });
		props.setLocalSettings("iconSize", props.tilePadSettings().iconSize);
	}

	function updateTileWidth(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), tileWidth: e.target.value });
		props.setLocalSettings("tileWidth", props.tilePadSettings().tileWidth);
	}

	return (
		<div>
			<div class={styles.app_header}>
				<button
					onclick={toggleEditMode}
					class={`${styles.edit_button} ${props.editMode() ? styles.edit_active : ""}`}
				>
					<span class="material-symbols-outlined">edit</span>
				</button>

				<button
					onclick={toggleMute}
					class={`${styles.volume_button} ${props.muted() ? styles.volume_active : ""}`}
				>
					<span class="material-symbols-outlined">{props.muted() ? "volume_off" : "volume_up"}</span>
				</button>

				<div class={styles.navigation_bar}>
					<button disabled={props.history().sessionHistory.length < 2} onClick={navigateBack}>
						<span class="material-symbols-outlined">arrow_back</span>
					</button>
					<p>{props.page()}</p>
					<button disabled={props.history().futureHistory.length < 1} onClick={navigateForwards}>
						<span class="material-symbols-outlined">arrow_forward</span>
					</button>
				</div>
			</div>

			<Show when={props.editMode()}>
				<div class={styles.edit_mode_ribbon}>
					<div>
						<p>Text size:</p>
						<input onchange={updateFontSize} type="number" value={props.tilePadSettings().fontSize} />
					</div>
					<div>
						<p>Icon size:</p>
						<input onchange={updateIconSize} type="number" value={props.tilePadSettings().iconSize} />
					</div>
					<div>
						<p>Tile width:</p>
						<input onchange={updateTileWidth} type="number" value={props.tilePadSettings().tileWidth} />
					</div>
				</div>
			</Show>
		</div>
	);
}

export default TilePadNavigation;
