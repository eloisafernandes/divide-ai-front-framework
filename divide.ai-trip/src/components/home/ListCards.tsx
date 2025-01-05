import { CardData } from "@/components/global/card/CardData";
import { IoArrowUpCircleOutline, IoArrowDownCircleOutline } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";
import { formatMoney, formatDate } from "@/utils/Formatter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { VWTransaction } from "@/types/VWTransaction";
import { useTransactionDataByUser } from "@/hooks/transacion/transacionHook";
import { ITransacionResponse } from "@/interfaces/ITransacion";

interface ListCardsProps {
  data?: VWTransaction[];
}

export function ListCards({ data }: ListCardsProps) {
  const { data: transacionByUser } = useTransactionDataByUser();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const dataset = data ? data
    .filter((transaction: VWTransaction) => {
      return transaction.month === currentMonth &&
        transaction.year === currentYear;
    })
    .map((transaction: VWTransaction) => ({
      entrada: transaction.totalIncome,
      saida: Math.abs(transaction.totalExpenses),
      month: new Date(transaction.year, transaction.month - 1).toLocaleString('default', { month: 'long' }),
    })) : [];

  const handleReturnDayForLastExpenseTransaction = (transacionByUser: ITransacionResponse[]) => {
    const lastExpenseTransaction = transacionByUser
      .filter(transaction => transaction.amount < 0)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })[0];

    return lastExpenseTransaction?.createdAt
      ? formatDate(new Date(lastExpenseTransaction.createdAt))
      : null;
  };

  const handleReturnDayForLastIncomeTransaction = (transacionByUser: ITransacionResponse[]) => {
    const lastIncomeTransaction = transacionByUser
      .filter(transaction => transaction.amount > 0)
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })[0];

    return lastIncomeTransaction?.createdAt
      ? formatDate(new Date(lastIncomeTransaction.createdAt))
      : null;
  };


  const totalIncome = dataset.length > 0 ? dataset.reduce((acc, curr) => acc + curr.entrada, 0) : null;
  const totalExpenses = dataset.length > 0 ? Math.abs(dataset.reduce((acc, curr) => acc + curr.saida, 0)) : null;
  const lastTransactionIncome = transacionByUser ? handleReturnDayForLastIncomeTransaction(transacionByUser) : null;
  const lastTransactionExpense = transacionByUser ? handleReturnDayForLastExpenseTransaction(transacionByUser) : null;
  const total = (totalIncome ?? 0) - (totalExpenses ?? 0);

  const infos = [
    {
      title: 'Entradas',
      value: formatMoney(totalIncome),
      icon: <IoArrowUpCircleOutline size={26} color="15803d" />,
      text: `Última entrada em ${lastTransactionIncome}`,
      route: "/entradas",
      tooltip: "Valor total de suas receitas cadastradas."
    },
    {
      title: 'Saídas',
      value: formatMoney(totalExpenses),
      icon: <IoArrowDownCircleOutline size={26} color="be123c" />,
      text: `Última saída em ${lastTransactionExpense}`,
      route: "/saidas",
      tooltip: "Valor total de suas despesas cadastradas, pagas ou pendentes."
    },
    {
      title: 'Saldo atual',
      value: formatMoney(total),
      icon: <MdAttachMoney size={26} />,
      route: "/saldo",
      tooltip: "Saldo atual de suas receitas e despesas."
    },
  ];

  return (
    <ScrollArea className="whitespace-nowrap pb-4">
      <div className="flex gap-4 w-full">
        {infos.map((info, index) => (
          <CardData
            key={index}
            title={info.title}
            value={info.value}
            icon={info.icon}
            text={info.text}
            route={info.route}
            style={{ width: '100%' }}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea >
  );
}