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
	const [editMode, setEditMode] = createSignal(true);
	const [tilePadSettings, setTilePadSettings] = createSignal({
		fontSize: "18",
		iconSize: "50"
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
		setPage(sessionHistory().at(-1)); // Set the page to the previous page
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
		if(editMode())
			setEditMode(false);
		else
			setEditMode(true);
	}

	/*
		Tile Pad Settings Functions
	*/

	function updateFontSize(e) {
		setTilePadSettings({...tilePadSettings(), fontSize: e.target.value});
	}

	function updateIconSize(e) {
		setTilePadSettings({...tilePadSettings(), iconSize: e.target.value});
	}

	const NavigationWrapper = styled("div")`
		--navigation-ribbon-color: ${props.theme.tileColor};
		--text-color: ${props.theme.textColor};
		margin-bottom: 5px;
		position: relative;
	`;

	const EditModeWrapper = styled("div")`
		--navigation-ribbon-color: ${props.theme.tileColor};
		--text-color: ${props.theme.textColor};
		margin-bottom: 5px;
		position: relative;
	`;

	return (
		<>
			<NavigationWrapper class={styles.app_header}>
				
				<button onclick={toggleEditMode} class={`${styles.edit_button} ${editMode() ? styles.edit_active : ''}`}>
					<span class="material-symbols-outlined">edit</span>
				</button>
				
				<div class={styles.navigation_bar}>
					<button
						disabled={sessionHistory().length < 2}
						onClick={navigateBack}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							class={styles.rotate}
							width="50"
							height="50"
							viewBox="0 0 50 50"
							style=" fill:#FFFFFF;"
						>
							<path d="M 28 39 C 27.847656 39 27.695313 38.964844 27.558594 38.894531 C 27.214844 38.726563 27 38.382813 27 38 L 27 30 L 5 30 C 4.449219 30 4 29.554688 4 29 L 4 21 C 4 20.449219 4.449219 20 5 20 L 27 20 L 27 12 C 27 11.621094 27.214844 11.273438 27.558594 11.105469 C 27.898438 10.9375 28.304688 10.976563 28.609375 11.207031 L 45.609375 24.207031 C 45.855469 24.394531 46 24.6875 46 25 C 46 25.3125 45.855469 25.605469 45.605469 25.792969 L 28.605469 38.792969 C 28.429688 38.929688 28.214844 39 28 39 Z"></path>
						</svg>
					</button>
					<p>{page()}</p>
					<button
						disabled={futureHistory().length < 1}
						onClick={navigateForwards}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							x="0px"
							y="0px"
							width="50"
							height="50"
							viewBox="0 0 50 50"
							style=" fill:#FFFFFF;"
						>
							<path d="M 28 39 C 27.847656 39 27.695313 38.964844 27.558594 38.894531 C 27.214844 38.726563 27 38.382813 27 38 L 27 30 L 5 30 C 4.449219 30 4 29.554688 4 29 L 4 21 C 4 20.449219 4.449219 20 5 20 L 27 20 L 27 12 C 27 11.621094 27.214844 11.273438 27.558594 11.105469 C 27.898438 10.9375 28.304688 10.976563 28.609375 11.207031 L 45.609375 24.207031 C 45.855469 24.394531 46 24.6875 46 25 C 46 25.3125 45.855469 25.605469 45.605469 25.792969 L 28.605469 38.792969 C 28.429688 38.929688 28.214844 39 28 39 Z"></path>
						</svg>
					</button>
				</div>
			</NavigationWrapper>

			<Show when={editMode()}>
				<EditModeWrapper class={styles.edit_mode_ribbon}>
					<div>
						<p>Text size:</p>
						<input onchange={updateFontSize} type="number" value="18" />
					</div>
					<div>
						<p>Icon size:</p>
						<input onchange={updateIconSize} type="number" value="50" />
					</div>
				</EditModeWrapper>
			</Show>

			<div style={{'--font-size':`${tilePadSettings().fontSize}px`}} class={styles.tilepad}>
				<For
					each={props.tileData()[page()]}
					fallback={<div>Loading...</div>}
				>
					{(item) => (
						<Tile
							{...item}
							iconSize={tilePadSettings().iconSize}
							theme={props.theme}
							callback={updatePage}
						/>
					)}
				</For>
			</div>
		</>
	);
}

export default TilePad;
