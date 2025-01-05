import { User } from "./User";

export type GroupStatus = 'active' | 'inactive';

export type Group = {
    id: number;
    name: string;
    description: string;
    status: GroupStatus;
    creationDate: Date;
    users: User[];
    creator: User;
};
