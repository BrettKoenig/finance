import { GoalCalculator } from './services/goalCalculator'
import { CsvDataRetriever } from './services/csvDataRetriever'
import { PriorityConsideration } from './models/priorityConsideration';
import moment from 'moment';
import { ExpenseAggregate, Expense } from './models';

const goalCalculator = new GoalCalculator();
const dataRetriever = new CsvDataRetriever();

async function calculateGoals() {
  const goalAggregate = await dataRetriever.getGoalAggregate();
  const accountAggregate = await dataRetriever.getAccountAggregate();
  const budgetAggregate = await dataRetriever.getBudgetAggregate();
  const expenses = await dataRetriever.getExpenses()

  const expenseAggregate = await dataRetriever.getExpenseAggregate()

  expenseAggregate.findExpensesForMonth(moment("01/01/2017", "MM/DD/YYYY").toDate())

  const januaryExpenses = expenseAggregate.findExpenseByDateRange(moment("01/01/2018"), moment("01/09/2018"))
  januaryExpenses.forEach((expense: Expense) => {
    console.log(expense.Date)
    console.log(expense.Description)
    console.log(expense.Amount)
    console.log(expense.Category)
    console.log('---------')
  })
  // goalCalculator.calculateByDate(goalAggregate, accountAggregate)
  // goalCalculator.calculateByPriority(goalAggregate, accountAggregate)
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.None);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Light);
  // goalCalculator.calculateWeightedWithPriority(goalAggregate, accountAggregate, PriorityConsideration.Heavy);

}

calculateGoals()
