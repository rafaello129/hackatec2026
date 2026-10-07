import { Bot, Database } from "lucide-react";

export default function AssistantHeader() {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#135C2F]">
          MÁAK
        </p>
        <h1 className="mt-1 font-['Hanken_Grotesk'] text-[34px] font-bold leading-none text-[#17231B]">
          Asistente IA
        </h1>
        <p className="mt-2 max-w-2xl text-[13px] leading-5 text-[#68736B]">
          Copiloto empresarial para analizar la operación, productos, pedidos y finanzas.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex h-9 items-center gap-2 rounded-full bg-[#EAF4E6] px-3 text-[10px] font-semibold text-[#135C2F]">
          <Bot className="h-3.5 w-3.5" />
          Copiloto empresarial
        </span>
        <span className="inline-flex h-9 items-center rounded-full border border-[#E1E6DE] bg-white px-3 text-[10px] font-semibold text-[#667169]">
          Modo demo
        </span>
        <span className="inline-flex h-9 items-center gap-2 rounded-full border border-[#E1E6DE] bg-white px-3 text-[10px] font-semibold text-[#667169]">
          <Database className="h-3.5 w-3.5 text-[#135C2F]" />
          Datos simulados
        </span>
      </div>
    </header>
  );
}
