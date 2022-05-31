import { createSignal } from "solid-js";

import styles from "../styles/TilePad.module.css";

import Tile from "./Tile";
import TilePadNavigation from './TilePadNavigation';
import EditModal from './EditModal';

/* TilePad Component 
   - This renders a grid of tiles based on an array of tiles
     provided by the server.
   - The grid is rendered as a div with a class of tilepad.
   - The grid is built based on some flex box css, in the future
     users will be able to customize the flex properties.
*/

function TilePad(props) {
	const [page, setPage] = createSignal("Home");
	const [muted, setMuted] = createSignal(false);
	const [editMode, setEditMode] = createSignal(false);
	const [editModalOpen, setEditModalOpen] = createSignal(false);
	const [history, setHistory] = createSignal(
		{
			sessionHistory: ["Home"],
			futureHistory: []
		}
	);
	// const [sessionHistory, setSessionHistory] = createSignal(["Home"]);
	// const [futureHistory, setFutureHistory] = createSignal([]);
	
	const [tilePadSettings, setTilePadSettings] = createSignal({
		fontSize: "18",
		iconSize: "50",
		tileWidth: "100",
	});

	function updatePage(_page) {
		if (history().futureHistory.length > 0)
			// Clear the future history if there is any.
			setHistory({...history(), futureHistory: []});

		setPage(_page); // Update the page state.
		setHistory({...history(), sessionHistory: [...history().sessionHistory, page()]}); // Update the session history.
	}

	function handleEdit() {
		if(!editModalOpen()) {
			setEditModalOpen(true);
		}
	}

	function closeEditModal() {
		setEditModalOpen(false);
	}

	return (
		<div
			style={{
				"--text-color": props.theme.textColor,
				"--background-color": props.theme.backgroundColor,
				"--font-size": `${tilePadSettings().fontSize}px`,
				"--navigation-color": props.theme.navigationColor,
				"--navigation-color-disable": props.theme.tileColor,
				"--edit-button-color": props.theme.editButtonColor,
				"--volume-button-color": props.theme.volumeButtonColor,
				"--volume-muted-button-color":
					props.theme.volumeMutedButtonColor,
				"--navigation-ribbon-color": props.theme.tileColor
			}}
		>	
			<Show when={editModalOpen()}>
				<EditModal closeModal={closeEditModal} theme={props.theme} />
			</Show>
			<TilePadNavigation 
				page={page}
				setPage={setPage}
				tilePadSettings={tilePadSettings}
				setTilePadSettings={setTilePadSettings}
				history={history}
				setHistory={setHistory}
				muted={muted}
				setMuted={setMuted}
				editMode={editMode}
				setEditMode={setEditMode}
			/>

			<div class={styles.tilepad}>
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
							editMode={editMode}
							callback={updatePage}
							handleEdit={handleEdit}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

export default TilePad;
