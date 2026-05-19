import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionCard from "@/components/common/SectionCard";
import StatusBadge from "@/components/common/StatusBadge";
import type { Order, OrderStatus } from "@/types/order.types";

const statusMap: Record<OrderStatus, { label: string; tone: "neutral" | "success" | "warning" | "danger" }> = {
  new: { label: "Nuevo", tone: "warning" },
  confirmed: { label: "Confirmado", tone: "neutral" },
  preparing: { label: "En preparacion", tone: "warning" },
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
    <SectionCard
      title="Pedidos urgentes"
      actions={
        <Link to="/orders" className="inline-flex items-center gap-1 text-sm font-semibold text-[#4F7302] hover:text-[#3E5902]">
          Ver pedidos
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      }
    >
      <div className="space-y-2">
        {orders.map((order) => {
          const status = statusMap[order.status];
          return (
            <article key={order.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1a1c18]">{order.folio}</p>
                  <p className="truncate text-sm text-[#42493f]">{order.customerName} - {order.businessName}</p>
                </div>
                <StatusBadge label={status.label} tone={status.tone} />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-semibold text-[#1a1c18]">{formatCurrency(order.total)}</span>
                <span className="text-[#42493f]">Limite {formatDate(order.dueDate)}</span>
                <Link to="/orders" className="font-semibold text-[#4F7302] hover:text-[#3E5902]">Ver pedido</Link>
              </div>
            </article>
          );
        })}
        {orders.length === 0 ? (
          <p className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
            No hay pedidos urgentes de negocios activos.
          </p>
        ) : null}
      </div>
    </SectionCard>
  );
}
