import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import BusinessActivityPanel from "./components/BusinessActivityPanel";
import BusinessDetailPanel from "./components/BusinessDetailPanel";
import BusinessFilters from "./components/BusinessFilters";
import BusinessKpiCards from "./components/BusinessKpiCards";
import BusinessOnboardingPanel from "./components/BusinessOnboardingPanel";
import BusinessTable from "./components/BusinessTable";
import { useBusinesses } from "./hooks/useBusinesses";

export default function BusinessesPage() {
  const {
    activities,
    categoryFilter,
    categoryOptions,
    clearFilters,
    filteredBusinesses,
    isLoading,
    kpis,
    onboardingTasks,
    searchText,
    selectedBusiness,
    selectedBusinessActivities,
    selectedBusinessId,
    selectedBusinessTasks,
    setCategoryFilter,
    setSearchText,
    setSelectedBusinessId,
    setStatusFilter,
    statusFilter,
    statusOptions,
  } = useBusinesses();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <PageIntro
        title="Negocios intermediados"
        description="Administra los negocios que representas digitalmente, su operación, pedidos, inventario y liquidaciones."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Agregar negocio
          </button>
        }
      />

      <BusinessKpiCards kpis={kpis} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <SectionCard title="Directorio operativo">
          <BusinessFilters
            searchText={searchText}
            onSearchTextChange={setSearchText}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            onClearFilters={clearFilters}
            statusOptions={statusOptions}
            categoryOptions={categoryOptions}
          />
          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
              Cargando negocios intermediados...
            </div>
          ) : (
            <BusinessTable
              businesses={filteredBusinesses}
              selectedBusinessId={selectedBusinessId}
              onSelectBusiness={setSelectedBusinessId}
            />
          )}
        </SectionCard>

        <div className="min-w-0 space-y-4">
          <BusinessDetailPanel
            business={selectedBusiness}
            activities={selectedBusinessActivities}
            tasks={selectedBusinessTasks}
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] xl:items-start">
        <BusinessOnboardingPanel tasks={selectedBusinessTasks.length > 0 ? selectedBusinessTasks : onboardingTasks} />
        <BusinessActivityPanel activities={selectedBusinessActivities.length > 0 ? selectedBusinessActivities : activities} />
      </div>
    </div>
  );
}
