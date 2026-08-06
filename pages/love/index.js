import Head from "next/head";
import { useState } from "react";

import StartScreen from "../../components/love/StartScreen";
import Letter from "../../components/love/Letter";

import styles from "../../styles/Love.module.css";

export default function Love() {
  const [started, setStarted] = useState(false);

  return (
    <>
      <Head>
        <title>Para o amor da minha vida ❤️</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Great+Vibes&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={`${styles.container}`}>
        
        {/* Música escondida que toca após a interação da usuária */}
        {started && (
          <iframe
            src="https://www.youtube.com/embed/5QHF5OQeFOs?autoplay=1&loop=1&playlist=5QHF5OQeFOs"
            allow="autoplay"
            className={styles.hidden}
          ></iframe>
        )}

        {!started ? (
          <StartScreen onStart={() => setStarted(true)} />
        ) : (
          <Letter />
        )}
      </main>
    </>
  );
}