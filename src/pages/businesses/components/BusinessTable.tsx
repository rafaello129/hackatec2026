import { ChevronRight, MapPin } from "lucide-react";
import type { IntermediatedBusiness } from "@/types/business.types";
import BusinessCategoryBadge from "./BusinessCategoryBadge";
import BusinessStatusBadge from "./BusinessStatusBadge";

const money = new Intl.NumberFormat("es-MX", {
  currency: "MXN",
  maximumFractionDigits: 0,
  style: "currency",
});

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function BusinessTable({
  businesses,
  selectedBusinessId,
  onSelectBusiness,
}: {
  businesses: IntermediatedBusiness[];
  selectedBusinessId: string | null;
  onSelectBusiness: (businessId: string) => void;
}) {
  if (businesses.length === 0) {
    return (
      <div className="rounded-[18px] border border-dashed border-[#DDE4D9] bg-[#F8FAF6] px-5 py-10 text-center">
        <p className="text-sm font-semibold text-[#344039]">No encontramos integrantes con estos filtros.</p>
        <p className="mt-1 text-[11px] text-[#7E8981]">Prueba con otra búsqueda, estado o categoría.</p>
      </div>
    );
  }

  return (
    <>
      <div className="hidden overflow-hidden rounded-[18px] border border-[#E1E6DE] bg-white md:block">
        <table className="w-full table-fixed text-left">
          <thead className="bg-[linear-gradient(90deg,#F4F8F1_0%,#FAFBF8_100%)]">
            <tr className="text-[10px] font-medium uppercase tracking-[0.055em] text-[#718078]">
              <th className="w-[34%] px-4 py-3.5 font-semibold">Integrante</th>
              <th className="w-[18%] px-3 py-3.5 font-semibold">Estado</th>
              <th className="w-[12%] px-3 py-3.5 font-semibold">Productos</th>
              <th className="w-[11%] px-3 py-3.5 font-semibold">Pedidos</th>
              <th className="w-[16%] px-3 py-3.5 font-semibold">Ventas</th>
              <th className="w-[9%] px-4 py-3.5" aria-label="Abrir integrante" />
            </tr>
          </thead>

          <tbody>
            {businesses.map((business, index) => {
              const selected = business.id === selectedBusinessId;
              return (
                <tr
                  key={business.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => onSelectBusiness(business.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelectBusiness(business.id);
                    }
                  }}
                  className={`group cursor-pointer border-t border-[#EEF0EB] outline-none transition-colors focus-visible:bg-[#F4F8F1] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#9AC84B]/45 ${selected ? "bg-[#F4F8F1]" : "bg-white hover:bg-[#FAFCF8]"}`}
                  style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
                >
                  <td className="px-4 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[10px] font-bold text-[#135C2F] transition-transform group-hover:scale-105">
                        {initials(business.name)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-[12px] font-semibold text-[#263129]">{business.name}</span>
                        <span className="mt-1 flex min-w-0 items-center gap-1 text-[10px] text-[#849087]">
                          <MapPin className="h-3 w-3 shrink-0" />
                          <span className="truncate">{business.location}</span>
                          <span>·</span>
                          <span className="truncate">{business.ownerName}</span>
                        </span>
                      </span>
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <div className="flex flex-col items-start gap-1.5">
                      <BusinessStatusBadge status={business.status} />
                      <BusinessCategoryBadge category={business.category} />
                    </div>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[12px] font-bold text-[#2B352F]">{business.activeProducts}</span>
                    <span className="ml-1 text-[9px] text-[#87918A]">activos</span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="text-[12px] font-bold text-[#2B352F]">{business.pendingOrders}</span>
                    <span className="ml-1 text-[9px] text-[#87918A]">pend.</span>
                  </td>

                  <td className="px-3 py-3.5">
                    <span className="block text-[12px] font-bold text-[#2B352F]">{money.format(business.monthlySales)}</span>
                    <span className="mt-1 block text-[9px] text-[#87918A]">
                      {money.format(business.pendingPayout)} por liquidar · {business.commissionRate}% comisión
                    </span>
                  </td>

                  <td className="px-4 py-3.5 text-right">
                    <span className="ml-auto grid h-8 w-8 place-items-center rounded-full text-[#929C95] transition-all group-hover:bg-[#E6F1E4] group-hover:text-[#135C2F]">
                      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-2.5 md:hidden">
        {businesses.map((business) => (
          <button
            key={business.id}
            type="button"
            onClick={() => onSelectBusiness(business.id)}
            className={`w-full rounded-[18px] border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${business.id === selectedBusinessId ? "border-[#9AB48F] ring-2 ring-[#9AC84B]/10" : "border-[#E4E8E1] hover:border-[#CFD8CC]"}`}
          >
            <div className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[10px] font-bold text-[#135C2F]">
                {initials(business.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-semibold text-[#263129]">{business.name}</p>
                <p className="mt-0.5 truncate text-[10px] text-[#849087]">{business.ownerName} · {business.location}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-[#929C95]" />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <BusinessStatusBadge status={business.status} />
              <BusinessCategoryBadge category={business.category} />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[linear-gradient(135deg,#F7F9F4_0%,#F3F7EF_100%)] p-3">
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Pedidos</p>
                <p className="mt-1 text-[10px] font-semibold text-[#344039]">{business.pendingOrders}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Productos</p>
                <p className="mt-1 text-[10px] font-semibold text-[#344039]">{business.activeProducts}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wide text-[#889289]">Ventas</p>
                <p className="mt-1 truncate text-[10px] font-semibold text-[#344039]">{money.format(business.monthlySales)}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
