import { Goal } from "../models/goal"
import { GoalAggregate } from "../models/goalAggregate"
import { AccountAggregate } from "../models/accountAggregate"
import { GoalProjection } from "../models/goalProjection";
import { PriorityConsideration } from "../models/priorityConsideration";

export class GoalCalculator {
  public calculateByPriority = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    goals.sortGoalsByPriority();
    return this.calculateSortedGoals(goals, accounts)
  }

  public calculateByDate = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    goals.sortGoalsByDueDate();
    return this.calculateSortedGoals(goals, accounts)
  }

  public calculateWeightedWithPriority = (goals: GoalAggregate, accounts: AccountAggregate, priorityConsideration: PriorityConsideration): GoalProjection[] => {
    let results: GoalProjection[] = [];
    let amountToUse: number = accounts.FlexibleAmountAvailable();

    for (let goal of goals.goals) {
      let goalProjection = new GoalProjection(goal);
      
      const calculatedAmount = this.getCalculatedAmount(goals, goal, priorityConsideration);
      
      goalProjection.SetPresentAmount(calculatedAmount * amountToUse);
      results.push(goalProjection);
      goalProjection.PrintProjection();
    }
    return results;
  }

  private calculateSortedGoals  = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    let results: GoalProjection[] = [];
    let amountToUse: number = accounts.FlexibleAmountAvailable();

    for (let goal of goals.goals) {
      let goalProjection = new GoalProjection(goal);
      
      let calculatedAmount = 0;
      if(amountToUse > 0) {
        if(goal.Percentage) {
          calculatedAmount = amountToUse * goal.Percentage;
        } else {
          calculatedAmount = amountToUse >= goal.Amount ? goal.Amount : amountToUse;
        }
      }
      amountToUse -= calculatedAmount;
      
      goalProjection.SetPresentAmount(calculatedAmount);
      results.push(goalProjection);
      goalProjection.PrintProjection();
    }
    return results;
  }

  private getCalculatedAmount = (goals: GoalAggregate, goal: Goal, priorityConsideration: PriorityConsideration): number => {
    if(goal.Percentage) {
      return goal.Percentage;
    }

    switch(priorityConsideration) {
      case PriorityConsideration.None:
        return goals.GetWeightPercentage(goal);
      case PriorityConsideration.Light:
        return goals.GetPriorityLightWeightPercentage(goal);
      case PriorityConsideration.Heavy:
        return goals.GetPriorityHeavyWeightPercentage(goal);
      default:
        throw "Priority Consideration not implemented"
    }
  }
}