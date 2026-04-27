"use client";
import { ProgressBar, MetricCard } from "./ui";

export function HeroSection({
  monthlySales,
  onNavigate,
}: {
  monthlySales: number;
  onNavigate: (section: string) => void;
}) {
  const META = 5000000;
  const formatCOP = (n: number) =>
    n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      {/* HERO */}
      <div
        className="rounded-lg p-8"
        style={{ background: "var(--rb-primary)", color: "#fff" }}
      >
        <div className="text-xs font-medium mb-2 opacity-50 tracking-widest uppercase">
          Sistema operativo comercial
        </div>
        <h1 className="text-3xl font-bold mb-2">Playbook Comercial Neomech</h1>
        <p className="text-sm opacity-70 mb-6 max-w-xl">
          De conversaciones a proyectos cerrados. Meta: $5.000.000 COP mensuales en 90 días.
        </p>
        <div className="mb-4">
          <ProgressBar value={monthlySales} max={META} label="Avance hacia meta mensual" />
        </div>
        <div className="flex gap-2 mt-6 flex-wrap">
          <button
            onClick={() => onNavigate("tareas")}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ background: "var(--rb-accent)", color: "#fff" }}
          >
            Ver tareas de esta semana
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-4 py-2 rounded text-sm font-medium"
            style={{ background: "rgba(255,255,255,0.1)", color: "#fff" }}
          >
            Abrir dashboard comercial
          </button>
        </div>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          label="Meta mensual"
          value="$5.000.000"
          sub="COP"
          accent
        />
        <MetricCard
          label="Ventas este mes"
          value={formatCOP(monthlySales)}
          sub={`${((monthlySales / META) * 100).toFixed(1)}% de la meta`}
        />
        <MetricCard
          label="Ticket medio objetivo"
          value="$1M – $1.5M"
          sub="COP por proyecto"
        />
        <MetricCard
          label="Proyectos necesarios"
          value="4 – 5"
          sub="proyectos al mes"
        />
      </div>

      {/* POSITIONING */}
      <div
        className="rounded-lg p-6 border"
        style={{ borderColor: "var(--rb-border)", background: "var(--rb-surface)" }}
      >
        <div className="text-xs font-medium mb-3 tracking-widest uppercase"
          style={{ color: "var(--rb-accent)" }}>
          Posicionamiento Neomech
        </div>
        <p className="text-lg font-semibold mb-4" style={{ color: "var(--rb-text)" }}>
          Diseñamos y fabricamos soluciones físicas personalizadas que ayudan a las marcas a
          destacar, diferenciarse y convertir mejor sus interacciones en oportunidades reales.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
          {[
            { label: "Diseñamos y fabricamos", desc: "Ingeniería + diseño + ejecución" },
            { label: "Soluciones físicas personalizadas", desc: "No productos genéricos, soluciones ajustadas" },
            { label: "Destacar y diferenciarse", desc: "Identidad visual y recordación de marca" },
            { label: "Convertir interacciones", desc: "Conversaciones, contactos, ventas y próximos pasos" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-3 rounded border"
              style={{ borderColor: "var(--rb-border)", background: "var(--rb-bg)" }}
            >
              <div className="text-sm font-semibold">{item.label}</div>
              <div className="text-xs mt-1" style={{ color: "var(--rb-muted)" }}>{item.desc}</div>
            </div>
          ))}
        </div>
        <div
          className="mt-4 p-3 rounded text-sm"
          style={{ background: "var(--rb-secondary)", color: "var(--rb-muted)" }}
        >
          <strong style={{ color: "var(--rb-text)" }}>Regla comercial:</strong> Primero entramos
          por diseño y diferenciación. Después mostramos cómo eso puede generar oportunidades
          comerciales.
        </div>
      </div>
    </div>
  );
}