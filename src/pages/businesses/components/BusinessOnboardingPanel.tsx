import { ArrowRight, CheckCircle2, Circle } from "lucide-react";
import type { BusinessOnboardingTask } from "@/types/business.types";

const priorityLabels: Record<BusinessOnboardingTask["priority"], string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

const priorityStyles: Record<BusinessOnboardingTask["priority"], string> = {
  high: "bg-[#FBE2D8] text-[#8B4A2B]",
  medium: "bg-[#FFF0D8] text-[#8C6213]",
  low: "bg-[#EEF2EA] text-[#607064]",
};

export default function BusinessOnboardingPanel({ tasks }: { tasks: BusinessOnboardingTask[] }) {
  const visible = tasks.slice(0, 4);

  return (
    <section className="rounded-[22px] border border-[#E3E7DF] bg-white p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-[#172019]">Onboarding y pendientes</h2>
          <p className="mt-1 text-[11px] text-[#7B867E]">{tasks.length} tareas en esta operación.</p>
        </div>
      </div>

      <div className="mt-4 divide-y divide-[#EEF0EB]">
        {visible.length === 0 ? (
          <div className="rounded-2xl bg-[#F6F8F3] px-3 py-4 text-[11px] text-[#66736A]">
            No hay tareas pendientes para este negocio.
          </div>
        ) : (
          visible.map((task) => (
            <div key={task.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
              {task.completed ? (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#ECF5E8] text-[#2F873A]">
                  <CheckCircle2 className="h-4 w-4" />
                </span>
              ) : (
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#FFF4D8] text-[#9B6D05]">
                  <Circle className="h-4 w-4" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className={`truncate text-[11px] font-semibold ${task.completed ? "text-[#7A857E]" : "text-[#2B352F]"}`}>{task.title}</p>
                <p className="mt-0.5 text-[10px] text-[#87918A]">{task.completed ? "Completada" : "Pendiente"}</p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${priorityStyles[task.priority]}`}>{priorityLabels[task.priority]}</span>
            </div>
          ))
        )}
      </div>

      {tasks.length > visible.length && (
        <button type="button" className="mt-4 inline-flex items-center gap-1 text-[10px] font-semibold text-[#287839]">
          Ver todas <ArrowRight className="h-3 w-3" />
        </button>
      )}
    </section>
  );
}
