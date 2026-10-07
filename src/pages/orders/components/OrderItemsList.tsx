import type { OrderItem } from "@/types/order.types";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="divide-y divide-[#EEF0EB] rounded-[18px] border border-[#E5E9E2] bg-white px-4">
      {items.map((item) => (
        <article key={item.id} className="py-3.5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-[#344039]">{item.productName}</p>
              <p className="mt-1 text-[9.5px] text-[#87918A]">{item.sku} · {item.businessName}</p>
            </div>
            <p className="shrink-0 text-[11px] font-semibold text-[#2D3931]">{money.format(item.subtotal)}</p>
          </div>
          <p className="mt-1 text-[9.5px] text-[#87918A]">{item.quantity} × {money.format(item.unitPrice)}</p>
        </article>
      ))}
    </div>
  );
}
