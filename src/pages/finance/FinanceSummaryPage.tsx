import { FileText, ReceiptText } from "lucide-react";
import { Link } from "react-router-dom";
import CashflowChart from "./components/CashflowChart";
import ExpenseBreakdownCard from "./components/ExpenseBreakdownCard";
import FinanceSectionTabs from "./components/FinanceSectionTabs";
import MoneyMovementList from "./components/MoneyMovementList";
import MoneySummaryCards from "./components/MoneySummaryCards";
import ReceivablesCard from "./components/ReceivablesCard";
import { useFinance } from "./hooks/useFinance";

export default function FinanceSummaryPage() {
  const {
    accountingEntries,
    cashflowPoints,
    invoices,
    summary,
  } = useFinance();

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#172019]">
            Mi dinero
          </h1>
          <p className="mt-2 text-[13px] text-[#657068]">
            Entiende cómo se mueve el dinero de los emprendimientos que administras.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/finance/accounting"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#DFE4DC] bg-white px-4 text-[11px] font-semibold text-[#5B675F] transition hover:bg-[#F6F8F4]"
          >
            <ReceiptText className="h-4 w-4" />
            Contabilidad
          </Link>
          <Link
            to="/finance/invoicing"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#073B1E] px-5 text-[12px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#0B4A28] hover:shadow-md"
          >
            <FileText className="h-4 w-4" />
            Ver facturas
          </Link>
        </div>
      </header>

      <FinanceSectionTabs />

      <MoneySummaryCards summary={summary} points={cashflowPoints} />

      <section className="grid items-stretch gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <CashflowChart points={cashflowPoints} />
        </div>
        <div className="xl:col-span-4">
          <ReceivablesCard invoices={invoices} referenceDate={summary.period.endDate} />
        </div>
      </section>

      <section className="grid items-stretch gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <MoneyMovementList entries={accountingEntries} />
        </div>
        <div className="xl:col-span-4">
          <ExpenseBreakdownCard entries={accountingEntries} />
        </div>
      </section>
    </div>
  );
}
