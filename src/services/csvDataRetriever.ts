import { CsvReader } from './csvReader'
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
  ExpenseSummaryAggregate,
} from '../models'
import { AccountMap } from '../private/accounts'
import moment from 'moment'
import parseNum from 'parse-num'

export class CsvDataRetriever implements IDataRetriever {
  private csvReader: ICsvReader = new CsvReader()
  private accountMap = AccountMap

  public getAccounts = async (): Promise<Account[]> => {
    function accountParser(data: any, returnObject: Account[], lookupData: any): Account[] {
      if (!returnObject) {
        returnObject = []
        for (const key in data) {
          if (lookupData[key]) {
            returnObject.push(new Account(key, lookupData[key]))
          }
        }
      }
      const date = moment(data['Month'], 'MM/DD/YYYY', false).toDate()
      if (!!date) {
        for (const key in data) {
          const account = returnObject.find(x => x.Name == key)
          if (account) {
            account.History.push(new DatedAmount(date, parseNum(data[key])))
          }
        }
      }
      return returnObject
    }
    return await this.csvReader.readFile('/Users/bk/Desktop/Accounts.csv', accountParser, this.accountMap)
  }

  public getGoals = async (): Promise<Goal[]> => {
    function goalParser(data: any, returnObject: Goal[]): Goal[] {
      if (!returnObject) {
        returnObject = []
      }
      returnObject.push(
        new Goal(
          data.Name,
          data.Amount,
          data.FinishDate,
          data.Priority,
          data.StartDate,
          data.Flexible,
          data.Percentage,
        ),
      )
      return returnObject
    }

    return await this.csvReader.readFile('/Users/bk/Desktop/GoalsCSV.csv', goalParser)
  }

  public getGoalAggregate = async (): Promise<GoalAggregate> => {
    return new GoalAggregate(await this.getGoals())
  }

  public getAccountAggregate = async (): Promise<AccountAggregate> => {
    return new AccountAggregate(await this.getAccounts())
  }

  public getExpenses = async (): Promise<Expense[]> => {
    function expenseParser(data: any, returnObject: Expense[]): Expense[] {
      if (!returnObject) {
        returnObject = []
      }
      returnObject.push(new Expense(data.Name, data.Price, data.Date, data.Category))
      return returnObject
    }

    return await this.csvReader.readFile('/Users/bk/Desktop/Expense - Expenses.csv', expenseParser)
  }

  public getExpenseAggregate = async (): Promise<ExpenseAggregate> => {
    return new ExpenseAggregate(await this.getExpenses())
  }

  public getBudgets = async (): Promise<Budget[]> => {
    function budgetParser(data: any, returnObject: Budget[]): Budget[] {
      if (!returnObject) {
        returnObject = []
      }
        returnObject.push(
          new Budget(
            data.Category,
            !Number.isNaN(parseNum(data['Monthly Budget'])) ? parseNum(data['Monthly Budget']) : 0,
            data.Type,
            !!data['Fixed Expense (Exclude from weekly report)'],
            !!data.Rollover,
          ),
        )
      return returnObject
    }

    return await this.csvReader.readFile('/Users/bk/Desktop/Expense - Budgets.csv', budgetParser)
  }

  public getBudgetAggregate = async (): Promise<BudgetAggregate> => {
    return new BudgetAggregate(await this.getBudgets())
  }

  public getExpenseSummaryAggregate = async (): Promise<ExpenseSummaryAggregate> => {
    return new ExpenseSummaryAggregate(await this.getExpenseAggregate(), await this.getBudgetAggregate())
  }
}
