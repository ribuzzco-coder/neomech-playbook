import { Script, Task } from "./types";

export const SCRIPTS: Script[] = [
  {
    id: "s1",
    title: "Apertura presencial en feria",
    channel: "feria",
    stage: "apertura",
    content:
      "Hola, ¿cómo vas? Estoy conociendo marcas de la feria porque trabajamos en diseño y fabricación de soluciones físicas personalizadas para que las marcas destaquen más en espacios físicos. Me llamó la atención lo que están haciendo ustedes.",
    variables: ["{marca}"],
  },
  {
    id: "s2",
    title: "Apertura contextual en feria",
    channel: "feria",
    stage: "apertura",
    content:
      "No vengo como comprador exactamente. Estamos revisando cómo les está yendo a algunas marcas con las que hemos trabajado y quería aprovechar para conocer lo que están haciendo ustedes.",
    variables: [],
  },
  {
    id: "s3",
    title: "Apertura Instagram DM",
    channel: "instagram",
    stage: "apertura",
    content:
      "Hola {nombre}, vi lo que están haciendo con {marca} y me llamó mucho la atención. Trabajamos con marcas que quieren diferenciarse en espacios físicos con soluciones personalizadas. ¿Han pensado en algo así para {evento}?",
    variables: ["{nombre}", "{marca}", "{evento}"],
  },
  {
    id: "s4",
    title: "Diagnóstico — preguntas clave",
    channel: "feria",
    stage: "diagnostico",
    content:
      "¿Qué están buscando lograr con esta feria o activación? ¿Qué producto o línea quieren mover más? ¿Cómo están haciendo para que la gente recuerde la marca después de pasar por el stand? ¿Ya han usado piezas personalizadas, exhibidores, NFC, QR o regalos de marca?",
    variables: [],
  },
  {
    id: "s5",
    title: "Mostrar evidencia",
    channel: "feria",
    stage: "presentacion",
    content:
      "Mira, por ejemplo, con {marca} hicimos una pieza personalizada para que pudieran entregar algo distinto en feria. La idea no era regalar lo mismo de siempre, sino crear algo funcional, visual y alineado con la marca.",
    variables: ["{marca}", "{producto}"],
  },
  {
    id: "s6",
    title: "Solicitud de requerimientos",
    channel: "whatsapp",
    stage: "requerimientos",
    content:
      "Para aterrizar bien la propuesta necesitamos:\n1. Logo o elementos gráficos de la marca\n2. Referencias de lo que les gusta\n3. Qué quieren lograr con la pieza\n4. Dónde se va a usar: feria, punto de venta, regalo, exhibición o lanzamiento\n5. Cantidad estimada\n6. Fecha ideal de entrega\n7. Presupuesto aproximado o rango esperado\n8. Persona que aprueba el proyecto",
    variables: ["{nombre}", "{marca}"],
  },
  {
    id: "s7",
    title: "Follow-up suave",
    channel: "whatsapp",
    stage: "followup",
    content:
      "Hola {nombre}, quería hacer seguimiento a lo que conversamos sobre {idea}. ¿Pudieron revisar internamente? Con gusto agendamos 15 minutos para resolver dudas.",
    variables: ["{nombre}", "{idea}"],
  },
  {
    id: "s8",
    title: "Cierre a llamada",
    channel: "whatsapp",
    stage: "cierre",
    content:
      "Vale la pena ver esto bien aplicado a {marca}. Son 15–20 min y se llevan ideas claras. ¿Les queda mejor mañana o pasado?",
    variables: ["{marca}", "{fecha}"],
  },
  {
    id: "s9",
    title: "Solicitud de referido post-entrega",
    channel: "postventa",
    stage: "referido",
    content:
      "Nos alegra mucho haber trabajado esto con ustedes. Estamos buscando conectar con más marcas que quieran diferenciarse en espacios físicos. ¿Conocen alguna marca o negocio al que le pueda servir algo parecido?",
    variables: ["{nombre}"],
  },
  {
    id: "s10",
    title: "Apertura por referido",
    channel: "referido",
    stage: "apertura",
    content:
      "Hola {nombre}, {contacto} me comentó que están trabajando con {marca} y que podrían estar interesados en diferenciarse más en espacios físicos. Trabajamos en diseño y fabricación de soluciones personalizadas. ¿Tienen 15 minutos esta semana?",
    variables: ["{nombre}", "{contacto}", "{marca}"],
  },
];

