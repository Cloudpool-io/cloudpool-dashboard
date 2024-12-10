import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeaderboardContributors } from "../contributions/actions/main";
import { Contributor } from "@/core/interfaces/contributor.interface";
import { ContributorsDataTable } from "./table/main";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthProvider";

export const LeaderBoard = () => {
  const { user } = useAuth();
  const {
    data: contributors,
    error,
    isLoading,
  } = useQuery<Contributor[]>({
    queryKey: ["contributors"],
    queryFn: getLeaderboardContributors,
  });

  console.log(user?.rank);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className="wrap grid grid-cols-[1fr] gap-2 md:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Your rank </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              {user?.rank}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Contributors:</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              {contributors?.length || 0}
            </Typography>
          </CardContent>
        </Card>
      </div>
      <div className="my-4 md:my-8">
        <Typography as="h2" variant="h2">
          TOP CONTRIBUTORS
        </Typography>
        <ContributorsDataTable data={contributors || []} columns={columns} />
      </div>
    </>
  );
};
