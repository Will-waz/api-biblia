import React, { useEffect, useState } from "react";

const API_URL = "https://bible-api.com/data/web/random/OT";

export default function BibleChapVerse() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setItems([{
          book: data.book_name,
          chapter: data.chapter,
          verse: data.verse,
          text: data.text
        }]);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", padding: "20px", justifyContent: "center" }}>
      {items.map((item, index) => (
        <div key={index} style={{ backgroundColor: "#f9f9f9", borderRadius: "10px", padding: "15px", maxWidth: "300px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontFamily: "Georgia, serif", lineHeight: "1.6" }}>
          <p style={{ fontStyle: "italic", marginBottom: "10px" }}>
            "{item.text}"
          </p>
          <p style={{ fontWeight: "bold", textAlign: "right", margin: 0 }}>
            — {item.book} {item.chapter}:{item.verse}
          </p>
        </div>
      ))}
    </div>
  );
}
