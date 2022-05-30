import styles from "../styles/Settings.module.css";

function Settings(props) {
	return (
		<>
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
						onChange={props.themeCallback}
						name="themeSelector"
						id="themeSelector"
					>
						<option value="Dark">Dark</option>
						<option value="Light">Light</option>
					</select>
				</div>
			</div>
		</>
	);
}

export default Settings;
