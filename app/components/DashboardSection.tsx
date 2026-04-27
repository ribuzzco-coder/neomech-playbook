"use client";
import { useState, useEffect } from "react";
import { Card, SectionHeader, StatusBadge, Button } from "./ui";
import { Prospect, Project, Channel, ProspectStatus, ProjectStatus } from "../types";
import {
  getProspects, addProspect, updateProspect, deleteProspect,
  getProjects, addProject, updateProject, deleteProject,
  getMonthlySales, getAverageTicket, exportToCSV, exportToJSON,
} from "../store";

const META = 5000000;
const formatCOP = (n: number) =>
  n.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 });

function genId() {
  return Math.random().toString(36).slice(2, 10);
}

// ── PROSPECT FORM ──────────────────────────────────────────
function ProspectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Prospect;
  onSave: (p: Prospect) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Prospect>>(
    initial ?? { channel: "feria", status: "identificado", fitScore: 0, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  const set = (k: keyof Prospect, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.brandName) return alert("Ingresa el nombre de la marca");
    onSave({ ...form, id: form.id ?? genId(), updatedAt: new Date().toISOString() } as Prospect);
  };

  const inputClass = "w-full text-sm border rounded px-3 py-2 outline-none focus:border-orange-400";
  const inputStyle = { borderColor: "var(--rb-border)", background: "var(--rb-surface)" };

  return (
    <Card className="mb-4">
      <div className="font-semibold mb-4">{initial ? "Editar prospecto" : "Nuevo prospecto"}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Marca *</label>
          <input className={inputClass} style={inputStyle} value={form.brandName ?? ""} onChange={(e) => set("brandName", e.target.value)} placeholder="Nombre de la marca" />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Contacto</label>
          <input className={inputClass} style={inputStyle} value={form.contactName ?? ""} onChange={(e) => set("contactName", e.target.value)} placeholder="Nombre del contacto" />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Canal</label>
          <select className={inputClass} style={inputStyle} value={form.channel} onChange={(e) => set("channel", e.target.value as Channel)}>
            <option value="feria">Feria</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="referido">Referido</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Estado</label>
          <select className={inputClass} style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value as ProspectStatus)}>
            {["identificado","contactado","respondio","reunion_agendada","requerimientos_enviados","requerimientos_recibidos","propuesta_enviada","cerrado","perdido"].map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Instagram</label>
          <input className={inputClass} style={inputStyle} value={form.instagram ?? ""} onChange={(e) => set("instagram", e.target.value)} placeholder="@marca" />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Fit Score (0-8)</label>
          <input type="number" min={0} max={8} className={inputClass} style={inputStyle} value={form.fitScore ?? 0} onChange={(e) => set("fitScore", Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Follow-up</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.followUpDate ?? ""} onChange={(e) => set("followUpDate", e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Próximo paso</label>
          <input className={inputClass} style={inputStyle} value={form.nextStep ?? ""} onChange={(e) => set("nextStep", e.target.value)} placeholder="Ej: Enviar propuesta" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Necesidad observada</label>
          <input className={inputClass} style={inputStyle} value={form.observedNeed ?? ""} onChange={(e) => set("observedNeed", e.target.value)} placeholder="¿Qué necesita esta marca?" />
        </div>
        <div className="md:col-span-2">
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Notas</label>
          <textarea className={inputClass} style={inputStyle} rows={2} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Notas adicionales..." />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </Card>
  );
}

// ── PROJECT FORM ───────────────────────────────────────────
function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Project;
  onSave: (p: Project) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Project>>(
    initial ?? { status: "diseno", value: 0 }
  );
  const set = (k: keyof Project, v: unknown) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.clientName) return alert("Ingresa el nombre del cliente");
    if (!form.projectName) return alert("Ingresa el nombre del proyecto");
    onSave({ ...form, id: form.id ?? genId() } as Project);
  };

  const inputClass = "w-full text-sm border rounded px-3 py-2 outline-none focus:border-orange-400";
  const inputStyle = { borderColor: "var(--rb-border)", background: "var(--rb-surface)" };

  return (
    <Card className="mb-4">
      <div className="font-semibold mb-4">{initial ? "Editar proyecto" : "Nuevo proyecto"}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Cliente *</label>
          <input className={inputClass} style={inputStyle} value={form.clientName ?? ""} onChange={(e) => set("clientName", e.target.value)} placeholder="Nombre del cliente" />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Proyecto *</label>
          <input className={inputClass} style={inputStyle} value={form.projectName ?? ""} onChange={(e) => set("projectName", e.target.value)} placeholder="Nombre del proyecto" />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Valor (COP)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.value ?? 0} onChange={(e) => set("value", Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Anticipo (COP)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.initialPayment ?? 0} onChange={(e) => set("initialPayment", Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Estado</label>
          <select className={inputClass} style={inputStyle} value={form.status} onChange={(e) => set("status", e.target.value as ProjectStatus)}>
            {["diseno","prototipo","validacion","produccion","entrega","finalizado"].map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Canal de origen</label>
          <select className={inputClass} style={inputStyle} value={form.sourceChannel ?? "feria"} onChange={(e) => set("sourceChannel", e.target.value)}>
            <option value="feria">Feria</option>
            <option value="instagram">Instagram</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="referido">Referido</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Fecha de cierre</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.closeDate ?? ""} onChange={(e) => set("closeDate", e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Fecha de entrega</label>
          <input type="date" className={inputClass} style={inputStyle} value={form.deliveryDate ?? ""} onChange={(e) => set("deliveryDate", e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Margen estimado (%)</label>
          <input type="number" className={inputClass} style={inputStyle} value={form.estimatedMargin ?? 0} onChange={(e) => set("estimatedMargin", Number(e.target.value))} />
        </div>
        <div>
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--rb-muted)" }}>Notas</label>
          <input className={inputClass} style={inputStyle} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} placeholder="Notas del proyecto" />
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button onClick={handleSave}>Guardar</Button>
        <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
      </div>
    </Card>
  );
}

// ── MAIN DASHBOARD ─────────────────────────────────────────
export function DashboardSection({ onSalesUpdate }: { onSalesUpdate: (n: number) => void }) {
  const [tab, setTab] = useState<"prospectos" | "proyectos" | "kpis">("prospectos");
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showProspectForm, setShowProspectForm] = useState(false);
  const [editingProspect, setEditingProspect] = useState<Prospect | undefined>();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  useEffect(() => {
    const p = getProspects();
    const pr = getProjects();
    setProspects(p);
    setProjects(pr);
    onSalesUpdate(getMonthlySales(pr));
  }, []);

  const refreshProspects = () => setProspects(getProspects());
  const refreshProjects = () => {
    const pr = getProjects();
    setProjects(pr);
    onSalesUpdate(getMonthlySales(pr));
  };

  const handleSaveProspect = (p: Prospect) => {
    if (editingProspect) updateProspect(p);
    else addProspect(p);
    refreshProspects();
    setShowProspectForm(false);
    setEditingProspect(undefined);
  };

  const handleSaveProject = (p: Project) => {
    if (editingProject) updateProject(p);
    else addProject(p);
    refreshProjects();
    setShowProjectForm(false);
    setEditingProject(undefined);
  };

  const monthlySales = getMonthlySales(projects);
  const avgTicket = getAverageTicket(projects);
  const closedProjects = projects.filter((p) => p.status === "finalizado");
  const proposalsSent = prospects.filter((p) => p.status === "propuesta_enviada" || p.status === "cerrado").length;
  const contacted = prospects.filter((p) => p.status !== "identificado").length;
  const responded = prospects.filter((p) => !["identificado", "contactado"].includes(p.status)).length;

  const tabs = [
    { key: "prospectos", label: `Prospectos (${prospects.length})` },
    { key: "proyectos", label: `Proyectos (${projects.length})` },
    { key: "kpis", label: "KPIs" },
  ] as const;

  return (
    <div className="space-y-6">
      <SectionHeader title="Dashboard Comercial" sub="Prospectos, proyectos activos y KPIs en tiempo real." />

      {/* TABS */}
      <div className="flex gap-1 border-b" style={{ borderColor: "var(--rb-border)" }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="px-4 py-2 text-sm font-medium transition-all"
            style={{
              borderBottom: tab === t.key ? "2px solid var(--rb-accent)" : "2px solid transparent",
              color: tab === t.key ? "var(--rb-accent)" : "var(--rb-muted)",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* PROSPECTOS */}
      {tab === "prospectos" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => { setShowProspectForm(true); setEditingProspect(undefined); }}>
              + Nuevo prospecto
            </Button>
            <Button variant="secondary" onClick={() => exportToCSV(prospects, "prospectos.csv")}>
              Exportar CSV
            </Button>
            <Button variant="secondary" onClick={() => exportToJSON(prospects, "prospectos.json")}>
              Exportar JSON
            </Button>
          </div>

          {(showProspectForm || editingProspect) && (
            <ProspectForm
              initial={editingProspect}
              onSave={handleSaveProspect}
              onCancel={() => { setShowProspectForm(false); setEditingProspect(undefined); }}
            />
          )}

          {prospects.length === 0 && (
            <Card>
              <p className="text-sm text-center py-6" style={{ color: "var(--rb-muted)" }}>
                No hay prospectos aún. Agrega el primero.
              </p>
            </Card>
          )}

          <div className="space-y-2">
            {prospects.map((p) => (
              <Card key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{p.brandName}</span>
                      <StatusBadge status={p.status} />
                      <span className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "var(--rb-secondary)", color: "var(--rb-muted)" }}>
                        {p.channel}
                      </span>
                      <span className="text-xs font-medium"
                        style={{ color: p.fitScore >= 6 ? "var(--rb-success)" : p.fitScore >= 4 ? "var(--rb-warning)" : "var(--rb-danger)" }}>
                        Fit: {p.fitScore}/8
                      </span>
                    </div>
                    <div className="mt-1 text-xs space-x-3" style={{ color: "var(--rb-muted)" }}>
                      {p.contactName && <span>{p.contactName}</span>}
                      {p.instagram && <span>{p.instagram}</span>}
                      {p.followUpDate && <span>Follow-up: {p.followUpDate}</span>}
                    </div>
                    {p.nextStep && (
                      <div className="mt-1 text-xs" style={{ color: "var(--rb-accent)" }}>
                        → {p.nextStep}
                      </div>
                    )}
                    {p.observedNeed && (
                      <div className="mt-1 text-xs" style={{ color: "var(--rb-muted)" }}>
                        {p.observedNeed}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-xs px-2 py-1 rounded"
                      style={{ background: "var(--rb-secondary)", color: "var(--rb-text)" }}
                      onClick={() => { setEditingProspect(p); setShowProspectForm(false); }}>
                      Editar
                    </button>
                    <button className="text-xs px-2 py-1 rounded"
                      style={{ background: "#fee2e2", color: "var(--rb-danger)" }}
                      onClick={() => { if (confirm("¿Eliminar prospecto?")) { deleteProspect(p.id); refreshProspects(); } }}>
                      ✕
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* PROYECTOS */}
      {tab === "proyectos" && (
        <div className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => { setShowProjectForm(true); setEditingProject(undefined); }}>
              + Nuevo proyecto
            </Button>
            <Button variant="secondary" onClick={() => exportToCSV(projects, "proyectos.csv")}>
              Exportar CSV
            </Button>
            <Button variant="secondary" onClick={() => exportToJSON(projects, "proyectos.json")}>
              Exportar JSON
            </Button>
          </div>

          {(showProjectForm || editingProject) && (
            <ProjectForm
              initial={editingProject}
              onSave={handleSaveProject}
              onCancel={() => { setShowProjectForm(false); setEditingProject(undefined); }}
            />
          )}

          {projects.length === 0 && (
            <Card>
              <p className="text-sm text-center py-6" style={{ color: "var(--rb-muted)" }}>
                No hay proyectos aún. Agrega el primero.
              </p>
            </Card>
          )}

          <div className="space-y-2">
            {projects.map((p) => (
              <Card key={p.id}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm">{p.clientName}</span>
                      <span className="text-xs" style={{ color: "var(--rb-muted)" }}>{p.projectName}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="mt-1 text-xs space-x-3" style={{ color: "var(--rb-muted)" }}>
                      <span className="font-semibold" style={{ color: "var(--rb-text)" }}>
                        {formatCOP(p.value)}
                      </span>
                      {p.initialPayment && <span>Anticipo: {formatCOP(p.initialPayment)}</span>}
                      {p.deliveryDate && <span>Entrega: {p.deliveryDate}</span>}
                      {p.sourceChannel && <span>Canal: {p.sourceChannel}</span>}
                      {p.estimatedMargin && <span>Margen: {p.estimatedMargin}%</span>}
                    </div>
                    {p.notes && (
                      <div className="mt-1 text-xs" style={{ color: "var(--rb-muted)" }}>{p.notes}</div>
                    )}
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button className="text-xs px-2 py-1 rounded"
                      style={{ background: "var(--rb-secondary)", color: "var(--rb-text)" }}
                      onClick={() => { setEditingProject(p); setShowProjectForm(false); }}>
                      Editar
                    </button>
                    <button className="text-xs px-2 py-1 rounded"
                      style={{ background: "#fee2e2", color: "var(--rb-danger)" }}
                      onClick={() => { if (confirm("¿Eliminar proyecto?")) { deleteProject(p.id); refreshProjects(); } }}>
                      ✕
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* KPIs */}
      {tab === "kpis" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Ventas del mes", value: formatCOP(monthlySales), accent: true },
              { label: "Ticket promedio", value: avgTicket > 0 ? formatCOP(avgTicket) : "—" },
              { label: "Proyectos cerrados", value: String(closedProjects.length) },
              { label: "Prospectos totales", value: String(prospects.length) },
              { label: "Contactados", value: String(contacted) },
              { label: "Respondieron", value: String(responded) },
              { label: "Propuestas enviadas", value: String(proposalsSent) },
              {
                label: "Tasa de cierre",
                value: proposalsSent > 0 ? `${((closedProjects.length / proposalsSent) * 100).toFixed(0)}%` : "—",
              },
              {
                label: "Tasa de respuesta",
                value: contacted > 0 ? `${((responded / contacted) * 100).toFixed(0)}%` : "—",
              },
            ].map((m) => (
              <div key={m.label} className="rounded-lg p-4 border"
                style={{
                  background: m.accent ? "var(--rb-accent)" : "var(--rb-surface)",
                  borderColor: m.accent ? "var(--rb-accent)" : "var(--rb-border)",
                  color: m.accent ? "#fff" : "var(--rb-text)",
                }}>
                <div className="text-xs mb-1" style={{ opacity: 0.7 }}>{m.label}</div>
                <div className="text-xl font-bold">{m.value}</div>
              </div>
            ))}
          </div>

          <Card>
            <div className="font-semibold mb-3">Avance hacia $5.000.000</div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{formatCOP(monthlySales)}</span>
                <span style={{ color: "var(--rb-muted)" }}>{formatCOP(META)}</span>
              </div>
              <div className="w-full rounded-full h-3" style={{ background: "var(--rb-secondary)" }}>
                <div className="h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((monthlySales / META) * 100, 100)}%`, background: "var(--rb-accent)" }} />
              </div>
            </div>
            <div className="text-sm mt-3" style={{ color: "var(--rb-muted)" }}>
              Faltan <strong style={{ color: "var(--rb-text)" }}>{formatCOP(Math.max(META - monthlySales, 0))}</strong> para la meta.
              {avgTicket > 0 && (
                <> Con ticket promedio actual, necesitas{" "}
                  <strong style={{ color: "var(--rb-accent)" }}>
                    {Math.ceil(Math.max(META - monthlySales, 0) / avgTicket)} proyecto{Math.ceil(Math.max(META - monthlySales, 0) / avgTicket) !== 1 ? "s" : ""} más.
                  </strong>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}