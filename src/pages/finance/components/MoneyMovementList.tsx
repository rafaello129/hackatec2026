import { ArrowDownLeft, ArrowUpRight, RefreshCw } from "lucide-react";
import type { AccountingEntry } from "@/types/finance.types";

const money = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const formatDate = (dateISO: string) =>
  new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" }).format(
    new Date(`${dateISO}T00:00:00`),
  );

export default function MoneyMovementList({ entries }: { entries: AccountingEntry[] }) {
  const visible = [...entries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 7);

  return (
    <article className="h-full min-h-[410px] rounded-[24px] border border-[#E1E6DE] bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-[17px] font-semibold text-[#172019]">Movimientos recientes</h2>
        <p className="mt-1 text-[11px] text-[#7B867E]">Entradas, salidas y ajustes registrados en la operación.</p>
      </div>

      <div className="mt-5 hidden overflow-hidden rounded-[18px] border border-[#E1E6DE] md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[#F6F8F3]">
            <tr className="text-[9px] font-semibold uppercase tracking-[0.06em] text-[#7A867E]">
              <th className="w-[62%] px-4 py-3">Movimiento</th>
              <th className="w-[18%] px-3 py-3">Fecha</th>
              <th className="w-[20%] px-4 py-3 text-right">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((entry) => {
              const income = entry.type === "income";
              const adjustment = entry.type === "adjustment" || entry.type === "transfer";
              const Icon = income ? ArrowUpRight : adjustment ? RefreshCw : ArrowDownLeft;
              return (
                <tr key={entry.id} className="group border-t border-[#EEF0EB] transition-colors hover:bg-[#F7FAF5]">
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className={income ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#E6F1E4] text-[#2F873A]" : adjustment ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#EEF2EA] text-[#607064]" : "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#FFF0D8] text-[#946500]"}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-semibold text-[#2B352F]">{entry.concept}</p>
                        <p className="mt-0.5 truncate text-[10px] text-[#849087]">{entry.category} · {entry.relatedEntity}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-[10px] text-[#7B867E]">{formatDate(entry.date)}</td>
                  <td className={income ? "px-4 py-3.5 text-right text-[11px] font-bold text-[#2F873A]" : "px-4 py-3.5 text-right text-[11px] font-bold text-[#2B352F]"}>
                    {income ? "+" : "−"}{money.format(entry.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 space-y-2.5 md:hidden">
        {visible.map((entry) => {
          const income = entry.type === "income";
          return (
            <div key={entry.id} className="flex items-center gap-3 rounded-[16px] bg-[#FAFAF7] p-3">
              <span className={income ? "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#E6F1E4] text-[#2F873A]" : "grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-[#FFF0D8] text-[#946500]"}>
                {income ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-semibold text-[#2B352F]">{entry.concept}</p>
                <p className="mt-0.5 text-[9.5px] text-[#87918A]">{formatDate(entry.date)}</p>
              </div>
              <p className="text-[11px] font-bold text-[#344039]">{income ? "+" : "−"}{money.format(entry.amount)}</p>
            </div>
          );
        })}
      </div>
    </article>
  );
}
