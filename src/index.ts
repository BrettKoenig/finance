import { GoalCalculator } from './services/goalCalculator'
import { CsvDataRetriever } from './services/csvDataRetriever'
import { PriorityConsideration } from './models/priorityConsideration';

const goalCalculator = new GoalCalculator();
const dataRetriever = new CsvDataRetriever();

async function calculateGoals() {
  // const goalAggregate = await dataRetriever.getGoalAggregate();
  // const accountAggregate = await dataRetriever.getAccountAggregate();
  const budgetAggregate = await dataRetriever.getBudgetAggregate();
  console.log(budgetAggregate.Budgets[0])
  // const expenses = await dataRetriever.getExpenses()
  // goalCalculator.calculateByDate(goalAggregate, accountAggregate)
  // goalCalculator.calculateByPriority(goalAggregate, accountAggregate)
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.None);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Light);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Heavy);

}

calculateGoals()
