import { Plus } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import SectionCard from "@/components/common/SectionCard";
import OrderActivityPanel from "./components/OrderActivityPanel";
import OrderDetailPanel from "./components/OrderDetailPanel";
import OrderFulfillmentPanel from "./components/OrderFulfillmentPanel";
import OrdersFilters from "./components/OrdersFilters";
import OrdersKpiCards from "./components/OrdersKpiCards";
import OrdersTable from "./components/OrdersTable";
import { useOrders } from "./hooks/useOrders";

export default function OrdersPage() {
  const {
    activities,
    businessFilter,
    businessOptions,
    channelFilter,
    channelOptions,
    clearFilters,
    filteredOrders,
    isLoading,
    kpis,
    paymentFilter,
    paymentOptions,
    searchText,
    selectedOrder,
    selectedOrderActivities,
    selectedOrderId,
    setBusinessFilter,
    setChannelFilter,
    setPaymentFilter,
    setSearchText,
    setSelectedOrderId,
    setStatusFilter,
    statusFilter,
    statusOptions,
  } = useOrders();

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      <PageIntro
        title="Pedidos"
        description="Centraliza los pedidos de todos los negocios intermediados y da seguimiento a preparación, entrega y cobro."
        actions={
          <button
            type="button"
            disabled
            className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white opacity-80"
          >
            <Plus className="h-4 w-4" />
            Nuevo pedido
          </button>
        }
      />

      <OrdersKpiCards kpis={kpis} />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start">
        <SectionCard title="Centro operativo de pedidos">
          <OrdersFilters
            searchText={searchText}
            onSearchTextChange={setSearchText}
            businessFilter={businessFilter}
            onBusinessFilterChange={setBusinessFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            paymentFilter={paymentFilter}
            onPaymentFilterChange={setPaymentFilter}
            channelFilter={channelFilter}
            onChannelFilterChange={setChannelFilter}
            onClearFilters={clearFilters}
            businessOptions={businessOptions}
            statusOptions={statusOptions}
            paymentOptions={paymentOptions}
            channelOptions={channelOptions}
          />
          {isLoading ? (
            <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-6 text-sm text-[#42493f]">
              Cargando pedidos centralizados...
            </div>
          ) : (
            <OrdersTable orders={filteredOrders} selectedOrderId={selectedOrderId} onSelectOrder={setSelectedOrderId} />
          )}
        </SectionCard>

        <div className="min-w-0 space-y-4">
          <OrderDetailPanel order={selectedOrder} />
          <OrderFulfillmentPanel order={selectedOrder} />
        </div>
      </div>

      <OrderActivityPanel activities={selectedOrderActivities.length > 0 ? selectedOrderActivities : activities} />
    </div>
  );
}
