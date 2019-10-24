import {GoalCalculator} from './services/goalCalculator'
import {StaticDataRetriever} from './services/staticDataRetriever'
import { PriorityConsideration } from './models/priorityConsideration';

const goalCalculator = new GoalCalculator();
const dataRetriever = new StaticDataRetriever();

goalCalculator.calculateByDate(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate())
//goalCalculator.calculateByPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate())
//goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.None);
//goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.Light);
//goalCalculator.calculateWeightedWithPriority(dataRetriever.getGoalAggregate(), dataRetriever.getAccountAggregate(), PriorityConsideration.Heavy);
