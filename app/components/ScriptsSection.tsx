"use client";
import { useState } from "react";
import { Card, SectionHeader, CopyButton } from "./ui";
import { SCRIPTS } from "../data";
import { ScriptChannel, ScriptStage } from "../types";

const CHANNELS: { value: ScriptChannel | "all"; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "feria", label: "Feria" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "referido", label: "Referido" },
  { value: "postventa", label: "Postventa" },
];

const STAGES: { value: ScriptStage | "all"; label: string }[] = [
  { value: "all", label: "Todas" },
  { value: "apertura", label: "Apertura" },
  { value: "diagnostico", label: "Diagnóstico" },
  { value: "presentacion", label: "Presentación" },
  { value: "requerimientos", label: "Requerimientos" },
  { value: "followup", label: "Follow-up" },
  { value: "cierre", label: "Cierre" },
  { value: "referido", label: "Referido" },
];

export function ScriptsSection() {
  const [channel, setChannel] = useState<ScriptChannel | "all">("all");
  const [stage, setStage] = useState<ScriptStage | "all">("all");

  const filtered = SCRIPTS.filter((s) => {
    if (channel !== "all" && s.channel !== channel) return false;
    if (stage !== "all" && s.stage !== stage) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Biblioteca de Scripts"
        sub="Filtra por canal y etapa. Usa el botón copiar para pegar directo en WhatsApp o Instagram."
      />

      {/* FILTERS */}
      <div className="space-y-3">
        <div>
          <div className="text-xs font-medium mb-2" style={{ color: "var(--rb-muted)" }}>
            Canal
          </div>
          <div className="flex flex-wrap gap-2">
            {CHANNELS.map((c) => (
              <button
                key={c.value}
                onClick={() => setChannel(c.value)}
                className="text-xs px-3 py-1.5 rounded font-medium transition-all"
                style={{
                  background: channel === c.value ? "var(--rb-accent)" : "var(--rb-secondary)",
                  color: channel === c.value ? "#fff" : "var(--rb-text)",
                  border: `1px solid ${channel === c.value ? "var(--rb-accent)" : "var(--rb-border)"}`,
                }}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-medium mb-2" style={{ color: "var(--rb-muted)" }}>
            Etapa
          </div>
          <div className="flex flex-wrap gap-2">
            {STAGES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStage(s.value)}
                className="text-xs px-3 py-1.5 rounded font-medium transition-all"
                style={{
                  background: stage === s.value ? "var(--rb-primary)" : "var(--rb-secondary)",
                  color: stage === s.value ? "#fff" : "var(--rb-text)",
                  border: `1px solid ${stage === s.value ? "var(--rb-primary)" : "var(--rb-border)"}`,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* RESULTS */}
      <div className="text-xs" style={{ color: "var(--rb-muted)" }}>
        {filtered.length} script{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <Card>
            <p className="text-sm text-center py-4" style={{ color: "var(--rb-muted)" }}>
              No hay scripts para estos filtros.
            </p>
          </Card>
        )}
        {filtered.map((script) => (
          <Card key={script.id}>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="font-semibold text-sm">{script.title}</div>
                <div className="flex gap-2 mt-1">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "var(--rb-secondary)", color: "var(--rb-muted)" }}
                  >
                    {script.channel}
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "var(--rb-secondary)", color: "var(--rb-muted)" }}
                  >
                    {script.stage}
                  </span>
                </div>
              </div>
              <CopyButton text={script.content} />
            </div>
            <div
              className="text-sm p-3 rounded whitespace-pre-line"
              style={{ background: "var(--rb-bg)", color: "var(--rb-text)", border: "1px solid var(--rb-border)" }}
            >
              {script.content}
            </div>
            {script.variables && script.variables.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {script.variables.map((v) => (
                  <span
                    key={v}
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: "#fff3e0", color: "#e65100" }}
                  >
                    {v}
                  </span>
                ))}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}