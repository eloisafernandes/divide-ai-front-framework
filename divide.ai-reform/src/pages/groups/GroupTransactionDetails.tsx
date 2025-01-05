import { useDebtDataGroupTransaction } from "@/hooks/debt/debtHook";
import { useParams } from 'react-router-dom';
import { SheetMenu } from "@/components/global/sidebar/SheetMenu";
import { ListDetailTransactions } from '@/components/groups/transactions/ListDetailTransactions';
import { CardHistoric } from '@/components/groups/transactions/CardHistoric';
import { TabHistoric } from '@/components/groups/transactions/TabHistoricMobile';
import { IDebt } from "@/interfaces/IDebt";
import { useLocation } from "react-router-dom";


export function GroupTransactionDetails() {
  const { id } = useParams();
  const groupTransactionId = Number(id);
  const { data: debts } = useDebtDataGroupTransaction(groupTransactionId);
  const location = useLocation();
  const { transactionCreatedBy } = location.state;

  console.log("Transaction ID:", transactionCreatedBy);

  if (!debts) {
    return <div className="flex justify-center items-center">Debts não encontrado.</div>;
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 lg:mx-10">
      {/* Sidebar mobile */}
      <SheetMenu />
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Débitos</h2>

      </div>
      <div className="flex justify-around">
        <div className="flex-col  hidden md:block w-full md:w-7/12">
          {Array.isArray(debts) && debts.map((debt: IDebt) => (
            <ListDetailTransactions debt={debt} idUser={transactionCreatedBy.id} />

          ))}
        </div>
        <div className="block md:hidden">
          <TabHistoric id={groupTransactionId} idUser={transactionCreatedBy.id}/>
        </div>
        <div className="flex-col hidden md:block md:w-4/12 mx-5 bg-white rounded-md">
          <p className="text-center text-lg mt-5 mb-2 font-bold" >Histórico</p>
          <div className="max-h-96 w-full rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-400 scrollbar-track-transparent ">
            {Array.isArray(debts) &&
              debts
                .slice()
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .filter((debt: IDebt) => debt.paidAt != null)
                .map((debt: IDebt) => (
                  <CardHistoric key={debt.id} debt={debt} condition={"paid"} />
                ))
            }

            {Array.isArray(debts) &&
              debts
                .slice()
                .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                .filter((debt: IDebt) => debt.createdAt)
                .map((debt: IDebt) => (
                  <CardHistoric key={debt.id} debt={debt} condition={"created"} />
                ))
            }

          </div>
        </div>
      </div>
    </div>
  );
}

