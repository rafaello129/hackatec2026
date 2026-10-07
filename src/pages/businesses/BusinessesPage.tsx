import { Plus } from "lucide-react";
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
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#172019]">
            Emprendimientos
          </h1>
          <p className="mt-2 text-[13px] text-[#657068]">
            Acompaña los emprendimientos de tu comunidad y da seguimiento a su operación diaria.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex h-11 w-fit cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#073B1E] px-5 text-[12px] font-semibold text-white opacity-80"
        >
          <Plus className="h-4 w-4" />
          Agregar integrante
        </button>
      </header>

      {isLoading ? (
        <>
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[0, 1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[132px] animate-pulse rounded-[20px] border border-[#E3E7DF] bg-white"
              />
            ))}
          </section>
          <section className="grid gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <div className="h-[590px] animate-pulse rounded-[24px] border border-[#E3E7DF] bg-white" />
            <div className="space-y-4">
              <div className="h-[360px] animate-pulse rounded-[22px] border border-[#E3E7DF] bg-white" />
              <div className="h-[260px] animate-pulse rounded-[22px] border border-[#E3E7DF] bg-white" />
            </div>
          </section>
        </>
      ) : (
        <>
          <BusinessKpiCards kpis={kpis} />

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <section className="rounded-[24px] border border-[#E1E6DE] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(23,35,27,0.05)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#172019]">Mi comunidad</h2>
                  <p className="mt-1 text-[11px] text-[#7B867E]">
                    {filteredBusinesses.length} {filteredBusinesses.length === 1 ? "emprendimiento" : "emprendimientos"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
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
              </div>

              <div className="mt-5">
                <BusinessTable
                  businesses={filteredBusinesses}
                  selectedBusinessId={selectedBusinessId}
                  onSelectBusiness={setSelectedBusinessId}
                />
              </div>
            </section>

            <div className="min-w-0 space-y-4">
              <BusinessDetailPanel
                business={selectedBusiness}
                activities={selectedBusinessActivities}
                tasks={selectedBusinessTasks}
              />
              <BusinessOnboardingPanel
                tasks={selectedBusinessTasks.length > 0 ? selectedBusinessTasks : onboardingTasks}
              />
              <BusinessActivityPanel
                activities={selectedBusinessActivities.length > 0 ? selectedBusinessActivities : activities}
              />
            </div>
          </section>
        </>
      )}
    </div>
  );
}
