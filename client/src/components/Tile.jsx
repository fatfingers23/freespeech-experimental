import styles from '../styles/Tile.module.css';
import { styled } from "solid-styled-components";

/* Tile Component 
   - This renders a tile.
   - The tile is rendered as a div with a class of tile.
   - Tiles can have an image and name as props.
*/

function Tile(props) {

    const TileBtn = styled("button")`
        --tile-color: ${props.theme.tileColor};
        --text-color: ${props.theme.textColor};
        --navigation-color: ${props.theme.navigationColor};
        --border-color: ${props.borderColor ? props.borderColor : 'transparent'};
    `;

    // Handle click event.
    function handleInteraction() {
        if(props.navigation) {
            props.callback(props.navigation);
        } else {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(props.text));
        }
    }
    
    return (
        <TileBtn onclick={handleInteraction} class={props.navigation ? styles.navigation : styles.tile}>
            <Show when={props.navigation}>
                <div class={styles.navFolder}></div>
            </Show>
            <img width="50px" src={props.image} alt="" />
            <p>{props.text}</p>
        </TileBtn>
    );
}

export default Tile;