import { Goal } from "../../models/goal";
import { Account } from "../../models/account";
import { GoalAggregate } from "../../models/goalAggregate";
import { AccountAggregate } from "../../models/accountAggregate";

export interface IDataRetriever {
  getAccounts(): Promise<Account[]>;
  getGoals(): Promise<Goal[]>;
  getGoalAggregate(): Promise<GoalAggregate>;
  getAccountAggregate(): Promise<AccountAggregate>;
}