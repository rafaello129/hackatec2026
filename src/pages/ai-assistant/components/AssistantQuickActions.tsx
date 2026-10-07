import {
  BarChart3,
  Handshake,
  Megaphone,
  PackageSearch,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AssistantQuickAction } from "@/types/assistant.types";

const icons: Record<string, LucideIcon> = {
  users: Users,
  package: PackageSearch,
  handshake: Handshake,
  chart: BarChart3,
  megaphone: Megaphone,
};

export default function AssistantQuickActions({
  actions,
  onRunAction,
  disabled,
}: {
  actions: AssistantQuickAction[];
  onRunAction: (actionId: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 2xl:grid-cols-5">
      {actions.map((action) => {
        const Icon = icons[action.iconName] ?? BarChart3;

        return (
          <button
            key={action.id}
            type="button"
            onClick={() => onRunAction(action.id)}
            disabled={disabled}
            className="group min-w-0 rounded-[16px] border border-[#E0E6DC] bg-white p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-[#C8D6C2] hover:shadow-[0_8px_20px_rgba(23,35,27,0.055)] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-55"
          >
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-[#EAF4E6] text-[#135C2F] transition-transform duration-200 group-hover:scale-105">
                <Icon className="h-4 w-4" />
              </span>
              <p className="truncate text-[11px] font-semibold text-[#17231B]">{action.label}</p>
            </div>
            <p className="mt-2 line-clamp-2 text-[10px] leading-4 text-[#68736B]">
              {action.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
