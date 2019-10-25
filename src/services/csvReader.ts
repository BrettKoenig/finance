import { ICsvReader } from "./interfaces/ICsvReader";
import csv from 'csv-parser'
import fs from 'fs'

export class CsvReader implements ICsvReader {
  public readFile = <T>(filepath, parserFn): any => {
    var counter = 0;
    var returnObject = null;
    fs.createReadStream(filepath)
      .pipe(csv())
      .on('data', (row) => {
        returnObject = parserFn(row, returnObject)
        counter++
        if (counter === 2) {
          throw "done"
        }
      })
      .on('end', () => {
        console.log('CSV file successfully processed');
        return returnObject;
      });
  }
}