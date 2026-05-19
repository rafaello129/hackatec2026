export type OrderStatus =
  | "new"
  | "confirmed"
  | "preparing"
  | "ready_for_delivery"
  | "in_delivery"
  | "delivered"
  | "canceled";

export type PaymentStatus = "pending" | "paid" | "partial" | "overdue" | "refunded";

export type FulfillmentStatus =
  | "not_started"
  | "picking"
  | "packed"
  | "waiting_pickup"
  | "out_for_delivery"
  | "completed"
  | "issue";

export type DeliveryMethod = "pickup" | "local_delivery" | "third_party" | "shared_route" | "seller_delivery";

export type OrderChannel = "marketplace" | "whatsapp" | "phone" | "direct" | "cooperative" | "social_media";

export interface OrderItem {
  id: string;
  productName: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  businessId: string;
  businessName: string;
}

export interface Order {
  id: string;
  folio: string;
  customerName: string;
  customerPhone: string;
  businessId: string;
  businessName: string;
  items: OrderItem[];
  total: number;
  commission: number;
  commissionRate: number;
  status: OrderStatus;
  fulfillmentStatus: FulfillmentStatus;
  paymentStatus: PaymentStatus;
  channel: OrderChannel;
  deliveryMethod: DeliveryMethod;
  deliveryAddress: string;
  createdAt: string;
  dueDate: string;
  estimatedDeliveryDate: string;
  notes: string;
  tags: string[];
}

export interface OrderKpi {
  id: "new_orders" | "preparing" | "ready_for_delivery" | "delivered_today";
  label: string;
  value: number;
  formattedValue: string;
  hint: string;
}

export type OrderActivityType =
  | "order_created"
  | "payment_received"
  | "inventory_reserved"
  | "status_changed"
  | "delivery_assigned"
  | "issue_reported"
  | "delivered";

export interface OrderActivity {
  id: string;
  orderId: string;
  title: string;
  description: string;
  type: OrderActivityType;
  date: string;
  responsible: string;
}
