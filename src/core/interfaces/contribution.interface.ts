export interface Contribution {
  id: number;
  name: string;
  contributedAt: string;
  canceledAt: string | null;
  infraProvider: string;
  softwareStack: string;
  region: string;
  version: string;
  cpu: number;
  ram: number;
  diskSizeGb: number;
  earnedAmount: number;
  reward: string;
  timeLeftToReward: number;
  daysContributed: string;
}
