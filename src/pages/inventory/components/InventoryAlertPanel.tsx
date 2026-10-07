import { AlertTriangle, ArrowRight, BellRing, TriangleAlert } from "lucide-react";
import type { InventoryAlert } from "@/types/inventory.types";

const severityMap: Record<InventoryAlert["severity"], { label: string; icon: typeof AlertTriangle; className: string }> = {
  high: { label: "Alta", icon: TriangleAlert, className: "bg-[#FDE9E6] text-[#B84D44]" },
  medium: { label: "Media", icon: AlertTriangle, className: "bg-[#FFF0D8] text-[#9A6A04]" },
  low: { label: "Baja", icon: BellRing, className: "bg-[#EEF2EA] text-[#607064]" },
};

export default function InventoryAlertPanel({
  alerts,
  resolveItemName,
  resolveItemBusiness,
}: {
  alerts: InventoryAlert[];
  resolveItemName: (itemId: string) => string;
  resolveItemBusiness?: (itemId: string) => string;
}) {
  const visible = alerts.slice(0, 4);

  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">Productos que necesitan atención</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Revisa qué conviene atender primero.</p>
        </div>
        <span className="rounded-full bg-[#F1F4EE] px-2 py-1 text-[9px] font-semibold text-[#68736B]">{alerts.length}</span>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            Todo en orden. No hay productos pendientes de atención.
          </div>
        ) : (
          visible.map((alert) => {
            const mapped = severityMap[alert.severity];
            const Icon = mapped.icon;
            return (
              <div key={alert.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] ${mapped.className}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[11px] font-semibold text-[#2B352F]">{resolveItemName(alert.itemId)}</p>
                  <p className="mt-0.5 truncate text-[10px] text-[#87918A]">
                    {resolveItemBusiness ? resolveItemBusiness(alert.itemId) + " · " : ""}{alert.title}
                  </p>
                </div>
                <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${mapped.className}`}>{mapped.label}</span>
              </div>
            );
          })
        )}
      </div>

      {alerts.length > visible.length ? (
        <div className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-[#287839]">
          {alerts.length - visible.length} alertas más
          <ArrowRight className="h-3 w-3" />
        </div>
      ) : null}
    </article>
  );
}
