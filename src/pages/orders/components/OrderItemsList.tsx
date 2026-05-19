import type { OrderItem } from "@/types/order.types";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function OrderItemsList({ items }: { items: OrderItem[] }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <article key={item.id} className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#1a1c18]">{item.productName}</p>
              <p className="text-xs text-[#42493f]">{item.sku} · {item.businessName}</p>
            </div>
            <p className="shrink-0 text-sm font-semibold text-[#1a1c18]">{money.format(item.subtotal)}</p>
          </div>
          <p className="mt-1 text-xs text-[#42493f]">{item.quantity} x {money.format(item.unitPrice)}</p>
        </article>
      ))}
    </div>
  );
}
