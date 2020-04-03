/* eslint-disable prefer-const */
import { GoogleReader } from './googleReader'
import { ICsvReader } from './interfaces/ICsvReader'
import { IDataRetriever } from './interfaces/IDataRetriever'
import {
  Account,
  Budget,
  BudgetAggregate,
  Expense,
  ExpenseAggregate,
  Goal,
  GoalAggregate,
  AccountAggregate,
  DatedAmount,
} from '../models'
import moment from 'moment'
import parseNum from 'parse-num'

export class GoogleDataRetriever implements IDataRetriever {
  private csvReader: ICsvReader = new GoogleReader()

  public getAccounts = async (): Promise<Account[]> => {
    let accounts = []
    const accountResponse = await this.csvReader.readFile('AccountType', null)
    accountResponse.forEach(x => {
      accounts.push(new Account(x[0], x[1]))
    })

    const monthlyResponse = await this.csvReader.readFile('Monthly', null)

    let accountsIndex = []

    monthlyResponse.forEach((x: string[], index: number) => {
      if (index == 0) {
        x.forEach((y: string, index2: number) => {
          const account = accounts.find(x => x.Name == y)
          if (account) {
            accountsIndex.push({ Name: account.Name, Index: index2 })
          }
        })
      } else {
        const date = moment(x[0], 'MM/DD/YYYY', false).toDate()
        if (!!date) {
          x.forEach((y: string, index2: number) => {
            const accountName = accountsIndex.find(x => x.Index == index2)
            if (accountName) {
              const fullAccount = accounts.find(x => x.Name === accountName.Name)
              if(fullAccount) {
                fullAccount.History.push(new DatedAmount(date, parseNum(y)))
              }
            }
          })
        }
      }
    })
    return accounts;
  }

  public getGoals = async (): Promise<Goal[]> => {
    let returnObject = []
    const response = await this.csvReader.readFile('GoalsCSV', null)
    response.forEach(x => {
      if (!isNaN(parseNum(x[1]))) {
        returnObject.push(new Goal(x[0], parseNum(x[1]), x[2], x[3], x[4], x[5], x[6]))
      }
    })
    return returnObject
  }

  public getGoalAggregate = async (): Promise<GoalAggregate> => {
    return new GoalAggregate(await this.getGoals())
  }

  public getAccountAggregate = async (): Promise<AccountAggregate> => {
    return new AccountAggregate(await this.getAccounts())
  }

  public getExpenses = async (): Promise<Expense[]> => {
    let returnObject = []
    const response = await this.csvReader.readFile('Expenses', null)
    response.forEach(x => {
      if (!isNaN(parseNum(x[1]))) {
        returnObject.push(new Expense(x[2], parseNum(x[1]), x[0], x[3]))
      }
    })
    return returnObject
  }

  public getExpenseAggregate = async (): Promise<ExpenseAggregate> => {
    return new ExpenseAggregate(await this.getExpenses())
  }

  public getBudgets = async (includeIncome?: boolean): Promise<Budget[]> => {
    let returnObject = []
    const response = await this.csvReader.readFile('Budgets', null)
    response.forEach(x => {
      if (!isNaN(parseNum(x[1]))) {
        returnObject.push(new Budget(x[0], parseNum(x[1]), x[7], !!x[5], !!x[6], +x[8]))
      } else if (includeIncome) {
        returnObject.push(new Budget(x[0], 0, x[7], !!x[5], !!x[6], +x[8]))
      }
    })
    return returnObject
  }

  public getBudgetAggregate = async (includeIncome?: boolean): Promise<BudgetAggregate> => {
    return new BudgetAggregate(await this.getBudgets(includeIncome))
  }
}
