import { Bot, ShieldCheck, User } from "lucide-react";
import type { AssistantMessage } from "@/types/assistant.types";

const moduleLabels: Record<AssistantMessage["relatedModule"], string> = {
  customers: "Clientes",
  inventory: "Inventario",
  cooperatives: "Cooperativos",
  finance: "Finanzas",
  general: "General",
};

export default function AssistantMessageBubble({
  message,
}: {
  message: AssistantMessage;
}) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const Icon = isUser ? User : isSystem ? ShieldCheck : Bot;

  return (
    <div className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser ? (
        <span
          className={
            isSystem
              ? "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-[#E9ECE6] text-[#667169]"
              : "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[11px] bg-[#073B1E] text-white"
          }
        >
          <Icon className="h-4 w-4" />
        </span>
      ) : null}

      <article
        className={
          isUser
            ? "max-w-[86%] rounded-[18px] rounded-br-[7px] bg-[#135C2F] px-4 py-3 text-white shadow-[0_4px_14px_rgba(19,92,47,0.10)]"
            : isSystem
              ? "max-w-[88%] rounded-[18px] rounded-bl-[7px] border border-[#E2E6DF] bg-[#F0F2ED] px-4 py-3 text-[#536057]"
              : "max-w-[88%] rounded-[18px] rounded-bl-[7px] border border-[#E1E6DE] bg-white px-4 py-3 text-[#17231B] shadow-[0_2px_10px_rgba(23,35,27,0.035)]"
        }
      >
        <div className="mb-1.5 flex flex-wrap items-center gap-2">
          <span
            className={
              isUser
                ? "text-[9px] font-semibold uppercase tracking-[0.08em] text-[#D9E7DB]"
                : "text-[9px] font-semibold uppercase tracking-[0.08em] text-[#718078]"
            }
          >
            {isUser ? "Tu consulta" : isSystem ? "Sistema" : "Asistente"}
          </span>

          <span
            className={
              isUser
                ? "rounded-full bg-white/12 px-2 py-0.5 text-[9px] font-semibold text-white"
                : "rounded-full bg-[#EAF4E6] px-2 py-0.5 text-[9px] font-semibold text-[#135C2F]"
            }
          >
            {moduleLabels[message.relatedModule]}
          </span>
        </div>

        <p className="whitespace-pre-line text-[12px] leading-5">{message.content}</p>
      </article>
    </div>
  );
}
