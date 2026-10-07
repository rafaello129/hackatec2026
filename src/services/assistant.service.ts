import {
  assistantBusinessContextMock,
  assistantInsightsMock,
  assistantMessagesMock,
  assistantQuickActionsMock,
  assistantRecommendationsMock,
  assistantRiskAlertsMock,
} from "@/data/mocks/assistant.mock";
import type { AssistantMessage, AssistantModuleContext } from "@/types/assistant.types";

export function getAssistantMessages() {
  return assistantMessagesMock;
}

export function getAssistantQuickActions() {
  return assistantQuickActionsMock;
}

export function getAssistantInsights() {
  return assistantInsightsMock;
}

export function getAssistantRecommendations() {
  return assistantRecommendationsMock;
}

export function getAssistantRiskAlerts() {
  return assistantRiskAlertsMock;
}

export function getAssistantBusinessContext() {
  return assistantBusinessContextMock;
}

function detectModule(message: string): AssistantModuleContext {
  const text = message.toLowerCase();
  if (text.includes("cliente") || text.includes("crm") || text.includes("churn")) return "customers";
  if (text.includes("inventario") || text.includes("stock") || text.includes("producto")) return "inventory";
  if (text.includes("cooperativo") || text.includes("oportunidad") || text.includes("acuerdo")) return "cooperatives";
  if (text.includes("finanza") || text.includes("factura") || text.includes("ingreso") || text.includes("egreso")) return "finance";
  if (text.includes("campana") || text.includes("campaña")) return "cooperatives";
  return "general";
}

function buildAssistantResponse(message: string) {
  const text = message.toLowerCase();

  if (text.includes("cliente") || text.includes("crm") || text.includes("churn")) {
    return "En CRM detecto una prioridad: Milpa del Caribe es cliente estrategico y no tiene contacto reciente. Sugiero agendar seguimiento ejecutivo y revisar una oferta de venta conjunta para aumentar retencion.";
  }

  if (text.includes("inventario") || text.includes("stock") || text.includes("producto")) {
    return "En inventario hay 3 items bajo minimo. El caso mas accionable es empaque biodegradable: puede resolverse con compra conjunta y minimo de 800 unidades para mejorar costo por volumen.";
  }

  if (text.includes("cooperativo") || text.includes("oportunidad") || text.includes("acuerdo")) {
    return "En Cooperativos hay 4 oportunidades activas. La mas madura es venta conjunta regional sureste: ya genero ingreso conciliado y conviene replicar el acuerdo con nuevos participantes.";
  }

  if (text.includes("finanza") || text.includes("factura") || text.includes("ingreso") || text.includes("egreso")) {
    return "Financieramente el periodo esta saludable, pero hay 2 facturas vencidas y 7 pendientes. Recomiendo priorizar EcoEmpaque Caribe y separar costos de delivery por acuerdo cooperativo.";
  }

  if (text.includes("campana") || text.includes("campaña")) {
    return "Para campana compartida, recomiendo combinar productos regionales con clientes enterprise activos. El enfoque mas fuerte es paquete regional + venta digital + reparto medido por aportacion.";
  }

  if (text.includes("riesgo")) {
    return "El principal riesgo combinado es cobranza vencida mas bajo stock de empaque. Si se activa compra conjunta y se cobra la factura vencida, el flujo queda menos presionado para nuevos acuerdos.";
  }

  return "Puedo ayudarte a leer senales de clientes, inventario, cooperativos y finanzas. Una accion sugerida ahora es revisar facturas vencidas y bajo stock para detectar oportunidades cooperativas inmediatas.";
}

export function sendAssistantMessage(message: string): AssistantMessage {
  const relatedModule = detectModule(message);

  return {
    id: `msg-${Date.now()}-assistant`,
    role: "assistant",
    content: buildAssistantResponse(message),
    createdAt: new Date().toISOString(),
    relatedModule,
    metadata: {
      source: "mock-response-engine",
      confidence: relatedModule === "general" ? 0.72 : 0.9,
    },
  };
}

export function runQuickAction(actionId: string): AssistantMessage {
  const action = assistantQuickActionsMock.find((item) => item.id === actionId);

  if (!action) {
    return sendAssistantMessage("Dame una recomendacion general del emprendimiento.");
  }

  return {
    ...sendAssistantMessage(action.prompt),
    metadata: {
      source: "quick-action",
      confidence: 0.94,
      actionId,
    },
  };
}
