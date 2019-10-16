import { DatedAmount } from "./datedAmount";

export class Account {
  public Name: string;
  public CurrentAmount: number;
  public Type: 'Savings' | 'Retirement';
  public History: DatedAmount[];

  public constructor(name: string, currentAmount: number, type: 'Savings' | 'Retirement') {
    this.Name = name;
    this.CurrentAmount = currentAmount;
    this.Type = type;
  }
}