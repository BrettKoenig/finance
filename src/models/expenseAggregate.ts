import { Expense } from '.'
import moment from 'moment'
import fuzz from 'fuzzball'
import { getExpenseByDateRange, getExpensesForCategory } from '../services/expenseService'

export class ExpenseAggregate {
  public Expenses: Expense[]

  public constructor(expenses?: Expense[]) {
    this.Expenses = expenses
  }

  public findExpenseByDateRange = (startDate: moment.Moment, endDate: moment.Moment): ExpenseAggregate => {
    return new ExpenseAggregate(getExpenseByDateRange(startDate, endDate, this.Expenses))
  }

  public findExpensesForMonth = (month: Date): ExpenseAggregate => {
    const startDate = moment(month).startOf('month')
    const endDate = moment(month).endOf('month')
    return this.findExpenseByDateRange(startDate, endDate)
  }

  public findExpensesByCategory = (categoryName: string): ExpenseAggregate => {
    return new ExpenseAggregate(getExpensesForCategory(categoryName, this.Expenses))
  }

  public findExpensesByDescription = (description: string, exactMatch?: false): ExpenseAggregate => {
    return new ExpenseAggregate(this.Expenses.filter((expense: Expense) => {
      return exactMatch ? expense.Description === description : fuzz.token_set_ratio(expense.Description, description) > 65
    }))
  }

  public findExpensesByAmount = (low: number, high: number): ExpenseAggregate => {
    return new ExpenseAggregate(this.Expenses.filter((expense: Expense) => {
      return expense.Amount >= low && expense.Amount <= high
    }))
  }

  public getDateOfFirstExpense = (): Date => {
    return new Date(Math.min.apply(null, this.Expenses.map((expense) => new Date(expense.Date))));
  }
}
