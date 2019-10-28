import moment from "moment";
import { Goal } from "./goal";
import parseNum from "parse-num";

export class GoalProjection {
  public Goal: Goal;
  public AdjustedWeight: number;
  private _presentAmount: number;

  get PresentAmount() {
    return parseFloat(parseNum(this._presentAmount))
  }

  public constructor(goal: Goal){
    this.Goal = goal;
  }

  public SetPresentAmount = (amount: number, shouldAdd?: boolean) => {
    this._presentAmount = shouldAdd && this._presentAmount ? amount + this._presentAmount : amount;
  }

  public PercentageFulfilled = (): number => {
    return this.PresentAmount / this.Goal.Amount * 100;
  }

  public NeedsMore = (): boolean => {
    return (this.Goal.Percentage == 0 && this.PresentAmount < this.Goal.Amount)
  }

  public IsAheadOfSchedule = (): boolean =>{
    return this.ProjectedFinishedDate().toDate() < this.Goal.FinishDate;
  }

  public CurrentRatePerMonth = (): number => {
    return this.PresentAmount / this.MonthsBetween(this.Goal.StartDate)
  }

  public AmountPerMonthNeededToHitGoal = (): number => {
    return (this.Goal.Amount - this.PresentAmount) / this.MonthsBetween(this.Goal.FinishDate)
  }

  public ProjectedFinishedDate = (): moment.Moment => {
    if(this.CurrentRatePerMonth() > 0){
      const monthsLeft = (this.Goal.Amount - this.PresentAmount) / this.CurrentRatePerMonth();
      return moment().add(monthsLeft, 'months');
    }
    return this.EXAGGERATED_FUTURE_DATE;
  }

  public FormattedProjectedFinishDate = (projectedFinish?: moment.Moment): string => {
    projectedFinish = projectedFinish || this.ProjectedFinishedDate()
    if(projectedFinish.isBefore(this.EXAGGERATED_FUTURE_DATE.subtract(1, 'year'))){
      return this.ProjectedFinishedDate().format("MM/DD/YYYY");
    }
    return "Invalid date";
  }

  public PrintProjection = (): void => {
    var displayString = this.Goal.Name + ": \n\tAmount:" + this.PresentAmount.toFixed(2);
    if(!this.Goal.Percentage){
      displayString += "/" + this.Goal.Amount + "\n";
      displayString += "\tPercentage Fulfilled: " + this.PercentageFulfilled().toFixed(2) + "%\n";
      displayString += "\tCurrent Rate/Month: $" + this.CurrentRatePerMonth().toFixed(2) + "\n";
      displayString += "\tNeeded/Month for Goal: $" + this.AmountPerMonthNeededToHitGoal().toFixed(2) + "\n";
      displayString += "\tCurrent Projected Finish: " + this.FormattedProjectedFinishDate();
    }
    displayString += "\n---------------------------------------\n";
    displayString += "---------------------------------------\n";
    displayString += "---------------------------------------\n";
    console.log(displayString)
  }

  private MonthsBetween = (date: Date): number => {
    const months = moment().diff(moment(date, "MM/DD/YYYY", false), 'months');
    return months === 0 ? 1 : Math.abs(months);
  }

  private EXAGGERATED_FUTURE_DATE: moment.Moment = moment().add(10000, 'years');
}