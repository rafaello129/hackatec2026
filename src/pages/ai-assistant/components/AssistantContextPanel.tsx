import {
  BarChart3,
  FileClock,
  Handshake,
  PackageSearch,
  Users,
} from "lucide-react";
import type { AssistantBusinessContext } from "@/types/assistant.types";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function AssistantContextPanel({
  context,
}: {
  context: AssistantBusinessContext;
}) {
  const items = [
    { label: "Clientes activos", value: context.activeCustomers, icon: Users },
    { label: "Bajo stock", value: context.lowStockItems, icon: PackageSearch },
    { label: "Cooperativos activos", value: context.activeCooperatives, icon: Handshake },
    { label: "Facturas pendientes", value: context.pendingInvoices, icon: FileClock },
  ];

  return (
    <section className="overflow-hidden rounded-[24px] border border-[#174D2B] bg-[#073B1E] p-5 text-white shadow-[0_12px_30px_rgba(7,59,30,0.08)]">
      <div>
        <p className="text-[9px] font-semibold uppercase tracking-[0.1em] text-[#B8D0BD]">
          Contexto
        </p>
        <h2 className="mt-1 font-['Hanken_Grotesk'] text-[17px] font-semibold text-white">
          Contexto del emprendimiento
        </h2>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-[16px] border border-white/10 bg-white/[0.065] p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="line-clamp-2 text-[9px] font-semibold uppercase leading-4 tracking-[0.055em] text-[#C7D8CA]">
                {label}
              </p>
              <Icon className="h-3.5 w-3.5 shrink-0 text-[#B6E251]" />
            </div>
            <p className="mt-2 font-['Hanken_Grotesk'] text-[24px] font-bold leading-none text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-[16px] bg-[#EAF4E6] p-3.5 text-[#17231B]">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-white text-[#135C2F]">
            <BarChart3 className="h-4 w-4" />
          </span>
          <p className="text-[11px] font-semibold text-[#17231B]">Pulso financiero mensual</p>
        </div>
        <p className="mt-2 text-[10px] leading-4 text-[#53675A]">
          Ingresos {money.format(context.monthlyRevenue)} · Egresos {money.format(context.monthlyExpenses)} · Riesgo {context.riskLevel}
        </p>
      </div>
    </section>
  );
}
