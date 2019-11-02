import { ExpenseSummary, ExpenseAggregate, BudgetAggregate } from "."

export class ExpenseSummaryAggregate {
  public ExpenseSummaries: ExpenseSummary[]

  public constructor(expenseAggregate: ExpenseAggregate, budgetAggregate: BudgetAggregate) {
    this.ExpenseSummaries = []
    const expenseBudgets = budgetAggregate.GetBudgetsByType('Expense')
    const incomeBudgets = budgetAggregate.GetBudgetsByType('Income')
    const dateStart = expenseAggregate.getEarliestDate().startOf('month');
    const dateEnd = expenseAggregate.getLatestDate().endOf('month')
    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
      const monthlyExpenses = expenseAggregate.findExpensesForMonth(dateStart.toDate());
      this.ExpenseSummaries.push(new ExpenseSummary(dateStart.toDate(), monthlyExpenses.findExpensesByCategory(expenseBudgets).Sum(), monthlyExpenses.findExpensesByCategory(incomeBudgets).Sum()))
      dateStart.add(1,'month');
   }
  }
}
