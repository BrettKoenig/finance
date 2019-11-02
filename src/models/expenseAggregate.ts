import { Expense } from '.'
import moment from 'moment'

export class ExpenseAggregate {
  public Expenses: Expense[]

  public constructor(expenses: Expense[]) {
    this.Expenses = expenses
  }

  public findExpenseByDateRange = (startDate: moment.Moment, endDate: moment.Moment): ExpenseAggregate => {
    return new ExpenseAggregate(this.Expenses.filter((expense: Expense) => {
      var compareDate = moment(expense.Date)
      return compareDate.isBetween(startDate, endDate, 'days', '[]')
    }))
  }

  public findExpensesForMonth = (month: Date): ExpenseAggregate => {
    const startDate = moment(month).startOf('month')
    const endDate = moment(month).endOf('month')
    return this.findExpenseByDateRange(startDate, endDate)
  }

  public findExpensesByCategory = (categoryName: string): ExpenseAggregate => {
    return new ExpenseAggregate(this.Expenses.filter((expense: Expense) => {
      return expense.Category.trim().toLowerCase() === categoryName.trim().toLowerCase()
    }))
  }

  public findExpensesByDescription = (description: string, exactMatch?: false): ExpenseAggregate => {
    return new ExpenseAggregate(this.Expenses.filter((expense: Expense) => {
      return exactMatch ? expense.Description === description : expense.Description.toLowerCase().trim() === description.toLowerCase().trim() 
    }))
  }
}
