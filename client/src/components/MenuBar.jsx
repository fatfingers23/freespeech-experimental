import styles from "../styles/MenuBar.module.css";
import { styled } from "solid-styled-components";

function MenuBar(props) {
	function navigateTiles() {
		props.callback("tiles");
	}
	function navigateSettings() {
		props.callback("settings");
	}
    
	const MenuBarWrapper = styled("div")`
		--icon-color: ${props.theme.textColor};
		--text-color: ${props.theme.textColor};
	`;

	return (
		<MenuBarWrapper class={styles.MenuBar}>
			<p class={styles.BrandingText}>
				Free Speech AAC{" "}
				<a
					target="_blank"
					href="https://github.com/merkie/freespeech-experimental"
				>
					Experimental
				</a>
			</p>
			<div class={styles.navIcons}>
				<button onClick={navigateTiles}>
					<span class="material-symbols-outlined">grid_view</span>
				</button>
				<button onClick={navigateSettings}>
					<span class="material-symbols-outlined">settings</span>
				</button>
			</div>
		</MenuBarWrapper>
	);
}

export default MenuBar;
