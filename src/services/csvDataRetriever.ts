import { CsvReader } from "./csvReader";
import { ICsvReader } from "./interfaces/ICsvReader";
import { IDataRetriever } from "./interfaces/IDataRetriever";
import { Account, Goal, GoalAggregate, AccountAggregate, DatedAmount } from "../models";
import { AccountMap } from "../private/accounts";
import moment from "moment";
import parseNum from "parse-num";


export class CsvDataRetriever implements IDataRetriever {

  private csvReader: ICsvReader = new CsvReader();
  private accountMap = AccountMap

  public getAccounts = async (): Promise<Account[]> => {
    function accountParser(data: any, returnObject: any, lookupData: any) {
      if (!returnObject) {
        returnObject = []
        for (let key in data) {
          if (lookupData[key]) {
            returnObject.push(new Account(key, lookupData[key]))
          }
        }
      }
      var date = moment(data['Month'], 'MM/DD/YYYY', false).toDate()
      if (!!date) {
        for (let key in data) {
          var account = returnObject.find(x => x.Name == key);
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
    function goalParser(data: any, returnObject: any) {
      if (!returnObject) {
        returnObject = []
      }
      returnObject.push(new Goal(data.Name, data.Amount, data.FinishDate, data.Priority, data.StartDate, data.Flexible, data.Percentage))
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
}