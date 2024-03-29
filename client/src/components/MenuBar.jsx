import styles from "../styles/MenuBar.module.css";
import { Link } from "solid-app-router";

function MenuBar(props) {
	return (
		<div
			style={{
				"--icon-color": props.theme.textColor,
				"--text-color": props.theme.textColor,
				"--highlight-color": props.theme.highlightColor
			}}
			class={styles.MenuBar}
		>
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
				<Link href="/">
					<span class="material-symbols-outlined">grid_view</span>
				</Link>
				<Link href="/settings">
					<span class="material-symbols-outlined">settings</span>
				</Link>
				<span onClick={props.refresh} class="material-symbols-outlined">refresh</span>
				{/* v Dont take this out yet... v */}
				<p>{props.username}</p>
			</div>
		</div>
	);
}

export default MenuBar;
