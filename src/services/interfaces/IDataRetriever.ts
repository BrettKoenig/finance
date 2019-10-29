import { Account, AccountAggregate, Expense, ExpenseAggregate, Goal, GoalAggregate } from "../../models";

export interface IDataRetriever {
  getAccounts(): Promise<Account[]>;
  getGoals(): Promise<Goal[]>;
  getExpenses(): Promise<Expense[]>
  getGoalAggregate(): Promise<GoalAggregate>;
  getAccountAggregate(): Promise<AccountAggregate>;
  getExpenseAggregate(): Promise<ExpenseAggregate>
}