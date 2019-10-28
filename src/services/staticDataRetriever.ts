import {IDataRetriever} from './interfaces/IDataRetriever'
import { Account, AccountAggregate, Goal, GoalAggregate, Expense } from "../models"


export class StaticDataRetriever implements IDataRetriever {
  public getAccounts = (): Promise<Account[]> => {
    return new Promise((resolve, reject) => {
      resolve([
        new Account("Savings Account", "Savings", 25),
        new Account("Retirement", "Retirement", 30)
      ])
    }) 
  }

  public getGoals = (): Promise<Goal[]> => {
    return new Promise((resolve, reject) => {
      resolve([
      new Goal("New House", 200, new Date(2019, 11), 2, new Date(), true, 0),
      new Goal("New Car", 20, new Date(2025, 5), 1, new Date(), true, 0),
      new Goal("General Savings", 0, new Date(), 0, new Date(), false, .1)
    ])
  })
  }

  public getExpenses = (): Promise<Expense[]> => {
    return new Promise((resolve, reject) => {
      resolve([
      new Expense("Food out", 200, new Date(2019, 10, 1), "Restaurants"),
      new Expense("Movie out", 20, new Date(2028, 5), "Entertainment"),
      new Expense("Pay day", 10, new Date(2018, 1, 1), "Income")
    ])
  })
  }

  public getGoalAggregate = (): Promise<GoalAggregate> => {
    return new Promise((resolve, reject) => {
      this.getGoals().then((goals) => {
        resolve(new GoalAggregate(goals))
      })
    })
  }

  public getAccountAggregate = (): Promise<AccountAggregate> => {
    return new Promise((resolve, reject) => {
      this.getAccounts().then((accounts) => {
        resolve(new AccountAggregate(accounts))
      })
    })
  }
}