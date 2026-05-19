import { ArrowDown, ArrowUp, RotateCcw, ShieldCheck } from "lucide-react";
import type { StockMovement } from "@/types/inventory.types";

const movementStyleMap: Record<
  StockMovement["type"],
  { label: string; icon: typeof ArrowUp; className: string; sign: string }
> = {
  entrada: { label: "Entrada", icon: ArrowUp, className: "bg-[#D6D979] text-[#3E5902]", sign: "+" },
  salida: { label: "Salida", icon: ArrowDown, className: "bg-[#ffdad6] text-[#93000a]", sign: "-" },
  ajuste: { label: "Ajuste", icon: RotateCcw, className: "bg-[#e8e9e2] text-[#42493f]", sign: "" },
  reserva: { label: "Reserva", icon: ShieldCheck, className: "bg-[#fff2cc] text-[#7a5d00]", sign: "" },
};

const formatDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

interface InventoryMovementPanelProps {
  movements: StockMovement[];
  resolveItemName: (itemId: string) => string;
  resolveItemBusiness?: (itemId: string) => string;
}

export default function InventoryMovementPanel({ movements, resolveItemName, resolveItemBusiness }: InventoryMovementPanelProps) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Actividad reciente</h3>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{movements.length}</span>
      </div>

      <ul className="max-h-[390px] space-y-2 overflow-y-auto pr-1">
        {movements.map((movement) => {
          const mapped = movementStyleMap[movement.type];
          const Icon = mapped.icon;
          return (
            <li key={movement.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-2.5">
              <div className="mb-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex h-7 w-7 items-center justify-center rounded-md ${mapped.className}`}>
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="line-clamp-1 text-sm font-semibold text-[#1a1c18]">{resolveItemName(movement.itemId)}</p>
                    <p className="text-xs text-[#42493f]">
                      {mapped.label}
                      {resolveItemBusiness ? ` - ${resolveItemBusiness(movement.itemId)}` : ""}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1a1c18]">
                  {mapped.sign}
                  {movement.quantity}
                </span>
              </div>
              <p className="line-clamp-2 text-xs leading-5 text-[#42493f]">{movement.reason}</p>
              <div className="mt-1 flex items-center justify-between text-xs text-[#42493f]">
                <span>{formatDate(movement.date)}</span>
                <span>{movement.responsible}</span>
              </div>
            </li>
          );
        })}
        {movements.length === 0 ? (
          <li className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
            Sin movimientos registrados en el periodo actual.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
