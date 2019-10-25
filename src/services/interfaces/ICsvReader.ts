export interface ICsvReader {
  readFile<T>(filepath, parserFn): any
}