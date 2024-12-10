export interface Contributor {
  id: number;
  email: string | null;
  totalContributions: number;
  activeContributions: number;
  earned: string;
  nextReward: string;
  daysContributed: number | null;
  totalEarn?: string;
  rank?: number;
}
