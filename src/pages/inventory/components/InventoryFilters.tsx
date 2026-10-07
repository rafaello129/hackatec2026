import { Search, X } from "lucide-react";
import type { InventoryCategoryFilter, InventoryStatusFilter } from "@/pages/inventory/hooks/useInventory";

interface FilterOption<T extends string> {
  value: T;
  label: string;
}

export default function InventoryFilters({
  searchText,
  statusFilter,
  categoryFilter,
  statusOptions,
  categoryOptions,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onClearFilters,
}: {
  searchText: string;
  statusFilter: InventoryStatusFilter;
  categoryFilter: InventoryCategoryFilter;
  statusOptions: Array<FilterOption<InventoryStatusFilter>>;
  categoryOptions: Array<FilterOption<InventoryCategoryFilter>>;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: InventoryStatusFilter) => void;
  onCategoryChange: (value: InventoryCategoryFilter) => void;
  onClearFilters: () => void;
}) {
  const hasFilters =
    searchText.trim().length > 0 ||
    statusFilter !== "all" ||
    categoryFilter !== "all";

  return (
    <div>
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_190px]">
        <label className="relative min-w-0">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#7E8981]" />
          <input
            type="search"
            value={searchText}
            placeholder="Buscar productos..."
            onChange={(event) => onSearchChange(event.target.value)}
            className="h-11 w-full rounded-full border border-transparent bg-[#F6F7F2] pl-11 pr-4 text-[12px] text-[#263129] outline-none transition placeholder:text-[#89938C] focus:border-[#CAD7C5] focus:bg-white focus:ring-2 focus:ring-[#9AC84B]/15"
          />
        </label>

        <select
          value={categoryFilter}
          onChange={(event) => onCategoryChange(event.target.value as InventoryCategoryFilter)}
          className="h-11 rounded-[14px] border border-[#DFE4DC] bg-white px-3 text-[11px] font-medium text-[#536057] outline-none transition focus:border-[#9FBF72] focus:ring-2 focus:ring-[#9AC84B]/15"
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {statusOptions.map((option) => {
          const active = option.value === statusFilter;
          const label =
            option.value === "all"
              ? "Todos"
              : option.value === "in_stock"
                ? "Disponibles"
                : option.value === "low_stock"
                  ? "Por agotarse"
                  : option.value === "out_of_stock"
                    ? "Agotados"
                    : option.label;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              onClick={() => onStatusChange(option.value)}
              className={
                active
                  ? "inline-flex h-8 items-center rounded-full bg-[#135C2F] px-4 text-[11px] font-semibold text-white shadow-sm transition"
                  : "inline-flex h-8 items-center rounded-full border border-[#DFE4DC] bg-white px-4 text-[11px] font-medium text-[#657068] transition hover:border-[#C7D3C5] hover:bg-[#F8FAF6] hover:text-[#2E4935]"
              }
            >
              {label}
            </button>
          );
        })}

        {hasFilters ? (
          <button
            type="button"
            onClick={onClearFilters}
            className="ml-auto inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-[10px] font-semibold text-[#718078] transition hover:bg-[#F1F4EE]"
          >
            <X className="h-3.5 w-3.5" />
            Limpiar
          </button>
        ) : null}
      </div>
    </div>
  );
}
