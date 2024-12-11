import { client } from "@/core/axios/main";
import { contributionFormInputs } from "../contribute/form/main";

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

export const addContribution = async (form: contributionFormInputs) => {
  const { data } = await client.post("/contributions", form);
  return data;
};

export const checkContribution = async (form: {
  softwareStack: string;
  credentials: { Connection_String?: string };
}) => {
  const { data } = await client.post("/contributions/info", form);
  return data;
};
