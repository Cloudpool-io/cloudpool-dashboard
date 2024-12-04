import { Typography } from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { getLeaderboardContributors } from "../contributions/actions/main";
import { LeaderBoardContributor } from "@/core/interfaces/contributor.interface";
import { ContributorsDataTable } from "./table/main";
import { columns } from "./table/columns";

export const LeaderBoard = () => {
  const [contributors, setContributors] = useState<LeaderBoardContributor[]>(
    [],
  );

  useEffect(() => {
    getLeaderboardContributors().then((data) => setContributors(data));
  }, []);

  console.log(contributors);
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
      <ContributorsDataTable data={contributors || []} columns={columns} />
    </>
  );
};
