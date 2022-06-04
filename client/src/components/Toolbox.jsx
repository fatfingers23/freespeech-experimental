import { createSignal, Show } from "solid-js";

import styles from "../styles/Toolbox.module.css";

export default function Toolbox(props) {
    const [ isToolBoxOpen, setIsToolBoxOpen ] = createSignal(false);
    
    function toggleToolBox() {
        setIsToolBoxOpen(!isToolBoxOpen());
        if(isToolBoxOpen()) {
            props.setOverflow('hidden');
        } else {
            props.setOverflow('auto');
        }
    }

    return (
        <div  style={
            {
                "--text-color": props.theme.textColor,
                "--tile-color": props.theme.tileColor,
                "--background-color": props.theme.backgroundColor,
                "--text-color-secondary": props.theme.textColorSecondary
            }
        } >
            <Show when={!isToolBoxOpen()}>
                <button class={styles.openToolbox} onClick={toggleToolBox}>
                    <span class="material-symbols-outlined">more_vert</span>
                </button>
            </Show>
            <Show when={isToolBoxOpen()}>
                <div class={styles.toolboxContainer}>
                    <button class={styles.closeToolbox} onClick={toggleToolBox}>
                        <span class="material-symbols-outlined">more_vert</span>
                    </button>
                    <p class={styles.toolboxTitle}>Toolbox</p>
                    <div class={styles.toolboxCategories}>
                        <p class={styles.toolboxCategorySelected}><span class="material-symbols-outlined">shopping_basket</span> Marketplace</p>
                        <p><span class="material-symbols-outlined">drive_folder_upload</span> My Uploads</p>
                        <p><span class="material-symbols-outlined">schedule</span> Recents</p>
                    </div>
                    <div class={styles.toolboxSearch}>
                        <select name="" id="">
                            <option value="all-assets">All Assets</option>
                            <option value="tile-icons">Tile Icons</option>
                            <option value="navigations">Navigations</option>
                        </select>
                        <input type="text" placeholder="Search..." />
                        <button><span class="material-symbols-outlined">search</span></button>
                        <button><span class="material-symbols-outlined">tune</span></button>
                    </div>
                    <div class={styles.toolboxResults}>
                            <p>No results found</p>
                        </div>
                </div>
            </Show>
        </div>
    );
}