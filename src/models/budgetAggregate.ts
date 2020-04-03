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
      const budget = this.getBudgetByName(expense.Category)
      budget.AddExpense(expense);
    })
  }

  public getLevelForBudget = (budgetName: string): number => {
    return this.getBudgetByName(budgetName).Level;
  }

  public getBudgetByName = (budgetName: string): Budget => {
    return this.Budgets.filter((x: Budget) => {
      return x.Name === budgetName
    })[0];
  }
}

