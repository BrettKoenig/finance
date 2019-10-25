import {GoalCalculator} from './services/goalCalculator'
import {CsvDataRetriever} from './services/csvDataRetriever'
import { PriorityConsideration } from './models/priorityConsideration';

const goalCalculator = new GoalCalculator();
const dataRetriever = new CsvDataRetriever();
dataRetriever.getGoals().then((data) => {
  console.log("finished")
  console.log(data)
})
//console.log(dataRetriever.getAccounts())
// goalCalculator.calculateByDate(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate())
// goalCalculator.calculateByPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate())
// goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.None);
// goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.Light);
// goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.Heavy);
