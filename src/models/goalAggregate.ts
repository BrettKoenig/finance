import { Goal } from "./goal";
import moment = require("moment");

export class GoalAggregate {
  public goals: Goal[];
  
  public allGoalAmountSum = (): number => {
    return this.goals.map(x => x.Amount).reduce((sum, element) => sum + element, 0)
  }

  public sortGoalsByPriority = (): void => {
    this.goals = this.goals.sort((a: Goal, b: Goal) => {return a.Priority ? a.Priority - b.Priority : -1})
  }

  public sortGoalsByDueDate(): void {
    this.goals = this.goals.sort((a: Goal, b: Goal) => {
        return this.getTime(a.FinishDate) - this.getTime(b.FinishDate);
    });
  }

  public constructor(goals: Goal[]){
    this.goals = goals;
  }

  public GetPriorityLightWeightPercentage(goal: Goal) {
    if(goal.Percentage) {
      return goal.Percentage;
    }

    const maxPriority = Math.max(...this.goals.filter(x => !x.Percentage).map(x => x.Priority));
    const weight = goal.GetWeight() * ((maxPriority - goal.Priority + 1) / maxPriority);

    return weight / this.allGoalWeightLightPrioritySum();
  }

  public GetPriorityHeavyWeightPercentage(goal: Goal) {
    if(goal.Percentage) {
      return goal.Percentage;
    }

    const weight = goal.GetWeight() / goal.Priority

    return weight / this.allGoalWeightHeavyPrioritySum();
  }

  public GetWeightPercentage(goal: Goal) {
    if(goal.Percentage) {
      return goal.Percentage;
    }

    return goal.GetWeight() / this.allGoalWeightNoPrioritySum();
  }

  private allGoalWeightNoPrioritySum = (): number => {
    const nonPercentageWeights = this.goals.filter(x => !x.Percentage).map(x => x.GetWeight()).reduce((sum, element) => sum + element, 0);
    const percentageWeights = this.goals.filter(x => x.Percentage).map(x => x.GetWeight()).reduce((sum, element) => sum + element, 0);

    return nonPercentageWeights / (1 - percentageWeights);
  }

  private allGoalWeightLightPrioritySum = (): number => {
    const maxPriority = Math.max(...this.goals.filter(x => !x.Percentage).map(x => x.Priority));
    const nonPercentageWeights = this.goals.filter(x => !x.Percentage).map(x => x.GetWeight() * ((maxPriority - x.Priority + 1) / maxPriority)).reduce((sum, element) => sum + element, 0);
    const percentageWeights = this.goals.filter(x => x.Percentage).map(x => x.GetWeight()).reduce((sum, element) => sum + element, 0);

    return nonPercentageWeights / (1 - percentageWeights);
  }

  private allGoalWeightHeavyPrioritySum = (): number => {
    const nonPercentageWeights = this.goals.filter(x => !x.Percentage).map(x => x.GetWeight() / x.Priority).reduce((sum, element) => sum + element, 0);
    const percentageWeights = this.goals.filter(x => x.Percentage).map(x => x.GetWeight()).reduce((sum, element) => sum + element, 0);

    return nonPercentageWeights / (1 - percentageWeights);
  }

  private getTime(date?: Date): number {
    if(typeof date == "string") {
      date = moment(date, 'MM/DD/YYYY', false).toDate()
    }
    return date != null ? date.getTime() : 0;
  }
}