import styles from "../styles/Settings.module.css";

function Settings(props) {
	let themeSelector;

	return (
		<div
			style={{
				"--text-color": props.theme.textColor,
				"--highlight-color": props.theme.highlightColor,
			}}
		>
			<div class={styles.settingsCategories}>
				<a>Appearance</a>
				<a>Archive</a>
				<a>Enterprise</a>
			</div>
			<div class={styles.settingsMain}>
				<h1>Appearance</h1>
				<p>App theme:</p>
				<div class={styles.settingsSplit}>
					<p>
						Pick from the dropdown of preset themes to customize the
						look and feel of the app. Or, make your own theme by
						choosing individual colors from the items below.
					</p>
					<select
						onChange={() => props.themeCallback(themeSelector.value)}
						name="themeSelector"
						ref={themeSelector}
					>
						<option value="dark">Dark</option>
						<option value="light">Light</option>
					</select>
				</div>
			</div>
		</div>
	);
}

export default Settings;
