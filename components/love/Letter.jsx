import { useState, useEffect, useRef } from "react";
import styles from "../../styles/Love.module.css";

export default function Letter() {
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [capsule, setCapsule] = useState(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const paragraphs = [
    "Ontem você me disse que eu não sabia pedir a Deus da maneira certa.",
    "Hoje acordei pensando nisso e cheguei à conclusão de que você tinha razão.",
    "Eu realmente não sei.",
    "Porque nem nos meus maiores sonhos eu conseguiria imaginar uma esposa como você ao meu lado.",
    "Enquanto eu fazia pedidos tão pequenos, Deus estava preparando algo muito maior.",
    "Você.",
    "Todos os dias agradeço pela nossa família e por poder dividir a vida com você.",
    "Deus me deu muito mais do que eu poderia imaginar.",
    "Ele me deu você. E isso foi muito mais do que eu poderia imaginar pedir."
  ];

  // 1. Busca a foto salva no LocalStorage quando a página carrega
  useEffect(() => {
    const savedCapsule = localStorage.getItem("josiane_capsule");
    if (savedCapsule) {
      setCapsule(JSON.parse(savedCapsule));
    }
  }, []);

  // 2. Animação de leitura dos parágrafos (2,5s por linha)
  useEffect(() => {
    if (visibleParagraphs < paragraphs.length + 3) {
      const timer = setTimeout(() => {
        setVisibleParagraphs((prev) => prev + 1);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [visibleParagraphs, paragraphs.length]);

  // 3. Funções da Câmera
  const openCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Erro ao acessar a câmera: ", err);
      alert("Não consegui acessar a câmera. Verifique se o navegador tem permissão.");
    }
  };

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const photoData = canvas.toDataURL('image/png');
      
      const dataAtual = new Date();
      const dateString = dataAtual.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
      const timeString = dataAtual.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

      const newCapsule = { photo: photoData, date: dateString, time: timeString };
      
      // Salva no LocalStorage
      localStorage.setItem("josiane_capsule", JSON.stringify(newCapsule));
      setCapsule(newCapsule);
      setIsCameraOpen(false);

      // Desliga a câmera
      const stream = video.srcObject;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    }
  };

  return (
    <article className={styles.letter}>
      
      <div className={styles.flower}>🌸</div>

      <h1 className={`${styles.title} ${styles.paragraph} ${visibleParagraphs >= 0 ? styles.paragraphVisible : ''}`}>
        Para você ❤️
      </h1>

      {paragraphs.map((text, index) => (
        <p 
          key={index} 
          className={`
            ${styles.paragraph} 
            ${visibleParagraphs > index ? styles.paragraphVisible : ''} 
            ${text === "Você." ? styles.highlightWord : ''}
          `}
        >
          {text}
        </p>
      ))}

      <p className={`${styles.signature} ${styles.paragraph} ${visibleParagraphs > paragraphs.length ? styles.paragraphVisible : ''}`}>
        Eu te amo.
      </p>

      <p className={`${styles.author} ${styles.paragraph} ${visibleParagraphs > paragraphs.length + 1 ? styles.paragraphVisible : ''}`}>
        — Fernando ❤️
      </p>

      {/* CÁPSULA DO TEMPO */}
      <section className={`${styles.timeCapsule} ${styles.paragraph} ${visibleParagraphs > paragraphs.length + 2 ? styles.paragraphVisible : ''}`}>
        
        {capsule ? (
          // Etapa 5: Polaroid salva
          <div className={styles.polaroid}>
            <span className={styles.heart}>😊</span>
            <img src={capsule.photo} alt="Nossa lembrança" />
            <p className={styles.polaroidTitle}>Primeira leitura</p>
            <p className={styles.polaroidMeta}>📅 {capsule.date}</p>
            <p className={styles.polaroidMeta}>🕒 {capsule.time}</p>
          </div>
        ) : !isCameraOpen ? (
          // Etapa 3: Botão de guardar momento
          <>
            <span className={styles.heart}>❤️</span>
            <p style={{ opacity: 0.8, fontStyle: 'italic', marginBottom: '8px' }}>
              Espero que esse momento fique guardado para sempre.
            </p>
            <button className={styles.secondaryButton} onClick={openCamera}>
              Guardar este momento
            </button>
          </>
        ) : (
          // Etapa 4: Câmera ativa
          <div>
            <p style={{ marginBottom: '16px', color: '#d87093', fontWeight: 'bold' }}>
              Sorria! 😊
            </p>
            <div className={styles.videoWrapper}>
              <video ref={videoRef} autoPlay playsInline />
            </div>
            <button className={styles.primaryButton} onClick={takePhoto}>
              📸 Tirar Foto
            </button>
          </div>
        )}

      </section>

      {/* Canvas invisível necessário para extrair a imagem do vídeo */}
      <canvas ref={canvasRef} className={styles.hidden} />

    </article>
  );
}