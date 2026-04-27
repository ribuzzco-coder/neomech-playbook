"use client";
import { useState } from "react";
import { Card, SectionHeader } from "./ui";
import { TASKS } from "../data";

export function TasksSection() {
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const next = new Set(completed);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setCompleted(next);
  };

  const frequencies = ["diaria", "semanal", "mensual"] as const;
  const labels = {
    diaria: "Tareas diarias",
    semanal: "Tareas semanales",
    mensual: "Tareas mensuales",
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Tareas"
        sub="Checklist operativo por frecuencia. Marca las completadas al final del día o semana."
      />

      {frequencies.map((freq) => {
        const tasks = TASKS.filter((t) => t.frequency === freq);
        const done = tasks.filter((t) => completed.has(t.id)).length;

        return (
          <Card key={freq}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold">{labels[freq]}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--rb-muted)" }}>
                  {done}/{tasks.length} completadas
                </div>
              </div>
              <div
                className="text-xs px-3 py-1 rounded-full font-medium"
                style={{
                  background: done === tasks.length ? "var(--rb-success)" : "var(--rb-secondary)",
                  color: done === tasks.length ? "#fff" : "var(--rb-muted)",
                }}
              >
                {done === tasks.length ? "✓ Completo" : `${tasks.length - done} pendientes`}
              </div>
            </div>

            {/* PROGRESS */}
            <div className="w-full rounded-full h-1.5 mb-4" style={{ background: "var(--rb-secondary)" }}>
              <div
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: `${(done / tasks.length) * 100}%`,
                  background: "var(--rb-accent)",
                }}
              />
            </div>

            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="flex items-start gap-3 p-2 rounded cursor-pointer transition-all"
                  style={{
                    background: completed.has(task.id) ? "var(--rb-secondary)" : "transparent",
                  }}
                  onClick={() => toggle(task.id)}
                >
                  <div
                    className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: completed.has(task.id) ? "var(--rb-accent)" : "#fff",
                      borderColor: completed.has(task.id) ? "var(--rb-accent)" : "var(--rb-border)",
                    }}
                  >
                    {completed.has(task.id) && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <span
                      className="text-sm"
                      style={{
                        color: completed.has(task.id) ? "var(--rb-muted)" : "var(--rb-text)",
                        textDecoration: completed.has(task.id) ? "line-through" : "none",
                      }}
                    >
                      {task.title}
                    </span>
                    {task.target && (
                      <span
                        className="ml-2 text-xs"
                        style={{ color: "var(--rb-accent)" }}
                      >
                        Meta: {task.target.toLocaleString("es-CO")}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const next = new Set(completed);
                tasks.forEach((t) => next.delete(t.id));
                setCompleted(next);
              }}
              className="mt-3 text-xs"
              style={{ color: "var(--rb-muted)" }}
            >
              Limpiar selección
            </button>
          </Card>
        );
      })}

      {/* WEEKLY REVIEW */}
      <Card>
        <div className="font-semibold mb-3">Revisión semanal</div>
        <div className="space-y-2">
          {[
            "¿Cuántas marcas nuevas hablamos?",
            "¿Cuántas conversaciones reales tuvimos?",
            "¿Cuántas propuestas enviamos?",
            "¿Cuántas cerramos?",
            "¿Qué canal funcionó mejor?",
            "¿Qué tipo de cliente respondió mejor?",
            "¿Qué tipo de proyecto tuvo mejor margen?",
            "¿Qué proyecto saturó producción?",
            "¿Qué debemos dejar de vender?",
            "¿Qué debemos vender más?",
            "¿Qué debemos ajustar en el discurso?",
          ].map((q) => (
            <div key={q} className="text-sm flex gap-2 items-start p-2 rounded"
              style={{ background: "var(--rb-bg)" }}>
              <span style={{ color: "var(--rb-accent)" }}>→</span>
              {q}
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            const text = [
              "REVISIÓN SEMANAL NEOMECH",
              "=".repeat(30),
              "¿Cuántas marcas nuevas hablamos?",
              "R:",
              "",
              "¿Cuántas conversaciones reales tuvimos?",
              "R:",
              "",
              "¿Cuántas propuestas enviamos?",
              "R:",
              "",
              "¿Cuántas cerramos?",
              "R:",
              "",
              "¿Qué canal funcionó mejor?",
              "R:",
              "",
              "¿Qué tipo de cliente respondió mejor?",
              "R:",
              "",
              "¿Qué debemos ajustar en el discurso?",
              "R:",
            ].join("\n");
            navigator.clipboard.writeText(text);
          }}
          className="mt-4 text-sm px-4 py-2 rounded font-medium"
          style={{ background: "var(--rb-secondary)", color: "var(--rb-text)", border: "1px solid var(--rb-border)" }}
        >
          Copiar plantilla de revisión
        </button>
      </Card>
    </div>
  );
}