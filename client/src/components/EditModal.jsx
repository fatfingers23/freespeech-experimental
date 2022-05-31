import styles from '../styles/EditModal.module.css';

function EditModal(props) {
    return (
        <div style={
            {
                "--background-color": props.theme.backgroundColor,
                "--tile-color": props.theme.tileColor,
                "--text-color": props.theme.textColor,
                "--close-btn-color": props.theme.volumeMutedButtonColor,
            }
        }>
            <div class={styles.editModal}>
                <div class={styles.editModalHeader}>
                    <div class={styles.editIcon}>
                        <span class="material-symbols-outlined">edit</span>
                        <p>Edit</p>
                    </div>
                    
                    <button onclick={props.closeModal} ><span class="material-symbols-outlined">close</span></button>
                </div>
            </div>
            <div class={styles.overlay}></div>
        </div>
    );
}

export default EditModal;