import { ContributionsDataTable } from "./table/main";
import { getContributions } from "./actions/main";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";

export const Contributions = () => {
  const {
    data: contributions,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["contributions"],
    queryFn: getContributions,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <ContributionsDataTable data={contributions} columns={columns} />;
};
