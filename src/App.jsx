import { useState } from 'react';

const fetchVerse = async (setVerse, setLoading) => {
  setLoading(true);
  try {
    const bookType = Math.random() > 0.5 ? 'OT' : 'NT';
    const response = await fetch(`https://bible-api.com/data/web/random/${bookType}`);
    const parsed = await response.json();

    const verseData = parsed.random_verse;

    setVerse({
      book_name: verseData.book || "Desconhecido",
      chapter: verseData.chapter || "?",
      verse: verseData.verse || "?",
      text: verseData.text || "Versículo não disponível"
    });
  } catch (err) {
    console.error('Erro ao buscar API:', err);
    setVerse({
      book_name: "Desconhecido",
      chapter: "?",
      verse: "?",
      text: "Erro ao carregar versículo"
    });
  } finally {
    setLoading(false);
  }
};

export default function App() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div style={{
      backgroundColor: "#f0f4f8",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      boxSizing: "border-box",
      padding: "20px",
      textAlign: "center"
    }}>
      <h1 style={{ color: "#1a3d7c", marginBottom: "30px" }}>
        Versículo Aleatório
      </h1>

      <button
        onClick={() => fetchVerse(setVerse, setLoading)}
        style={{
          padding: "12px 28px",
          marginBottom: "30px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: "#1a3d7c",
          color: "#fff",
          fontSize: "16px",
          cursor: "pointer",
          transition: "background-color 0.2s, transform 0.1s"
        }}
        onMouseEnter={e => e.currentTarget.style.backgroundColor = "#1450a0"}
        onMouseLeave={e => e.currentTarget.style.backgroundColor = "#1a3d7c"}
        onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"}
        onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
      >
        Novo Versículo
      </button>

      {loading && <p style={{ fontSize: "18px", color: "#555" }}>Carregando...</p>}

      {verse && !loading && (
        <p style={{
          fontSize: "20px",
          color: "#333",
          maxWidth: "600px",
          lineHeight: "1.6",
          backgroundColor: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 6px 15px rgba(0,0,0,0.1)"
        }}>
          "{verse.text}" — {verse.book_name} {verse.chapter}:{verse.verse}
        </p>
      )}
    </div>
  );
};
