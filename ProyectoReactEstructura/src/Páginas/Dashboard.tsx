import { useLocation, useNavigate, Navigate } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { nit?: string; nombre?: string } | null;

  if (!state?.nombre) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f0f0f0",
      padding: "16px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px"
      }}>
        <div style={{
          borderRadius: "12px",
          backgroundColor: "#4a7c59",
          padding: "24px",
          textAlign: "center",
          marginBottom: "32px"
        }}>
          <p style={{
            fontSize: "14px",
            color: "#ffffff",
            margin: "0"
          }}>Bienvenido</p>
          <h1 style={{
            fontSize: "24px",
            fontWeight: "bold",
            color: "#ffeb3b",
            margin: "8px 0 0 0"
          }}>{state.nombre}</h1>
          <p style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.7)",
            margin: "8px 0 0 0"
          }}>NIT: {state.nit}</p>
        </div>

        <div style={{ display: "grid", gap: "16px" }}>
          <button
            onClick={() => navigate("/calculadora", { state })}
            style={{
              height: "80px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#4a7c59",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            🧮 Calculadora
          </button>

          <button
            onClick={() => navigate("/resultados", { state })}
            style={{
              height: "80px",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "#f59e0b",
              color: "#1f2937",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer"
            }}
          >
            📊 Ver Resultados Mensuales
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              height: "48px",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: "#white",
              color: "#4a7c59",
              border: "1px solid #4a7c59",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "16px"
            }}
          >
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
