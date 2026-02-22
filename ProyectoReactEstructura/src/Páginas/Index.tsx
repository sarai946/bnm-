import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const RAMOS = [
  "ARL",
  "Autos Colectivas",
  "Salud Colectiva",
  "Grupos Afines",
];

// ✅ ÚNICA TABLA: GOLES DE PENAL (Empresas Cédulas)
const TABLA_PENAL = [
  { min: 8_000_000, max: 10_999_999, pct: 0.01 },
  { min: 11_000_000, max: 14_999_999, pct: 0.015 },
  { min: 15_000_000, max: Infinity, pct: 0.02 },
];

function calcularPremio(recaudo: number) {
  for (const rango of TABLA_PENAL) {
    if (recaudo >= rango.min && recaudo <= rango.max) {
      return { premio: recaudo * rango.pct, pct: rango.pct };
    }
  }
  return null; // Si no alcanza el mínimo de 8M
}

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function Calculadora() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { nit?: string; nombre?: string } | null;

  const [ramo, setRamo] = useState("");
  const [recaudoStr, setRecaudoStr] = useState("");

  if (!state?.nombre) {
    return <Navigate to="/" replace />;
  }

  const recaudo = Number(recaudoStr.replace(/\D/g, "")) || 0;

  // ✅ Ahora SIEMPRE usa solo la tabla GOLES DE PENAL
  const resultado = ramo ? calcularPremio(recaudo) : null;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        padding: "16px",
      }}
    >
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <button
          onClick={() => navigate("/dashboard", { state })}
          style={{
            marginBottom: "16px",
            background: "none",
            border: "none",
            color: "#4a7c59",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ← Atrás
        </button>

        <div
          style={{
            borderRadius: "12px",
            backgroundColor: "#4a7c59",
            padding: "24px",
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#ffeb3b",
              margin: "0 0 8px 0",
            }}
          >
            🧮 Calculadora
          </h1>
          <p style={{ color: "#fff", margin: 0 }}>
            Calcula tu premio según GOLES DE PENAL
          </p>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "24px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <label style={{ fontWeight: "600" }}>Ramo</label>
          <select
            value={ramo}
            onChange={(e) => setRamo(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "16px" }}
          >
            <option value="">Selecciona un ramo...</option>
            {RAMOS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>

          <label style={{ fontWeight: "600" }}>Recaudo (COP)</label>
          <input
            type="text"
            placeholder="8.000.000"
            value={recaudoStr.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            onChange={(e) =>
              setRecaudoStr(e.target.value.replace(/\D/g, ""))
            }
            style={{ width: "100%", padding: "8px", marginBottom: "20px" }}
          />

          {resultado ? (
            <div
              style={{
                backgroundColor: "#e8f5e9",
                border: "2px solid #4a7c59",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              <p>
                <strong>Premio:</strong> {formatCOP(resultado.premio)}
              </p>
              <p>
                Comisión: {(resultado.pct * 100).toFixed(2)}%
              </p>
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "#fff3cd",
                border: "2px solid #f59e0b",
                borderRadius: "8px",
                padding: "16px",
              }}
            >
              El recaudo debe ser mínimo $8.000.000 según la tabla.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}