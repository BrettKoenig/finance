import moment from 'moment'

export class Goal {
  public Name: string
  public Amount: number
  public FinishDate: Date
  public Priority: number
  public StartDate: Date
  public Flexible: boolean
  public Percentage: number

  public constructor(
    name: string,
    amount: number,
    finishDate: Date,
    priority: number,
    startDate: Date,
    flexible: boolean,
    percentage: number,
  ) {
    this.Name = name
    this.StartDate = startDate
    this.Flexible = flexible
    if (amount == 0) {
      if (!percentage || percentage > 1 || percentage <= 0) {
        throw 'Goal percentage must be between 0 and 1'
      }
      this.Percentage = percentage
    } else {
      this.Amount = amount
      this.FinishDate = finishDate
      this.Priority = priority
    }
  }

  private AmountOverDaysUntilDue = (): number => {
    if (!this.FinishDate) {
      return 0
    }
    return this.Amount / moment(this.FinishDate, 'MM/DD/YYYY', false).diff(moment(), 'days')
  }

  public GetWeight = (): number => {
    return this.Percentage ? this.Percentage : this.AmountOverDaysUntilDue()
  }
}
