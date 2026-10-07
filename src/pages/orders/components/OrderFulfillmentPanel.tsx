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
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">Preparación y entrega</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Seguimiento del pedido seleccionado.</p>
        </div>
        <FulfillmentStatusBadge status={order.fulfillmentStatus} />
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[16px] bg-[#F6F8F3] p-4">
          <p className="flex items-center gap-2 text-[11px] font-semibold text-[#344039]">
            <Truck className="h-4 w-4 text-[#287839]" />
            {deliveryLabels[order.deliveryMethod]}
          </p>
          <p className="mt-1.5 text-[10px] leading-4 text-[#7B867E]">{order.deliveryAddress}</p>
        </div>

        <div className="rounded-[16px] bg-[#F6F8F3] p-4">
          <p className="flex items-center gap-2 text-[11px] font-semibold text-[#344039]">
            <CalendarClock className="h-4 w-4 text-[#287839]" />
            Entrega estimada
          </p>
          <p className="mt-1.5 text-[10px] text-[#7B867E]">{order.estimatedDeliveryDate} · límite {order.dueDate}</p>
        </div>

        <div className="rounded-[14px] bg-[#ECF5E8] px-3 py-3 text-[10px] leading-4 text-[#3F6948]">
          <p className="font-semibold uppercase tracking-[0.06em]">Siguiente acción</p>
          <p className="mt-1 font-semibold text-[#2D5437]">{nextAction(order)}</p>
        </div>
      </div>
    </section>
  );
}
