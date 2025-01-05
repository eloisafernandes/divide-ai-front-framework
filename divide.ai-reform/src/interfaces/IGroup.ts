import { IUserResponse } from "./IUser";

export interface IGroup {
    id: number;
    name: string;
    description: string;
    createdBy: IUserResponse;
    members: IUserResponse[];
    code: string;
    discontinued?: boolean;
}

export interface IGroupForm {
    id?: number;
    name: string;
    description: string;
    createdBy?: number;
}

export interface IJoinGroup {
    code: string;
    userId: number;
}