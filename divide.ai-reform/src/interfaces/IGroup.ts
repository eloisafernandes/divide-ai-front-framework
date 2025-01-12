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
  
  export interface IGroupForm {
    id?: number;
    name: string;
    description: string;
    createdBy?: number;
    occurrenceDate: Date;
  }
  
  export interface IReform extends IGroup {
    area: number;
    local: string;
    priority: ReformPriority;
  }
  
  export interface IReformForm extends IGroupForm {
    area: number;
    local: string;
    priority: ReformPriority;
  }
  
  export interface IJoinGroup {
    code: string;
    userId: number;
  }
  
  export enum ReformPriority {
    URGENT = "Urgente",
    HIGH = "Alta",
    MEDIUM = "Média",
    LOW = "Baixa",
  }
  