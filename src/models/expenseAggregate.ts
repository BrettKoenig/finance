import { Expense } from ".";

export class ExpenseAggregate {
  public Expenses: Expense[];

  public constructor(expenses: Expense[]) {
    this.Expenses = expenses;
  }
}