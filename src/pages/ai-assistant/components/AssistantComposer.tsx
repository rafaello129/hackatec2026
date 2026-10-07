import { Send } from "lucide-react";
import type { FormEvent, KeyboardEvent } from "react";

interface AssistantComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
}

export default function AssistantComposer({
  value,
  onChange,
  onSend,
  isLoading,
}: AssistantComposerProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSend();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[20px] border border-[#DDE3DA] bg-white p-2.5 shadow-[0_6px_18px_rgba(23,35,27,0.04)] transition focus-within:border-[#B9CCAE] focus-within:shadow-[0_8px_22px_rgba(23,35,27,0.06)]"
    >
      <div className="flex min-w-0 items-end gap-2">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={isLoading}
          placeholder="Pregunta sobre operación, productos, pedidos o finanzas..."
          className="min-h-11 min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-[12px] leading-6 text-[#17231B] outline-none placeholder:text-[#8F9992] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={!value.trim() || isLoading}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#135C2F] text-white transition hover:-translate-y-0.5 hover:bg-[#0E4D27] disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-45"
          aria-label="Enviar mensaje"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
