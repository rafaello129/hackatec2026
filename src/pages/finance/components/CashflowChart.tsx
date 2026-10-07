import type { CashflowPoint } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

export default function CashflowChart({ points }: { points: CashflowPoint[] }) {
  const maxValue = Math.max(...points.flatMap((point) => [point.revenue, point.expenses]), 1);

  return (
    <article className="h-full min-h-[390px] rounded-[24px] border border-[#E1E6DE] bg-white p-5 sm:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[17px] font-semibold text-[#172019]">Ventas y gastos</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">Compara cómo se ha movido el dinero durante los últimos meses.</p>
        </div>
        <div className="flex gap-3 text-[9px] font-semibold text-[#657068]">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#135C2F]" />Ventas</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#E4AC24]" />Gastos</span>
        </div>
      </div>

      <div className="mt-7 grid h-[270px] grid-cols-6 items-end gap-3">
        {points.map((point) => (
          <div key={point.period} className="flex h-full min-w-0 flex-col justify-end">
            <div className="relative flex h-[220px] items-end justify-center gap-1.5 overflow-hidden rounded-[16px] bg-[#FAFAF7] px-2 pb-3 pt-5">
              <span className="w-3 rounded-t-[4px] bg-[#135C2F]" style={{ height: `${Math.max(6, (point.revenue / maxValue) * 88)}%` }} title={money.format(point.revenue)} />
              <span className="w-3 rounded-t-[4px] bg-[#E4AC24]" style={{ height: `${Math.max(6, (point.expenses / maxValue) * 88)}%` }} title={money.format(point.expenses)} />
            </div>
            <div className="mt-2 text-center">
              <p className="text-[10px] font-semibold text-[#344039]">{point.period}</p>
              <p className="mt-0.5 hidden text-[9px] text-[#87918A] lg:block">{money.format(point.netFlow)} neto</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
