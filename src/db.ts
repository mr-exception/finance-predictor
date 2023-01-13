import Dexie, { Table } from "dexie";

export interface ITransaction {
  amount: number;
  description: string;
  date: number;
}

export class DBDexie extends Dexie {
  transactions!: Table<ITransaction>;

  constructor() {
    super("predictor");
    this.version(1).stores({
      transactions: "++id, amount, description, date",
    });
  }
}

export const db = new DBDexie();
