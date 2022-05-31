import { createSignal, Show } from "solid-js";

import styles from "../styles/TilePad.module.css";



function TilePadNavigation(props) {
    const [editMode, setEditMode] = createSignal(false);
	const [muted, setMuted] = createSignal(false);
    
    function toggleEditMode() {
        if (editMode()) setEditMode(false);
        else setEditMode(true);
    }
    
    function toggleMute() {
        if (muted()) setMuted(false);
        else {
            setMuted(true);
            window.speechSynthesis.cancel();
        }
    }

	/*
		Navigation Functions
	*/

	function navigateBack() {
		let currentPage = props.sessionHistory().pop(); // Remove the current page from the history
		props.setFutureHistory([...props.futureHistory(), currentPage]); // Add the current page to the future history
		props.setPage(props.sessionHistory()[props.sessionHistory().length - 1]); // Set the page to the previous page
	}

	function navigateForwards() {
		let nextPage = props.futureHistory().pop(); // Remove the next page from the future history
		props.setSessionHistory([...props.sessionHistory(), nextPage]); // Add the next page to the session history
		props.setPage(nextPage); // Set the page to the next page
	}

	/*
		Tile Pad Settings Functions
	*/

	function updateFontSize(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), fontSize: e.target.value });
	}

	function updateIconSize(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), iconSize: e.target.value });
	}

	function updateTileWidth(e) {
		props.setTilePadSettings({ ...props.tilePadSettings(), tileWidth: e.target.value });
	}

    console.log(props.sessionHistory())

	return (
		<div>
			<div class={styles.app_header}>
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
						disabled={props.sessionHistory().length < 2}
						onClick={navigateBack}
					>
						<span class="material-symbols-outlined">
							arrow_back
						</span>
					</button>
					<p>{props.page()}</p>
					<button
						disabled={props.futureHistory().length < 1}
						onClick={navigateForwards}
					>
						<span class="material-symbols-outlined">
							arrow_forward
						</span>
					</button>
				</div>
			</div>

			<Show when={editMode()}>
				<div class={styles.edit_mode_ribbon}>
					<div>
						<p>Text size:</p>
						<input
							onchange={updateFontSize}
							type="number"
							value={props.tilePadSettings().fontSize}
						/>
					</div>
					<div>
						<p>Icon size:</p>
						<input
							onchange={updateIconSize}
							type="number"
							value={props.tilePadSettings().iconSize}
						/>
					</div>
					<div>
						<p>Tile width:</p>
						<input
							onchange={updateTileWidth}
							type="number"
							value={props.tilePadSettings().tileWidth}
						/>
					</div>
				</div>
			</Show>
		</div>
	);
}

export default TilePadNavigation;
