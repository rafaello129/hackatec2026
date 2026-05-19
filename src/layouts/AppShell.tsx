import type { ComponentType } from "react";
import { useMemo, useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  Bot,
  BriefcaseBusiness,
  ClipboardList,
  House,
  LayoutGrid,
  LifeBuoy,
  Menu,
  Package,
  Search,
  Settings,
  X,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { to: "/", label: "Home", icon: House },
  { to: "/businesses", label: "Negocios", icon: BriefcaseBusiness },
  { to: "/inventory", label: "Inventario", icon: Package },
  { to: "/orders", label: "Pedidos", icon: ClipboardList },
  { to: "/finance", label: "Finanzas", icon: LayoutGrid },
  { to: "/ai-assistant", label: "Asistente IA", icon: Bot },
];

const utilityNavItems: NavItem[] = [{ to: "/settings", label: "Configuración", icon: Settings }];
const allNavItems = [...navItems, ...utilityNavItems];

const baseNavItem =
  "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors";

function SidebarNavLink({ item, closeMobile, end = false }: { item: NavItem; closeMobile?: () => void; end?: boolean }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      onClick={closeMobile}
      end={end}
      className={({ isActive }) =>
        `${baseNavItem} ${
          isActive ? "bg-[#0f3a0f] text-white" : "text-white/75 hover:bg-white/10 hover:text-white"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r ${
              isActive ? "bg-[#799833]" : "bg-transparent"
            }`}
          />
          <Icon className="h-4 w-4 shrink-0" />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

function SidebarContent({ closeMobile }: { closeMobile?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-white/10 px-5 pb-5 pt-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#D6D979]/35 bg-[#0f3a0f]">
            <span className="block h-7 w-7 overflow-hidden">
              <img src="/Vector.svg" alt="péek" className="h-full w-auto max-w-none" />
            </span>
          </span>
          <div>
            <p className="font-['Hanken_Grotesk'] text-xl font-bold text-white">péek</p>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-white/70">
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} item={item} closeMobile={closeMobile} end={item.to === "/"} />
        ))}
      </nav>

      <div className="space-y-1 border-t border-white/10 px-3 py-4">
        {utilityNavItems.map((item) => (
          <SidebarNavLink key={item.to} item={item} closeMobile={closeMobile} />
        ))}
        <button
          type="button"
          disabled
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white/65"
        >
          <LifeBuoy className="h-4 w-4" />
          Soporte
        </button>
      </div>
    </div>
  );
}

export default function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const sectionLabel = useMemo(() => {
    const matched = allNavItems.find((item) =>
      item.to === "/"
        ? location.pathname === "/"
        : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`),
    );
    return matched?.label ?? "Panel";
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f9faf3] text-[#1a1c18]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[272px] border-r border-white/10 bg-[#022601] md:block">
        <SidebarContent />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-[#000a00]/55"
          />
          <aside className="relative h-full w-[272px] border-r border-white/10 bg-[#022601]">
            <SidebarContent closeMobile={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      <div className="md:ml-[272px]">
        <header className="sticky top-0 z-30 border-b border-[#c2c9bc] bg-[#f9faf3]/95 backdrop-blur">
          <div className="flex h-16 items-center gap-3 px-4 md:px-8">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c2c9bc] bg-white text-[#1a1c18] md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden items-center gap-2 text-sm text-[#42493f] md:flex">
              <span>péek</span>
              <span className="text-[#73796e]">/</span>
              <span className="font-medium text-[#1a1c18]">{sectionLabel}</span>
            </div>

            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder={`Buscar en ${sectionLabel.toLowerCase()}...`}
                className="h-11 w-full rounded-full border border-[#c2c9bc] bg-[#f3f4ed] px-4 pl-10 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302] focus:ring-2 focus:ring-[#4F7302]/20"
              />
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[#42493f]">
                <Search className="h-4 w-4" />
              </span>
            </div>

            <button
              type="button"
              className="hidden rounded-lg bg-[#4F7302] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3E5902] md:inline-flex"
            >
              Acción rápida
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c2c9bc] bg-white text-[#42493f]"
            >
              <Bell className="h-4 w-4" />
            </button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#c2c9bc] bg-white text-xs font-semibold text-[#1a1c18]"
            >
              DF
            </button>
            {mobileOpen ? (
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#c2c9bc] bg-white text-[#1a1c18] md:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            ) : null}
          </div>
        </header>

        <main className="px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-[1440px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
