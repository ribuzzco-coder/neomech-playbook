"use client";
import { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-4 border ${className}`}
      style={{
        background: "linear-gradient(180deg, rgba(29,33,48,0.88), rgba(24,26,36,0.92))",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      {children}
    </div>
  );
}

export function MetricCard({ label, value, sub, accent = false }: {
  label: string; value: string; sub?: string; accent?: boolean;
}) {
  return (
    <div
      className="rounded-xl p-4 border"
      style={{
        background: accent
          ? "linear-gradient(135deg, rgba(230,37,255,0.18), rgba(91,22,230,0.12))"
          : "linear-gradient(180deg, rgba(29,33,48,0.88), rgba(24,26,36,0.92))",
        borderColor: accent ? "rgba(230,37,255,0.32)" : "rgba(255,255,255,0.08)",
        boxShadow: accent ? "0 0 24px rgba(230,37,255,0.12)" : "none",
      }}
    >
      <div className="text-xs font-medium mb-1" style={{ color: "#98a0b3" }}>{label}</div>
      <div className="text-2xl font-bold font-heading" style={{ color: accent ? "#e625ff" : "#f5f7fa" }}>{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#98a0b3" }}>{sub}</div>}
    </div>
  );
}

export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1" style={{ color: "#98a0b3" }}>
          <span>{label}</span>
          <span>{pct.toFixed(1)}%</span>
        </div>
      )}
      <div className="w-full rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div
          className="h-1.5 rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, #e625ff, #5b16e6)",
            boxShadow: "0 0 12px rgba(230,37,255,0.4)",
          }}
        />
      </div>
    </div>
  );
}

const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  identificado:             { bg: "rgba(255,255,255,0.06)", color: "#98a0b3", label: "Identificado" },
  contactado:               { bg: "rgba(15,239,253,0.12)", color: "#0feffd", label: "Contactado" },
  respondio:                { bg: "rgba(15,239,253,0.18)", color: "#0feffd", label: "Respondió" },
  reunion_agendada:         { bg: "rgba(230,37,255,0.14)", color: "#e625ff", label: "Reunión agendada" },
  requerimientos_enviados:  { bg: "rgba(91,22,230,0.18)", color: "#a78bfa", label: "Req. enviados" },
  requerimientos_recibidos: { bg: "rgba(91,22,230,0.24)", color: "#c4b5fd", label: "Req. recibidos" },
  propuesta_enviada:        { bg: "rgba(230,37,255,0.2)", color: "#f0abfc", label: "Propuesta enviada" },
  cerrado:                  { bg: "rgba(31,157,85,0.2)", color: "#4ade80", label: "Cerrado" },
  perdido:                  { bg: "rgba(214,69,69,0.18)", color: "#f87171", label: "Perdido" },
  diseno:                   { bg: "rgba(15,239,253,0.12)", color: "#0feffd", label: "Diseño" },
  prototipo:                { bg: "rgba(230,37,255,0.14)", color: "#e625ff", label: "Prototipo" },
  validacion:               { bg: "rgba(217,154,0,0.18)", color: "#fbbf24", label: "Validación" },
  produccion:               { bg: "rgba(91,22,230,0.18)", color: "#a78bfa", label: "Producción" },
  entrega:                  { bg: "rgba(15,239,253,0.18)", color: "#0feffd", label: "Entrega" },
  finalizado:               { bg: "rgba(31,157,85,0.2)", color: "#4ade80", label: "Finalizado" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: "rgba(255,255,255,0.06)", color: "#98a0b3", label: status };
  return (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: s.bg, color: s.color }}>
      {s.label}
    </span>
  );
}

export function CopyButton({ text }: { text: string }) {
  const handleCopy = () => navigator.clipboard.writeText(text);
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded-full font-medium transition-all hover:opacity-80"
      style={{
        background: "rgba(230,37,255,0.12)",
        color: "#e625ff",
        border: "1px solid rgba(230,37,255,0.24)",
      }}
    >
      Copiar
    </button>
  );
}

export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold font-heading" style={{ color: "#f5f7fa" }}>{title}</h2>
      {sub && <p className="text-sm mt-1" style={{ color: "#98a0b3" }}>{sub}</p>}
    </div>
  );
}

export function Button({ children, onClick, variant = "primary", className = "" }: {
  children: ReactNode; onClick?: () => void; variant?: "primary" | "secondary" | "danger"; className?: string;
}) {
  const styles = {
    primary: {
      background: "linear-gradient(135deg, #e625ff, #5b16e6)",
      color: "#fff",
      border: "none",
      boxShadow: "0 0 20px rgba(230,37,255,0.24)",
    },
    secondary: {
      background: "rgba(255,255,255,0.06)",
      color: "#c7cbd6",
      border: "1px solid rgba(255,255,255,0.1)",
    },
    danger: {
      background: "rgba(214,69,69,0.18)",
      color: "#f87171",
      border: "1px solid rgba(214,69,69,0.32)",
    },
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-opacity hover:opacity-80 ${className}`}
      style={styles[variant]}
    >
      {children}
    </button>
  );
}