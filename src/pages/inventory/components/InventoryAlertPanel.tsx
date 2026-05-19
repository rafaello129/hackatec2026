import { AlertTriangle, BellRing, Sparkles, TriangleAlert } from "lucide-react";
import type { InventoryAlert } from "@/types/inventory.types";

const severityMap: Record<InventoryAlert["severity"], { label: string; tone: string; icon: typeof AlertTriangle }> = {
  high: { label: "Alta", tone: "bg-[#ffdad6] text-[#93000a]", icon: TriangleAlert },
  medium: { label: "Media", tone: "bg-[#fff2cc] text-[#7a5d00]", icon: AlertTriangle },
  low: { label: "Baja", tone: "bg-[#e8e9e2] text-[#42493f]", icon: BellRing },
};

interface InventoryAlertPanelProps {
  alerts: InventoryAlert[];
  resolveItemName: (itemId: string) => string;
  resolveItemBusiness?: (itemId: string) => string;
}

export default function InventoryAlertPanel({ alerts, resolveItemName, resolveItemBusiness }: InventoryAlertPanelProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Alertas operativas</h3>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{alerts.length}</span>
      </div>

      <ul className="grid gap-2">
        {alerts.map((alert) => {
          const mapped = severityMap[alert.severity];
          const Icon = mapped.icon;
          const cooperativeHint = /cooperativ|conjunta|acuerdo/i.test(alert.recommendation);
          return (
            <li key={alert.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="mb-1 flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${mapped.tone}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1c18]">{alert.title}</p>
                    <p className="text-xs text-[#42493f]">
                      {resolveItemBusiness ? `${resolveItemBusiness(alert.itemId)} - ` : ""}
                      {resolveItemName(alert.itemId)}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${mapped.tone}`}>
                  Prioridad {mapped.label}
                </span>
              </div>

              <p className="line-clamp-2 text-xs leading-5 text-[#42493f]">{alert.description}</p>
              <div className="mt-2 rounded-md border border-[#e2e3dc] bg-white p-2 text-xs text-[#1a1c18]">
                <span className="font-semibold">Recomendacion: </span>
                {alert.recommendation}
              </div>
              {cooperativeHint ? (
                <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Posible oportunidad cooperativa
                </p>
              ) : null}
            </li>
          );
        })}
        {alerts.length === 0 ? (
          <li className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
            No hay alertas activas en este momento.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
