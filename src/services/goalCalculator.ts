import { AccountAggregate, Goal, GoalAggregate, GoalProjection, PriorityConsideration } from "../models"

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
    function divideAmountEvenly(goals: GoalAggregate, amountToUse: number, priorityConsideration: PriorityConsideration): any {
      let results: GoalProjection[] = [];
      var leftover = 0;

      for (let goal of goals.goals) {
        let goalProjection = new GoalProjection(goal);

        const calculatedAmount = goals.getCalculatedAmount(goal, priorityConsideration);

        var amountToSet = calculatedAmount * amountToUse;

        if (amountToSet > goal.Amount) {
          goalProjection.SetPresentAmount(goal.Amount, true);
          leftover = leftover + amountToSet - goal.Amount;
        } else {
          goalProjection.SetPresentAmount(amountToSet, true)
        }

        results.push(goalProjection);
      }

      const goalsToFill = results.map(x => {
        if (x.NeedsMore) {
          return x.Goal
        }
      });

      if(leftover > 0 && goalsToFill.length > 0) {
        divideAmountEvenly(new GoalAggregate(goalsToFill), leftover, priorityConsideration)
      }

      return results;
    }
    let amountToUse: number = accounts.FlexibleAmountAvailable();
    const results = divideAmountEvenly(goals, amountToUse, priorityConsideration);
    results.forEach(element => {
      element.PrintProjection()
    });
    return results;
  }

  private calculateSortedGoals = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    let results: GoalProjection[] = [];
    let amountToUse: number = accounts.FlexibleAmountAvailable();

    for (let goal of goals.goals) {
      let goalProjection = new GoalProjection(goal);

      let calculatedAmount = 0;
      if (amountToUse > 0) {
        if (goal.Percentage && goal.Percentage > 0) {
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
}