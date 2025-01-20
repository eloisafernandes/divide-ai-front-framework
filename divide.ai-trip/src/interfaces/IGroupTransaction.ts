import { User } from "@/types/User";
import { IDebt, IDebtRequest } from "./IDebt";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IGroupTransactionRequest  {
    id?: number;
    amount: number;
    description: string;
    dueDate: Date;
    tripId?: number;
    debts: IDebtRequest[];
    createdBy?: number;
};
