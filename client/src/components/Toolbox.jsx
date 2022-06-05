import { createSignal, Show } from "solid-js";
import styles from "../styles/Toolbox.module.css";
import Tile from "./Tile";

export default function Toolbox(props) {
	const [isToolBoxOpen, setIsToolBoxOpen] = createSignal(props.localSettings.isToolboxOpen == "true");
	const [toolboxPage, setToolboxPage] = createSignal(props.localSettings.toolboxPage);

	function toggleToolBox() {
		setIsToolBoxOpen(!isToolBoxOpen());
		props.setLocalSettings("isToolboxOpen", isToolBoxOpen());
		if (isToolBoxOpen()) {
			props.setOverflow("hidden");
		} else {
			props.setOverflow("auto");
		}
	}

	return (
		<div
			style={{
				"--text-color": props.theme.textColor,
				"--tile-color": props.theme.tileColor,
				"--background-color": props.theme.backgroundColor,
				"--text-color-secondary": props.theme.textColorSecondary,
			}}
		>
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
						<p
							class={toolboxPage() == "marketplace" ? styles.toolboxCategorySelected : ""}
							onClick={() => {
								setToolboxPage("marketplace");
								props.setLocalSettings("toolboxPage", "marketplace");
							}}
						>
							<span class="material-symbols-outlined">shopping_basket</span> Marketplace
						</p>
						<p
							class={toolboxPage() == "uploads" ? styles.toolboxCategorySelected : ""}
							onClick={() => {
								setToolboxPage("uploads");
								props.setLocalSettings("toolboxPage", "uploads");
							}}
						>
							<span class="material-symbols-outlined">drive_folder_upload</span> My Uploads
						</p>
						<p
							class={toolboxPage() == "recents" ? styles.toolboxCategorySelected : ""}
							onClick={() => {
								setToolboxPage("recents");
								props.setLocalSettings("toolboxPage", "recents");
							}}
						>
							<span class="material-symbols-outlined">schedule</span> Recents
						</p>
					</div>

					{/* Marketplace Page */}
					<Show when={toolboxPage() == "marketplace"}>
						<p class={styles.tooltip}>
							Tip: The marketplace is where other users can publically upload their own icons,
							navigations, and layouts. You can easily incorporate these community-made assets into your
							own project.
						</p>
						<div class={styles.toolboxSearch}>
							<select name="" id="">
								<option value="all-assets">All Assets</option>
								<option value="tile-icons">Tile Icons</option>
								<option value="navigations">Navigations</option>
							</select>
							<input type="text" placeholder="Search..." />
							<button>
								<span class="material-symbols-outlined">search</span>
							</button>
							<button>
								<span class="material-symbols-outlined">tune</span>
							</button>
						</div>
						<div class={styles.toolboxResults}>
							{/* TODO: make this dynamic */}
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"The Very Hungry Caterpillar"}
									image={
										"https://images-na.ssl-images-amazon.com/images/I/51jdOu8lsPL._SY353_BO1,204,203,200_.jpg"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										14k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.5 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										14 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Free Speech en Español"}
									image={
										"https://i.ibb.co/KwG17LR/freespeechaac.png"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										78.2k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.8 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										512 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<img src="https://www.vitacost.com/Images/Products/500/Parasol/Parasol-4-Layer-Disposable-Respiratory-Protective-Face-Mask-854073006335.jpg" width="70px" alt="" />
								<p>Disposable_Mask.png</p>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										23k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										3.9 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										<span class="material-symbols-outlined">image</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Algebra Vocabulary"}
									image={
										"https://icon-library.com/images/algebra-icon/algebra-icon-16.jpg"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										11.2k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.9 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										78 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Computer Science"}
									image={
										"https://cdn-icons-png.flaticon.com/512/4109/4109591.png"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										8k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.8 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										114 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Famous TikTokers"}
									image={
										"https://www.edigitalagency.com.au/wp-content/uploads/TikTok-icon-glyph.png"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										28k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										3.8 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										32 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Thumbnail-sized_photo_of_Joe_Biden.jpg" width="70px" alt="" />
								<p>Joe_Biden.jpg</p>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										14k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.5 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										14 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"McDonald's Menu"}
									image={
										"https://cdn.mos.cms.futurecdn.net/xDGQ9dbLmMpeEqhiWayMRB.jpg"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										62k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										5.0 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										39 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Adventure Time"}
									image={
										"https://upload.wikimedia.org/wikipedia/en/3/37/Adventure_Time_-_Title_card.png"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										24k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.9 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										51 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
							<div class={styles.result}>
								<Tile
									theme={props.theme}
									dummy={true}
									text={"Groceries"}
									image={
										"https://cdn-icons-png.flaticon.com/512/1261/1261163.png"
									}
									iconSize={70}
									tileWidth={10}
								/>
								<div style={{ display: "flex", "justify-content": "center", gap: "10px" }}>
									<p class={styles.tileStat}>
										24k <span class="material-symbols-outlined">download</span>
									</p>
									<p class={styles.tileStat}>
										4.9 <span class="material-symbols-outlined">star</span>
									</p>
									<p class={styles.tileStat}>
										51 <span class="material-symbols-outlined">grid_view</span>
									</p>
								</div>
							</div>
						</div>
					</Show>

					{/* Uploads Page */}
					<Show when={toolboxPage() == "uploads"}>
						<p class={styles.tooltip}>
							Tip: Here you can access your uploaded assets and manage them. Uploading your own images is
							easy, just drag and drop them into the upload area.
						</p>
						<div class={styles.dropzone}>
							<p>Drag assets here</p>
						</div>
						<p></p>
						<div class={styles.toolboxSearch}>
							<select name="" id="">
								<option value="all-assets">All Assets</option>
								<option value="tile-icons">Tile Icons</option>
								<option value="navigations">Navigations</option>
							</select>
							<input type="text" placeholder="Search..." />
							<button>
								<span class="material-symbols-outlined">search</span>
							</button>
							<button>
								<span class="material-symbols-outlined">tune</span>
							</button>
						</div>
						<div class={styles.toolboxResults}>
							<p>No results found</p>
						</div>
					</Show>

					{/* Recents Page */}
					<Show when={toolboxPage() == "recents"}>
						<p class={styles.tooltip}>
							Tip: This is the page where you'll be able to find your recently used images and
							navigations.
						</p>
						<div class={styles.toolboxResults}>
							<p>No results found</p>
						</div>
					</Show>
				</div>
			</Show>
		</div>
	);
}