export const TASKS: Task[] = [
  { id: "t1", title: "Registrar nuevos prospectos", frequency: "diaria" },
  { id: "t2", title: "Hacer seguimiento a conversaciones abiertas", frequency: "diaria" },
  { id: "t3", title: "Responder leads", frequency: "diaria" },
  { id: "t4", title: "Actualizar estados del dashboard", frequency: "diaria" },
  { id: "t5", title: "Subir evidencias de proyectos", frequency: "diaria" },
  { id: "t6", title: "Revisar fechas de entrega", frequency: "diaria" },
  { id: "t7", title: "Identificar 30 marcas nuevas", frequency: "semanal", target: 30 },
  { id: "t8", title: "Iniciar 20 conversaciones", frequency: "semanal", target: 20 },
  { id: "t9", title: "Agendar 5 reuniones", frequency: "semanal", target: 5 },
  { id: "t10", title: "Enviar 3 propuestas", frequency: "semanal", target: 3 },
  { id: "t11", title: "Cerrar 1 proyecto", frequency: "semanal", target: 1 },
  { id: "t12", title: "Pedir 2 referidos", frequency: "semanal", target: 2 },
  { id: "t13", title: "Recopilar 1 testimonio", frequency: "semanal", target: 1 },
  { id: "t14", title: "Revisar KPIs semanales", frequency: "semanal" },
  { id: "t15", title: "Cerrar 4-5 proyectos", frequency: "mensual", target: 5 },
  { id: "t16", title: "Llegar a $5.000.000 COP", frequency: "mensual", target: 5000000 },
  { id: "t17", title: "Calcular ticket promedio", frequency: "mensual" },
  { id: "t18", title: "Revisar margen por proyecto", frequency: "mensual" },
  { id: "t19", title: "Actualizar portafolio", frequency: "mensual" },
  { id: "t20", title: "Documentar casos nuevos", frequency: "mensual" },
];

