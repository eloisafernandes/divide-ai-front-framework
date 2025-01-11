import { IUserResponse } from "./IUser";

export interface IGroup {
    id: number;
    name: string;
    description: string;
    createdBy: IUserResponse;
    members: IUserResponse[];
    code: string;
    discontinued?: boolean;
    occurrenceDate: Date;
}

export interface ITrip extends IGroup {
    destination: string;
    endDate: Date;
}

export interface IGroupForm {
    id?: number;
    name: string;
    description: string;
    createdBy?: number;
    occurrenceDate: Date;
}

export interface ITripForm extends IGroupForm {
    destination: string;
    endDate: Date;
}

export interface IJoinGroup {
    code: string;
    userId: number;
}