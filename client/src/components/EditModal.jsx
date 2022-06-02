import styles from "../styles/EditModal.module.css";

function EditModal(props) {
	let tileTextInput;

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
								oldText: props.tileProps.text,
								text: tileTextInput.value,
								index: props.tileProps.index,
							})
						}
					>
						<span class="material-symbols-outlined">close</span>
					</button>
				</div>

				<p For="tileText">Tile text:</p>
				<input ref={tileTextInput} type="text" name="tileText" value={props.tileProps.text} />
			</div>
			<div class={styles.overlay}></div>
		</div>
	);
}

export default EditModal;
