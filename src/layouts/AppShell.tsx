import type { ComponentType } from "react";
import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  BriefcaseBusiness,
  CircleHelp,
  ClipboardList,
  House,
  Menu,
  Package,
  Search,
  Settings,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";

type NavItem = {
  to?: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  disabled?: boolean;
};

const primaryNav: NavItem[] = [
  { to: "/", label: "Inicio", icon: House },
  { to: "/businesses", label: "Emprendimientos", icon: BriefcaseBusiness },
  { to: "/inventory", label: "Productos", icon: Package },
  { to: "/orders", label: "Pedidos", icon: ClipboardList },
  { to: "/finance", label: "Mi dinero", icon: WalletCards },
];

const growthNav: NavItem[] = [
  { to: "/ai-assistant", label: "Asistente", icon: Sparkles },
];

const utilityNav: NavItem[] = [
  { to: "/settings", label: "Configuración", icon: Settings },
  { label: "Ayuda", icon: CircleHelp, disabled: true },
];

function SidebarItem({
  item,
  closeMobile,
  end = false,
}: {
  item: NavItem;
  closeMobile?: () => void;
  end?: boolean;
}) {
  const Icon = item.icon;

  if (!item.to || item.disabled) {
    return (
      <button
        type="button"
        disabled
        className="flex h-11 w-full items-center gap-3 rounded-[10px] px-3 text-left text-sm font-medium text-white opacity-70"
      >
        <Icon className="h-5 w-5 shrink-0" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      end={end}
      onClick={closeMobile}
      className={({ isActive }) =>
        "flex h-11 items-center gap-3 rounded-[10px] px-3 text-sm font-medium transition-colors duration-150 " +
        (isActive
          ? "bg-[#135C2F] text-white"
          : "text-white hover:bg-white/8 hover:text-white")
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{item.label}</span>
    </NavLink>
  );
}

function Sidebar({ closeMobile }: { closeMobile?: () => void }) {
  return (
    <div className="peek-sidebar flex h-full flex-col px-4 pb-5 pt-7">
      <div className="mb-4 flex h-12 items-center px-1">
        <img
          src={import.meta.env.BASE_URL + "brand/maak-logo-white.svg"}
          alt="MÁAK"
          className="h-8 w-auto max-w-[154px] object-contain"
        />
      </div>

      <nav className="space-y-1">
        {primaryNav.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            closeMobile={closeMobile}
            end={item.to === "/"}
          />
        ))}
      </nav>

      <div className="my-3">
        <div className="mb-2 h-px bg-[#285B39]" />
        <p className="text-[10px] font-semibold tracking-[0.14em] text-white/80">
          CRECIMIENTO
        </p>
      </div>

      <nav className="space-y-1">
        {growthNav.map((item) => (
          <SidebarItem key={item.label} item={item} closeMobile={closeMobile} />
        ))}
      </nav>

      <div className="flex-1" />

      <nav className="space-y-1">
        {utilityNav.map((item) => (
          <SidebarItem key={item.label} item={item} closeMobile={closeMobile} />
        ))}
      </nav>
    </div>
  );
}

function GlobalAssistantShortcut() {
  return (
    <Link
      to="/ai-assistant"
      aria-label="Abrir asistente MÁAK"
      className="peek-dark-surface fixed bottom-6 right-6 z-30 flex min-h-[82px] min-w-[272px] items-center gap-[14px] rounded-[42px] bg-[#022601] px-[20px] py-[16px] text-white shadow-[0_12px_32px_rgba(0,30,8,0.28)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_38px_rgba(0,30,8,0.32)] max-sm:bottom-4 max-sm:right-4 max-sm:min-w-[258px] max-sm:px-[18px]"
    >
      <span className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full bg-white/8">
        <Sparkles className="h-[25px] w-[25px] text-white" />
      </span>
      <span className="min-w-0 text-left text-white">
        <span className="block whitespace-nowrap text-[17px] font-semibold leading-[1.05] text-white">
          ¿Necesitas ayuda?
        </span>
        <span className="mt-[6px] block whitespace-nowrap text-[12px] font-medium leading-none text-white/90">
          Pregúntale a MÁAK
        </span>
      </span>
    </Link>
  );
}

function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="flex h-[74px] items-center gap-3 px-4 md:px-5 lg:px-6">
      <button
        type="button"
        onClick={onMenu}
        aria-label="Abrir menú"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-white/10 text-white md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative min-w-0 flex-1 md:max-w-[700px]">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#667068]" />
        <input
          type="search"
          placeholder="Buscar emprendimientos, productos o pedidos..."
          className="h-[44px] w-full rounded-full border-0 bg-[#F5F6F1] pl-11 pr-4 text-sm text-[#17231B] outline-none ring-1 ring-transparent transition focus:ring-[#9AC84B]"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          type="button"
          aria-label="Notificaciones"
          className="relative grid h-10 w-10 place-items-center rounded-full bg-white text-[#2D3A31]"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#E85D5D]" />
        </button>

        <div className="grid h-10 w-10 place-items-center rounded-full bg-[#E6F1E4] text-xs font-bold text-[#073B1E]">
          DF
        </div>
      </div>
    </header>
  );
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isProductDetail = /^\/inventory\/[^/]+\/?$/.test(location.pathname);

  return (
    <div className="min-h-screen bg-[#022601] text-[#17231B]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[216px] bg-[#022601] md:block">
        <Sidebar />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/45"
          />
          <aside className="relative h-full w-[232px] bg-[#022601] shadow-2xl">
            <button
              type="button"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg text-white/80 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar closeMobile={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="md:ml-[216px]">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="min-h-[calc(100vh-74px)] rounded-tl-[34px] bg-[#FFF9F8] px-4 py-6 sm:px-5 md:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <Outlet />
          </div>
        </main>
      </div>

      {!isProductDetail ? <GlobalAssistantShortcut /> : null}
    </div>
  );
}
