import { Category } from "@/types/Category";

export interface ITransacion  {
    id?: number;
    amount: number;
    description: string;
    categoryId: number;
    userId: number;
    paidAt?: Date | null;
};

export interface ITransacionResponse  {
    id: number;
    amount: number;
    description: string;
    category?: Category;
    categoryId?: number;
    userId: number;
    paidAt?: Date | null;
    createdAt?: Date;
};
