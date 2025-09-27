import React, { useEffect, useState } from "react";

// Troque esta URL pela sua própria API
const API_URL = "https://bible-api.com/data/web/random/OT";
const API2_URL = "https://bible-api.com/data/web/random/NT";

export default function BibleChapVerse() {
    if (!data || data.length === 0) {
    return <p>Carregando...</p>;
  }
  
  const [items, setItems] = useState([]);

 useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        Promise.all(
          data.results.map((item) =>
            fetch(item.url)
              .then((res) => res.json())
              .then((details) => ({
                book: details.book_name,
                chapter: details.chapter,
                verse: details.verse,
                text: details.text,
              }))
          )
        ).then((verses) => setItems(verses));
      })
      .catch((err) => console.error("Erro ao buscar dados:", err));
  }, []);

  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "20px",
      justifyContent: "center"
    }}>
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            padding: "15px",
            maxWidth: "300px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            fontFamily: "Georgia, serif",
            lineHeight: "1.6"
          }}
        >
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
