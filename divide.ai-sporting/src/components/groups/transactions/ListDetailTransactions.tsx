import { formatMoney, formatDateTime } from '@/utils/Formatter';
import { generateColor } from "../listGroup/GroupAvatars";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { IDebt } from "@/interfaces/IDebt";
import { EditPagament } from "@/components/groups/transactions/EditPagament";
import { getUserLocalStorage } from '@/context/AuthProvider/util';
import { useLocation } from "react-router-dom";


export function valueFormatter(value: number | null) {
  return formatMoney(value);
}
export function ListDetailTransactions({ debt, idUser }: { debt: IDebt, idUser: number}) {
  const idUserLog = getUserLocalStorage()?.id || null;
  
  

  return (
    <div>
      <div className="bg-white rounded-md p-2 mb-2 flex flex-col md:flex-row px-6 lg:px-6 py-4" key={debt.id}>
        <div className="flex-col my-auto items-center md:text-center pe-3 border-b  md:border-b-0  md:border-e pb-2 md:pb-0">
          <p className="text-[#b3b1b1] text-center">Valor</p>
          <p className="text-[#29756F] text-center font-bold text-[1.5rem] ">{valueFormatter(debt.amount)}</p>
          <p className="text-[#b3b1b1] text-center text-[10px]">Criado em {formatDateTime(debt.createdAt)}</p>
        </div>
        <div className="flex-col justify-center items-center text-center md:text-left my-auto ">
          <p className="text-[#b3b1b1] flex justify-center md:justify-start items-center mb-1 mt-1 md:mt-0 md:ms-5">
            <Avatar className="w-7 h-7 me-2">
              <AvatarFallback className={generateColor(debt.user.id)}>
                {debt.user.firstName.charAt(0)}{debt.user.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {debt.user.firstName + " " + debt.user.lastName}
          </p>
          <div className="flex justify-center items-center md:justify-start">
            <span
              className={`${debt.paidAt ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                } text-xs font-semibold px-2 py-1 rounded-full mt-1 flex items-center md:ms-5`}
            >
              {debt.paidAt ? 'Pago' : 'Não pago'}

            </span> <span className="text-[#b3b1b1] mt-1 px-1 text-[10px]">{formatDateTime(debt.paidAt)}</span>
            {idUser == idUserLog && (
              <EditPagament debt={debt}/>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}