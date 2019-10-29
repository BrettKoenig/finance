import { AccountAggregate, GoalAggregate, GoalProjection, PriorityConsideration } from '../models'

export class GoalCalculator {
  public calculateByPriority = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    goals.sortGoalsByPriority()
    return this.calculateSortedGoals(goals, accounts)
  }

  public calculateByDate = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    goals.sortGoalsByDueDate()
    return this.calculateSortedGoals(goals, accounts)
  }

  public calculateWeightedWithPriority = (
    goals: GoalAggregate,
    accounts: AccountAggregate,
    priorityConsideration: PriorityConsideration,
  ): GoalProjection[] => {
    function divideAmountEvenly(
      goals: GoalAggregate,
      amountToUse: number,
      priorityConsideration: PriorityConsideration,
    ): GoalProjection[] {
      const results: GoalProjection[] = []
      let leftover = 0

      for (const goal of goals.goals) {
        const goalProjection = new GoalProjection(goal)

        const calculatedAmount = goals.getCalculatedAmount(goal, priorityConsideration)

        const amountToSet = calculatedAmount * amountToUse

        if (amountToSet > goal.Amount) {
          goalProjection.SetPresentAmount(goal.Amount, true)
          leftover = leftover + amountToSet - goal.Amount
        } else {
          goalProjection.SetPresentAmount(amountToSet, true)
        }

        results.push(goalProjection)
      }

      const goalsToFill = results.map(x => {
        if (x.NeedsMore) {
          return x.Goal
        }
      })

      if (leftover > 0 && goalsToFill.length > 0) {
        divideAmountEvenly(new GoalAggregate(goalsToFill), leftover, priorityConsideration)
      }

      return results
    }
    const amountToUse: number = accounts.FlexibleAmountAvailable()
    const results = divideAmountEvenly(goals, amountToUse, priorityConsideration)
    results.forEach(element => {
      element.PrintProjection()
    })
    return results
  }

  private calculateSortedGoals = (goals: GoalAggregate, accounts: AccountAggregate): GoalProjection[] => {
    const results: GoalProjection[] = []
    let amountToUse: number = accounts.FlexibleAmountAvailable()

    for (const goal of goals.goals) {
      const goalProjection = new GoalProjection(goal)

      let calculatedAmount = 0
      if (amountToUse > 0) {
        if (goal.Percentage && goal.Percentage > 0) {
          calculatedAmount = amountToUse * goal.Percentage
        } else {
          calculatedAmount = amountToUse >= goal.Amount ? goal.Amount : amountToUse
        }
      }
      amountToUse -= calculatedAmount

      goalProjection.SetPresentAmount(calculatedAmount)
      results.push(goalProjection)
      goalProjection.PrintProjection()
    }
    return results
  }
}
