import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  ClipboardList,
  Package,
  Store,
  WalletCards,
} from "lucide-react";
import BusinessAttentionPanel from "./components/BusinessAttentionPanel";
import CriticalInventoryPanel from "./components/CriticalInventoryPanel";
import HomeOperationsTimeline from "./components/HomeOperationsTimeline";
import PendingPayoutsPanel from "./components/PendingPayoutsPanel";
import ProxyAssistantPanel from "./components/ProxyAssistantPanel";
import ProxyHomeKpiCards from "./components/ProxyHomeKpiCards";
import UrgentOrdersPanel from "./components/UrgentOrdersPanel";
import { useProxyHome } from "./hooks/useProxyHome";

const quickLinks = [
  { label: "Ver emprendimientos", to: "/businesses", icon: Building2, helper: "Acompaña emprendimientos locales" },
  { label: "Ver pedidos", to: "/orders", icon: ClipboardList, helper: "Revisa pedidos y entregas" },
  { label: "Ver productos", to: "/inventory", icon: Store, helper: "Controla stock por emprendimiento" },
  { label: "Ver mi dinero", to: "/finance/summary", icon: WalletCards, helper: "Ventas y liquidaciones" },
];

function HomeSkeleton() {
  return (
    <div className="animate-pulse space-y-5">
      <div className="h-16 rounded-2xl bg-[#EEF1EB]" />
      <div className="h-24 rounded-[20px] bg-[#E8EEE5]" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {[0, 1, 2, 3, 4].map((item) => (
          <div key={item} className="h-36 rounded-[24px] bg-[#F3F3EE]" />
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="space-y-5">
          <div className="h-64 rounded-[24px] bg-[#F3F3EE]" />
          <div className="h-64 rounded-[24px] bg-[#F3F3EE]" />
          <div className="h-64 rounded-[24px] bg-[#F3F3EE]" />
        </div>
        <div className="space-y-5">
          <div className="h-56 rounded-[24px] bg-[#F3F3EE]" />
          <div className="h-56 rounded-[24px] bg-[#F3F3EE]" />
          <div className="h-56 rounded-[24px] bg-[#F3F3EE]" />
        </div>
      </div>
    </div>
  );
}

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

  if (isLoading) return <HomeSkeleton />;

  return (
    <div className="space-y-5 pb-4">
      <section className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[34px] font-bold leading-tight text-[#17231B] sm:text-[40px]">
            Operador comunitario
          </h1>
          <p className="mt-1 text-sm text-[#68736B]">
            Resumen de la operación de los emprendimientos de tu comunidad
          </p>
        </div>

        <span className="inline-flex h-10 w-fit items-center gap-2 rounded-xl border border-[#DFE4DA] bg-white px-4 text-xs font-medium text-[#425047]">
          <CalendarDays className="h-4 w-4" />
          Resumen operativo
        </span>
      </section>

      <section className="peek-dark-surface w-full overflow-hidden rounded-[20px] bg-[#022601] px-[22px] py-[21px] text-white">
        <div className="flex min-h-[55px] w-full flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-[23px]">
            <div className="flex h-[54px] w-[109px] shrink-0 -space-x-[27px]" aria-hidden="true">
              {[
                "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=220&h=220&q=82",
                "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=220&h=220&q=82",
                "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=220&h=220&q=82",
              ].map((src, index) => (
                <div
                  key={src}
                  className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border-2 border-[#B6E251] bg-[#E6ECE8] shadow-[0_4px_14px_rgba(0,0,0,0.18)]"
                  style={{ zIndex: index + 1 }}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>

            <div className="min-w-0">
              <h2 className="text-[20px] font-black leading-none tracking-[0.045em] text-white">
                Mantén cada emprendimiento en movimiento
              </h2>
              <p className="mt-2 max-w-[760px] text-[14px] font-bold leading-[1.2] tracking-[0.025em] text-white">
                Centraliza pedidos, inventario, ventas y liquidaciones para reaccionar antes de que una operación se detenga.
              </p>
            </div>
          </div>

          <Link
            to="/businesses"
            className="inline-flex shrink-0 items-center gap-2 self-start whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.1em] text-white lg:self-center"
          >
            Revisar emprendimientos
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>

      <ProxyHomeKpiCards kpis={kpis} />

      <section className="grid items-start gap-5 xl:grid-cols-[1.55fr_1fr]">
        <div className="min-w-0 space-y-5">
          <UrgentOrdersPanel orders={urgentOrders} formatCurrency={formatCurrency} formatDate={formatDate} />
          <CriticalInventoryPanel items={criticalInventory} />
          <HomeOperationsTimeline items={activityTimeline} formatDate={formatDate} />
        </div>

        <div className="min-w-0 space-y-5">
          <BusinessAttentionPanel businesses={businessesNeedingAttention} formatCurrency={formatCurrency} />
          <PendingPayoutsPanel payouts={pendingPayouts} formatCurrency={formatCurrency} formatDate={formatDate} />
          <ProxyAssistantPanel recommendations={recommendations} />
        </div>
      </section>

      <section className="rounded-[24px] border border-[#E2E6DF] bg-white p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-[#17231B]">Accesos rápidos</h2>
            <p className="mt-1 text-[11px] text-[#87918A]">
              Entra directo a las áreas que concentran la operación diaria.
            </p>
          </div>
          <span className="rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]">
            Operación central
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                className="group flex min-h-[94px] items-center gap-3 rounded-[18px] border border-transparent bg-[#FAFAF7] p-4 transition hover:-translate-y-0.5 hover:border-[#DDE6D8] hover:bg-white"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EDF4E8] text-[#2E7439]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-[13px] font-semibold text-[#344039]">{link.label}</strong>
                  <small className="mt-1 block text-[10px] leading-4 text-[#87918A]">{link.helper}</small>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-[#98A29B] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
