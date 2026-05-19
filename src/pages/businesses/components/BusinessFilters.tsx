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
    <div className="mb-4 grid gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 lg:grid-cols-[minmax(0,1fr)_190px_210px_auto]">
      <label className="relative min-w-0">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#42493f]" />
        <input
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Buscar negocio, propietario, ubicación o tag..."
          className="h-10 w-full rounded-lg border border-[#c2c9bc] bg-white py-2 pl-9 pr-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]"
        />
      </label>

      <select
        value={statusFilter}
        onChange={(event) => onStatusFilterChange(event.target.value as BusinessStatusFilter)}
        className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]"
      >
        {statusOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <select
        value={categoryFilter}
        onChange={(event) => onCategoryFilterChange(event.target.value as BusinessCategoryFilter)}
        className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]"
      >
        {categoryOptions.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>

      <button
        type="button"
        onClick={onClearFilters}
        className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm font-semibold text-[#42493f] hover:bg-[#f3f4ed]"
      >
        <X className="h-4 w-4" />
        Limpiar
      </button>
    </div>
  );
}
