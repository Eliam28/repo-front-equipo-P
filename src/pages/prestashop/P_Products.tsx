import { useEffect, useState } from "react";

function P_Products() {
  const [mensaje, setMensaje] = useState("Cargando...");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMensaje(data.mensaje);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div>
      <h1>Prueba de conexión API</h1>

      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <p>{mensaje}</p>
      )}
    </div>
  );
}

export default P_Products;