import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTableDemo } from "../leaderboard/table/main";
import { Typography } from "@/components/ui/typography";

export const Overview = () => {
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-2 md:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Contributors</CardTitle>
          </CardHeader>
          <CardContent>25</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Earned</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NFT Badge Minted Info:</CardTitle>
          </CardHeader>
          <CardContent>100</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Others</CardTitle>
          </CardHeader>
        </Card>
      </div>
      <div className="my-4 md:my-8">
        <Typography as="h2" variant="h2">
          Leaderboard
        </Typography>
        <DataTableDemo />
      </div>
    </>
  );
};
