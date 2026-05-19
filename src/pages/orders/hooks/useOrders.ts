import { useEffect, useMemo, useState } from "react";
import { getOrderActivities, getOrderKpis, getOrders, getUrgentOrders } from "@/services/orders.service";
import type { Order, OrderActivity, OrderChannel, OrderKpi, OrderStatus, PaymentStatus } from "@/types/order.types";

export type OrderBusinessFilter = string | "all";
export type OrderStatusFilter = OrderStatus | "all";
export type PaymentStatusFilter = PaymentStatus | "all";
export type OrderChannelFilter = OrderChannel | "all";

export const orderStatusOptions: Array<{ value: OrderStatusFilter; label: string }> = [
  { value: "all", label: "Todos los estados" },
  { value: "new", label: "Nuevo" },
  { value: "confirmed", label: "Confirmado" },
  { value: "preparing", label: "En preparación" },
  { value: "ready_for_delivery", label: "Listo para entrega" },
  { value: "in_delivery", label: "En reparto" },
  { value: "delivered", label: "Entregado" },
  { value: "canceled", label: "Cancelado" },
];

export const paymentStatusOptions: Array<{ value: PaymentStatusFilter; label: string }> = [
  { value: "all", label: "Todos los pagos" },
  { value: "pending", label: "Pendiente" },
  { value: "paid", label: "Pagado" },
  { value: "partial", label: "Parcial" },
  { value: "overdue", label: "Vencido" },
  { value: "refunded", label: "Reembolsado" },
];

export const orderChannelOptions: Array<{ value: OrderChannelFilter; label: string }> = [
  { value: "all", label: "Todos los canales" },
  { value: "marketplace", label: "Marketplace" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "phone", label: "Teléfono" },
  { value: "direct", label: "Directo" },
  { value: "cooperative", label: "Cooperativo" },
  { value: "social_media", label: "Redes sociales" },
];

export function useOrders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [kpis, setKpis] = useState<OrderKpi[]>([]);
  const [activities, setActivities] = useState<OrderActivity[]>([]);
  const [urgentOrders, setUrgentOrders] = useState<Order[]>([]);
  const [searchText, setSearchText] = useState("");
  const [businessFilter, setBusinessFilter] = useState<OrderBusinessFilter>("all");
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
  const [paymentFilter, setPaymentFilter] = useState<PaymentStatusFilter>("all");
  const [channelFilter, setChannelFilter] = useState<OrderChannelFilter>("all");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      setIsLoading(true);
      const [ordersData, kpisData, activitiesData, urgentData] = await Promise.all([
        getOrders(),
        getOrderKpis(),
        getOrderActivities(),
        getUrgentOrders(),
      ]);
      if (!mounted) return;
      setOrders(ordersData);
      setKpis(kpisData);
      setActivities(activitiesData);
      setUrgentOrders(urgentData);
      setSelectedOrderId((prev) => prev ?? ordersData[0]?.id ?? null);
      setIsLoading(false);
    };

    void loadData();
    return () => {
      mounted = false;
    };
  }, []);

  const businessOptions = useMemo(() => {
    const unique = Array.from(new Map(orders.map((order) => [order.businessId, order.businessName])).entries());
    return [{ value: "all", label: "Todos los negocios" }, ...unique.map(([value, label]) => ({ value, label }))];
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const term = searchText.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesText =
        term.length === 0 ||
        order.folio.toLowerCase().includes(term) ||
        order.customerName.toLowerCase().includes(term) ||
        order.customerPhone.toLowerCase().includes(term) ||
        order.businessName.toLowerCase().includes(term) ||
        order.items.some((item) => item.productName.toLowerCase().includes(term));

      const matchesBusiness = businessFilter === "all" || order.businessId === businessFilter;
      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter;
      const matchesChannel = channelFilter === "all" || order.channel === channelFilter;

      return matchesText && matchesBusiness && matchesStatus && matchesPayment && matchesChannel;
    });
  }, [businessFilter, channelFilter, orders, paymentFilter, searchText, statusFilter]);

  useEffect(() => {
    if (filteredOrders.length === 0) {
      setSelectedOrderId(null);
      return;
    }
    const selectedStillVisible = filteredOrders.some((order) => order.id === selectedOrderId);
    if (!selectedStillVisible) setSelectedOrderId(filteredOrders[0].id);
  }, [filteredOrders, selectedOrderId]);

  const selectedOrder = useMemo(
    () => filteredOrders.find((order) => order.id === selectedOrderId) ?? null,
    [filteredOrders, selectedOrderId],
  );

  const selectedOrderActivities = useMemo(() => {
    if (!selectedOrder) return [];
    return activities.filter((activity) => activity.orderId === selectedOrder.id).slice(0, 4);
  }, [activities, selectedOrder]);

  const visibleActivities = useMemo(() => activities.slice(0, 6), [activities]);

  const clearFilters = () => {
    setSearchText("");
    setBusinessFilter("all");
    setStatusFilter("all");
    setPaymentFilter("all");
    setChannelFilter("all");
  };

  return {
    isLoading,
    orders,
    filteredOrders,
    kpis,
    activities: visibleActivities,
    urgentOrders,
    selectedOrder,
    selectedOrderActivities,
    selectedOrderId,
    setSelectedOrderId,
    searchText,
    setSearchText,
    businessFilter,
    setBusinessFilter,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    channelFilter,
    setChannelFilter,
    clearFilters,
    businessOptions,
    statusOptions: orderStatusOptions,
    paymentOptions: paymentStatusOptions,
    channelOptions: orderChannelOptions,
  };
}
