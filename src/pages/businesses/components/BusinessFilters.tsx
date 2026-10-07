import { Search, X } from "lucide-react";
import type { BusinessCategoryFilter, BusinessStatusFilter } from "../hooks/useBusinesses";

interface BusinessFiltersProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  statusFilter: BusinessStatusFilter;
  onStatusFilterChange: (value: BusinessStatusFilter) => void;
  categoryFilter: BusinessCategoryFilter;
  onCategoryFilterChange: (value: BusinessCategoryFilter) => void;
  onClearFilters: () => void;
  statusOptions: Array<{ value: BusinessStatusFilter; label: string }>;
  categoryOptions: Array<{ value: BusinessCategoryFilter; label: string }>;
}

export default function BusinessFilters({
  searchText,
  onSearchTextChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  onClearFilters,
  statusOptions,
  categoryOptions,
}: BusinessFiltersProps) {
  return (
    <div>
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E8981]" />
        <input
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Buscar por integrante, responsable, ubicación o etiqueta..."
          className="h-11 w-full rounded-full border border-transparent bg-[#F6F7F2] pl-11 pr-4 text-[12px] text-[#263129] outline-none transition placeholder:text-[#89938C] focus:border-[#CAD7C5] focus:bg-white focus:ring-2 focus:ring-[#9AC84B]/15"
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Filtrar integrantes por estado">
          {statusOptions.map((option) => {
            const active = statusFilter === option.value;
            const shortLabel =
              option.value === "all"
                ? "Todos"
                : option.value === "needs_attention"
                  ? "Atención"
                  : option.value === "onboarding"
                    ? "Incorporación"
                    : option.label;

            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onStatusFilterChange(option.value)}
                className={
                  active
                    ? "inline-flex h-8 items-center justify-center rounded-full bg-[#135C2F] px-4 text-[11px] font-semibold text-white transition"
                    : "inline-flex h-8 items-center justify-center rounded-full border border-[#DFE4DC] bg-white px-4 text-[11px] font-medium text-[#657068] transition hover:border-[#C7D3C5] hover:bg-[#F8FAF6] hover:text-[#2E4935]"
                }
              >
                {shortLabel}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(event) => onCategoryFilterChange(event.target.value as BusinessCategoryFilter)}
            className="h-9 min-w-[170px] rounded-full border border-[#DFE4DC] bg-white px-3 text-[11px] font-medium text-[#657068] outline-none transition focus:border-[#9AB48F]"
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>

          {(statusFilter !== "all" || categoryFilter !== "all" || searchText) && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full border border-[#DFE4DC] bg-white px-3 text-[10px] font-semibold text-[#657068] transition hover:bg-[#F8FAF6]"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
