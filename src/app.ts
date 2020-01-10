import { GoogleDataRetriever } from './services/googleDataRetriever'
import asyncHandler from 'express-async-handler'
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors())

require('dotenv').config()

const dataRetriever = new GoogleDataRetriever();
let databaseMock = {}

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get('/:entity', asyncHandler(async (req, res, next) => {
  let data = null
  const entity = req.params.entity.toLowerCase()
  
  if (databaseMock && databaseMock[entity]) {
    res.status(200).send(databaseMock[entity])
    return next();
  }

  switch (entity) {
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
  
  if (data) { 
    databaseMock[entity] = data
    res.status(200).send(data) 
  } 
  else { 
    res.status(400).send({ error: 'There was an error' }) 
  }
  return next();
}))