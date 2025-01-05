import { User } from "@/types/User";
import { IDebt, IDebtRequest } from "./IDebt";
import { IGroup } from "./IGroup";
import { IUser } from "./IUser";

export interface IGroupTransactionRequest  {
    id?: number;
    amount: number;
    description: string;
    dueDate: Date;
    groupId?: number;
    debts: IDebtRequest[];
    createdBy?: number;
};
