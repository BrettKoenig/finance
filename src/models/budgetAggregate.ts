import { Budget, Expense } from '.'

export class BudgetAggregate {
  public Budgets: Budget[]

  public constructor(budgets: Budget[], expenses?: Expense[]) {
    this.Budgets = budgets
    if(expenses) {
      this.hydrateBudgets(expenses)
    }
  }

  public hydrateBudgets = (expenses: Expense[]): void => {
    expenses.forEach((expense: Expense) => {
      const budget = this.Budgets.filter((x: Budget) => {
        return x.Name === expense.Category
      });

      if(budget.length === 1){
        budget[0].AddExpense(expense);
      }
    })
  }
}
