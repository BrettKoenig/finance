import moment = require("moment")
import { Expense } from "../models/expense"

export const getExpenseByDateRange = (startDate: moment.Moment, endDate: moment.Moment, expenses: Expense[]): Expense[] => {
  return expenses.filter((expense: Expense) => {
    const compareDate = moment(expense.Date)
    return compareDate.isBetween(startDate, endDate, 'days', '[]')
  })
}

export const getExpensesForMonth = (month: Date, expenses: Expense[]): Expense[] => {
  const startDate = moment(month).startOf('month')
  const endDate = moment(month).endOf('month')
  return getExpenseByDateRange(startDate, endDate, expenses)
}

export const getExpensesForCategory = (categoryName: string, expenses: Expense[]): Expense[] => {
  return expenses.filter((expense: Expense) => {
    return expense.Category.trim().toLowerCase() === categoryName.trim().toLowerCase()
  })
}