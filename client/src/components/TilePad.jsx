import styles from '../styles/TilePad.module.css';
import Tile from './Tile';

/* TilePad Component 
   - This renders a grid of tiles based on an array of tiles
     provided by the server.
   - The grid is rendered as a div with a class of tilepad.
   - The grid is built based on some flex box css, in the future
     users will be able to customize the flex properties.
*/

// TODO: Fill this with data fetched from server.

function TilePad(props) {
    console.log(props.tileData());
    return (
        <div class={styles.tilepad}>
            <For each={props.tileData()} fallback={<div>Loading...</div>}>
                {(item) => <Tile image={item.thumbnailUrl} text={item.id} />}
            </For>
        </div>
    );
}

export default TilePad;