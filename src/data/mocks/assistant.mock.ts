import type {
  AssistantBusinessContext,
  AssistantInsight,
  AssistantMessage,
  AssistantQuickAction,
  AssistantRecommendation,
  AssistantRiskAlert,
} from "@/types/assistant.types";

export const assistantBusinessContextMock: AssistantBusinessContext = {
  activeCustomers: 6,
  lowStockItems: 3,
  activeCooperatives: 4,
  pendingInvoices: 7,
  monthlyRevenue: 1874200,
  monthlyExpenses: 1193800,
  riskLevel: "medium",
};

export const assistantMessagesMock: AssistantMessage[] = [
  {
    id: "msg-1001",
    role: "system",
    content: "Modo demo activo. El asistente usa datos simulados del CRM, inventario, cooperativos y finanzas.",
    createdAt: "2026-05-18T08:40:00",
    relatedModule: "general",
    metadata: { source: "mock", confidence: 1 },
  },
  {
    id: "msg-1002",
    role: "assistant",
    content:
      "Tengo un resumen operativo listo: hay 6 clientes activos, 3 items con bajo stock, 4 cooperativos activos y 7 facturas pendientes. La prioridad sugerida es cobrar vencidos y activar compra conjunta para empaque biodegradable.",
    createdAt: "2026-05-18T08:41:00",
    relatedModule: "general",
    metadata: { source: "mock", confidence: 0.92 },
  },
  {
    id: "msg-1003",
    role: "user",
    content: "Que accion conviene tomar primero para mejorar flujo sin frenar cooperativos?",
    createdAt: "2026-05-18T08:42:00",
    relatedModule: "finance",
  },
  {
    id: "msg-1004",
    role: "assistant",
    content:
      "Primero priorizaria la cobranza vencida de EcoEmpaque Caribe y, en paralelo, abriria compra conjunta de empaque. Esa combinacion libera flujo y evita que inventario limite acuerdos activos.",
    createdAt: "2026-05-18T08:43:00",
    relatedModule: "finance",
    metadata: { source: "mock", confidence: 0.9 },
  },
  {
    id: "msg-1005",
    role: "assistant",
    content:
      "Tambien hay una senal comercial: la venta conjunta regional sureste ya fue rentable. Puede convertirse en playbook para campaña compartida con clientes enterprise activos.",
    createdAt: "2026-05-18T08:44:00",
    relatedModule: "cooperatives",
    metadata: { source: "mock", confidence: 0.88 },
  },
];

export const assistantQuickActionsMock: AssistantQuickAction[] = [
  {
    id: "qa-customers-risk",
    label: "Analizar clientes",
    description: "Detectar clientes en riesgo y oportunidades de seguimiento.",
    module: "customers",
    prompt: "Analiza clientes en riesgo y sugiere siguientes acciones.",
    iconName: "users",
  },
  {
    id: "qa-inventory-stock",
    label: "Revisar inventario",
    description: "Priorizar bajo stock y reposiciones con potencial cooperativo.",
    module: "inventory",
    prompt: "Revisa bajo stock y oportunidades de compra conjunta.",
    iconName: "package",
  },
  {
    id: "qa-cooperative-opportunities",
    label: "Buscar cooperativo",
    description: "Encontrar oportunidades compartidas de compra, venta o campana.",
    module: "cooperatives",
    prompt: "Detecta oportunidades cooperativas accionables.",
    iconName: "handshake",
  },
  {
    id: "qa-finance-summary",
    label: "Resumen financiero",
    description: "Sintetizar flujo, facturas vencidas y aportaciones pendientes.",
    module: "finance",
    prompt: "Resume finanzas y riesgos de cobranza.",
    iconName: "chart",
  },
  {
    id: "qa-campaign",
    label: "Sugerir campana",
    description: "Proponer una campana compartida con clientes e inventario disponible.",
    module: "cooperatives",
    prompt: "Sugiere una campana comercial compartida.",
    iconName: "megaphone",
  },
];

