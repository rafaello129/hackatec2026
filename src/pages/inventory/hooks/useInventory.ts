import { useEffect, useMemo, useState } from "react";
import {
  getCatalogItems,
  getInventoryAlerts,
  getInventoryBusinesses,
  getInventoryItems,
  getInventoryKpis,
  getStockMovements,
} from "@/services/inventory.service";
import type {
  CatalogItem,
  InventoryAlert,
  InventoryBusinessFilter,
  InventoryCategory,
  InventoryItem,
  InventoryKpi,
  InventoryStatus,
  StockMovement,
} from "@/types/inventory.types";

export type InventoryStatusFilter = InventoryStatus | "all";
export type InventoryCategoryFilter = InventoryCategory | "all";
export type { InventoryBusinessFilter };

const STATUS_OPTIONS: Array<{ value: InventoryStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "in_stock", label: "En stock" },
  { value: "low_stock", label: "Bajo stock" },
  { value: "out_of_stock", label: "Sin stock" },
  { value: "reserved", label: "Reservado" },
  { value: "discontinued", label: "Descontinuado" },
];

const CATEGORY_OPTIONS: Array<{ value: InventoryCategoryFilter; label: string }> = [
  { value: "all", label: "Todas las categorias" },
  { value: "raw_material", label: "Materia prima" },
  { value: "finished_product", label: "Producto terminado" },
  { value: "service", label: "Servicio" },
  { value: "packaging", label: "Empaque" },
  { value: "equipment", label: "Equipo" },
  { value: "digital", label: "Digital" },
];

export function useInventory() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [kpis, setKpis] = useState<InventoryKpi[]>([]);
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [alerts, setAlerts] = useState<InventoryAlert[]>([]);
  const [catalogItems, setCatalogItems] = useState<CatalogItem[]>([]);
  const [businesses, setBusinesses] = useState<Array<{ id: string; name: string; count: number; hasAttention: boolean }>>([]);
  const [searchText, setSearchText] = useState("");
  const [businessFilter, setBusinessFilter] = useState<InventoryBusinessFilter>("all");
  const [statusFilter, setStatusFilter] = useState<InventoryStatusFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<InventoryCategoryFilter>("all");
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [inventoryData, movementData, alertData, catalogData, businessData] = await Promise.all([
        getInventoryItems(),
        getStockMovements(),
        getInventoryAlerts(),
        getCatalogItems(),
        getInventoryBusinesses(),
      ]);
      const kpiData = await getInventoryKpis(inventoryData);

      if (!mounted) {
        return;
      }

      setItems(inventoryData);
      setMovements(movementData);
      setAlerts(alertData);
      setCatalogItems(catalogData);
      setBusinesses(businessData);
      setKpis(kpiData);
      setSelectedItemId((prev) => prev ?? inventoryData[0]?.id ?? null);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    const term = searchText.trim().toLowerCase();

    return items.filter((item) => {
      const matchesText =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.sku.toLowerCase().includes(term) ||
        item.businessName.toLowerCase().includes(term) ||
        item.ownerName.toLowerCase().includes(term) ||
        item.supplier.toLowerCase().includes(term) ||
        item.location.toLowerCase().includes(term) ||
        item.tags.some((tag) => tag.toLowerCase().includes(term));

      const matchesBusiness = businessFilter === "all" || item.businessId === businessFilter;
      const matchesStatus = statusFilter === "all" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      return matchesText && matchesBusiness && matchesStatus && matchesCategory;
    });
  }, [items, searchText, businessFilter, statusFilter, categoryFilter]);

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedItemId(null);
      return;
    }

    const selectedStillVisible = filteredItems.some((item) => item.id === selectedItemId);
    if (!selectedStillVisible) {
      setSelectedItemId(filteredItems[0].id);
    }
  }, [filteredItems, selectedItemId]);

  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.id === selectedItemId) ?? null,
    [filteredItems, selectedItemId],
  );

  const selectedItemMovements = useMemo(() => {
    if (!selectedItem) {
      return [];
    }
    return movements
      .filter((movement) => movement.itemId === selectedItem.id)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 4);
  }, [movements, selectedItem]);

  const recentMovements = useMemo(
    () => {
      const visibleItemIds = new Set(filteredItems.map((item) => item.id));
      return [...movements]
        .filter((movement) => businessFilter === "all" || visibleItemIds.has(movement.itemId))
        .sort((a, b) => b.date.localeCompare(a.date))
        .slice(0, 6);
    },
    [businessFilter, filteredItems, movements],
  );

  const filteredAlerts = useMemo(() => {
    const visibleItemIds = new Set(filteredItems.map((item) => item.id));
    return alerts.filter((alert) => businessFilter === "all" || visibleItemIds.has(alert.itemId));
  }, [alerts, businessFilter, filteredItems]);

  const filteredCatalogItems = useMemo(
    () => catalogItems.filter((item) => businessFilter === "all" || item.businessId === businessFilter),
    [businessFilter, catalogItems],
  );

  const clearFilters = () => {
    setSearchText("");
    setBusinessFilter("all");
    setStatusFilter("all");
    setCategoryFilter("all");
  };

  const businessOptions = useMemo(
    () => [
      {
        id: "all",
        name: "Todos",
        count: items.length,
        hasAttention: businesses.some((business) => business.hasAttention),
      },
      ...businesses,
    ],
    [businesses, items.length],
  );

  return {
    isLoading,
    items,
    filteredItems,
    kpis,
    alerts,
    filteredAlerts,
    recentMovements,
    catalogItems,
    filteredCatalogItems,
    businesses: businessOptions,
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
    statusOptions: STATUS_OPTIONS,
    categoryOptions: CATEGORY_OPTIONS,
  };
}
