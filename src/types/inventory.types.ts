export type InventoryStatus =
  | "in_stock"
  | "low_stock"
  | "out_of_stock"
  | "reserved"
  | "discontinued";

export type InventoryCategory =
  | "raw_material"
  | "finished_product"
  | "service"
  | "packaging"
  | "equipment"
  | "digital";

export type CooperativeUseCase =
  | "compra_conjunta"
  | "venta_conjunta"
  | "campana_compartida"
  | "reparticion_bienes"
  | "soporte_post_acuerdo"
  | "no_aplica";

export type InventoryBusinessFilter = string | "all";

export type MarketplaceListingStatus =
  | "listed"
  | "not_listed"
  | "paused"
  | "pending_review";

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: InventoryCategory;
  description: string;
  quantity: number;
  unit: string;
  minStock: number;
  maxStock: number;
  status: InventoryStatus;
  estimatedValue: number;
  businessId: string;
  businessName: string;
  ownerName: string;
  supplier: string;
  preferredSupplier: string;
  location: string;
  lastUpdated: string;
  tags: string[];
  commissionEligible: boolean;
  commissionRate: number;
  listedInMarketplace: boolean;
  marketplaceStatus: MarketplaceListingStatus;
  payoutPending: number;
  pendingOrders: number;
  lastOrderDate: string | null;
  availableForCooperative: boolean;
  cooperativeUseCase: CooperativeUseCase;
  bulkPurchaseEligible: boolean;
  minimumBulkQuantity: number;
}

export interface StockMovement {
  id: string;
  itemId: string;
  type: "entrada" | "salida" | "ajuste" | "reserva";
  quantity: number;
  reason: string;
  date: string;
  responsible: string;
}

export interface InventoryAlert {
  id: string;
  itemId: string;
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  recommendation: string;
}

export interface InventoryKpi {
  id:
    | "total_sku"
    | "low_stock"
    | "estimated_value"
    | "recent_movements"
    | "marketplace_listed"
    | "pending_payouts";
  label: string;
  value: number;
  formattedValue: string;
  hint: string;
}

export interface CatalogItem {
  id: string;
  sourceItemId: string;
  name: string;
  kind: "product" | "service";
  category: InventoryCategory;
  availabilityStatus: "available" | "limited" | "on_demand";
  estimatedPrice: number;
  unit: string;
  businessId: string;
  businessName: string;
  commissionRate: number;
  marketplaceStatus: MarketplaceListingStatus;
  payoutPending: number;
  availableForCooperative: boolean;
  cooperativeUseCase: CooperativeUseCase;
  bulkPurchaseEligible: boolean;
  minimumBulkQuantity: number;
}
