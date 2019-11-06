import { GoogleDataRetriever } from './services/googleDataRetriever'
import asyncHandler from 'express-async-handler'
import express from 'express'

const app = express();

const dataRetriever = new GoogleDataRetriever();

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

 app.get('/', asyncHandler(async (req, res, next) => {
  const bar = await dataRetriever.getExpenses();
  res.send(bar)
}))