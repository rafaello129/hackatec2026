import { useEffect, useMemo, useState } from "react";
import {
  getBusinessActivities,
  getBusinessKpis,
  getBusinesses,
} from "@/services/businesses.service";
import {
  getOrderActivities,
  getOrderKpis,
  getOrders,
  getUrgentOrders,
} from "@/services/orders.service";
import {
  getInventoryAlerts,
  getInventoryItems,
  getInventoryProxyKpis,
  getStockMovements,
} from "@/services/inventory.service";
import type { BusinessActivity, BusinessKpi, IntermediatedBusiness } from "@/types/business.types";
import type { InventoryAlert, InventoryItem, InventoryKpi, StockMovement } from "@/types/inventory.types";
import type { Order, OrderActivity, OrderKpi } from "@/types/order.types";

export interface ProxyHomeKpi {
  id: string;
  label: string;
  value: string;
  hint: string;
  tone: "success" | "warning" | "neutral";
}

export interface CriticalInventoryItem {
  item: InventoryItem;
  alert?: InventoryAlert;
  recommendation: string;
}

export interface PendingPayout {
  businessId: string;
  businessName: string;
  amount: number;
  commissionRate: number;
  status: "pendiente" | "programada" | "revision";
  estimatedDate: string;
}

export interface ProxyRecommendation {
  id: string;
  title: string;
  description: string;
  action: string;
}

export interface HomeTimelineItem {
  id: string;
  title: string;
  description: string;
  date: string;
  source: "Negocios" | "Pedidos" | "Inventario";
}

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const formatDate = (dateISO: string) =>
  new Date(`${dateISO}T00:00:00`).toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "short",
  });

const byDateDesc = <T extends { date: string }>(a: T, b: T) => b.date.localeCompare(a.date);

