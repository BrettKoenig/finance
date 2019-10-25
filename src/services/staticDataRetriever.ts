import {IDataRetriever} from './interfaces/IDataRetriever'
import { Account, AccountAggregate, Goal, GoalAggregate } from "../models"


export class StaticDataRetriever implements IDataRetriever {
  public getAccounts = (): Account[] => {
    return [
      new Account("Savings Account", "Savings", 25),
      new Account("Retirement", "Retirement", 30)
    ];
  }

  public getGoals = (): Goal[] => {
    return [
      new Goal("New House", 200, new Date(2019, 11), 2, new Date(), true, 0),
      new Goal("New Car", 20, new Date(2025, 5), 1, new Date(), true, 0),
      new Goal("General Savings", 0, new Date(), 0, new Date(), false, .1)
    ];
  }

  public getGoalAggregate = (): GoalAggregate => {
    return new GoalAggregate(this.getGoals())
  }

  public getAccountAggregate = (): AccountAggregate => {
    return new AccountAggregate(this.getAccounts())
  }
}