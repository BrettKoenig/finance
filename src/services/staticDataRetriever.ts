import { IDataRetriever } from './interfaces/IDataRetriever'
import {
  Account,
  AccountAggregate,
  Budget,
  BudgetAggregate,
  Expense,
  ExpenseAggregate,
  Goal,
  GoalAggregate,
} from '../models'

export class StaticDataRetriever implements IDataRetriever {
  public getAccounts = (): Promise<Account[]> => {
    return new Promise(resolve => {
      resolve([new Account('Savings Account', 'Savings', 25), new Account('Retirement', 'Retirement', 30)])
    })
  }

  public getGoals = (): Promise<Goal[]> => {
    return new Promise(resolve => {
      resolve([
        new Goal('New House', 200, new Date(2019, 11), 2, new Date(), true, 0),
        new Goal('New Car', 20, new Date(2025, 5), 1, new Date(), true, 0),
        new Goal('General Savings', 0, new Date(), 0, new Date(), false, 0.1),
      ])
    })
  }

  public getExpenses = (): Promise<Expense[]> => {
    return new Promise(resolve => {
      resolve([
        new Expense('Food out', 200, new Date(2019, 10, 1), 'Restaurants'),
        new Expense('Movie out', 20, new Date(2028, 5), 'Entertainment'),
        new Expense('Pay day', 10, new Date(2018, 1, 1), 'Income'),
      ])
    })
  }

  public getBudgets = (): Promise<Budget[]> => {
    return new Promise(resolve => {
      resolve([
        new Budget('Restaurants', 200, 'Expense', false, true, 2),
        new Budget('Entertainment', 20, 'Expense', false, true, 3),
        new Budget('Income', 10, 'Income', false, false),
      ])
    })
  }

  public getGoalAggregate = (): Promise<GoalAggregate> => {
    return new Promise(resolve => {
      this.getGoals().then(goals => {
        resolve(new GoalAggregate(goals))
      })
    })
  }

  public getAccountAggregate = (): Promise<AccountAggregate> => {
    return new Promise(resolve => {
      this.getAccounts().then(accounts => {
        resolve(new AccountAggregate(accounts))
      })
    })
  }

  public getExpenseAggregate = (): Promise<ExpenseAggregate> => {
    return new Promise(resolve => {
      this.getExpenses().then(expenses => {
        resolve(new ExpenseAggregate(expenses))
      })
    })
  }

  public getBudgetAggregate = (): Promise<BudgetAggregate> => {
    return new Promise(resolve => {
      this.getBudgets().then(budgets => {
        resolve(new BudgetAggregate(budgets))
      })
    })
  }
}
