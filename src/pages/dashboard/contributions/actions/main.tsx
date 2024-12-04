import { client } from "@/core/axios/main";

export const getContributions = async () => {
  const { data } = await client.get("/contributions");
  return data;
};

export const getLeaderboardContributors = async () => {
  const { data } = await client.get("/contributors/leaderboard");
  return data;
};
