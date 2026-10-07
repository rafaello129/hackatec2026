import { Loader2 } from "lucide-react";
import type { AssistantMessage } from "@/types/assistant.types";
import AssistantMessageBubble from "./AssistantMessageBubble";

export default function AssistantMessageList({
  messages,
  isLoading,
}: {
  messages: AssistantMessage[];
  isLoading: boolean;
}) {
  return (
    <div className="max-h-[470px] min-h-[320px] space-y-3 overflow-y-auto rounded-[22px] border border-[#E7EBE4] bg-[#F7F9F5] p-3.5 sm:p-4">
      {messages.map((message) => (
        <AssistantMessageBubble key={message.id} message={message} />
      ))}

      {isLoading ? (
        <div className="flex items-center gap-2 rounded-[16px] border border-[#E1E6DE] bg-white px-3.5 py-3 text-[11px] font-semibold text-[#59665E] shadow-[0_1px_0_rgba(23,35,27,0.02)]">
          <span className="grid h-7 w-7 place-items-center rounded-[10px] bg-[#EAF4E6] text-[#135C2F]">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          </span>
          Analizando señales del negocio...
        </div>
      ) : null}
    </div>
  );
}
