import {Account} from "./account"

export class AccountAggregate {
  public Accounts: Account[];
  private emergencyAmountNeeded: number = 10;

  public FlexibleAmountAvailable = (): number => {
    return Math.max(0, this.NonRetirementTotal() - this.emergencyAmountNeeded);
  }

  private NonRetirementTotal = (): number => {
    return this.Accounts.filter(account => account.Type == 'Savings').map(x => x.CurrentAmount).reduce((sum, element) => sum + element, 0)
  }

  public constructor(accounts: Account[]) {
    this.Accounts = accounts;
  }
}