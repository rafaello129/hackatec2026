import { ArrowDown, ArrowUp, RotateCcw, ShieldCheck } from "lucide-react";
import type { StockMovement } from "@/types/inventory.types";

const movementStyleMap: Record<
  StockMovement["type"],
  { label: string; icon: typeof ArrowUp; className: string; sign: string }
> = {
  entrada: { label: "Entrada", icon: ArrowUp, className: "bg-[#E6F3C8] text-[#42610A]", sign: "+" },
  salida: { label: "Salida", icon: ArrowDown, className: "bg-[#FDE9E6] text-[#A54A42]", sign: "-" },
  ajuste: { label: "Ajuste", icon: RotateCcw, className: "bg-[#EEF2EA] text-[#607064]", sign: "" },
  reserva: { label: "Reserva", icon: ShieldCheck, className: "bg-[#FFF0D8] text-[#8C6213]", sign: "" },
};

const formatDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });

export default function InventoryMovementPanel({
  movements,
  resolveItemName,
  resolveItemBusiness,
}: {
  movements: StockMovement[];
  resolveItemName: (itemId: string) => string;
  resolveItemBusiness?: (itemId: string) => string;
}) {
  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div>
        <h2 className="text-[15px] font-semibold text-[#172019]">Actividad reciente</h2>
        <p className="mt-1 text-[11px] text-[#7B867E]">Entradas, salidas, reservas y ajustes de stock.</p>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {movements.slice(0, 5).map((movement) => {
          const mapped = movementStyleMap[movement.type];
          const Icon = mapped.icon;
          return (
            <div key={movement.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${mapped.className}`}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-[#2B352F]">{resolveItemName(movement.itemId)}</p>
                <p className="mt-0.5 truncate text-[9.5px] text-[#87918A]">
                  {mapped.label}{resolveItemBusiness ? " · " + resolveItemBusiness(movement.itemId) : ""}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] font-bold text-[#344039]">{mapped.sign}{movement.quantity}</p>
                <p className="mt-0.5 text-[9px] text-[#929C95]">{formatDate(movement.date)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
