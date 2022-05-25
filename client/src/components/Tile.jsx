import styles from '../styles/Tile.module.css';

function Tile(props) {
    return (
        <div class={styles.tile}>
            <img width="50px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Twemoji_1f600.svg/800px-Twemoji_1f600.svg.png" alt="" />
            <p>Button</p>
        </div>
    );
}

export default Tile;