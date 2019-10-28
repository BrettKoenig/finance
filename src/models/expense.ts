export class Expense {
  public Description: string;
  public Date: Date;
  public Category: string;
  private Amount: number;

  public constructor(description: string, amount: number, date: Date, category: string) {
    this.Date = date;
    this.Amount = amount;
    this.Description = description;
    this.Category = category;
  }
}