export const assistantInsightsMock: AssistantInsight[] = [
  {
    id: "ins-1001",
    title: "Cliente estrategico sin contacto reciente",
    description: "Milpa del Caribe no registra seguimiento reciente pese a mantener alto valor anual.",
    module: "customers",
    severity: "warning",
    actionLabel: "Programar seguimiento",
    relatedEntityId: "cust-agnorte",
  },
  {
    id: "ins-1002",
    title: "Bajo stock con oportunidad cooperativa",
    description: "Empaque biodegradable esta bajo minimo y puede resolverse con compra conjunta.",
    module: "inventory",
    severity: "critical",
    actionLabel: "Preparar compra conjunta",
    relatedEntityId: "inv-pk-bio-114",
  },
  {
    id: "ins-1003",
    title: "Venta conjunta rentable",
    description: "La venta regional sureste ya fue pagada y puede convertirse en playbook comercial.",
    module: "cooperatives",
    severity: "success",
    actionLabel: "Replicar acuerdo",
    relatedEntityId: "coop-1001",
  },
  {
    id: "ins-1004",
    title: "Cobranza presiona flujo",
    description: "Hay 2 facturas vencidas relacionadas con campanas y servicios post-acuerdo.",
    module: "finance",
    severity: "warning",
    actionLabel: "Priorizar cobranza",
    relatedEntityId: "finance-overdue",
  },
];

export const assistantRecommendationsMock: AssistantRecommendation[] = [
  {
    id: "rec-1001",
    title: "Activar compra conjunta de empaque",
    description: "Consolidar demanda de EcoEmpaque Caribe, Coop Granos del Caribe y almacen Cancun para reducir costo por volumen.",
    module: "cooperatives",
    impact: "high",
    effort: "medium",
    priority: "high",
    suggestedAction: "Crear oportunidad de compra conjunta y validar minimo de 800 unidades.",
  },
  {
    id: "rec-1002",
    title: "Campana compartida de productos regionales",
    description: "Cruzar clientes activos con inventario disponible para lanzar una campana de venta conjunta.",
    module: "customers",
    impact: "high",
    effort: "medium",
    priority: "medium",
    suggestedAction: "Seleccionar 3 clientes enterprise y preparar oferta regional por paquete.",
  },
  {
    id: "rec-1003",
    title: "Separar costos de delivery por acuerdo",
    description: "La trazabilidad financiera mejora si cada servicio post-acuerdo queda asociado al acuerdo correspondiente.",
    module: "finance",
    impact: "medium",
    effort: "low",
    priority: "medium",
    suggestedAction: "Etiquetar gastos de delivery con folio de acuerdo cooperativo.",
  },
];

export const assistantRiskAlertsMock: AssistantRiskAlert[] = [
  {
    id: "risk-1001",
    title: "Factura vencida por campana compartida",
    description: "EcoEmpaque Caribe mantiene una factura vencida que puede retrasar nuevos acuerdos.",
    module: "finance",
    severity: "critical",
    detectedAt: "2026-05-18T09:05:00",
    recommendation: "Contactar responsable financiero y pausar nuevos cargos hasta confirmar pago.",
  },
  {
    id: "risk-1002",
    title: "Stock bajo en empaque biodegradable",
    description: "El inventario esta por debajo del minimo y afecta pedidos cooperativos.",
    module: "inventory",
    severity: "warning",
    detectedAt: "2026-05-18T09:10:00",
    recommendation: "Activar compra conjunta o proveedor alterno antes del cierre semanal.",
  },
  {
    id: "risk-1003",
    title: "Acuerdo con aportacion pendiente",
    description: "Un participante aun no completa aportacion en compra conjunta.",
    module: "cooperatives",
    severity: "warning",
    detectedAt: "2026-05-18T09:12:00",
    recommendation: "Enviar recordatorio ejecutivo y recalcular distribucion si no confirma pago.",
  },
];
