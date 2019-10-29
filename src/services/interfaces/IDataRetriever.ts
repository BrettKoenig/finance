import { Account, AccountAggregate, Budget, BudgetAggregate, Expense, ExpenseAggregate, Goal, GoalAggregate } from "../../models";

export interface IDataRetriever {
  getAccounts(): Promise<  Account[]>;
  getGoals(): Promise<  Goal[]>;
  getExpenses(): Promise<  Expense[]>;
  getBudgets(): Promise<  Budget[]>;
  getGoalAggregate(): Promise<GoalAggregate>;
  getAccountAggregate(): Promise<AccountAggregate>;
  getExpenseAggregate(): Promise<ExpenseAggregate>;
  getBudgetAggregate(): Promise<BudgetAggregate>;
}