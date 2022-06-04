import { createSignal, createEffect } from "solid-js";

import styles from "../styles/TilePad.module.css";

import Tile from "./Tile";
import TilePadNavigation from "./TilePadNavigation";
import EditModal from "./EditModal";
import Toolbox from "./Toolbox";

import { sendEdit } from "../API";

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

	/* Edit Mode */
	const [editMode, setEditMode] = createSignal(false);
	const [editModalOpen, setEditModalOpen] = createSignal(false);
	const [editTile, setEditTile] = createSignal({});

	/* History */
	const [history, setHistory] = createSignal({
		sessionHistory: ["Home"],
		futureHistory: [],
	});

	const [tilePadSettings, setTilePadSettings] = createSignal({
		fontSize: props.userSettings['font-size'],
		iconSize: props.userSettings['icon-size'],
		tileWidth: props.userSettings['tile-width']
	});

	function updatePage(_page) {
		if (history().futureHistory.length > 0)
			// Clear the future history if there is any.
			setHistory({ ...history(), futureHistory: [] });

		setPage(_page); // Update the page state.
		setHistory({ ...history(), sessionHistory: [...history().sessionHistory, page()] }); // Update the session history.
	}

	function handleEdit(tileProps) {
		if (!editModalOpen()) {
			setEditModalOpen(true);
			setEditTile(tileProps);
		}
	}

	const closeEditModal = (tile) => {
		if (tile.oldText !== tile.text) {
			sendEdit({...tile, page: page()});
		}
		setEditModalOpen(false);
	}

	createEffect(() => {
		setTilePadSettings({
			fontSize: props.userSettings['font-size'],
			iconSize: props.userSettings['icon-size'],
			tileWidth: props.userSettings['tile-width']
		});
	});

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
				"--volume-muted-button-color": props.theme.volumeMutedButtonColor,
				"--navigation-ribbon-color": props.theme.tileColor,
			}}
		>
			<Show when={editModalOpen()}>
				<EditModal tileProps={editTile()} closeModal={closeEditModal} theme={props.theme} />
				<Toolbox setOverflow={props.setOverflow} theme={props.theme} />
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
					{(item, i) => (
						<Tile
							{...item}
							muted={muted()}
							iconSize={tilePadSettings().iconSize}
							tileWidth={tilePadSettings().tileWidth}
							theme={props.theme}
							editMode={editMode}
							callback={updatePage}
							handleEdit={handleEdit}
							index={i()}
						/>
					)}
				</For>
			</div>
		</div>
	);
}

export default TilePad;
