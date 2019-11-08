import { GoalCalculator } from './services/goalCalculator'
import { CsvDataRetriever } from './services/csvDataRetriever'
import { ExpenseAggregate, Expense, PriorityConsideration } from './models'
import moment from 'moment'
import { GoogleDataRetriever } from './services/googleDataRetriever';

const goalCalculator = new GoalCalculator();
const dataRetriever = new GoogleDataRetriever();

async function calculateGoals() {
  const expenses = await dataRetriever.getAccounts()
  console.log(expenses[0])
  // goalCalculator.calculateByDate(goalAggregate, accountAggregate)
  // goalCalculator.calculateByPriority(goalAggregate, accountAggregate)
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.None);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Light);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Heavy);

}

calculateGoals()
