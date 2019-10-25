import { DatedAmount } from "./datedAmount";

export class Account {
  public Name: string;

  public Type: 'Savings' | 'Retirement' | 'Loan';
  public History: DatedAmount[];
  private _currentAmount: number;

  get CurrentAmount() {
    return this._currentAmount !== 0 ? this._currentAmount : this.GetMostRecentHistory()
  }

  public constructor(name: string, type: 'Savings' | 'Retirement' | 'Loan', currentAmount?: number) {
    this.Name = name;
    this.Type = type;
    this._currentAmount = currentAmount || 0;
    this.History = [];
  }

  public GetMostRecentHistory(){
    if(this.History.length > 0) {
      return this.History.sort((a: DatedAmount, b: DatedAmount) => {
        return this.getTime(a.Date) - this.getTime(b.Date)
      })[0].Amount
    }
    return 0
  }

  private getTime(date?: Date): number {
    return date != null ? date.getTime() : 0;
  }
}