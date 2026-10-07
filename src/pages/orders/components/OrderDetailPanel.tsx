import { MapPin, Phone } from "lucide-react";
import type { Order } from "@/types/order.types";
import OrderItemsList from "./OrderItemsList";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

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
      <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
        <h2 className="text-[15px] font-semibold text-[#172019]">Detalle del pedido</h2>
        <p className="mt-2 text-[11px] leading-5 text-[#7B867E]">Selecciona un pedido para revisar su operación.</p>
      </section>
    );
  }

  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold text-[#172019]">{order.folio}</h2>
          <p className="mt-1 truncate text-[11px] text-[#7B867E]">{order.businessName}</p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <PaymentStatusBadge status={order.paymentStatus} />
        <span className="rounded-full bg-[#F5F7F2] px-2.5 py-1 text-[9px] font-medium text-[#667169]">
          {channelLabels[order.channel]}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Total", money.format(order.total)],
          ["Comisión", `${money.format(order.commission)} · ${order.commissionRate}%`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
            <p className="text-[10px] text-[#7F8A82]">{label}</p>
            <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] bg-[#F2F6EE] p-4">
        <p className="text-[11px] font-semibold text-[#344039]">{order.customerName}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><Phone className="h-3.5 w-3.5 text-[#287839]" />{order.customerPhone}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><MapPin className="h-3.5 w-3.5 text-[#287839]" />{order.deliveryAddress}</p>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#718078]">Productos</p>
        <OrderItemsList items={order.items} />
      </div>

      {order.notes ? (
        <div className="mt-4 rounded-[14px] bg-[#ECF5E8] px-3 py-2.5 text-[10px] leading-4 text-[#3F6948]">{order.notes}</div>
      ) : null}

      <div className="mt-4 flex flex-wrap gap-2">
        {order.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-[#DDE5D8] bg-white px-2.5 py-1 text-[9.5px] font-medium text-[#526057]">
            {tag.replaceAll("_", " ")}
          </span>
        ))}
      </div>
    </section>
  );
}
