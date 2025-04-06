import RedesSociais from "@/components/redesSociais/RedesSociais";
import styles from './style.module.css'
export default function Footer() {
    return (
        <footer className={styles.rodape}>
            <p className="text-center">
                Projeto desenvolvido por Dimi Endrix Martins Miranda.
            </p>
            <RedesSociais />
        </footer>
    )
}