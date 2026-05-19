import { Eye } from "lucide-react";
import type { Order } from "@/types/order.types";
import FulfillmentStatusBadge from "./FulfillmentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentStatusBadge from "./PaymentStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

interface OrdersTableProps {
  orders: Order[];
  selectedOrderId: string | null;
  onSelectOrder: (orderId: string) => void;
}

export default function OrdersTable({ orders, selectedOrderId, onSelectOrder }: OrdersTableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="w-full min-w-[980px] table-fixed text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="w-[13%] px-3 py-3">Folio</th>
            <th className="w-[18%] px-3 py-3">Cliente</th>
            <th className="w-[18%] px-3 py-3">Negocio</th>
            <th className="w-[11%] px-3 py-3 text-right">Total</th>
            <th className="w-[10%] px-3 py-3 text-right">Comisión</th>
            <th className="w-[13%] px-3 py-3">Estado</th>
            <th className="w-[11%] px-3 py-3">Pago</th>
            <th className="w-[14%] px-3 py-3">Entrega</th>
            <th className="w-[10%] px-3 py-3">Límite</th>
            <th className="w-[7%] px-3 py-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const isSelected = order.id === selectedOrderId;
            return (
              <tr
                key={order.id}
                onClick={() => onSelectOrder(order.id)}
                className={`cursor-pointer border-t border-[#e8e9e2] transition hover:bg-[#f9faf3] ${
                  isSelected ? "bg-[#f3f4ed]" : "bg-white"
                }`}
              >
                <td className="px-3 py-2.5 font-semibold text-[#1a1c18]">{order.folio}</td>
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{order.customerName}</p>
                  <p className="truncate text-xs text-[#42493f]">{order.customerPhone}</p>
                </td>
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{order.businessName}</p>
                  <p className="truncate text-xs text-[#42493f]">{order.items.length} producto(s)</p>
                </td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{money.format(order.total)}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#3E5902]">{money.format(order.commission)}</td>
                <td className="px-3 py-2.5"><OrderStatusBadge status={order.status} /></td>
                <td className="px-3 py-2.5"><PaymentStatusBadge status={order.paymentStatus} /></td>
                <td className="px-3 py-2.5"><FulfillmentStatusBadge status={order.fulfillmentStatus} /></td>
                <td className="px-3 py-2.5 text-xs font-semibold text-[#42493f]">{order.dueDate}</td>
                <td className="px-3 py-2.5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      aria-label={`Ver ${order.folio}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectOrder(order.id);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#3E5902] hover:bg-[#f3f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {orders.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron pedidos con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
