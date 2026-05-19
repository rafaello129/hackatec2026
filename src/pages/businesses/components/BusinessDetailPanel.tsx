import { Mail, MapPin, Phone } from "lucide-react";
import type { BusinessActivity, BusinessOnboardingTask, IntermediatedBusiness } from "@/types/business.types";
import BusinessCategoryBadge from "./BusinessCategoryBadge";
import BusinessStatusBadge from "./BusinessStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

export default function BusinessDetailPanel({
  business,
  activities,
  tasks,
}: {
  business: IntermediatedBusiness | null;
  activities: BusinessActivity[];
  tasks: BusinessOnboardingTask[];
}) {
  if (!business) {
    return (
      <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Detalle del negocio</h2>
        <p className="mt-2 text-sm text-[#42493f]">Selecciona un negocio para ver su operación.</p>
      </section>
    );
  }

  const openTasks = tasks.filter((task) => !task.completed).length;

  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate font-['Hanken_Grotesk'] text-xl font-semibold text-[#1a1c18]">{business.name}</h2>
          <p className="mt-1 text-sm text-[#42493f]">Propietario: {business.ownerName}</p>
        </div>
        <BusinessStatusBadge status={business.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <BusinessCategoryBadge category={business.category} />
        <span className="rounded-full bg-[#D6D979] px-2.5 py-1 text-xs font-semibold text-[#3E5902]">
          {business.commissionRate}% comisión
        </span>
      </div>

      <p className="mt-4 text-sm leading-6 text-[#42493f]">{business.description}</p>

      <div className="mt-4 space-y-2 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
        <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#4F7302]" />{business.phone}</p>
        <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#4F7302]" />{business.email}</p>
        <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#4F7302]" />{business.location}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Ventas mes</p>
          <p className="font-semibold text-[#1a1c18]">{money.format(business.monthlySales)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Liquidación</p>
          <p className="font-semibold text-[#1a1c18]">{money.format(business.pendingPayout)}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Productos</p>
          <p className="font-semibold text-[#1a1c18]">{business.activeProducts}</p>
        </div>
        <div className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#73796e]">Pedidos</p>
          <p className="font-semibold text-[#1a1c18]">{business.pendingOrders}</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-[#e2e3dc] bg-white p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[#42493f]">Notas operativas</p>
        <p className="mt-2 text-sm leading-5 text-[#42493f]">{business.notes}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {business.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">
            {tag.replaceAll("_", " ")}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-[#D6D979] bg-[#f9faf3] p-3 text-sm text-[#3E5902]">
        {openTasks > 0 ? `${openTasks} tareas pendientes para estabilizar operación.` : "Operación lista para escalar pedidos."}
        {activities[0] ? <p className="mt-1 text-xs text-[#42493f]">Última actividad: {activities[0].title} · {activities[0].date}</p> : null}
      </div>
    </section>
  );
}
