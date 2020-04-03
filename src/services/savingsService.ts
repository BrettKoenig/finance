/* eslint-disable no-var */
import { Expense } from "../models/expense"
import { GraphResponse } from "../models/graphResponse"
import { getExpensesForMonth } from "./expenseService"
import { BudgetAggregate } from "../models"

export const getGraphResponseForMonth = (date: Date, expenses: Expense[], budgets: BudgetAggregate): GraphResponse => {
  const monthExpenses = getExpensesForMonth(date, expenses)

  // const uniqueCategories = [...new Set(monthExpenses.map(item => item.Category))]
  const uniqueCategories = monthExpenses.map(item => item.Category).filter((value, index, self) => self.indexOf(value) === index)

  var level1Amount = 0
  var level2Amount = 0
  let level3Amount = 0
  let incomeAmount = 0
  uniqueCategories.forEach((value: string) => {
    const category = budgets.getBudgetByName(value)
    if(value.toLowerCase() === 'income') {
      console.log('HEY')
    }
    if (!!category) {
      if(value.toLowerCase() === 'income') {
        console.log('BOOM')
      }
      const categoryExpensesAmount = monthExpenses.filter((value: Expense) => value.Category === category.Name).map(item => item.Amount).reduce((a, b) => a + b, 0)
      if (category.Type.toLowerCase() === 'income') {
        incomeAmount += categoryExpensesAmount
      } else {
        switch (category.Level) {
          case 1: {
            level1Amount += categoryExpensesAmount
            break;
          }
          case 2: {
            level2Amount += categoryExpensesAmount
            break;
          }
          case 3: {
            level3Amount += categoryExpensesAmount
            break;
          }
          default: {
            break;
          }
        }
      }
    }
  })

  const response: GraphResponse = {
    Date: date,
    Level1Amount: level1Amount,
    Level2Amount: level2Amount,
    Level3Amount: level3Amount,
    Income: incomeAmount
  }
  return response
}