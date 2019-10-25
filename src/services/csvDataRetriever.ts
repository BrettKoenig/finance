import { CsvReader } from "./csvReader";
import { ICsvReader } from "./interfaces/ICsvReader";
import { IDataRetriever } from "./interfaces/IDataRetriever";
import { Account, Goal, GoalAggregate, AccountAggregate, DatedAmount } from "../models";
import { AccountMap } from "../../private/accounts";
import moment from "moment";


export class CsvDataRetriever implements IDataRetriever {

  private csvReader: ICsvReader = new CsvReader();

  public getAccounts = (): Account[] => {

    function accountParser(data: any, returnObject: any) {
      if (!returnObject) {
        returnObject = []
        for (let key in data) {
          if (AccountMap[key]) {
            returnObject.push(new Account(key, AccountMap[key]))
          }
        }
      }
      var date = moment(data['Month']).toDate()
      for (let key in data) {
        var account = returnObject.find(x => x.Name == key);
        if (account) {
          account.History.push(new DatedAmount(date, data[key]))
        }
      }
      return returnObject
    }

    return this.csvReader.readFile('/Users/bk/Desktop/Accounts.csv', accountParser)
  }

  public getGoals = (): Promise<Goal[]> => {
    function goalParser(data: any, returnObject: any) {
      if (!returnObject) {
        returnObject = []
      }
      returnObject.push(new Goal(data[0], data[1], data[2], data[3], data[4], data[5], data[6]))
      return returnObject
    }
var localCsvReader = this.csvReader;
    return new Promise<Goal[]>(function (resolve, reject) {
      localCsvReader.readFile('/Users/bk/Desktop/GoalsCSV.csv', goalParser).then((data) => {
        console.log("BRETT")
        console.log(data)
        resolve(data)
      });
    });
  }

  // public getGoalAggregate = (): GoalAggregate => {
  //   return new GoalAggregate(this.getGoals())
  // }

  public getAccountAggregate = (): AccountAggregate => {
    return new AccountAggregate(this.getAccounts())
  }
}