import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import StatusBadge from "@/components/common/StatusBadge";
import type { Order, OrderStatus } from "@/types/order.types";

const statusMap: Record<OrderStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  new: { label: "Nuevo", tone: "warning" },
  confirmed: { label: "Confirmado", tone: "neutral" },
  preparing: { label: "En preparación", tone: "warning" },
  ready_for_delivery: { label: "Listo", tone: "success" },
  in_delivery: { label: "En reparto", tone: "success" },
  delivered: { label: "Entregado", tone: "success" },
  canceled: { label: "Cancelado", tone: "danger" },
};

interface UrgentOrdersPanelProps {
  orders: Order[];
  formatCurrency: (value: number) => string;
  formatDate: (dateISO: string) => string;
}

export default function UrgentOrdersPanel({ orders, formatCurrency, formatDate }: UrgentOrdersPanelProps) {
  return (
    <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#17231B]">Pedidos urgentes</h2>
          <p className="mt-1 text-[11px] text-[#87918A]">Órdenes que necesitan atención antes de su fecha límite.</p>
        </div>
        <Link to="/orders" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#287839]">
          Ver pedidos <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-5 space-y-2.5">
        {orders.map((order) => {
          const status = statusMap[order.status];
          return (
            <article key={order.id} className="flex flex-col gap-3 rounded-[18px] border border-transparent bg-[#FAFAF7] p-4 transition hover:border-[#E0E7DC] hover:bg-white sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] font-semibold text-[#344039]">{order.folio}</p>
                  <StatusBadge label={status.label} tone={status.tone} />
                </div>
                <p className="mt-1 truncate text-[11px] text-[#7B867E]">{order.customerName} · {order.businessName}</p>
              </div>
              <div className="grid shrink-0 grid-cols-2 gap-x-6 text-left sm:text-right">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.06em] text-[#929A94]">Total</p>
                  <p className="mt-1 text-[13px] font-semibold text-[#35523B]">{formatCurrency(order.total)}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.06em] text-[#929A94]">Límite</p>
                  <p className="mt-1 text-[11px] font-medium text-[#68736B]">{formatDate(order.dueDate)}</p>
                </div>
              </div>
            </article>
          );
        })}
        {orders.length === 0 && (
          <p className="rounded-[18px] bg-[#FAFAF7] p-4 text-[12px] text-[#68736B]">
            No hay pedidos urgentes de negocios activos.
          </p>
        )}
      </div>
    </section>
  );
}
