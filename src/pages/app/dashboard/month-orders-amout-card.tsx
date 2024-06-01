import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { getMonthOrdersAmount } from '@/api/get-mouth-orders-amount'
import { MetricCardSkeleton } from "./metric-card-skeleton";


export function MonthOrderAmountCard() {
  const { data: monthOrdersAmount } = useQuery({
    queryFn: getMonthOrdersAmount,
    queryKey: ['metrics', 'month-orders-amount'],
  });
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Pedidos (mês)
        </CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
      {monthOrdersAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              {monthOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-sm text-muted-foreground">
              {monthOrdersAmount.diffFromLastMonth > 0 ? (
                <span className="text-green-500 dark:text-green-400">
                  +{monthOrdersAmount.diffFromLastMonth}%
                </span>
              ) : (
                <span className="text-rose-500 dark:text-red-400">
                  -{monthOrdersAmount.diffFromLastMonth}%
                </span>
              )}
              {" "}em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton/>
        )}
      </CardContent>
    </Card>
  );
}
