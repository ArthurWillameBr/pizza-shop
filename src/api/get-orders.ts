import { api } from "@/lib/axios";


export interface GetOrdersQuey {
  customerName?: string | null;
  orderId?: string | null;
  status?: string | null
  pageIndex?: number | null;

}

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

export async function GetOrders({pageIndex, customerName, orderId, status}: GetOrdersQuey) {
  const response = await api.get<GetOrdersProps>("/orders", {
    params: {
      pageIndex,
      customerName,
      orderId,
      status
    },
  });
  return response.data;
}
