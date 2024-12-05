import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Contributions } from "../contributions/main";

export const Overview = () => {
  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-2 md:gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Rewards Info</CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              25
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NFT Badge Minted Info:</CardTitle>
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
          Contributions
        </Typography>
        <Contributions />
      </div>
    </>
  );
};
