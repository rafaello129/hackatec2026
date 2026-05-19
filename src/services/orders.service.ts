import { orderActivitiesMock, orderKpisMock, ordersMock } from "@/data/mocks/orders.mock";
import type { Order, OrderActivity, OrderKpi } from "@/types/order.types";

export async function getOrders(): Promise<Order[]> {
  return ordersMock;
}

export async function getOrderById(id: string): Promise<Order | undefined> {
  return ordersMock.find((order) => order.id === id);
}

export async function getOrderKpis(): Promise<OrderKpi[]> {
  return orderKpisMock;
}

export async function getOrderActivities(): Promise<OrderActivity[]> {
  return orderActivitiesMock;
}

export async function getOrderActivitiesByOrderId(orderId: string): Promise<OrderActivity[]> {
  return orderActivitiesMock.filter((activity) => activity.orderId === orderId);
}

export async function getOrdersByBusinessId(businessId: string): Promise<Order[]> {
  return ordersMock.filter((order) => order.businessId === businessId);
}

export async function getUrgentOrders(): Promise<Order[]> {
  return ordersMock.filter((order) => order.status === "new" || order.paymentStatus === "overdue" || order.fulfillmentStatus === "issue");
}
