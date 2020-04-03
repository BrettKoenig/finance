import { GoogleDataRetriever } from './services/googleDataRetriever'
import asyncHandler from 'express-async-handler'
import express from 'express'
import cors from 'cors'
import { ExpenseAggregate, BudgetAggregate, Budget } from './models';
import moment from 'moment';
import { getGraphResponseForMonth } from './services/savingsService';
import { GraphResponse } from './models/graphResponse';

const app = express();
app.use(cors())

require('dotenv').config()

const dataRetriever = new GoogleDataRetriever();
// let databaseMock = {}
let expenseAggregate: ExpenseAggregate = new ExpenseAggregate()
// let budgets: Budget[] = []
let budgetAggregate: BudgetAggregate = null

async function getExpenseAggregate(): Promise<ExpenseAggregate> {
  return await dataRetriever.getExpenseAggregate();
}

getExpenseAggregate().then((data) => {
  expenseAggregate = data
})

// // async function getBudgets(): Promise<Budget[]> {
// //   return await dataRetriever.getBudgets();
// // }

// // getBudgets().then((data) => {
// //   budgets = data
// // })

async function getBudgetAggregate(): Promise<BudgetAggregate> {
  return await dataRetriever.getBudgetAggregate(true);
}

getBudgetAggregate().then((data) => {
  budgetAggregate = data
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

// app.get('/:entity', asyncHandler(async (req, res, next) => {
//   let data = null
//   const entity = req.params.entity.toLowerCase()
  
//   if (databaseMock && databaseMock[entity]) {
//     res.status(200).send(databaseMock[entity])
//     return next();
//   }

//   switch (entity) {
//     case 'expense':
//       data = await dataRetriever.getExpenses();
//       break;
//     case 'account':
//       data = await dataRetriever.getAccounts();
//       break;
//     case 'goal':
//       data = await dataRetriever.getGoals();
//       break;
//     case 'budget':
//       data = budgets;
//       break;
//     case 'goalaggregate':
//       data = await dataRetriever.getGoalAggregate();
//       break;
//     case 'accountaggregate':
//       data = await dataRetriever.getAccountAggregate();
//       break;
//     case 'expenseaggregate':
//       data = expenseAggregate;
//       break;
//     case 'budgetaggregate':
//       data = budgetAggregate;
//       break;
//   }
  
//   if (data) { 
//     databaseMock[entity] = data
//     res.status(200).send(data) 
//   } 
//   else { 
//     res.status(400).send({ error: 'There was an error' }) 
//   }
//   return next();
// }))

// app.get('/expensesByMonth/:date', asyncHandler(async (req, res, next) => {
//   const date = new Date(req.params.date)
//   res.status(200).send(expenseAggregate.findExpensesForMonth(date))
//   return next()
// }))

app.get('/a', (req, res, next) => {
  const firstDate = expenseAggregate.getDateOfFirstExpense()
  const monthsSinceFirst = Math.ceil(Math.abs(moment().diff(moment(firstDate), 'months', true)))
  let array: GraphResponse[] = []
  for (let index = 0; index < monthsSinceFirst; index++) {
    array.push(getGraphResponseForMonth(moment(firstDate).startOf('month').add(index, 'M').toDate(), expenseAggregate.Expenses, budgetAggregate))
  }
  //res.status(200).send(getGraphResponseForMonth(moment(firstDate).startOf('month').toDate(), expenseAggregate.Expenses, budgetAggregate))
  res.status(200).send(array)
  return next()
  // return next();
})