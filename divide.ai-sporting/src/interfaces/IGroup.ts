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

export interface IJoinGroup {
    code: string;
    userId: number;
}
export interface ISporting extends IGroup {
    local: string;
    sportingsModalities: SportingsModalities;
  }
  
  export interface ISportingForm extends IGroupForm {
    local: string;
    sportingsModalities: SportingsModalities;
  }

  export enum SportingsModalities {
    FOOTBALL = "Futebol",
    BASKETBALL = "Basquete",
    TENNIS = "Tênis",
    SWIMMING = "Natação",
    VOLLEYBALL = "Vôlei",
    ATHLETICS = "Atletismo",
    GYMNASTICS = "Ginástica",
    BOXING = "Boxe",
    CYCLING = "Ciclismo",
    MARTIAL_ARTS = "Artes Marciais",
    RUGBY = "Rugby",
    CRICKET = "Cricket",
    BASEBALL = "Beisebol",
    HOCKEY = "Hóquei",
    GOLF = "Golfe",
    SKIING = "Esqui",
    SURFING = "Surfe",
    BADMINTON = "Badminton",
  }
  
  