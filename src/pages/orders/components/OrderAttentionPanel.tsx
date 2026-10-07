import { AlertTriangle, ArrowRight, CircleDollarSign, ClipboardList } from "lucide-react";
import type { Order } from "@/types/order.types";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function OrderAttentionPanel({
  orders,
  onSelectOrder,
}: {
  orders: Order[];
  onSelectOrder: (orderId: string) => void;
}) {
  const visible = orders.slice(0, 4);

  return (
    <article className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">Pedidos que necesitan atención</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Revisa qué conviene resolver primero.</p>
        </div>
        <span className="rounded-full bg-[#F1F4EE] px-2 py-1 text-[9px] font-semibold text-[#68736B]">{orders.length}</span>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            Todo en orden. No hay pedidos urgentes.
          </div>
        ) : (
          visible.map((order) => {
            const overdue = order.paymentStatus === "overdue";
            const paymentPending = order.paymentStatus === "pending" || order.paymentStatus === "partial";
            const Icon = overdue ? AlertTriangle : paymentPending ? CircleDollarSign : ClipboardList;
            const tone = overdue
              ? "bg-[#FDE9E6] text-[#B84D44]"
              : paymentPending
                ? "bg-[#FFF0D8] text-[#9A6A04]"
                : "bg-[#E6F1E4] text-[#135C2F]";

            return (
              <button
                key={order.id}
                type="button"
                onClick={() => onSelectOrder(order.id)}
                className="group flex w-full items-center gap-3 py-3 text-left first:pt-0 last:pb-0"
              >
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-[12px] ${tone}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold text-[#2B352F]">{order.folio} · {order.customerName}</span>
                  <span className="mt-0.5 block truncate text-[10px] text-[#87918A]">
                    {order.businessName} · {money.format(order.total)} · límite {order.dueDate}
                  </span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[#8D9790] transition-transform group-hover:translate-x-0.5" />
              </button>
            );
          })
        )}
      </div>
    </article>
  );
}
