import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { formatMoney } from '@/utils/Formatter';
import { useTransactionByMonth } from '@/hooks/transacion/transacionHook';
import { VWTransaction } from '@/types/VWTransaction';

const chartSetting = {
  // yAxis: [
  //   {
  //     label: 'rainfall (mm)',
  //   },
  // ],
  maxwidth: 600,
  height: 300,
  sx: {
    touchAction: 'pan-y',
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translate(-20px, 0)',
    },
  },
};

interface DashboardProps {
  data?: VWTransaction[];
}

export function Dashboard({ data }: DashboardProps) {
  const dataset = data ? data.map((transaction: VWTransaction) => ({
    entrada: transaction.totalIncome,
    saida: Math.abs(transaction.totalExpenses),
    month: new Date(transaction.year, transaction.month - 1).toLocaleString('default', { month: 'long' }),
  })) : [];

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
      series={[
        { dataKey: 'entrada', label: "Entrada", valueFormatter },
        { dataKey: 'saida', label: "Saída", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}

export function valueFormatter(value: number | null) {
  return formatMoney(value);
}
// import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { TrendingUp } from "lucide-react"

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

// export function Dashboard() {
//   return (
//     <ChartContainer config={chartConfig} className="w-full max-h-[300px]">
//       <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
//         <CartesianGrid vertical={false} />
//         <XAxis
//           dataKey="month"
//           tickLine={false}
//           tickMargin={10}
//           axisLine={false}
//           tickFormatter={(value) => value.slice(0, 3)}
//         />
//         <ChartTooltip
//           cursor={false}
//           content={<ChartTooltipContent indicator="dashed" />}
//         />

//         <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
//           <LabelList
//             position="top"
//             offset={12}
//             className="fill-foreground"
//             fontSize={12}
//           />
//         </Bar>
//         <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} >
//           <LabelList
//             position="top"
//             offset={12}
//             className="fill-foreground"
//             fontSize={12}
//           />
//         </Bar>
//       </BarChart>
//     </ChartContainer>
//   )
// }
