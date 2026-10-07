import { Plus } from "lucide-react";
import InventoryAlertPanel from "./components/InventoryAlertPanel";
import InventoryBusinessTabs from "./components/InventoryBusinessTabs";
import InventoryCatalogPanel from "./components/InventoryCatalogPanel";
import InventoryDetailPanel from "./components/InventoryDetailPanel";
import InventoryFilters from "./components/InventoryFilters";
import InventoryKpiCards from "./components/InventoryKpiCards";
import InventoryMovementPanel from "./components/InventoryMovementPanel";
import InventoryTable from "./components/InventoryTable";
import { useInventory } from "./hooks/useInventory";

export default function InventoryPage() {
  const {
    isLoading,
    items,
    filteredItems,
    kpis,
    filteredAlerts,
    recentMovements,
    filteredCatalogItems,
    businesses,
    searchText,
    setSearchText,
    businessFilter,
    setBusinessFilter,
    statusFilter,
    setStatusFilter,
    categoryFilter,
    setCategoryFilter,
    clearFilters,
    selectedItemId,
    setSelectedItemId,
    selectedItem,
    selectedItemMovements,
    statusOptions,
    categoryOptions,
  } = useInventory();

  const resolveItemName = (itemId: string) =>
    items.find((item) => item.id === itemId)?.name ?? "Item no identificado";
  const resolveItemBusiness = (itemId: string) =>
    items.find((item) => item.id === itemId)?.businessName ?? "Negocio no identificado";

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#172019]">
            Productos
          </h1>
          <p className="mt-2 text-[13px] text-[#657068]">
            Revisa qué productos tienen stock, cuáles requieren atención y cómo se mueven entre tus negocios.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex h-11 w-fit cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#073B1E] px-5 text-[12px] font-semibold text-white opacity-80"
        >
          <Plus className="h-4 w-4" />
          Agregar producto
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
            <div className="h-[620px] animate-pulse rounded-[24px] border border-[#E3E7DF] bg-white" />
            <div className="space-y-4">
              <div className="h-[280px] animate-pulse rounded-[22px] border border-[#E3E7DF] bg-white" />
              <div className="h-[320px] animate-pulse rounded-[22px] border border-[#E3E7DF] bg-white" />
            </div>
          </section>
        </>
      ) : items.length === 0 ? (
        <section className="rounded-[26px] border border-dashed border-[#D5DDD2] bg-white px-6 py-14 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-[16px] bg-[#ECF5E8] text-[#287839]">
            <Plus className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-[#263129]">
            Aún no hay productos registrados
          </h2>
          <p className="mx-auto mt-2 max-w-[480px] text-[12px] leading-5 text-[#77827A]">
            Agrega productos para comenzar a controlar stock, pedidos y movimientos.
          </p>
        </section>
      ) : (
        <>
          <InventoryKpiCards kpis={kpis} />

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <section className="rounded-[24px] border border-[#E1E6DE] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(23,35,27,0.05)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#172019]">
                    Mis productos
                  </h2>
                  <p className="mt-1 text-[11px] text-[#7B867E]">
                    {filteredItems.length} {filteredItems.length === 1 ? "producto" : "productos"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <InventoryBusinessTabs
                  businesses={businesses}
                  activeBusinessId={businessFilter}
                  onBusinessChange={setBusinessFilter}
                />
              </div>

              <div className="mt-4">
                <InventoryFilters
                  searchText={searchText}
                  statusFilter={statusFilter}
                  categoryFilter={categoryFilter}
                  statusOptions={statusOptions}
                  categoryOptions={categoryOptions}
                  onSearchChange={setSearchText}
                  onStatusChange={setStatusFilter}
                  onCategoryChange={setCategoryFilter}
                  onClearFilters={clearFilters}
                />
              </div>

              <div className="mt-5">
                <InventoryTable
                  items={filteredItems}
                  selectedItemId={selectedItemId}
                  onSelectItem={setSelectedItemId}
                />
              </div>
            </section>

            <aside className="min-w-0 space-y-4">
              <InventoryAlertPanel
                alerts={filteredAlerts}
                resolveItemName={resolveItemName}
                resolveItemBusiness={resolveItemBusiness}
              />
              <InventoryMovementPanel
                movements={recentMovements}
                resolveItemName={resolveItemName}
                resolveItemBusiness={resolveItemBusiness}
              />
            </aside>
          </section>

          <section className="grid items-start gap-4 xl:grid-cols-[360px_minmax(0,1fr)]">
            <InventoryDetailPanel
              item={selectedItem}
              movements={selectedItemMovements}
            />
            <InventoryCatalogPanel catalogItems={filteredCatalogItems} />
          </section>
        </>
      )}
    </div>
  );
}
