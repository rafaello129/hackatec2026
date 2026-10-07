import { NavLink } from "react-router-dom";

const tabs = [
  { to: "/finance/summary", label: "Resumen" },
  { to: "/finance/accounting", label: "Contabilidad" },
  { to: "/finance/invoicing", label: "Facturación" },
];

export default function FinanceSectionTabs() {
  return (
    <nav className="inline-flex flex-wrap rounded-[14px] border border-[#E1E6DE] bg-[#F7F8F5] p-1">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            isActive
              ? "inline-flex h-8 items-center rounded-[10px] bg-[#135C2F] px-4 text-[11px] font-semibold text-white"
              : "inline-flex h-8 items-center rounded-[10px] px-4 text-[11px] font-medium text-[#657168] transition hover:bg-white"
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  );
}
