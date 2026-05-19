import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "@/layouts/AppShell";
import HomePage from "@/pages/home/HomePage";
import BusinessesPage from "@/pages/businesses/BusinessesPage";
import CustomersPage from "@/pages/customers/CustomersPage";
import InventoryPage from "@/pages/inventory/InventoryPage";
import OrdersPage from "@/pages/orders/OrdersPage";
import CooperativesPage from "@/pages/cooperatives/CooperativesPage";
import OpportunitiesPage from "@/pages/cooperatives/OpportunitiesPage";
import CooperativeDetailPage from "@/pages/cooperatives/CooperativeDetailPage";
import CooperativeAgreementPage from "@/pages/cooperatives/CooperativeAgreementPage";
import CreateCooperativePage from "@/pages/cooperatives/create/CreateCooperativePage";
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
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        <Route path="/cooperatives" element={<CooperativesPage />} />
        <Route path="/cooperatives/create" element={<CreateCooperativePage />} />
        <Route path="/cooperatives/opportunities" element={<OpportunitiesPage />} />
        <Route path="/cooperatives/:id" element={<CooperativeDetailPage />} />
        <Route path="/cooperatives/:id/agreement" element={<CooperativeAgreementPage />} />

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
