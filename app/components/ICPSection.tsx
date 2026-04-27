"use client";
import { useState } from "react";
import { Card, SectionHeader } from "./ui";
import { ICP_YES, ICP_NO, FIT_CRITERIA, WORKFLOW_STEPS } from "../data";

export function ICPSection() {
  const [fitScores, setFitScores] = useState<boolean[]>(
    new Array(FIT_CRITERIA.length).fill(false)
  );
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const score = fitScores.filter(Boolean).length;
  const fitLabel =
    score <= 3 ? "Bajo fit" : score <= 5 ? "Fit medio" : "Alto fit ✓";
  const fitColor =
    score <= 3
      ? "var(--rb-danger)"
      : score <= 5
      ? "var(--rb-warning)"
      : "var(--rb-success)";

  return (
    <div className="space-y-8">
      {/* ICP */}
      <div>
        <SectionHeader
          title="ICP Operativo"
          sub="Matriz de clientes que sí buscamos y los que no priorizamos"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <div
              className="text-xs font-bold mb-3 tracking-widest uppercase"
              style={{ color: "var(--rb-success)" }}
            >
              ✓ Clientes que SÍ buscamos
            </div>
            <ul className="space-y-2">
              {ICP_YES.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span style={{ color: "var(--rb-success)" }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div
              className="text-xs font-bold mb-3 tracking-widest uppercase"
              style={{ color: "var(--rb-danger)" }}
            >
              ✗ Clientes que NO priorizamos
            </div>
            <ul className="space-y-2">
              {ICP_NO.map((item) => (
                <li key={item} className="flex gap-2 text-sm">
                  <span style={{ color: "var(--rb-danger)" }}>✗</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* FIT SCORER */}
        <Card>
          <div className="text-sm font-semibold mb-3">Scoring de fit del prospecto</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
            {FIT_CRITERIA.map((criterion, i) => (
              <label key={criterion} className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={fitScores[i]}
                  onChange={() => {
                    const next = [...fitScores];
                    next[i] = !next[i];
                    setFitScores(next);
                  }}
                  className="rounded"
                />
                {criterion}
              </label>
            ))}
          </div>
          <div
            className="flex items-center gap-3 p-3 rounded"
            style={{ background: "var(--rb-secondary)" }}
          >
            <span className="text-2xl font-bold" style={{ color: fitColor }}>
              {score}/8
            </span>
            <span className="text-sm font-semibold" style={{ color: fitColor }}>
              {fitLabel}
            </span>
            <button
              onClick={() => setFitScores(new Array(FIT_CRITERIA.length).fill(false))}
              className="ml-auto text-xs px-2 py-1 rounded"
              style={{ background: "var(--rb-border)", color: "var(--rb-muted)" }}
            >
              Limpiar
            </button>
          </div>
        </Card>
      </div>

      {/* WORKFLOW */}
      <div>
        <SectionHeader
          title="Flujo comercial"
          sub="11 pasos desde preparación hasta testimonio. Clic en cada paso para ver detalle."
        />

        {/* FLOW BAR */}
        <div className="flex flex-wrap gap-1 mb-4">
          {WORKFLOW_STEPS.map((step) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
              className="text-xs px-3 py-1.5 rounded font-medium transition-all"
              style={{
                background:
                  activeStep === step.id ? "var(--rb-accent)" : "var(--rb-secondary)",
                color: activeStep === step.id ? "#fff" : "var(--rb-text)",
                border: `1px solid ${activeStep === step.id ? "var(--rb-accent)" : "var(--rb-border)"}`,
              }}
            >
              {step.id}. {step.title}
            </button>
          ))}
        </div>

        {/* STEP DETAIL */}
        {activeStep !== null && (
          <Card>
            {(() => {
              const step = WORKFLOW_STEPS.find((s) => s.id === activeStep)!;
              return (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center text-white"
                      style={{ background: "var(--rb-accent)" }}
                    >
                      {step.id}
                    </span>
                    <div>
                      <div className="font-bold">{step.title}</div>
                      <div className="text-sm" style={{ color: "var(--rb-muted)" }}>
                        {step.objective}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-bold mb-2 uppercase tracking-wider"
                        style={{ color: "var(--rb-muted)" }}>
                        Qué hacer
                      </div>
                      <ul className="space-y-1">
                        {step.actions.map((a) => (
                          <li key={a} className="text-sm flex gap-2">
                            <span style={{ color: "var(--rb-accent)" }}>→</span> {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div
                      className="p-3 rounded"
                      style={{ background: "var(--rb-secondary)" }}
                    >
                      <div className="text-xs font-bold mb-2 uppercase tracking-wider"
                        style={{ color: "var(--rb-muted)" }}>
                        Criterio para avanzar
                      </div>
                      <p className="text-sm">{step.criterion}</p>
                    </div>
                  </div>
                </div>
              );
            })()}
          </Card>
        )}
      </div>
    </div>
  );
}