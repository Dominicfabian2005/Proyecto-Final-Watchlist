import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { BarChart2 } from "lucide-react";
 
const API = "http://localhost:30000";
 
export default function Dashboard({ onClose }) {
  const [datos,   setDatos]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState("");
 
  useEffect(() => {
    const cargarDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res   = await fetch(`${API}/api/list/dashboard`, {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) { setError(data.mensaje); return; }
        setDatos(data);
      } catch (err) {
        setError("No se pudo cargar el dashboard");
      } finally {
        setLoading(false);
      }
    };
    cargarDashboard();
  }, []);
 
  const dataPorAnio = datos
    ? Object.entries(datos.porAnio).map(([anio, total]) => ({ anio, total }))
    : [];
 
  const dataPorMes = datos
    ? Object.entries(datos.porMes).map(([mes, total]) => ({ mes, total }))
    : [];
 
  const COLORES = ["#9b59b6", "#e91e8c", "#c084fc", "#f472b6", "#7c3aed", "#db2777"];
 
  return (
    <div style={estilos.overlay}>
      <div style={estilos.panel}>
 
        {/* Encabezado — solo título */}
        <div style={estilos.header}>
          <h2 style={estilos.titulo}>
            <BarChart2 size={22} style={{ marginRight: "8px", verticalAlign: "middle" }} />
            Mi Dashboard
          </h2>
        </div>
 
        {loading && <p style={estilos.mensaje}>Cargando estadísticas...</p>}
        {error   && <p style={{ ...estilos.mensaje, color: "#f87171" }}>{error}</p>}
 
        {datos && (
          <>
            {/* Tarjetas de resumen */}
            <div style={estilos.tarjetas}>
              <div style={estilos.tarjeta}>
                <div style={estilos.tarjetaNum}>{datos.totalVistas}</div>
                <div style={estilos.tarjetaLabel}>Películas vistas</div>
              </div>
              <div style={estilos.tarjeta}>
                <div style={{ ...estilos.tarjetaNum, color: "#f472b6" }}>{datos.totalPendientes}</div>
                <div style={estilos.tarjetaLabel}>Pendientes</div>
              </div>
              <div style={estilos.tarjeta}>
                <div style={{ ...estilos.tarjetaNum, color: "#c084fc" }}>
                  {datos.totalVistas + datos.totalPendientes}
                </div>
                <div style={estilos.tarjetaLabel}>Total en lista</div>
              </div>
            </div>
 
            {/* Gráfica por año */}
            {dataPorAnio.length > 0 && (
              <div style={estilos.seccion}>
                <h3 style={estilos.subtitulo}>Películas vistas por año</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dataPorAnio} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="anio" stroke="#aaa" tick={{ fontSize: 13 }} />
                    <YAxis stroke="#aaa" tick={{ fontSize: 13 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "#1e0a2e", border: "1px solid #9b59b6", borderRadius: 8 }}
                      labelStyle={{ color: "#c084fc" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {dataPorAnio.map((_, i) => (
                        <Cell key={i} fill={COLORES[i % COLORES.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
 
            {/* Gráfica por mes */}
            {dataPorMes.length > 0 && (
              <div style={estilos.seccion}>
                <h3 style={estilos.subtitulo}>Películas vistas por mes</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dataPorMes} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis
                      dataKey="mes"
                      stroke="#aaa"
                      tick={{ fontSize: 11, fill: "#aaa" }}
                      angle={-35}
                      textAnchor="end"
                      interval={0}
                    />
                    <YAxis stroke="#aaa" tick={{ fontSize: 13 }} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{ background: "#1e0a2e", border: "1px solid #e91e8c", borderRadius: 8 }}
                      labelStyle={{ color: "#f472b6" }}
                      itemStyle={{ color: "#fff" }}
                    />
                    <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                      {dataPorMes.map((_, i) => (
                        <Cell key={i} fill={COLORES[i % COLORES.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
 
            {dataPorAnio.length === 0 && (
              <p style={estilos.mensaje}>
                Aún no tienes películas marcadas como vistas. ¡Empieza a ver películas para ver tus estadísticas!
              </p>
            )}
          </>
        )}
 
        {/* Botón cerrar al fondo del panel */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button style={estilos.btnCerrar} onClick={onClose}>
            Cerrar
          </button>
        </div>
 
      </div>
    </div>
  );
}
 
const estilos = {
  overlay: {
    position:       "fixed",
    inset:          0,
    background:     "rgba(0,0,0,0.75)",
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    zIndex:         1000,
    padding:        "20px",
  },
  panel: {
    background:   "#120820",
    border:       "1px solid rgba(155,89,182,0.3)",
    borderRadius: "16px",
    padding:      "32px",
    width:        "100%",
    maxWidth:     "700px",
    maxHeight:    "90vh",
    overflowY:    "auto",
  },
  header: {
    display:        "flex",
    justifyContent: "flex-start",
    alignItems:     "center",
    marginBottom:   "24px",
  },
  titulo: {
    color:      "#c084fc",
    fontSize:   "22px",
    fontWeight: "700",
    margin:     0,
    display:    "flex",
    alignItems: "center",
  },
  btnCerrar: {
    background:   "rgba(155,89,182,0.2)",
    border:       "1px solid rgba(155,89,182,0.4)",
    borderRadius: "10px",
    color:        "#c084fc",
    padding:      "10px 40px",
    cursor:       "pointer",
    fontSize:     "15px",
    fontWeight:   "600",
  },
  tarjetas: {
    display:             "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap:                 "16px",
    marginBottom:        "32px",
  },
  tarjeta: {
    background:   "rgba(155,89,182,0.1)",
    border:       "1px solid rgba(155,89,182,0.2)",
    borderRadius: "12px",
    padding:      "20px",
    textAlign:    "center",
  },
  tarjetaNum: {
    fontSize:   "36px",
    fontWeight: "700",
    color:      "#9b59b6",
  },
  tarjetaLabel: {
    fontSize:  "13px",
    color:     "#aaa",
    marginTop: "4px",
  },
  seccion: {
    marginBottom: "32px",
  },
  subtitulo: {
    color:        "#f472b6",
    fontSize:     "16px",
    fontWeight:   "600",
    marginBottom: "12px",
  },
  mensaje: {
    color:     "#aaa",
    textAlign: "center",
    padding:   "20px 0",
  },
};
 