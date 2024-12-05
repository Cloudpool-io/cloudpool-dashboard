import { client } from "@/core/axios/main";

export const getContributions = async () => {
  const { data } = await client.get("/contributions");
  return data;
};

export const getLeaderboardContributors = async () => {
  const { data } = await client.get("/contributors/leaderboard");
  return data;
};

export const removeContribution = async (id: string) => {
  const { data } = await client.delete(`/contributions/${id}`);
  return data;
};
