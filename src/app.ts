import { CsvDataRetriever } from './services/csvDataRetriever'
import asyncHandler from 'express-async-handler'
const cors = require('cors');
const express = require('express');

const app = express();

const dataRetriever = new CsvDataRetriever();

app.use(cors());
app.options('*', cors());

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

 app.get('/', asyncHandler(async (req, res, next) => {
  const bar = await dataRetriever.getExpenseSummaryAggregate()
  res.send(bar)
}))