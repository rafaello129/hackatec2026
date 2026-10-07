import AssistantChatPanel from "./components/AssistantChatPanel";
import AssistantContextPanel from "./components/AssistantContextPanel";
import AssistantHeader from "./components/AssistantHeader";
import AssistantRecommendationPanel from "./components/AssistantRecommendationPanel";
import AssistantRiskPanel from "./components/AssistantRiskPanel";
import { useAssistant } from "./hooks/useAssistant";

export default function AIAssistantPage() {
  const {
    businessContext,
    handleQuickAction,
    handleSendMessage,
    inputValue,
    isLoading,
    messages,
    quickActions,
    recommendations,
    risks,
    setInputValue,
  } = useAssistant();

  return (
    <div className="w-full max-w-full space-y-5 overflow-hidden pb-5">
      <AssistantHeader />

      <div className="grid w-full max-w-full items-start gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <AssistantChatPanel
          messages={messages}
          inputValue={inputValue}
          onInputChange={setInputValue}
          onSendMessage={() => handleSendMessage()}
          isLoading={isLoading}
          quickActions={quickActions}
          onRunAction={handleQuickAction}
        />

        <aside className="min-w-0 space-y-4">
          <AssistantContextPanel context={businessContext} />
          <AssistantRiskPanel risks={risks} />
          <AssistantRecommendationPanel recommendations={recommendations} />
        </aside>
      </div>
    </div>
  );
}
