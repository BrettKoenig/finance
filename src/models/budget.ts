import { Expense } from "."

export class Budget {
  public Name: string
  public Amount: number
  public Type: string
  public FixedExpense: boolean
  public Rollover: boolean
  public Expenses: Expense[]

  public constructor(name: string, amount: number, type: string, fixedExpense: boolean, rollover: boolean) {
    this.Name = name
    this.Amount = amount
    this.Type = type
    this.FixedExpense = fixedExpense
    this.Rollover = rollover
    this.Expenses = []
  }

  public AddExpense(expense: Expense) {
    this.Expenses.push(expense)
  }
}