export const WORKFLOW_STEPS = [
  {
    id: 1,
    title: "Preparar",
    objective: "Llegar con claridad antes de prospectar",
    actions: [
      "Actualizar portafolio",
      "Tener videos de productos funcionando",
      "Tener testimonios listos",
      "Revisar capacidad productiva",
      "Definir meta de contactos del día",
      "Preparar scripts",
      "Abrir dashboard",
    ],
    criterion: "No se sale a prospectar sin portafolio, script y dashboard listos.",
  },
  {
    id: 2,
    title: "Identificar",
    objective: "Encontrar marcas con alto potencial",
    actions: [
      "Recorrer feria o perfiles digitales",
      "Filtrar marcas según ICP",
      "Registrar prospectos",
      "Asignar fit score",
      "Priorizar alto fit",
    ],
    criterion: "Solo avanzar con prospectos de fit score 4 o más.",
  },
  {
    id: 3,
    title: "Abrir conversación",
    objective: "Generar apertura sin vender",
    actions: [
      "Usar script de apertura según canal",
      "No explicar todo desde el inicio",
      "Hacer una pregunta al final",
      "Registrar respuesta",
    ],
    criterion: "La persona muestra apertura o responde con interés.",
  },
  {
    id: 4,
    title: "Diagnosticar",
    objective: "Entender necesidad real",
    actions: [
      "Preguntar qué quieren lograr",
      "Preguntar qué producto quieren mover",
      "Preguntar cómo generan recordación",
      "Preguntar si han usado piezas personalizadas",
      "Registrar hallazgos",
    ],
    criterion: "Existe necesidad, objetivo o interés claro.",
  },
  {
    id: 5,
    title: "Mostrar evidencia",
    objective: "Generar deseo con casos reales",
    actions: [
      "Mostrar video de producto relevante",
      "Contar caso similar al cliente",
      "Usar portafolio visual",
      "Preguntar si quieren ver más",
    ],
    criterion: "El prospecto muestra interés en ver cómo aplicaría en su caso.",
  },
  {
    id: 6,
    title: "Calificar",
    objective: "Validar fit, fecha y presupuesto",
    actions: [
      "Preguntar para cuándo necesitan",
      "Preguntar cantidad estimada",
      "Validar presupuesto aproximado",
      "Identificar decisor",
      "Confirmar uso de la pieza",
    ],
    criterion: "Tiene fecha, cantidad, responsable y posible presupuesto.",
  },
  {
    id: 7,
    title: "Pedir requerimientos",
    objective: "Recopilar todo para proponer bien",
    actions: [
      "Enviar plantilla de requerimientos",
      "Confirmar logo y manual de marca",
      "Confirmar referencias visuales",
      "Confirmar fecha de entrega",
      "Registrar en dashboard",
    ],
    criterion: "Requerimientos mínimos completos antes de proponer.",
  },
  {
    id: 8,
    title: "Proponer",
    objective: "Presentar solución con valor claro",
    actions: [
      "Incluir contexto del cliente",
      "Describir oportunidad detectada",
      "Detallar solución propuesta",
      "Especificar tiempo e inversión",
      "Incluir fecha límite de aprobación",
    ],
    criterion: "No se envía propuesta sin requerimientos mínimos.",
  },
  {
    id: 9,
    title: "Cerrar",
    objective: "Formalizar el proyecto",
    actions: [
      "Confirmar alcance aprobado",
      "Recibir pago inicial",
      "Confirmar fecha de entrega",
      "Identificar responsable del cliente",
      "Recibir materiales",
    ],
    criterion: "Pago inicial recibido y materiales en mano.",
  },
  {
    id: 10,
    title: "Ejecutar",
    objective: "Entregar con calidad y a tiempo",
    actions: [
      "Diseño",
      "Prototipo",
      "Validación con cliente",
      "Producción",
      "Entrega",
      "Cobro saldo final",
    ],
    criterion: "Cliente recibe y aprueba entrega.",
  },
  {
    id: 11,
    title: "Testimonio / Referido",
    objective: "Convertir cliente en canal",
    actions: [
      "Pedir testimonio escrito o en video",
      "Pedir referido con nombre específico",
      "Registrar referido en dashboard",
      "Agradecer y mantener relación",
    ],
    criterion: "Al menos un testimonio o referido por proyecto cerrado.",
  },
];

export const ICP_YES = [
  "Marcas con producto físico",
  "Marcas presentes en ferias",
  "Negocios con stand o punto de venta",
  "Marcas que quieren diferenciarse",
  "Marcas que invierten en identidad visual",
  "Marcas que necesitan piezas, exhibidores, prototipos, regalos o activaciones",
  "Marcas con fecha o evento cercano",
  "Marcas con capacidad de pagar soluciones personalizadas",
];

export const ICP_NO = [
  "Personas sin marca clara",
  "Ideas sin validación",
  "Clientes que solo buscan lo más barato",
  "Prospectos sin fecha ni objetivo",
  "Marcas sin capacidad de decisión",
  "Solicitudes sin presupuesto ni cantidades",
];

export const FIT_CRITERIA = [
  "Tiene producto físico",
  "Tiene marca visible",
  "Tiene evento o activación próxima",
  "Tiene necesidad de diferenciación",
  "Tiene presupuesto probable",
  "Tiene urgencia",
  "Tiene decisor identificado",
  "Tiene cantidad estimada",
];