import { IUserResponse } from "./IUser";

export interface IGroup {
    id: number;
    name: string;
    description: string;
    createdBy: IUserResponse;
    members: IUserResponse[];
    code: string;
    discontinued?: boolean;
    finalOccurrenceDate: Date;
}

export interface ITrip extends IGroup {
    destination: string;
    startDate: Date;
}

export interface IGroupForm {
    id?: number;
    name: string;
    description: string;
    finalOccurrenceDate: Date;
    createdBy?: number;
}

export interface ITripForm extends IGroupForm {
    destination: string;
    startDate: Date;
}

export interface IJoinGroup {
    code: string;
    userId: number;
}