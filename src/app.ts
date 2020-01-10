import { GoogleDataRetriever } from './services/googleDataRetriever'
import asyncHandler from 'express-async-handler'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())

require('dotenv').config()

const dataRetriever = new GoogleDataRetriever();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

//  app.get('/expenses', asyncHandler(async (req, res, next) => {
//   const expenses = await dataRetriever.getExpenses();
//   res.status(200).json(expenses)
// }))

app.get('/:entity', asyncHandler(async (req, res, next) => {
  let data = null
  switch (req.params.entity.toLowerCase()) {
    case 'expense':
      data = await dataRetriever.getExpenses();
      break;
    case 'account':
      data = await dataRetriever.getAccounts();
      break;
    case 'goal':
      data = await dataRetriever.getGoals();
      break;
    case 'budget':
      data = await dataRetriever.getBudgets();
      break;
    case 'goalaggregate':
      data = await dataRetriever.getGoalAggregate();
      break;
    case 'accountaggregate':
      data = await dataRetriever.getAccountAggregate();
      break;
    case 'expenseaggregate':
      data = await dataRetriever.getExpenseAggregate();
      break;
    case 'budgetaggregate':
      data = await dataRetriever.getBudgetAggregate();
      break;
  }
  return data ? res.status(200).json(data) : res.status(400).json({error: 'There was an error'})
}))