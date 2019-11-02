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
      var budget = this.Budgets.filter((x: Budget) => {
        return x.Name === expense.Category
      });

      if(budget.length === 1){
        budget[0].AddExpense(expense);
      }
    })
  }

  public GetBudgetsByType = (type: string): string[] => {
    return this.Budgets.filter((budget: Budget) => {
      return budget.Type === type
    }).map((budget: Budget) => {
      return budget.Name
    })
  }
}
