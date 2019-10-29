import { Budget } from '.'

export class BudgetAggregate {
  public Budgets: Budget[]

  public constructor(budgets: Budget[]) {
    this.Budgets = budgets
  }
}
