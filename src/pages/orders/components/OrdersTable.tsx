import { ChevronRight, ClipboardList } from "lucide-react";
import type { Order } from "@/types/order.types";
import FulfillmentStatusBadge from "./FulfillmentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function OrdersTable({
  orders,
  selectedOrderId,
  onSelectOrder,
}: {
  orders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
}) {
  if (orders.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#344039]">No encontramos pedidos con estos filtros.</p>
        <p className="mt-1 text-[11px] text-[#7E8981]">Prueba con otro folio, emprendimiento, estado o forma de pago.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[18px] border border-[#E1E6DE] bg-white md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[linear-gradient(90deg,#F4F8F1_0%,#FAFBF8_100%)]">
            <tr className="text-[10px] font-semibold uppercase tracking-[0.055em] text-[#718078]">
              <th className="w-[34%] px-4 py-3.5">Pedido</th>
              <th className="w-[21%] px-3 py-3.5">Emprendimiento</th>
              <th className="w-[16%] px-3 py-3.5">Total</th>
              <th className="w-[19%] px-3 py-3.5">Estado</th>
              <th className="w-[10%] px-4 py-3.5" />
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => {
              const selected = order.id === selectedOrderId;
              return (
                <tr
                  key={order.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelectOrder(order.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectOrder(order.id);
                    }
                  }}
                  className={`group cursor-pointer border-t border-[#EEF0EB] outline-none transition-colors focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9AC84B]/45 ${selected ? "bg-[#F4F8F1]" : "bg-white hover:bg-[#FAFCF8]"}`}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#EEF1EB] text-[#58715F]">
                        <ClipboardList className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[12px] font-semibold text-[#263129]">{order.folio}</p>
                        <p className="mt-1 truncate text-[10px] text-[#849087]">{order.customerName} · {order.customerPhone}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="truncate text-[11px] font-semibold text-[#344039]">{order.businessName}</p>
                    <p className="mt-0.5 text-[9.5px] text-[#87918A]">{order.items.length} {order.items.length === 1 ? "producto" : "productos"}</p>
                  </td>

                  <td className="px-3 py-3.5">
                    <p className="text-[12px] font-bold text-[#2B352F]">{money.format(order.total)}</p>
                    <p className="mt-0.5 text-[9px] text-[#87918A]">{money.format(order.commission)} comisión · {order.commissionRate}%</p>
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex flex-col items-start gap-1.5">
                      <OrderStatusBadge status={order.status} />
                      <div className="flex flex-wrap gap-1">
                        <PaymentStatusBadge status={order.paymentStatus} />
                        <FulfillmentStatusBadge status={order.fulfillmentStatus} />
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <p className="text-[9px] font-medium text-[#87918A]">{order.dueDate}</p>
                    <span className="ml-auto mt-1 grid h-8 w-8 place-items-center rounded-full text-[#929C95] transition-all group-hover:bg-[#E6F1E4] group-hover:text-[#135C2F]">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2.5 md:hidden">
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            onClick={() => onSelectOrder(order.id)}
            className={`w-full rounded-[18px] border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${order.id === selectedOrderId ? "border-[#9AB48F] ring-2 ring-[#9AC84B]/10" : "border-[#E4E8E1] hover:border-[#CFD8CC]"}`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-[14px] bg-[#EEF1EB] text-[#58715F]">
                <ClipboardList className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12px] font-semibold text-[#263129]">{order.folio}</p>
                <p className="mt-1 truncate text-[10px] text-[#849087]">{order.customerName} · {order.businessName}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#929C95]" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[linear-gradient(135deg,#F7F9F4_0%,#F3F7EF_100%)] p-3">
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Total</p>
                <p className="mt-1 truncate text-[10px] font-semibold text-[#344039]">{money.format(order.total)}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Productos</p>
                <p className="mt-1 text-[10px] font-semibold text-[#344039]">{order.items.length}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Límite</p>
                <p className="mt-1 text-[10px] font-semibold text-[#344039]">{order.dueDate}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
