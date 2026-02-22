import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "@/Páginas/Login";
import Dashboard from "@/Páginas/Dashboard";
import Calculadora from "@/Páginas/Index";
import Resultados from "@/Páginas/Resultados";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calculadora" element={<Calculadora />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
