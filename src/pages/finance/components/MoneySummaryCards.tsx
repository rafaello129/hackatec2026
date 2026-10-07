import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  WalletCards,
} from "lucide-react";
import type { CashflowPoint, FinanceSummary } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

function MiniBars({
  values,
  tone,
}: {
  values: number[];
  tone: "sales" | "expenses";
}) {
  const max = Math.max(...values, 1);
  return (
    <div className="flex h-8 items-end gap-1" aria-hidden="true">
      {values.map((value, index) => (
        <span
          key={index}
          className={
            tone === "sales"
              ? "w-2 rounded-t-[3px] bg-[#135C2F]"
              : "w-2 rounded-t-[3px] bg-[#E4AC24]"
          }
          style={{ height: `${Math.max(18, (value / max) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export default function MoneySummaryCards({
  summary,
  points,
}: {
  summary: FinanceSummary;
  points: CashflowPoint[];
}) {
  const currentKey = summary.period.label.slice(0, 3);
  const currentIndex = points.findIndex((point) => point.period.toLowerCase() === currentKey.toLowerCase());
  const current = currentIndex >= 0 ? points[currentIndex] : points.at(-1);
  const previous = currentIndex > 0 ? points[currentIndex - 1] : points.at(-2);

  const salesChange =
    current && previous && previous.revenue > 0
      ? ((current.revenue - previous.revenue) / previous.revenue) * 100
      : 0;
  const expenseChange =
    current && previous ? current.expenses - previous.expenses : 0;
  const profitChange =
    current && previous ? current.netFlow - previous.netFlow : 0;

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-12">
      <article className="order-2 rounded-[20px] border border-[#E1E6DE] bg-white p-5 sm:order-1 xl:col-span-3">
        <div className="flex min-h-[104px] flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
                Ventas
              </p>
              <p className="mt-2 font-['Hanken_Grotesk'] text-[31px] font-bold leading-none tracking-[-0.04em] text-[#17231B]">
                {money.format(summary.totalRevenue)}
              </p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#E6F1E4] text-[#135C2F]">
              <WalletCards className="h-[18px] w-[18px]" />
            </span>
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className={salesChange >= 0 ? "inline-flex items-center gap-1 text-[10px] font-semibold text-[#2F873A]" : "inline-flex items-center gap-1 text-[10px] font-semibold text-[#B84D44]"}>
              {salesChange >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
              {Math.abs(salesChange).toFixed(1)}% vs mes pasado
            </span>
            <MiniBars values={points.map((point) => point.revenue)} tone="sales" />
          </div>
        </div>
      </article>

      <article className="order-3 rounded-[20px] border border-[#E1E6DE] bg-white p-5 sm:order-2 xl:col-span-3">
        <div className="flex min-h-[104px] flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#718078]">
                Gastos
              </p>
              <p className="mt-2 font-['Hanken_Grotesk'] text-[31px] font-bold leading-none tracking-[-0.04em] text-[#17231B]">
                {money.format(summary.totalExpenses)}
              </p>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-[13px] bg-[#FFF0D8] text-[#946500]">
              <ArrowDownRight className="h-[18px] w-[18px]" />
            </span>
          </div>
          <div className="mt-5 flex items-end justify-between gap-4">
            <span className="text-[10px] font-semibold text-[#8B6205]">
              {expenseChange >= 0 ? "+" : "−"}{money.format(Math.abs(expenseChange))} vs mes pasado
            </span>
            <MiniBars values={points.map((point) => point.expenses)} tone="expenses" />
          </div>
        </div>
      </article>

      <article className="order-1 overflow-hidden rounded-[20px] bg-[#135C2F] text-white sm:order-3 sm:col-span-2 xl:col-span-6">
        <div className="flex min-h-[144px] flex-col justify-between p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#DCE9DD]">
              Te quedó
            </p>
            <p className="mt-2 font-['Hanken_Grotesk'] text-[38px] font-bold leading-none tracking-[-0.045em] text-white">
              {money.format(summary.netProfit)}
            </p>
            <p className="mt-2 text-[10px] text-[#D9E7DB]">
              Aproximadamente · ingresos menos egresos registrados
            </p>
          </div>
          <div className="mt-5 flex items-center gap-3 sm:mt-0 sm:min-w-[180px] sm:justify-end">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-white/10 text-white">
              <Landmark className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[9px] uppercase tracking-[0.08em] text-[#C7D8CA]">Vs mes pasado</p>
              <p className={profitChange >= 0 ? "mt-1 text-[13px] font-bold text-[#C7F16A]" : "mt-1 text-[13px] font-bold text-[#FFD4CE]"}>
                {profitChange >= 0 ? "+" : "−"}{money.format(Math.abs(profitChange))}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
