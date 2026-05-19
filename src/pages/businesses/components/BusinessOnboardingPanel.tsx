import { CheckCircle2, Circle } from "lucide-react";
import type { BusinessOnboardingTask } from "@/types/business.types";

const priorityLabels: Record<BusinessOnboardingTask["priority"], string> = {
  high: "Alta",
  medium: "Media",
  low: "Baja",
};

const priorityStyles: Record<BusinessOnboardingTask["priority"], string> = {
  high: "bg-[#ffdad6] text-[#93000a]",
  medium: "bg-[#fff2cc] text-[#7a5d00]",
  low: "bg-[#e8e9e2] text-[#42493f]",
};

export default function BusinessOnboardingPanel({ tasks }: { tasks: BusinessOnboardingTask[] }) {
  return (
    <section className="rounded-lg border border-[#c2c9bc] bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-['Hanken_Grotesk'] text-lg font-semibold text-[#1a1c18]">Onboarding y pendientes</h2>
        <span className="rounded-full bg-[#e8e9e2] px-2.5 py-1 text-xs font-semibold text-[#42493f]">{tasks.length}</span>
      </div>
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <article key={task.id} className="flex items-start gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3">
            {task.completed ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4F7302]" />
            ) : (
              <Circle className="mt-0.5 h-4 w-4 shrink-0 text-[#7a5d00]" />
            )}
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-semibold ${task.completed ? "text-[#73796e]" : "text-[#1a1c18]"}`}>{task.title}</p>
              <p className="mt-0.5 text-xs text-[#42493f]">{task.completed ? "Completada" : "Pendiente"}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityStyles[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
          </article>
        ))}
        {tasks.length === 0 ? (
          <p className="rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 text-sm text-[#42493f]">
            No hay tareas pendientes para los filtros actuales.
          </p>
        ) : null}
      </div>
    </section>
  );
}
