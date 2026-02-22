import { useState } from "react";
import { useNavigate } from "react-router-dom";

const USUARIOS: Record<string, string> = {
  "111111": "ESCOBAR AGENCIA LTDA-",
  "222222": "SARI",
  "768880": "LAURA",
  "333333": "FRANCY",
};

export default function Login() {
  const [nit, setNit] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleIngresar = () => {
    const nombre = USUARIOS[nit.trim()];
    if (nombre) {
      navigate("/dashboard", { state: { nit: nit.trim(), nombre } });
    } else {
      setError("NIT no encontrado. Intente de nuevo.");
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0',
      padding: '16px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{
          borderRadius: '12px',
          backgroundColor: '#4a7c59',
          padding: '24px',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffeb3b',
            margin: '0'
          }}>BIENVENIDO</h1>
          <p style={{
            marginTop: '8px',
            fontSize: '14px',
            color: '#ffffff'
          }}>
            Ingrese su NIT para continuar
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{
            fontSize: '14px',
            fontWeight: '600',
            fontStyle: 'italic',
            display: 'block',
            marginBottom: '4px'
          }}>NIT</label>
          <input
            type="text"
            placeholder="Ej: 111111"
            value={nit}
            onChange={(e) => {
              setNit(e.target.value.replace(/\D/g, ""));
              setError("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleIngresar()}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '18px',
              backgroundColor: '#f5f5f5',
              border: '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box'
            }}
          />
          {error && <p style={{ color: 'red', fontSize: '14px', marginTop: '4px' }}>{error}</p>}
        </div>

        <button
          onClick={handleIngresar}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            backgroundColor: '#4a7c59',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '16px'
          }}>
          Ingresar
        </button>

        <p style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#666'
        }}>
        </p>
      </div>
    </div>
  );
}
