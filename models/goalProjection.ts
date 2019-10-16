import * as moment from "moment";
import { Goal } from "./goal";

export class GoalProjection {
  public Goal: Goal;
  public AdjustedWeight: number;
  private PresentAmount: number;

  public constructor(goal: Goal){
    this.Goal = goal;
  }

  public SetPresentAmount = (amount: number) =>{
    this.PresentAmount = amount;
  }

  public PercentageFulfilled = (): number => {
    return this.PresentAmount / this.Goal.Amount;
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
    const monthsLeft = (this.Goal.Amount - this.PresentAmount) / this.CurrentRatePerMonth();
    return moment().add(monthsLeft, 'months');
  }

  public PrintProjection = (): void => {
    var displayString = this.Goal.Name + ": \n\tAmount:" + this.PresentAmount.toFixed(2);
    if(!this.Goal.Percentage){
      displayString += "/" + this.Goal.Amount + "\n";
      displayString += "\tPercentage Fulfilled: " + this.PercentageFulfilled().toFixed(2) + "%\n";
      displayString += "\tCurrent Rate/Month: $" + this.CurrentRatePerMonth().toFixed(2) + "\n";
      displayString += "\tNeeded/Month for Goal: $" + this.AmountPerMonthNeededToHitGoal().toFixed(2) + "\n";
      displayString += "\tCurrent Projected Finish: " + this.ProjectedFinishedDate().format("MM/DD/YYYY");
    }
    displayString += "\n---------------------------------------\n";
    displayString += "---------------------------------------\n";
    displayString += "---------------------------------------\n";
    console.log(displayString)
  }

  private MonthsBetween = (date: Date): number => {
    const months = moment().diff(date, 'months');
    return months === 0 ? 1 : Math.abs(months);
  }
}