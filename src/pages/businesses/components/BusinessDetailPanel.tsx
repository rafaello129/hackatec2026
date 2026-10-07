import { Mail, MapPin, Phone, Store } from "lucide-react";
import type { BusinessActivity, BusinessOnboardingTask, IntermediatedBusiness } from "@/types/business.types";
import BusinessCategoryBadge from "./BusinessCategoryBadge";
import BusinessStatusBadge from "./BusinessStatusBadge";

const money = new Intl.NumberFormat("es-MX", { currency: "MXN", maximumFractionDigits: 0, style: "currency" });

const initials = (name: string) =>
  name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

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
      <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
        <h3 className="text-[15px] font-semibold text-[#172019]">Detalle del negocio</h3>
        <p className="mt-2 text-[11px] leading-5 text-[#7B867E]">Selecciona un negocio para revisar su operación.</p>
      </section>
    );
  }

  const openTasks = tasks.filter((task) => !task.completed).length;

  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#E6F1E4] text-[11px] font-bold text-[#135C2F]">
          {initials(business.name)}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[15px] font-semibold text-[#172019]">{business.name}</h2>
          <p className="mt-1 truncate text-[11px] text-[#7B867E]">{business.ownerName}</p>
        </div>
        <BusinessStatusBadge status={business.status} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <BusinessCategoryBadge category={business.category} />
        <span className="rounded-full bg-[#E6F3C8] px-2.5 py-1 text-[10px] font-semibold text-[#42610A]">
          {business.commissionRate}% comisión
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-[11px] leading-5 text-[#657068]">{business.description}</p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {[
          ["Ventas mes", money.format(business.monthlySales)],
          ["Liquidación", money.format(business.pendingPayout)],
          ["Productos", String(business.activeProducts)],
          ["Pedidos", String(business.pendingOrders)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[16px] border border-[#E5E9E2] bg-white p-3.5">
            <p className="text-[10px] text-[#7F8A82]">{label}</p>
            <p className="mt-1 text-[12px] font-semibold text-[#2D3931]">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] bg-[#F2F6EE] p-4">
        <p className="flex items-center gap-2 text-[10.5px] text-[#657068]"><Phone className="h-3.5 w-3.5 text-[#287839]" />{business.phone}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><Mail className="h-3.5 w-3.5 text-[#287839]" />{business.email}</p>
        <p className="mt-2 flex items-center gap-2 text-[10.5px] text-[#657068]"><MapPin className="h-3.5 w-3.5 text-[#287839]" />{business.location}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {business.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full border border-[#DDE5D8] bg-white px-2.5 py-1 text-[9.5px] font-medium text-[#526057]">
            {tag.replaceAll("_", " ")}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[14px] bg-[#ECF5E8] px-3 py-2.5 text-[10px] leading-4 text-[#3F6948]">
        <span className="inline-flex items-center gap-1.5 font-semibold"><Store className="h-3.5 w-3.5" />
          {openTasks > 0 ? `${openTasks} tareas pendientes para estabilizar la operación.` : "Operación lista para escalar pedidos."}
        </span>
        {activities[0] ? <p className="mt-1 text-[#6E7B72]">Última actividad: {activities[0].title}</p> : null}
      </div>
    </section>
  );
}
