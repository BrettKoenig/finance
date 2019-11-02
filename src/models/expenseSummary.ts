export class ExpenseSummary {
  public Date: Date
  public TotalExpenses: number
  public TotalIncome: number

  public constructor(date: Date, expenses: number, income: number) {
    this.Date = date
    this.TotalExpenses = expenses
    this.TotalIncome = income
  }
}
