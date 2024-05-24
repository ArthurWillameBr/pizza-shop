import { api } from "@/lib/axios";

export interface GetOrdersProps {
  orders: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
  meta: {
    pageIndex: number;
    perPage: number;
    totalCount: number;
  };
}

export async function GetOrders() {
  const response = await api.get<GetOrdersProps>("/orders", {
    params: {
      pageIndex: 0,
    },
  });
  return response.data;
}
