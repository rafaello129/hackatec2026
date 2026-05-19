import {
  catalogItemsMock,
  inventoryAlertsMock,
  inventoryItemsMock,
  inventoryKpisMock,
  stockMovementsMock,
} from "@/data/mocks/inventory.mock";
import type {
  CatalogItem,
  InventoryAlert,
  InventoryItem,
  InventoryKpi,
  StockMovement,
} from "@/types/inventory.types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);

export async function getInventoryItems(): Promise<InventoryItem[]> {
  return inventoryItemsMock;
}

export async function getInventoryBusinesses(): Promise<Array<{ id: string; name: string; count: number; hasAttention: boolean }>> {
  const businessMap = new Map<string, { id: string; name: string; count: number; hasAttention: boolean }>();

  inventoryItemsMock.forEach((item) => {
    const current = businessMap.get(item.businessId) ?? {
      id: item.businessId,
      name: item.businessName,
      count: 0,
      hasAttention: false,
    };

    businessMap.set(item.businessId, {
      ...current,
      count: current.count + 1,
      hasAttention:
        current.hasAttention ||
        item.status === "low_stock" ||
        item.status === "out_of_stock" ||
        item.payoutPending > 0,
    });
  });

  return Array.from(businessMap.values());
}

export async function getInventoryItemsByBusinessId(businessId: string): Promise<InventoryItem[]> {
  return inventoryItemsMock.filter((item) => item.businessId === businessId);
}

export async function getInventoryItemById(id: string): Promise<InventoryItem | undefined> {
  return inventoryItemsMock.find((item) => item.id === id);
}

export async function getStockMovements(): Promise<StockMovement[]> {
  return stockMovementsMock;
}

export async function getInventoryAlerts(): Promise<InventoryAlert[]> {
  return inventoryAlertsMock;
}

export async function getCatalogItems(): Promise<CatalogItem[]> {
  return catalogItemsMock;
}

export async function getMarketplaceListedItems(): Promise<InventoryItem[]> {
  return inventoryItemsMock.filter((item) => item.listedInMarketplace);
}

export async function getItemsWithPendingPayout(): Promise<InventoryItem[]> {
  return inventoryItemsMock.filter((item) => item.payoutPending > 0);
}

export async function getInventoryKpis(itemsInput?: InventoryItem[]): Promise<InventoryKpi[]> {
  const items = itemsInput ?? (await getInventoryItems());
  if (items.length === 0) {
    return inventoryKpisMock;
  }

  const totalSku = items.length;
  const lowStockCount = items.filter((item) => item.status === "low_stock" || item.status === "out_of_stock").length;
  const marketplaceListed = items.filter((item) => item.listedInMarketplace).length;
  const pendingPayouts = Math.round(items.reduce((total, item) => total + item.payoutPending, 0));

  return [
    {
      id: "total_sku",
      label: "Total productos",
      value: totalSku,
      formattedValue: String(totalSku),
      hint: "Items de negocios intermediados",
    },
    {
      id: "low_stock",
      label: "Bajo stock",
      value: lowStockCount,
      formattedValue: String(lowStockCount),
      hint: "Requieren seguimiento operativo",
    },
    {
      id: "marketplace_listed",
      label: "Marketplace",
      value: marketplaceListed,
      formattedValue: String(marketplaceListed),
      hint: "Publicados o listos para venta",
    },
    {
      id: "pending_payouts",
      label: "Liquidaciones",
      value: pendingPayouts,
      formattedValue: formatCurrency(pendingPayouts),
      hint: "Pendientes por negocio",
    },
  ];
}

export async function getInventoryProxyKpis(itemsInput?: InventoryItem[]): Promise<InventoryKpi[]> {
  return getInventoryKpis(itemsInput);
}
