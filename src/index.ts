import { GoalCalculator } from './services/goalCalculator'
import { CsvDataRetriever } from './services/csvDataRetriever'
import { ExpenseAggregate, Expense, PriorityConsideration } from './models'
import moment from 'moment'

const goalCalculator = new GoalCalculator();
const dataRetriever = new CsvDataRetriever();

async function calculateGoals() {
  const goalAggregate = await dataRetriever.getGoalAggregate()
  const accountAggregate = await dataRetriever.getAccountAggregate()
  const budgetAggregate = await dataRetriever.getBudgetAggregate()
  const expenseAggregate = await dataRetriever.getExpenseAggregate()

  const expenseSummaryAggregate = await dataRetriever.getExpenseSummaryAggregate()

  expenseSummaryAggregate.ExpenseSummaries.forEach(element => {
    console.log(moment(element.Date).format("MM/YYYY"))
    console.log(element.TotalExpenses)
    console.log(element.TotalIncome)
    console.log('----------------')
  });

  // goalCalculator.calculateByDate(goalAggregate, accountAggregate)
  // goalCalculator.calculateByPriority(goalAggregate, accountAggregate)
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.None);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Light);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Heavy);

}

calculateGoals()
