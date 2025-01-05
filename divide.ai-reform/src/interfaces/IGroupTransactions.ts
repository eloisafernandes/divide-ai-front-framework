interface IUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

interface IDebt {
  id: number;
  amount: number;
  user: IUser;
}

interface IGroup {
  id: number;
  name: string;
  description: string;
  code: string;
  members: IUser[];
  createdBy: IUser;
  discontinued: boolean;
}

export interface IGroupTransaction {
  id: number;
  amount: number;
  description: string;
  group: IGroup;
  createdBy: IUser;
  debts: IDebt[];
  dueDate: Date;
  createdAt: Date;
}