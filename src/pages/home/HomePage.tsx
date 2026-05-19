import { Link } from "react-router-dom";
import { ArrowUpRight, Building2, ClipboardList, Plus, Store, WalletCards } from "lucide-react";
import PageIntro from "@/components/common/PageIntro";
import BusinessAttentionPanel from "./components/BusinessAttentionPanel";
import CriticalInventoryPanel from "./components/CriticalInventoryPanel";
import HomeOperationsTimeline from "./components/HomeOperationsTimeline";
import PendingPayoutsPanel from "./components/PendingPayoutsPanel";
import ProxyAssistantPanel from "./components/ProxyAssistantPanel";
import ProxyHomeKpiCards from "./components/ProxyHomeKpiCards";
import UrgentOrdersPanel from "./components/UrgentOrdersPanel";
import { useProxyHome } from "./hooks/useProxyHome";

const quickLinks = [
  { label: "Ver negocios", to: "/businesses", icon: Building2 },
  { label: "Ver pedidos", to: "/orders", icon: ClipboardList },
  { label: "Ver inventario", to: "/inventory", icon: Store },
  { label: "Ver finanzas", to: "/finance/summary", icon: WalletCards },
];

export default function HomePage() {
  const {
    isLoading,
    kpis,
    urgentOrders,
    businessesNeedingAttention,
    criticalInventory,
    pendingPayouts,
    recommendations,
    activityTimeline,
    formatCurrency,
    formatDate,
  } = useProxyHome();

  return (
    <div className="w-full max-w-full space-y-5 overflow-hidden">
      <PageIntro
        title="Panel del intermediario"
        description="Administra negocios aliados, pedidos, inventario y liquidaciones desde una sola operacion."
        actions={
          <>
            <Link
              to="/businesses"
              className="inline-flex items-center gap-2 rounded-lg border border-[#c2c9bc] bg-white px-4 py-2 text-sm font-semibold text-[#1a1c18] hover:bg-[#f3f4ed]"
            >
              <Building2 className="h-4 w-4" />
              Agregar negocio
            </Link>
            <Link
              to="/orders"
              className="inline-flex items-center gap-2 rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3E5902]"
            >
              <Plus className="h-4 w-4" />
              Nuevo pedido
            </Link>
          </>
        }
      />

      {isLoading ? (
        <div className="rounded-lg border border-[#c2c9bc] bg-white p-6 text-sm text-[#42493f]">Cargando operacion...</div>
      ) : (
        <>
          <ProxyHomeKpiCards kpis={kpis} />

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px] xl:items-start">
            <main className="min-w-0 space-y-4">
              <UrgentOrdersPanel orders={urgentOrders} formatCurrency={formatCurrency} formatDate={formatDate} />
              <CriticalInventoryPanel items={criticalInventory} />
              <HomeOperationsTimeline items={activityTimeline} formatDate={formatDate} />
            </main>

            <aside className="min-w-0 space-y-4">
              <BusinessAttentionPanel businesses={businessesNeedingAttention} formatCurrency={formatCurrency} />
              <PendingPayoutsPanel payouts={pendingPayouts} formatCurrency={formatCurrency} formatDate={formatDate} />
              <ProxyAssistantPanel recommendations={recommendations} />
            </aside>
          </div>

          <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Accesos rapidos</h2>
              <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
                Operacion Intermediario
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="group flex items-center justify-between rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm font-semibold text-[#1a1c18] hover:border-[#799833] hover:bg-[#f3f4ed]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#4F7302]">
                        <Icon className="h-4 w-4" />
                      </span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[#799833] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                );
              })}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
