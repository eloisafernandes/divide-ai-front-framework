import { IDebt } from "@/interfaces/IDebt";
import { useState } from "react";
import { formatMoney, formatDateTime } from '@/utils/Formatter';

import { Separator } from "@/components/ui/separator"
import { Wallet } from 'lucide-react';
import { CircleDollarSign } from 'lucide-react';
import { getUserLocalStorage } from '@/context/AuthProvider/util';

export function CardHistoric({ debt, condition }: { debt: IDebt, condition: string }) {

    
    return (
        <div className="px-4 py-1  ">
            {condition === 'paid' && (
                <>
                    <p className="text-end  text-sm text-[#afafaf]">{formatDateTime(debt.paidAt)}</p>
                    <div key={debt.id} className="text-sm my-4 flex items-center">
                        <div className="bg-divide-light p-2 rounded-xl">
                            <CircleDollarSign className="text-divide-dark" />
                        </div>
                        <div className="ms-2">
                            <p className="text-bold text-[1rem] my-1 font-bold">Pagamento</p>
                            <p>{debt.user.firstName} pagou {formatMoney(debt.amount)}</p>
                        </div>
                    </div>
                </>
            )}

            {condition === 'created' && (
                <>
                    <p className="text-end text-sm text-[#afafaf]">{formatDateTime(debt.createdAt)}</p>
                    <div key={debt.id} className="text-sm my-4 flex items-center">
                        <div className="bg-divide-light p-2 rounded-xl">
                            <Wallet className="text-divide-dark" />
                        </div>
                        <div className="ms-2">
                            <p className="text-bold text-[1rem] my-1 font-bold">Dívida</p>
                            <p>Dívida de {formatMoney(debt.amount)} atribuída a {debt.user.firstName}</p>
                        </div>
                    </div>
                </>
            )}



            <Separator className="my-2" />
        </div>
    );
}
