export class DatedAmount {
  public Date: Date
  public Amount: number

  public constructor(date: Date, amount: number) {
    this.Date = date
    this.Amount = amount
  }
}
