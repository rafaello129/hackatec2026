import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "@/layouts/AppShell";
import HomePage from "@/pages/home/HomePage";
import BusinessesPage from "@/pages/businesses/BusinessesPage";
import InventoryPage from "@/pages/inventory/InventoryPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import FinancePage from "@/pages/finance/FinancePage";
import FinanceSummaryPage from "@/pages/finance/FinanceSummaryPage";
import FinanceAccountingPage from "@/pages/finance/FinanceAccountingPage";
import FinanceInvoicingPage from "@/pages/finance/FinanceInvoicingPage";
import AIAssistantPage from "@/pages/ai-assistant/AIAssistantPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import NotFoundPage from "@/pages/not-found/NotFoundPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/businesses" element={<BusinessesPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/finance" element={<FinancePage />}>
          <Route index element={<Navigate to="/finance/summary" replace />} />
          <Route path="summary" element={<FinanceSummaryPage />} />
          <Route path="accounting" element={<FinanceAccountingPage />} />
          <Route path="invoicing" element={<FinanceInvoicingPage />} />
        </Route>

        <Route path="/ai-assistant" element={<AIAssistantPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