export function useProxyHome() {
  const [isLoading, setIsLoading] = useState(true);
  const [businesses, setBusinesses] = useState<IntermediatedBusiness[]>([]);
  const [businessKpis, setBusinessKpis] = useState<BusinessKpi[]>([]);
  const [businessActivities, setBusinessActivities] = useState<BusinessActivity[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [urgentOrdersRaw, setUrgentOrdersRaw] = useState<Order[]>([]);
  const [orderKpis, setOrderKpis] = useState<OrderKpi[]>([]);
  const [orderActivities, setOrderActivities] = useState<OrderActivity[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [inventoryAlerts, setInventoryAlerts] = useState<InventoryAlert[]>([]);
  const [inventoryKpis, setInventoryKpis] = useState<InventoryKpi[]>([]);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      setIsLoading(true);
      const [
        businessData,
        businessKpiData,
        businessActivityData,
        orderData,
        urgentOrderData,
        orderKpiData,
        orderActivityData,
        inventoryData,
        alertData,
        inventoryKpiData,
        movementData,
      ] = await Promise.all([
        getBusinesses(),
        getBusinessKpis(),
        getBusinessActivities(),
        getOrders(),
        getUrgentOrders(),
        getOrderKpis(),
        getOrderActivities(),
        getInventoryItems(),
        getInventoryAlerts(),
        getInventoryProxyKpis(),
        getStockMovements(),
      ]);

      if (!mounted) {
        return;
      }

      setBusinesses(businessData);
      setBusinessKpis(businessKpiData);
      setBusinessActivities(businessActivityData);
      setOrders(orderData);
      setUrgentOrdersRaw(urgentOrderData);
      setOrderKpis(orderKpiData);
      setOrderActivities(orderActivityData);
      setInventoryItems(inventoryData);
      setInventoryAlerts(alertData);
      setInventoryKpis(inventoryKpiData);
      setStockMovements(movementData);
      setIsLoading(false);
    };

    void loadData();

    return () => {
      mounted = false;
    };
  }, []);

  const validBusinessIds = useMemo(() => new Set(businesses.map((business) => business.id)), [businesses]);

  const visibleOrders = useMemo(
    () => orders.filter((order) => validBusinessIds.has(order.businessId)),
    [orders, validBusinessIds],
  );

  const urgentOrders = useMemo(
    () => urgentOrdersRaw.filter((order) => validBusinessIds.has(order.businessId)).slice(0, 4),
    [urgentOrdersRaw, validBusinessIds],
  );

  const pendingPayouts = useMemo<PendingPayout[]>(
    () =>
      businesses
        .filter((business) => business.pendingPayout > 0)
        .sort((a, b) => b.pendingPayout - a.pendingPayout)
        .slice(0, 4)
        .map((business, index) => ({
          businessId: business.id,
          businessName: business.name,
          amount: business.pendingPayout,
          commissionRate: business.commissionRate,
          status: index === 0 ? "pendiente" : index === 1 ? "programada" : "revision",
          estimatedDate: index < 2 ? "2026-05-24" : "2026-05-27",
        })),
    [businesses],
  );

  const businessesNeedingAttention = useMemo(
    () =>
      businesses
        .filter(
          (business) =>
            business.status === "needs_attention" ||
            business.status === "onboarding" ||
            business.pendingPayout > 0 ||
            business.pendingOrders >= 5,
        )
        .sort((a, b) => b.pendingOrders + b.pendingPayout / 10000 - (a.pendingOrders + a.pendingPayout / 10000))
        .slice(0, 4),
    [businesses],
  );

  const criticalInventory = useMemo<CriticalInventoryItem[]>(
    () =>
      inventoryItems
        .filter((item) => item.status === "low_stock" || item.status === "out_of_stock" || item.pendingOrders >= 4)
        .slice(0, 5)
        .map((item) => ({
          item,
          alert: inventoryAlerts.find((alert) => alert.itemId === item.id),
          recommendation:
            item.status === "out_of_stock"
              ? "Reponer antes de confirmar nuevos pedidos."
              : item.pendingOrders >= 4
                ? "Reservar stock para pedidos pendientes."
                : "Monitorear minimo y preparar reposicion.",
        })),
    [inventoryAlerts, inventoryItems],
  );

  const estimatedCommission = useMemo(
    () => Math.round(visibleOrders.reduce((sum, order) => sum + order.commission, 0)),
    [visibleOrders],
  );

  const kpis = useMemo<ProxyHomeKpi[]>(() => {
    const activeBusinesses = businessKpis.find((kpi) => kpi.id === "active_businesses")?.formattedValue ?? "0";
    const pendingOrders = businessKpis.find((kpi) => kpi.id === "pending_orders")?.formattedValue ?? "0";
    const managedSales = businessKpis.find((kpi) => kpi.id === "managed_sales")?.formattedValue ?? money.format(0);
    const payouts = businessKpis.find((kpi) => kpi.id === "pending_payouts")?.formattedValue ?? money.format(0);

    return [
      { id: "active_businesses", label: "Negocios activos", value: activeBusinesses, hint: "Representados en operacion", tone: "success" },
      { id: "pending_orders", label: "Pedidos pendientes", value: pendingOrders, hint: "Por confirmar, preparar o entregar", tone: "warning" },
      { id: "managed_sales", label: "Ventas gestionadas", value: managedSales, hint: "Acumulado del mes", tone: "success" },
      { id: "pending_payouts", label: "Liquidaciones", value: payouts, hint: "Pendientes a negocios", tone: "warning" },
      { id: "estimated_commission", label: "Comision estimada", value: money.format(estimatedCommission), hint: "Pedidos visibles del mes", tone: "neutral" },
    ];
  }, [businessKpis, estimatedCommission]);

  const recommendations = useMemo<ProxyRecommendation[]>(() => {
    const attentionBusiness = businessesNeedingAttention[0];
    const lowStockItem = criticalInventory[0]?.item;
    const payout = pendingPayouts[0];

    return [
      {
        id: "rec-001",
        title: attentionBusiness ? `Revisar ${attentionBusiness.name}` : "Priorizar seguimiento operativo",
        description: attentionBusiness
          ? `Tiene ${attentionBusiness.pendingOrders} pedidos pendientes y ${money.format(attentionBusiness.pendingPayout)} por liquidar.`
          : "No hay negocios criticos, mantén revision diaria de pedidos y stock.",
        action: "Ver negocios",
      },
      {
        id: "rec-002",
        title: lowStockItem ? `Inventario critico: ${lowStockItem.name}` : "Inventario estable",
        description: lowStockItem
          ? `${lowStockItem.businessName} requiere accion: ${lowStockItem.quantity} ${lowStockItem.unit} disponibles.`
          : "No hay items criticos visibles para el periodo actual.",
        action: "Ver inventario",
      },
      {
        id: "rec-003",
        title: payout ? "Preparar liquidacion prioritaria" : "Liquidaciones al dia",
        description: payout
          ? `${payout.businessName} concentra ${money.format(payout.amount)} pendiente. Programa confirmacion de pago.`
          : "Las liquidaciones pendientes no requieren escalamiento inmediato.",
        action: "Ver finanzas",
      },
    ];
  }, [businessesNeedingAttention, criticalInventory, pendingPayouts]);

  const activityTimeline = useMemo<HomeTimelineItem[]>(() => {
    const businessItems = businessActivities.map((activity) => ({
      id: `business-${activity.id}`,
      title: activity.title,
      description: activity.description,
      date: activity.date,
      source: "Negocios" as const,
    }));

    const orderItems = orderActivities
      .filter((activity) => {
        const order = visibleOrders.find((visibleOrder) => visibleOrder.id === activity.orderId);
        return Boolean(order);
      })
      .map((activity) => ({
        id: `order-${activity.id}`,
        title: activity.title,
        description: activity.description,
        date: activity.date,
        source: "Pedidos" as const,
      }));

    const inventoryItemsTimeline = stockMovements.slice(0, 5).map((movement) => {
      const item = inventoryItems.find((inventoryItem) => inventoryItem.id === movement.itemId);
      return {
        id: `inventory-${movement.id}`,
        title: `Movimiento de ${movement.type}`,
        description: item ? `${item.businessName}: ${item.name} (${movement.reason})` : movement.reason,
        date: movement.date,
        source: "Inventario" as const,
      };
    });

    return [...businessItems, ...orderItems, ...inventoryItemsTimeline].sort(byDateDesc).slice(0, 7);
  }, [businessActivities, inventoryItems, orderActivities, stockMovements, visibleOrders]);

  return {
    isLoading,
    kpis,
    urgentOrders,
    businessesNeedingAttention,
    criticalInventory,
    pendingPayouts,
    recommendations,
    activityTimeline,
    inventoryKpis,
    orderKpis,
    formatCurrency: money.format,
    formatDate,
  };
}
