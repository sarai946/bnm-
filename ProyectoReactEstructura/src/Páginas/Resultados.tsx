import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";

const BOLSAS = ["Todas", "Bolsa 1", "Bolsa 2", "Bolsa 3"];

const MESES = [
  "Enero", "Febrero", "Marzo", "Abril",
  "Mayo", "Junio", "Julio", "Agosto",
  "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// ✅ TABLA GOLES DE PENAL
const TABLA_GOLES = [
  { min: 8_000_000, max: 10_999_999, pct: 0.01 },
  { min: 11_000_000, max: 14_999_999, pct: 0.015 },
  { min: 15_000_000, max: Infinity, pct: 0.02 },
];

type DatosMes = { ramo: string; recaudo: number };

function calcularPremio(recaudo: number) {
  for (const rango of TABLA_GOLES) {
    if (recaudo >= rango.min && recaudo <= rango.max) {
      return Math.round(recaudo * rango.pct);
    }
  }
  return 0;
}

function formatCOP(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function Resultados() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { nit?: string; nombre?: string } | null;

  if (!state?.nombre || !state?.nit) {
    return <Navigate to="/" replace />;
  }

  // 🔹 Datos simulados ejemplo
 const DATA_POR_MES: Record<string, DatosMes[]> = {
  
  Enero: [
    { ramo: "ARL", recaudo: 8_500_000 },
    { ramo: "Autos Colectivas", recaudo: 12_300_000 },
    { ramo: "Salud Colectiva", recaudo: 14_200_000 },
    { ramo: "Grupos Afines", recaudo: 18_000_000 },
  ],
  Febrero: [
    { ramo: "ARL", recaudo: 9_000_000 },
    { ramo: "Autos Colectivas", recaudo: 11_500_000 },
    { ramo: "Salud Colectiva", recaudo: 13_000_000 },
    { ramo: "Grupos Afines", recaudo: 16_800_000 },
  ],
  Marzo: [
    { ramo: "ARL", recaudo: 10_200_000 },
    { ramo: "Autos Colectivas", recaudo: 15_000_000 },
    { ramo: "Salud Colectiva", recaudo: 12_700_000 },
    { ramo: "Grupos Afines", recaudo: 21_400_000 },
  ],
  Abril: [
    { ramo: "ARL", recaudo: 8_800_000 },
    { ramo: "Autos Colectivas", recaudo: 13_400_000 },
    { ramo: "Salud Colectiva", recaudo: 16_200_000 },
    { ramo: "Grupos Afines", recaudo: 19_600_000 },
  ],
  Mayo: [
    { ramo: "ARL", recaudo: 9_700_000 },
    { ramo: "Autos Colectivas", recaudo: 14_800_000 },
    { ramo: "Salud Colectiva", recaudo: 17_500_000 },
    { ramo: "Grupos Afines", recaudo: 22_300_000 },
  ],
  Junio: [
    { ramo: "ARL", recaudo: 8_000_000 },
    { ramo: "Autos Colectivas", recaudo: 13_200_000 },
    { ramo: "Salud Colectiva", recaudo: 12_600_000 },
    { ramo: "Grupos Afines", recaudo: 23_400_000 },
  ],
  Julio: [
    { ramo: "ARL", recaudo: 11_000_000 },
    { ramo: "Autos Colectivas", recaudo: 16_500_000 },
    { ramo: "Salud Colectiva", recaudo: 18_000_000 },
    { ramo: "Grupos Afines", recaudo: 25_000_000 },
  ],
  Agosto: [
    { ramo: "ARL", recaudo: 12_400_000 },
    { ramo: "Autos Colectivas", recaudo: 14_900_000 },
    { ramo: "Salud Colectiva", recaudo: 19_200_000 },
    { ramo: "Grupos Afines", recaudo: 24_600_000 },
  ],
  Septiembre: [
    { ramo: "ARL", recaudo: 9_500_000 },
    { ramo: "Autos Colectivas", recaudo: 12_800_000 },
    { ramo: "Salud Colectiva", recaudo: 15_400_000 },
    { ramo: "Grupos Afines", recaudo: 20_900_000 },
  ],
  Octubre: [
    { ramo: "ARL", recaudo: 13_000_000 },
    { ramo: "Autos Colectivas", recaudo: 17_300_000 },
    { ramo: "Salud Colectiva", recaudo: 21_000_000 },
    { ramo: "Grupos Afines", recaudo: 27_500_000 },
  ],
  Noviembre: [
    { ramo: "ARL", recaudo: 10_800_000 },
    { ramo: "Autos Colectivas", recaudo: 15_600_000 },
    { ramo: "Salud Colectiva", recaudo: 18_400_000 },
    { ramo: "Grupos Afines", recaudo: 23_700_000 },
  ],
  Diciembre: [
    { ramo: "ARL", recaudo: 14_000_000 },
    { ramo: "Autos Colectivas", recaudo: 19_500_000 },
    { ramo: "Salud Colectiva", recaudo: 22_800_000 },
    { ramo: "Grupos Afines", recaudo: 30_000_000 },
  ],
};

  // ✅ Ahora calcula premio POR RAMO correctamente
  // 🔹 Estados (SIEMPRE PRIMERO)
const [mes, setMes] = useState("Junio");
const [bolsa, setBolsa] = useState("Todas");

// 🔥 Ahora sí puedes usar mes
const detalle = DATA_POR_MES[mes] || [];

const detalleConPremio = detalle.map((d) => ({
  ...d,
  premio: calcularPremio(d.recaudo),
}));

const totalRecaudos = detalle.reduce((s, d) => s + d.recaudo, 0);

const premioTotal = calcularPremio(totalRecaudos);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f0f0",
      padding: "16px"
    }}>
      <div style={{ width: "100%", maxWidth: "600px" }}>

        <button
          onClick={() => navigate("/dashboard", { state })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "transparent",
            border: "none",
            color: "#4a7c59",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            marginBottom: "16px"
          }}
        >
          ← Atrás
        </button>

        <div style={{
          borderRadius: "12px",
          backgroundColor: "#4a7c59",
          padding: "24px",
          marginBottom: "24px",
          color: "white"
        }}>
          <h1 style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: "#ffeb3b",
            margin: "0 0 8px 0"
          }}>📊 Resultados Mensuales</h1>

          <p style={{ fontSize: "14px", margin: "0" }}>
            {state.nombre} — NIT: {state.nit}
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "24px"
        }}>

          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              MES
            </label>
            <select
              value={mes}
              onChange={(e) => setMes(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              {MESES.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </div>

          <div style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "16px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
          }}>
            <label style={{ fontWeight: "600", fontSize: "14px" }}>
              BOLSA
            </label>
            <select
              value={bolsa}
              onChange={(e) => setBolsa(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "8px",
                border: "1px solid #ddd",
                borderRadius: "4px"
              }}
            >
              {BOLSAS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          marginBottom: "24px"
        }}>
          <div style={{
            backgroundColor: "#4a7c59",
            borderRadius: "8px",
            padding: "16px",
            color: "white",
            textAlign: "center"
          }}>
            <p>Total Recaudos</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {formatCOP(totalRecaudos)}
            </p>
          </div>

          <div style={{
            backgroundColor: "#ffeb3b",
            borderRadius: "8px",
            padding: "16px",
            color: "#4a7c59",
            textAlign: "center"
          }}>
            <p>Premio Total</p>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              {formatCOP(premioTotal)}
            </p>
          </div>
        </div>

        <div style={{
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>

          <div style={{
            backgroundColor: "#4a7c59",
            color: "white",
            padding: "12px",
            fontWeight: "bold",
            textAlign: "center"
          }}>
            Detalle por Ramo
          </div>

          <table style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px"
          }}>
            <thead>
              <tr style={{ backgroundColor: "#f5f5f5" }}>
                <th style={{ padding: "12px", textAlign: "left" }}>Ramo</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Recaudo</th>
                <th style={{ padding: "12px", textAlign: "right" }}>Premio</th>
              </tr>
            </thead>
            <tbody>
              {detalleConPremio.map((d, i) => (
                <tr key={i} style={{
                  backgroundColor: i % 2 === 0 ? "#fafafa" : "white"
                }}>
                  <td style={{ padding: "12px" }}>{d.ramo}</td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {formatCOP(d.recaudo)}
                  </td>
                  <td style={{ padding: "12px", textAlign: "right" }}>
                    {formatCOP(d.premio)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}