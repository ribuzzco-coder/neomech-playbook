export type Channel = "feria" | "instagram" | "whatsapp" | "referido";

export type ProspectStatus =
  | "identificado"
  | "contactado"
  | "respondio"
  | "reunion_agendada"
  | "requerimientos_enviados"
  | "requerimientos_recibidos"
  | "propuesta_enviada"
  | "cerrado"
  | "perdido";

export type ProjectStatus =
  | "diseno"
  | "prototipo"
  | "validacion"
  | "produccion"
  | "entrega"
  | "finalizado";

export type ScriptStage =
  | "apertura"
  | "diagnostico"
  | "presentacion"
  | "requerimientos"
  | "followup"
  | "cierre"
  | "referido";

export type ScriptChannel =
  | "feria"
  | "instagram"
  | "whatsapp"
  | "referido"
  | "postventa";

export interface Prospect {
  id: string;
  brandName: string;
  contactName?: string;
  channel: Channel;
  businessType?: string;
  instagram?: string;
  phone?: string;
  email?: string;
  observedNeed?: string;
  fitScore: number;
  status: ProspectStatus;
  nextStep?: string;
  followUpDate?: string;
  owner?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  prospectId?: string;
  clientName: string;
  projectName: string;
  value: number;
  initialPayment?: number;
  balance?: number;
  closeDate?: string;
  deliveryDate?: string;
  status: ProjectStatus;
  sourceChannel?: string;
  estimatedMargin?: number;
  notes?: string;
}

export interface Requirement {
  id: string;
  projectId: string;
  logo: boolean;
  references: boolean;
  objective: boolean;
  usage: boolean;
  quantity: boolean;
  deliveryDate: boolean;
  budgetRange: boolean;
  decisionMaker: boolean;
  technicalRestrictions: boolean;
}

export interface Script {
  id: string;
  title: string;
  channel: ScriptChannel;
  stage: ScriptStage;
  content: string;
  variables?: string[];
}

export interface Task {
  id: string;
  title: string;
  frequency: "diaria" | "semanal" | "mensual";
  target?: number;
  completed?: boolean;
}