import styles from '../styles/Tile.module.css';

/* Tile Component 
   - This renders a tile.
   - The tile is rendered as a div with a class of tile.
   - Tiles can have an image and name as props.
*/

function Tile(props) {

    // Handle click event.
    function handleInteraction() {
        if(props.navigation)
            props.callback(props.navigation);
    }
    
    return (
        <button onclick={handleInteraction} class={props.navigation ? styles.navigation : styles.tile}>
            <img width="50px" src={props.image} alt="" />
            <p>{props.text}</p>
        </button>
    );
}

export default Tile;