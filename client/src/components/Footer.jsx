import styles from '../components/footer.module.css';

export default function Footer() {
    return (
        <div className={styles.container_footer}>
            <p>
                <a href="https://icons8.com/icon/ZIioDRqlj7eK/dogs">Dogs</a> icon by <a href="https://icons8.com">Icons8</a>
            </p>
            <p>Made with 💖</p>
        </div>
    );
}