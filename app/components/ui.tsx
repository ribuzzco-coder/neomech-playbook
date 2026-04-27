"use client";
import { ReactNode } from "react";

// CARD
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`bg-white border rounded-lg p-4 ${className}`}
      style={{ borderColor: "var(--rb-border)" }}
    >
      {children}
    </div>
  );
}

// METRIC CARD
export function MetricCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="rounded-lg p-4 border"
      style={{
        background: accent ? "var(--rb-accent)" : "var(--rb-surface)",
        borderColor: accent ? "var(--rb-accent)" : "var(--rb-border)",
        color: accent ? "#fff" : "var(--rb-text)",
      }}
    >
      <div className="text-xs font-medium mb-1" style={{ opacity: 0.7 }}>
        {label}
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && (
        <div className="text-xs mt-1" style={{ opacity: 0.6 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

// PROGRESS BAR
export function ProgressBar({ value, max, label }: { value: number; max: number; label?: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-xs mb-1" style={{ color: "var(--rb-muted)" }}>
          <span>{label}</span>
          <span>{pct.toFixed(1)}%</span>
        </div>
      )}
      <div className="w-full rounded-full h-2" style={{ background: "var(--rb-secondary)" }}>
        <div
          className="h-2 rounded-full transition-all"
          style={{ width: `${pct}%`, background: "var(--rb-accent)" }}
        />
      </div>
    </div>
  );
}

// STATUS BADGE
const STATUS_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  identificado: { bg: "#e5e7eb", color: "#374151", label: "Identificado" },
  contactado: { bg: "#dbeafe", color: "#1d4ed8", label: "Contactado" },
  respondio: { bg: "#e0f2fe", color: "#0369a1", label: "Respondió" },
  reunion_agendada: { bg: "#fef9c3", color: "#854d0e", label: "Reunión agendada" },
  requerimientos_enviados: { bg: "#fce7f3", color: "#9d174d", label: "Req. enviados" },
  requerimientos_recibidos: { bg: "#ede9fe", color: "#5b21b6", label: "Req. recibidos" },
  propuesta_enviada: { bg: "#ffedd5", color: "#9a3412", label: "Propuesta enviada" },
  cerrado: { bg: "#dcfce7", color: "#14532d", label: "Cerrado" },
  perdido: { bg: "#fee2e2", color: "#7f1d1d", label: "Perdido" },
  diseno: { bg: "#dbeafe", color: "#1d4ed8", label: "Diseño" },
  prototipo: { bg: "#fce7f3", color: "#9d174d", label: "Prototipo" },
  validacion: { bg: "#fef9c3", color: "#854d0e", label: "Validación" },
  produccion: { bg: "#ffedd5", color: "#9a3412", label: "Producción" },
  entrega: { bg: "#ede9fe", color: "#5b21b6", label: "Entrega" },
  finalizado: { bg: "#dcfce7", color: "#14532d", label: "Finalizado" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS_COLORS[status] ?? { bg: "#e5e7eb", color: "#374151", label: status };
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

// COPY BUTTON
export function CopyButton({ text }: { text: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <button
      onClick={handleCopy}
      className="text-xs px-3 py-1 rounded font-medium transition-all"
      style={{
        background: "var(--rb-secondary)",
        color: "var(--rb-text)",
        border: "1px solid var(--rb-border)",
      }}
    >
      Copiar script
    </button>
  );
}

// SECTION HEADER
export function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold" style={{ color: "var(--rb-text)" }}>
        {title}
      </h2>
      {sub && (
        <p className="text-sm mt-1" style={{ color: "var(--rb-muted)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// BUTTON
export function Button({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  className?: string;
}) {
  const styles = {
    primary: { background: "var(--rb-accent)", color: "#fff", border: "none" },
    secondary: {
      background: "var(--rb-surface)",
      color: "var(--rb-text)",
      border: "1px solid var(--rb-border)",
    },
    danger: { background: "var(--rb-danger)", color: "#fff", border: "none" },
  };
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-sm font-medium transition-opacity hover:opacity-80 ${className}`}
      style={styles[variant]}
    >
      {children}
    </button>
  );
}