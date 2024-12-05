import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Contributions } from "../contributions/main";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { AwardIcon, Info } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip";

export const Overview = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-2 md:gap-4">
        <Card>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex gap-2 items-center justify-between ">
              <div>Total Rewards Info:</div>
              <TooltipWrapper content="Total rewards info is composed as xx/yy where xx is a total earned points and yy is a total days contributed">
                <Info />
              </TooltipWrapper>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              {user?.earned} / {user?.daysContributed} days
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex gap-2 items-center justify-between">
              <div>NFT Badge Minted Info:</div>
              <TooltipWrapper content="Contribute a resource for at least 30 days to earn a Contributor NFT badge.">
                <Info />
              </TooltipWrapper>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AwardIcon className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" />
            <Button disabled={Number(user?.daysContributed) < 30}>Mint</Button>
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
