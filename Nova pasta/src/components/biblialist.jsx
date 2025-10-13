import React, { useEffect, useState } from "react";

export default function BibleList({ reload, testament }) {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchVerse = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://bible-api.com/data/web/random/${testament}`);
      const data = await res.json();
      const v = data.random_verse;

      if (!v || !v.text) {
        throw new Error("Versículo não encontrado");
      }

      setVerse({
        book: v.book || "Desconhecido",
        chapter: v.chapter || "?",
        verse: v.verse || "?",
        text: v.text.trim()
      });
    } catch (err) {
      console.error("Erro ao buscar versículo:", err);
      setVerse({
        book: "Erro",
        chapter: "-",
        verse: "-",
        text: "Não foi possível carregar um versículo agora. Tente novamente."
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, [reload, testament]);

  if (loading)
    return <p style={{ fontSize: "18px", color: "#555" }}>Carregando...</p>;

  if (!verse)
    return <p>Erro ao carregar versículo.</p>;

  return (
    <div style={{
      backgroundColor: "#ffffff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
      maxWidth: "600px"
    }}>
      <p style={{
        fontSize: "20px",
        color: "#333",
        lineHeight: "1.6",
        fontStyle: "italic",
        marginBottom: "10px"
      }}>
        "{verse.text}"
      </p>
      <p style={{
        fontWeight: "bold",
        color: "#1a3d7c",
        textAlign: "right",
        margin: 0
      }}>
        — {verse.book} {verse.chapter}:{verse.verse}
      </p>
    </div>
  );
}
