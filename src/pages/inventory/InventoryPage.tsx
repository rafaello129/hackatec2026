import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
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

  const resolveItemName = (itemId: string) => items.find((item) => item.id === itemId)?.name ?? "Item no identificado";
  const resolveItemBusiness = (itemId: string) => items.find((item) => item.id === itemId)?.businessName ?? "Negocio no identificado";

  return (
    <div className="w-full max-w-full space-y-5 overflow-hidden">
      <PageIntro
        title="Inventario"
        description="Administra productos, stock y catalogo comercial de los negocios intermediados."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Agregar producto
          </button>
        }
      />

      <InventoryKpiCards kpis={kpis} />

      <InventoryBusinessTabs
        businesses={businesses}
        activeBusinessId={businessFilter}
        onBusinessChange={setBusinessFilter}
      />

      <div className="grid w-full max-w-full gap-4 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
        <div className="min-w-0">
        <SectionCard title="Stock por negocio">
          <div className="space-y-3">
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

            {isLoading ? (
              <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
                Cargando inventario...
              </div>
            ) : (
              <InventoryTable
                items={filteredItems}
                selectedItemId={selectedItemId}
                onSelectItem={setSelectedItemId}
              />
            )}
          </div>

          <p className="mt-3 text-sm text-[#42493f]">
            Mostrando {filteredItems.length} de {items.length} items del inventario intermediado.
          </p>
        </SectionCard>
        </div>

        <aside className="min-w-0 space-y-4">
          <div className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <h2 className="mb-3 font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Movimiento de stock</h2>
            <div className="flex items-center justify-center gap-2 text-xs text-[#42493f] mb-3">
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#4F7302]" />
                Entradas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#c2c9bc]" />
                Objetivo
              </span>
            </div>
            <div className="grid h-[128px] grid-cols-7 items-end gap-1 rounded-lg bg-[#f9faf3] p-3">
              {[62, 68, 64, 77, 74, 86, 82].map((height, i) => (
                <div key={i} className="flex h-full items-end">
                  <div
                    className="w-full rounded-t-md bg-[#4F7302]"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 text-center text-xs font-semibold text-[#42493f]">
              {["LUN", "MAR", "MIE", "JUE", "VIE", "SAB", "DOM"].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
            <p className="mt-3 text-sm text-[#4F7302]">
              La rotacion subio 8.4% por pedidos activos de negocios representados.
            </p>
          </div>

          <InventoryMovementPanel
            movements={recentMovements}
            resolveItemName={resolveItemName}
            resolveItemBusiness={resolveItemBusiness}
          />
        </aside>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-start">
        <InventoryAlertPanel
          alerts={filteredAlerts}
          resolveItemName={resolveItemName}
          resolveItemBusiness={resolveItemBusiness}
        />
        <InventoryDetailPanel item={selectedItem} movements={selectedItemMovements} />
      </div>

      <InventoryCatalogPanel catalogItems={filteredCatalogItems} />
    </div>
  );
}
