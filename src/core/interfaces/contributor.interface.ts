export interface Contributor {
  id: number;
  email: string | null;
  totalContributions: number;
  activeContributions: number;
  earned: string;
  nextReward: string;
  daysContributed: number | null;
  totalEarn?: string;
}

export type LeaderBoardContributor = Pick<
  Contributor,
  "id" | "email" | "activeContributions" | "totalEarn"
>;
