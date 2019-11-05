import { CsvDataRetriever } from './services/csvDataRetriever'
import asyncHandler from 'express-async-handler'
import express from 'express'

const app = express();

const dataRetriever = new CsvDataRetriever();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

 app.get('/', asyncHandler(async (req, res, next) => {
  const bar = await dataRetriever.getExpenseAggregate();
  res.send(bar)
}))