import { Eye } from "lucide-react";
import type { IntermediatedBusiness } from "@/types/business.types";
import BusinessCategoryBadge from "./BusinessCategoryBadge";
import BusinessStatusBadge from "./BusinessStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

interface BusinessTableProps {
  businesses: IntermediatedBusiness[];
  selectedBusinessId: string | null;
  onSelectBusiness: (businessId: string) => void;
}

export default function BusinessTable({ businesses, selectedBusinessId, onSelectBusiness }: BusinessTableProps) {
  return (
    <div className="max-w-full overflow-x-auto rounded-lg border border-[#e2e3dc]">
      <table className="w-full min-w-[980px] table-fixed text-left text-sm">
        <thead className="bg-[#f3f4ed] text-xs uppercase tracking-[0.06em] text-[#42493f]">
          <tr>
            <th className="w-[22%] px-3 py-3">Negocio</th>
            <th className="w-[15%] px-3 py-3">Propietario</th>
            <th className="w-[14%] px-3 py-3">Categoría</th>
            <th className="w-[13%] px-3 py-3">Estado</th>
            <th className="w-[9%] px-3 py-3 text-right">Productos</th>
            <th className="w-[9%] px-3 py-3 text-right">Pedidos</th>
            <th className="w-[11%] px-3 py-3 text-right">Ventas</th>
            <th className="w-[11%] px-3 py-3 text-right">Liquidación</th>
            <th className="w-[8%] px-3 py-3 text-right">Comisión</th>
            <th className="w-[7%] px-3 py-3 text-right">Acción</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business) => {
            const isSelected = business.id === selectedBusinessId;
            return (
              <tr
                key={business.id}
                onClick={() => onSelectBusiness(business.id)}
                className={`cursor-pointer border-t border-[#e8e9e2] transition hover:bg-[#f9faf3] ${
                  isSelected ? "bg-[#f3f4ed]" : "bg-white"
                }`}
              >
                <td className="px-3 py-2.5">
                  <p className="truncate font-semibold text-[#1a1c18]">{business.name}</p>
                  <p className="truncate text-xs text-[#42493f]">{business.location}</p>
                </td>
                <td className="px-3 py-2.5 text-[#42493f]"><span className="block truncate">{business.ownerName}</span></td>
                <td className="px-3 py-2.5"><BusinessCategoryBadge category={business.category} /></td>
                <td className="px-3 py-2.5"><BusinessStatusBadge status={business.status} /></td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{business.activeProducts}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{business.pendingOrders}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{money.format(business.monthlySales)}</td>
                <td className="px-3 py-2.5 text-right font-semibold text-[#1a1c18]">{money.format(business.pendingPayout)}</td>
                <td className="px-3 py-2.5 text-right text-[#42493f]">{business.commissionRate}%</td>
                <td className="px-3 py-2.5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      aria-label={`Ver ${business.name}`}
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectBusiness(business.id);
                      }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#c2c9bc] bg-white text-[#3E5902] hover:bg-[#f3f4ed]"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
          {businesses.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-3 py-8 text-center text-sm text-[#42493f]">
                No se encontraron negocios con los filtros actuales.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}
