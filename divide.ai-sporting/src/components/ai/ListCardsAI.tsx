import { CardData } from "@/components/global/card/CardData";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { formatMoney, formatDate } from "@/utils/Formatter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

interface ListCardsAIProps {
  nextIncome: number | null;
  nextExpenses: number | null;
  isPending: Boolean;
}

export function ListCardsAI({ nextIncome, nextExpenses, isPending }: ListCardsAIProps) {
  const infos = [
    {
      title: 'Entradas do próximo mês',
      value: nextIncome !== null ? formatMoney(nextIncome) : "R$ --,--",
      icon: <IoArrowUpCircleOutline size={26} color="15803d" />,
    },
    {
      title: 'Saídas do próximo mês',
      value: nextExpenses !== null ? formatMoney(nextExpenses) : "R$ --,--",
      icon: <IoArrowDownCircleOutline size={26} color="be123c" />,
    },
  ];

  return (
    <ScrollArea className="whitespace-nowrap pb-4">
      <div className="flex gap-4 w-full">
        {infos.map((info, index) =>
          isPending ? (
            <Card key={index} style={{ width: '100%' }}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <Skeleton className="h-4 w-1/4 rounded-full" />
                  <Skeleton className="h-8 w-8 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-6 w-1/3 rounded-full" />
              </CardContent>
            </Card>
          ) : (
            <CardData
              key={index}
              title={info.title}
              value={info.value}
              icon={info.icon}
              style={{ width: '100%' }}
            />
          )
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

