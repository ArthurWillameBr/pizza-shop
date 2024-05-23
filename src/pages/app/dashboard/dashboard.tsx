import { Helmet } from "react-helmet-async";
import { MonthRevenueCard } from "./month-revenue-card";
import { MonthOrderAmountCard } from "./month-orders-amout-card";
import { DayOrderAmountCard } from "./day-orders-amout-card";
import { MonthCanceledOrdersAmountCard } from "./month-canceled-orders-amount-card";

export function Dashboard() {
  return (
    <>
      <Helmet title="login" />
      <div className="flex flex-col gap-4">
        <div className="text-3xl font-bold tracking-tight">Dashboard</div>
        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrderAmountCard />
          <DayOrderAmountCard/>
          <MonthCanceledOrdersAmountCard/>
        </div>
      </div>
    </>
  );
}
