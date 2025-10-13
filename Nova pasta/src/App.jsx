import React, { useState } from "react";
import BibleList from "./components/biblialist";

export default function App() {
  const [reload, setReload] = useState(0);
  const [testament, setTestament] = useState("OT");

  const handleReload = () => setReload(prev => prev + 1);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#ffffff",
        textAlign: "center",
        margin: 0,
        padding: 0,
        width: "100vw",        
        overflow: "hidden"     
      }}
    >
      <h1
        style={{
          color: "#1a3d7c",
          marginBottom: "40px"
        }}
      >
        Versículo Aleatório —{" "}
        {testament === "OT" ? "Velho Testamento" : "Novo Testamento"}
      </h1>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button
          onClick={() => setTestament("OT")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#1a3d7c",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.1s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1450a0")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1a3d7c")
          }
        >
          Velho Testamento
        </button>

        <button
          onClick={() => setTestament("NT")}
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#1a3d7c",
            color: "#fff",
            cursor: "pointer",
            transition: "background-color 0.2s, transform 0.1s"
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#1450a0")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#1a3d7c")
          }
        >
          Novo Testamento
        </button>
      </div>

      <button
        onClick={handleReload}
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
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#1450a0")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#1a3d7c")
        }
      >
        Novo Versículo
      </button>

      <BibleList reload={reload} testament={testament} />
    </div>
  );
}
