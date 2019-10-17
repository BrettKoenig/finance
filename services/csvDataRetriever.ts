import * as csv from 'csv-parser'
import * as fs from 'fs'

var counter = 0;
fs.createReadStream('/Users/bk/Desktop/Accounts.csv')
  .pipe(csv())
  .on('data', (row) => {
    console.log(row)
    counter++
    if(counter === 2){
      throw "done"
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });