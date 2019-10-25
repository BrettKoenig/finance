export interface ICsvReader {
  readFile<T>(filepath, parserFn, lookupData?): Promise<any>
}