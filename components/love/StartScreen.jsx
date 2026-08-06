import styles from "../../styles/Love.module.css"; 

export default function StartScreen(
  { 
    onStart, 
    titleFont, 
  }
) { 
  return ( 
    <section className={styles.center}> 
      <span className={styles.heart}> ❤️ </span> 
      
      <h1 className={styles.title}> Oi, meu amor... </h1> 
      
      <p className={styles.subtitle}> Preparei uma pequena surpresa para você. </p> 
      
      <button className={styles.primaryButton} onClick={onStart} > Abrir ❤️ </button> 
    </section> 
    ); 
  }