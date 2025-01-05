import { Group } from "./Group";
import { User } from "./User";

export type GroupTransaction = {
    id: number;
    description: string;
    amount: number;
    createdBy: User;
    debts: Debt[];
    group: Group;
};

export type Debt = {
    user: User;
    groupTransaction: GroupTransaction; 
    amount: number;
    paidAt: Date;
}
