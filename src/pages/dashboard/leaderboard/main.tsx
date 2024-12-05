import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getLeaderboardContributors } from "../contributions/actions/main";
import { LeaderBoardContributor } from "@/core/interfaces/contributor.interface";
import { ContributorsDataTable } from "./table/main";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";

export const LeaderBoard = () => {
  const {
    data: contributors,
    error,
    isLoading,
  } = useQuery<LeaderBoardContributor[]>({
    queryKey: ["contributors"],
    queryFn: getLeaderboardContributors,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-2 md:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Your rank </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              1/100
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Contributors:</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              100
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
