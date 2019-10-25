import { CsvReader } from "./csvReader";
import { ICsvReader } from "./interfaces/ICsvReader";
import { IDataRetriever } from "./interfaces/IDataRetriever";
import { Account, Goal, GoalAggregate, AccountAggregate } from "../models";
import { AccountMap } from "../../private/accounts";


export class CsvDataRetriever implements IDataRetriever {

private csvReader: ICsvReader = new CsvReader();
private accounts: any = AccountMap;

public getAccounts = (): Account[] => {

  function accountParser(data: any, returnObject: any){
    if(!returnObject){
      for (let key in data) {
        if(AccountMap[key]){
          returnObject.push(new Account(key, AccountMap[key]))
        }
      }
    }
    
  }

  return this.csvReader.readFile('/Users/bk/Desktop/Accounts.csv', accountParser)
}

public getGoals = (): Goal[] => {
  return null
}

public getGoalAggregate = (): GoalAggregate => {
  return new GoalAggregate(this.getGoals())
}

public getAccountAggregate = (): AccountAggregate => {
  return new AccountAggregate(this.getAccounts())
}
}