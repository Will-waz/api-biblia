import { useState, useEffect } from 'react';
import BibleChapVerse from "./components/biblialist";

const request = async (callback) => {
  try {
    const response = await fetch('https://bible-api.com/data/web/random/OT'); 
    const parsed = await response.json();
    console.log(parsed); 
    callback([parsed.data]); 
  } catch (err) {
    console.error('Erro ao buscar API:', err);
  }
};

export default function App() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    request(setRegistros);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Versículo Aleatório</h1>
      <BibleChapVerse data={registros} />
    </div>
  );
};
