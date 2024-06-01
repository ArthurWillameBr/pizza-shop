import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelOrder } from "@/api/cancel-order";
import { GetOrdersProps } from "@/api/get-orders";
import { OrderStatus } from "@/components/order-status";
import { approveOrder } from "@/api/approve-order";
import { dispatchOrder } from "@/api/dispacth-order";
import { deliveryOrder } from "@/api/delivery-order";

interface OrderTableRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: OrderStatus;
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const queyClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const orderListCached = queyClient.getQueriesData<GetOrdersProps>({
      queryKey: ["orders"],
    });
    orderListCached.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }
      queyClient.setQueryData<GetOrdersProps>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }
          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCanceledOrder } =
    useMutation({
      mutationFn: CancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });
  const { mutateAsync: approveOrderFn, isPending: isApproveOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });
  const { mutateAsync: deliveryOrderFn, isPending: isDeliveryOrder } =
    useMutation({
      mutationFn: deliveryOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="size-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>
          <OrderDetails orderId={order.orderId} open={isDetailsOpen} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDistanceToNow(order.createdAt, {
          locale: ptBR,
          addSuffix: true,
        })}
      </TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>

        {order.status === "processing" && (
          <Button
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            disabled={isDispatchOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Em entrega
          </Button>
        )}
        {order.status === "delivering" && (
          <Button
            onClick={() => deliveryOrderFn({ orderId: order.orderId })}
            disabled={isDeliveryOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Entregue
          </Button>
        )}
        {order.status === "pending" && (
          <Button
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            disabled={isApproveOrder}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 size-3" />
            Aprovar
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          disabled={
            !["pending", "processing" || isCanceledOrder].includes(order.status)
          }
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 size-3" />
          Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
