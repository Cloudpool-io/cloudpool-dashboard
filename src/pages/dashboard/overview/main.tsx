import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Contributions } from "../contributions/main";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { AwardIcon, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipWrapper } from "@/components/ui/tooltip";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export const Overview = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="wrap grid grid-cols-[1fr] gap-2 md:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex items-center justify-between gap-2">
              <div>Total Contribution Info:</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2">
              {user?.earned} points / {user?.daysContributed} days
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex items-center justify-between gap-2">
              <div>NFT Badge Info:</div>
              <TooltipWrapper content="Contribute a resource for at least 30 days to earn a Contributor NFT badge.">
                <Info />
              </TooltipWrapper>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <AwardIcon className="bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild className="w-full">
                  <div className="flex w-full flex-auto">
                    <Button disabled={Number(user?.daysContributed) < 30}>Mint</Button>
                  </div>
                </TooltipTrigger>
                <TooltipContent>Your are not eligible yet</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardContent>
        </Card>
      </div>

      <div className="my-4 md:my-8">
        <Typography as="h2" variant="h2">
          Contributions
        </Typography>
        <ScrollArea className="w-96 whitespace-nowrap sm:w-full">
          <Contributions />
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
