import styles from '../styles/TilePad.module.css';
import Tile from './Tile';

function TilePad(props) {
    return (
        <div class={styles.tilepad}>
            <For each={Array(20)} fallback={<div>Loading...</div>}>
                {(item) => <Tile />}
            </For>
        </div>
    );
}

export default TilePad;