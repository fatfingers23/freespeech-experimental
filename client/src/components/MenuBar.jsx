import styles from '../styles/MenuBar.module.css';


function MenuBar(props) {
    function navigateTiles() {
        props.callback('tiles');
    }
    function navigateSettings() {
        props.callback('settings');
    }
    
    return (
        <div class={styles.MenuBar}>
            <p class={styles.BrandingText}>Free Speech AAC <a target="_blank" href="https://github.com/merkie/freespeech-experimental">Experimental</a></p>
            <div class={styles.navIcons}>
            <button onClick={navigateTiles} ><span class="material-symbols-outlined">grid_view</span></button>
                <button onClick={navigateSettings} ><span class="material-symbols-outlined">settings</span></button>
            </div>
        </div>
    );
}

export default MenuBar;