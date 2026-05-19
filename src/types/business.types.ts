export type BusinessStatus = "active" | "onboarding" | "needs_attention" | "paused" | "inactive";

export type BusinessCategory =
  | "food"
  | "fashion"
  | "textile"
  | "beauty"
  | "regional_products"
  | "logistics"
  | "services"
  | "packaging"
  | "other";

export interface BusinessContact {
  name: string;
  role: string;
  phone: string;
  email: string;
}

export interface IntermediatedBusiness {
  id: string;
  name: string;
  ownerName: string;
  category: BusinessCategory;
  description: string;
  phone: string;
  email: string;
  location: string;
  status: BusinessStatus;
  commissionRate: number;
  activeProducts: number;
  pendingOrders: number;
  monthlySales: number;
  pendingPayout: number;
  lastActivity: string;
  joinedAt: string;
  tags: string[];
  notes: string;
}

export interface BusinessKpi {
  id: "active_businesses" | "pending_orders" | "managed_sales" | "pending_payouts";
  label: string;
  value: number;
  formattedValue: string;
  hint: string;
}

export type BusinessActivityType =
  | "order_received"
  | "inventory_updated"
  | "payout_pending"
  | "onboarding_task"
  | "needs_followup"
  | "product_published";

export interface BusinessActivity {
  id: string;
  businessId: string;
  title: string;
  description: string;
  type: BusinessActivityType;
  date: string;
  responsible: string;
}

export interface BusinessOnboardingTask {
  id: string;
  businessId: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
}
