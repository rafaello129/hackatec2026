import { CalendarClock, Truck } from "lucide-react";
import type { Order } from "@/types/order.types";
import FulfillmentStatusBadge from "./FulfillmentStatusBadge";

const deliveryLabels: Record<Order["deliveryMethod"], string> = {
  pickup: "Recolección",
  local_delivery: "Entrega local",
  third_party: "Tercero",
  shared_route: "Ruta compartida",
  seller_delivery: "Entrega del negocio",
};

function nextAction(order: Order) {
  if (order.paymentStatus === "pending" || order.paymentStatus === "overdue") return "Confirmar pago antes de liberar mercancía";
  if (order.fulfillmentStatus === "not_started") return "Confirmar inventario y comenzar surtido";
  if (order.fulfillmentStatus === "picking") return "Preparar paquete y validar cantidades";
  if (order.fulfillmentStatus === "packed") return "Asignar recolección o ruta de entrega";
  if (order.fulfillmentStatus === "waiting_pickup") return "Confirmar horario con repartidor o cliente";
  if (order.fulfillmentStatus === "out_for_delivery") return "Solicitar evidencia de entrega";
  if (order.fulfillmentStatus === "issue") return "Resolver incidencia antes de continuar";
  return "Marcar como liquidable en el siguiente corte";
}

export default function OrderFulfillmentPanel({ order }: { order: Order | null }) {
  if (!order) return null;

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Preparación y entrega</h2>
        <FulfillmentStatusBadge status={order.fulfillmentStatus} />
      </div>
      <div className="space-y-3 text-sm">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="flex items-center gap-2 font-semibold text-[#1a1c18]">
            <Truck className="h-4 w-4 text-[#4F7302]" />
            {deliveryLabels[order.deliveryMethod]}
          </p>
          <p className="mt-1 text-[#42493f]">{order.deliveryAddress}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="flex items-center gap-2 font-semibold text-[#1a1c18]">
            <CalendarClock className="h-4 w-4 text-[#4F7302]" />
            Entrega estimada
          </p>
          <p className="mt-1 text-[#42493f]">{order.estimatedDeliveryDate} · límite {order.dueDate}</p>
        </div>
        <div className="rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#3E5902]">Siguiente acción</p>
          <p className="mt-1 font-semibold text-[#1a1c18]">{nextAction(order)}</p>
        </div>
      </div>
    </section>
  );
}
