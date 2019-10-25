import { ICsvReader } from "./interfaces/ICsvReader";
import csv from 'csv-parser'
import fs from 'fs'

export class CsvReader implements ICsvReader {
  public readFile = async <T>(filepath, parserFn, lookupData?): Promise<any> => {
    return new Promise(function (resolve, reject) {
      var counter = 0;
      var returnObject = null;
      fs.createReadStream(filepath)
        .pipe(csv())
        .on('data', (row) => {
          returnObject = parserFn(row, returnObject, lookupData)
          counter++
        })
        .on('error', (error) => {
          reject(error)
        })
        .on('end', () => {
          resolve(returnObject)
        });
    })
  }
}