import { ArrowRight, Clock3 } from "lucide-react";
import type { Invoice } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function daysBetween(from: string, to: string) {
  const start = new Date(`${from}T00:00:00`).getTime();
  const end = new Date(`${to}T00:00:00`).getTime();
  return Math.max(0, Math.round((end - start) / 86400000));
}

export default function ReceivablesCard({
  invoices,
  referenceDate,
}: {
  invoices: Invoice[];
  referenceDate: string;
}) {
  const pending = invoices
    .filter((invoice) => ["issued", "pending", "overdue"].includes(invoice.status))
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  const total = pending.reduce((sum, invoice) => sum + invoice.total, 0);

  return (
    <article className="h-full min-h-[390px] rounded-[24px] border border-[#E1E6DE] bg-white p-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.09em] text-[#7A867E]">Por cobrar</p>
        <p className="mt-2 font-['Hanken_Grotesk'] text-[32px] font-bold leading-none tracking-[-0.04em] text-[#17231B]">
          {money.format(total)}
        </p>
        <p className="mt-2 text-[11px] text-[#7B867E]">
          {pending.length} {pending.length === 1 ? "factura pendiente" : "facturas pendientes"}
        </p>
      </div>

      <div className="mt-5 divide-y divide-[#EEF0EB]">
        {pending.slice(0, 4).map((invoice) => {
          const overdue = invoice.status === "overdue";
          const age = daysBetween(invoice.dueDate, referenceDate);
          return (
            <div key={invoice.id} className="group flex items-center gap-3 py-3.5 first:pt-0">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#F3F6EF] text-[#135C2F]">
                <Clock3 className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-[#2B352F]">{invoice.customerName}</p>
                <span className={overdue ? "mt-1 inline-flex rounded-full bg-[#FDE9E6] px-2 py-0.5 text-[9px] font-semibold text-[#A54A42]" : "mt-1 inline-flex rounded-full bg-[#F3F5F0] px-2 py-0.5 text-[9px] font-semibold text-[#77827A]"}>
                  {overdue ? `Vencida hace ${age} días` : `Vence ${invoice.dueDate}`}
                </span>
              </div>
              <div className="text-right">
                <p className="text-[12px] font-bold text-[#2B352F]">{money.format(invoice.total)}</p>
                <ArrowRight className="ml-auto mt-1 h-3.5 w-3.5 text-[#8D9790] transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}
      </div>

      {pending.length > 0 ? (
        <div className="mt-4 rounded-[14px] bg-[#FFF0D8] px-3 py-3 text-[10px] leading-4 text-[#715C20]">
          Revisa primero las facturas vencidas antes de liberar nuevas condiciones de pago.
        </div>
      ) : null}
    </article>
  );
}
