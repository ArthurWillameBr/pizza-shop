import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Utensils } from "lucide-react";
import { getDayOrdersAmount } from "@/api/get-day-orders-amount";
import { MetricCardSkeleton } from "./metric-card-skeleton";

export function DayOrderAmountCard() {
  const { data: dayOrdersAmount } = useQuery({
    queryKey: ['metrics', 'day-orders-amount'],
    queryFn: getDayOrdersAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Pedidos (dia)</CardTitle>
        <Utensils className="size-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-1">
        {dayOrdersAmount ? (
          <>
            <span className="text-2xl font-bold">
              {dayOrdersAmount.amount.toLocaleString("pt-BR")}
            </span>
            <p className="text-xs text-muted-foreground">
              <span
                className={
                  dayOrdersAmount.diffFromYesterday > 0
                    ? "text-emerald-500"
                    : "text-red-500"
                }
              >
                {dayOrdersAmount.diffFromYesterday > 0
                  ? `+${dayOrdersAmount.diffFromYesterday}`
                  : dayOrdersAmount.diffFromYesterday}
                %
              </span>{" "}
              em relação a ontem
            </p>
          </>
        ) : (
          <MetricCardSkeleton/>
        )}
      </CardContent>
    </Card>
  );
}
