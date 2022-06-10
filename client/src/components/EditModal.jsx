import { createSignal } from "solid-js";

import Tile from './Tile';

import styles from "../styles/EditModal.module.css";

function EditModal(props) {
	const [editTileText, setEditTileText] = createSignal(props.tileProps.text);

	let tileTextInput;

	function handleTileTextChange() {
		setEditTileText(tileTextInput.value);
	}

	return (
		<div
			style={{
				"--background-color": props.theme.backgroundColor,
				"--tile-color": props.theme.tileColor,
				"--text-color": props.theme.textColor,
				"--close-btn-color": props.theme.volumeMutedButtonColor,
			}}
		>
			<div class={styles.editModal}>
				<div class={styles.editModalHeader}>
					<div class={styles.editIcon}>
						<span class="material-symbols-outlined">edit</span>
						<p>Edit Tile</p>
					</div>

					<button
						onClick={() =>
							props.closeModal({
								type: "tile",
								oldText: props.tileProps.text,
								text: tileTextInput.value,
								index: props.tileProps.index,
							})
						}
					>
						<span class="material-symbols-outlined">close</span>
					</button>
				</div>

				<div style={{ display: "flex", "flex-direction": "row", "gap": "20px", "align-items": "center", "position": "relative" }}>
					<div style={{ display: "flex", "flex-direction": "column" }}>
						<p For="tileText">Tile text:</p>
						<input onChange={handleTileTextChange} ref={tileTextInput} type="text" name="tileText" value={props.tileProps.text} />
					</div>
					<div style={{ display: "flex", "flex-direction": "column", "flex-grow": "1" }}>
						<p >Tile Image:</p>
						<div class={styles.imageDropzone}>	
							<img src={props.tileProps.image} width="50px" alt="" />
						</div>
					</div>
				</div>
				<div class={styles.dummyTileContainer}>
					<p>Preview:</p>
					<Tile dummy={true} {...props.tileProps} text={editTileText()} iconSize={50} theme={props.theme} tileWidth={100} />
				</div>
			</div>
			<div class={styles.overlay} onClick={() =>
				props.closeModal({}) // Close but dont save changes
			}></div>
		</div>
	);
}

export default EditModal;
