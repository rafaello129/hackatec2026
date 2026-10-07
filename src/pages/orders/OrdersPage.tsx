import { Plus } from "lucide-react";
import OrderActivityPanel from "./components/OrderActivityPanel";
import OrderAttentionPanel from "./components/OrderAttentionPanel";
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
    urgentOrders,
  } = useOrders();

  return (
    <div className="space-y-5 pb-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#172019]">
            Pedidos
          </h1>
          <p className="mt-2 text-[13px] text-[#657068]">
            Revisa qué pedidos entraron, cuáles necesitan atención y cómo avanza cada entrega.
          </p>
        </div>

        <button
          type="button"
          disabled
          className="inline-flex h-11 w-fit cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#073B1E] px-5 text-[12px] font-semibold text-white opacity-80"
        >
          <Plus className="h-4 w-4" />
          Nuevo pedido
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
      ) : (
        <>
          <OrdersKpiCards kpis={kpis} />

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.9fr)_360px]">
            <section className="rounded-[24px] border border-[#E1E6DE] bg-white p-5 transition-shadow duration-300 hover:shadow-[0_16px_42px_rgba(23,35,27,0.05)] sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-[17px] font-semibold text-[#172019]">Mis pedidos</h2>
                  <p className="mt-1 text-[11px] text-[#7B867E]">
                    {filteredOrders.length} {filteredOrders.length === 1 ? "pedido" : "pedidos"}
                  </p>
                </div>
              </div>

              <div className="mt-5">
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
              </div>

              <div className="mt-5">
                <OrdersTable
                  orders={filteredOrders}
                  selectedOrderId={selectedOrderId}
                  onSelectOrder={setSelectedOrderId}
                />
              </div>
            </section>

            <aside className="min-w-0 space-y-4">
              <OrderAttentionPanel
                orders={urgentOrders}
                onSelectOrder={setSelectedOrderId}
              />
              <OrderActivityPanel
                activities={selectedOrderActivities.length > 0 ? selectedOrderActivities : activities}
              />
            </aside>
          </section>

          <section className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <OrderDetailPanel order={selectedOrder} />
            <OrderFulfillmentPanel order={selectedOrder} />
          </section>
        </>
      )}
    </div>
  );
}
