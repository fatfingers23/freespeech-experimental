import styles from '../styles/Tile.module.css';

/* Tile Component 
   - This renders a tile.
   - The tile is rendered as a div with a class of tile.
   - Tiles can have an image and name as props.
*/

function Tile(props) {
    return (
        <div class={styles.tile}>
            <img width="50px" src={props.image} alt="" />
            <p>{props.text}</p>
        </div>
    );
}

export default Tile;