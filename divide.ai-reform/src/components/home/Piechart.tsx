import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { formatMoney } from '@/utils/Formatter';
import { useTransactionByCategory } from '@/hooks/transacion/transacionHook';
import { VWTransactionByCategory } from '@/types/VWTransactionByCategory';

const data = [
  { value: 100, label: 'Casa', color: '#FF6384' },
  { value: 10, label: 'Comida', color: '#36A2EB' },
  { value: 15, label: 'Festa', color: '#FFCE56' },
  { value: 20, label: '', color: '#4BC0C0' },
];

const size = {
  margin: { right: 5 },
  maxwidth: 400,
  height: 200,
  legend: { hidden: true },
  sx: {
    touchAction: 'pan-y',
  },
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export function Piechart() { 
  const { data: transactionByCategory } = useTransactionByCategory();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  console.log("mes: ", currentMonth, "ano: ", currentYear);

  const data = transactionByCategory ? transactionByCategory
    .filter((transaction: VWTransactionByCategory) => {
      return transaction.amount < 0 &&
        transaction.month === currentMonth &&
        transaction.year === currentYear;
    })
    .map((transaction: VWTransactionByCategory) => ({
      value: Math.abs(transaction.amount),
      label: transaction.categoryName,
      color: transaction.color,
    })) : [];

  const totalValue = data.length > 0 ? formatMoney(data.reduce((acc, curr) => acc + curr.value, 0)) : null;

  return (
    <PieChart series={[{ data, innerRadius: 70, valueFormatter: (value) => formatMoney(value.value) }]} {...size}>
      <PieCenterLabel>{totalValue}</PieCenterLabel>
    </PieChart>
  );
}
// import { Label, Pie, PieChart } from "recharts"
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"
// import { useMemo } from "react"
// import { formatMoney } from "@/utils/Formatter"

// const chartData = [
//   { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
//   { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
//   { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
//   { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
//   { browser: "other", visitors: 190, fill: "var(--color-other)" },
// ]

// const chartConfig = {
//   visitors: {
//     label: "Visitors",
//   },
//   chrome: {
//     label: "Chrome",
//     color: "hsl(var(--chart-1))",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

// export function Piechart() {
//   const totalVisitors = useMemo(() => {
//     return formatMoney(chartData.reduce((acc, curr) => acc + curr.visitors + 10000, 0))
//   }, [])

//   return (
//     <ChartContainer
//       config={chartConfig}
//       className="mx-auto aspect-square max-h-[250px]"
//     >
//       <PieChart>
//         <ChartTooltip
//           cursor={false}
//           content={<ChartTooltipContent hideLabel />}
//         />
//         <Pie
//           data={chartData}
//           dataKey="visitors"
//           nameKey="browser"
//           innerRadius={60}
//           strokeWidth={5}
//         >
//           <Label
//             content={({ viewBox }) => {
//               if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                 return (
//                   <text
//                     x={viewBox.cx}
//                     y={viewBox.cy}
//                     textAnchor="middle"
//                     dominantBaseline="middle"
//                   >
//                     <tspan
//                       x={viewBox.cx}
//                       y={viewBox.cy}
//                       className="fill-foreground text-xl font-bold"
//                     >
//                       {totalVisitors}
//                     </tspan>
//                     <tspan
//                       x={viewBox.cx}
//                       y={(viewBox.cy || 0) + 24}
//                       className="fill-muted-foreground"
//                     >
//                       Total
//                     </tspan>
//                   </text>
//                 )
//               }
//             }}
//           />
//         </Pie>
//       </PieChart>
//     </ChartContainer>
//   )
// }
