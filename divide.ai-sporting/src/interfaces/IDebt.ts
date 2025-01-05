import { IUserResponse } from "./IUser";

export interface IDebt{
    id: number;
    amount: number;
    user: IUserResponse;
    createdAt: Date;
    paidAt: Date;
};

export interface IDebtRequest {
    id?: number;
    amount: number;
    userId?: number;
    paidAt?: Date;
};

