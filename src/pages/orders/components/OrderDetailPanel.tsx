import { MapPin, Phone } from "lucide-react";
import type { Order } from "@/types/order.types";
import OrderItemsList from "./OrderItemsList";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const channelLabels: Record<Order["channel"], string> = {
  marketplace: "Marketplace",
  whatsapp: "WhatsApp",
  phone: "Teléfono",
  direct: "Directo",
  cooperative: "Cooperativo",
  social_media: "Redes sociales",
};

export default function OrderDetailPanel({ order }: { order: Order | null }) {
  if (!order) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Detalle del pedido</h2>
        <p className="mt-2 text-sm text-[#42493f]">Selecciona un pedido para revisar su operación.</p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#1a1c18]">{order.folio}</h2>
          <p className="mt-1 truncate text-sm text-[#42493f]">{order.businessName}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <PaymentStatusBadge status={order.paymentStatus} />
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{channelLabels[order.channel]}</span>
      </div>

      <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
        <p className="font-semibold text-[#1a1c18]">{order.customerName}</p>
        <p className="mt-1 flex items-center gap-2"><Phone className="h-4 w-4 text-[#4F7302]" />{order.customerPhone}</p>
        <p className="mt-1 flex items-center gap-2"><MapPin className="h-4 w-4 text-[#4F7302]" />{order.deliveryAddress}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Total</p>
          <p className="font-semibold text-[#1a1c18]">{money.format(order.total)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Comisión</p>
          <p className="font-semibold text-[#3E5902]">{money.format(order.commission)} · {order.commissionRate}%</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Productos</p>
        <OrderItemsList items={order.items} />
      </div>

      <div className="mt-4 rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
        {order.notes}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {order.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">
            {tag.replaceAll("_", " ")}
          </span>
        ))}
      </div>
    </section>
  );
}
