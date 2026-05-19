import { Search, X } from "lucide-react";
import type { OrderBusinessFilter, OrderChannelFilter, OrderStatusFilter, PaymentStatusFilter } from "../hooks/useOrders";

interface OrdersFiltersProps {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  businessFilter: OrderBusinessFilter;
  onBusinessFilterChange: (value: OrderBusinessFilter) => void;
  statusFilter: OrderStatusFilter;
  onStatusFilterChange: (value: OrderStatusFilter) => void;
  paymentFilter: PaymentStatusFilter;
  onPaymentFilterChange: (value: PaymentStatusFilter) => void;
  channelFilter: OrderChannelFilter;
  onChannelFilterChange: (value: OrderChannelFilter) => void;
  onClearFilters: () => void;
  businessOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: OrderStatusFilter; label: string }>;
  paymentOptions: Array<{ value: PaymentStatusFilter; label: string }>;
  channelOptions: Array<{ value: OrderChannelFilter; label: string }>;
}

export default function OrdersFilters({
  searchText,
  onSearchTextChange,
  businessFilter,
  onBusinessFilterChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  channelFilter,
  onChannelFilterChange,
  onClearFilters,
  businessOptions,
  statusOptions,
  paymentOptions,
  channelOptions,
}: OrdersFiltersProps) {
  return (
    <div className="mb-4 grid gap-3 rounded-lg border border-[#e2e3dc] bg-[#f9faf3] p-3 xl:grid-cols-[minmax(0,1fr)_190px_170px_160px_170px_auto]">
      <label className="relative min-w-0">
      </label>
      <select value={businessFilter} onChange={(event) => onBusinessFilterChange(event.target.value)} className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]">
        {businessOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select value={statusFilter} onChange={(event) => onStatusFilterChange(event.target.value as OrderStatusFilter)} className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]">
        {statusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select value={paymentFilter} onChange={(event) => onPaymentFilterChange(event.target.value as PaymentStatusFilter)} className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]">
        {paymentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select value={channelFilter} onChange={(event) => onChannelFilterChange(event.target.value as OrderChannelFilter)} className="h-10 rounded-lg border border-[#c2c9bc] bg-white px-3 text-sm text-[#1a1c18] outline-none transition focus:border-[#4F7302]">
        {channelOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
   
    </div>
  );
}
