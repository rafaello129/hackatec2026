import type { IntermediatedBusiness } from "@/types/business.types";
import BusinessCategoryBadge from "./BusinessCategoryBadge";
import BusinessStatusBadge from "./BusinessStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function BusinessCard({
  business,
  isSelected,
  onSelect,
}: {
  business: IntermediatedBusiness;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-lg border p-3 text-left transition ${
        isSelected ? "border-[#799833] bg-[#f9faf3]" : "border-[#e2e3dc] bg-white hover:border-[#c2c9bc]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-semibold text-[#1a1c18]">{business.name}</p>
          <p className="mt-1 text-xs text-[#42493f]">{business.ownerName}</p>
        </div>
        <BusinessStatusBadge status={business.status} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <BusinessCategoryBadge category={business.category} />
        <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
          {business.commissionRate}% comisión
        </span>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div>
          <p className="text-[#73796e]">Ventas</p>
          <p className="font-semibold text-[#1a1c18]">{money.format(business.monthlySales)}</p>
        </div>
        <div>
          <p className="text-[#73796e]">Pedidos</p>
          <p className="font-semibold text-[#1a1c18]">{business.pendingOrders}</p>
        </div>
        <div>
          <p className="text-[#73796e]">Liquidación</p>
          <p className="font-semibold text-[#1a1c18]">{money.format(business.pendingPayout)}</p>
        </div>
      </div>
    </button>
  );
}
