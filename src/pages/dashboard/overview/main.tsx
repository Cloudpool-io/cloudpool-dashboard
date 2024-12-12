import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Contributions } from "../contributions/main";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { AwardIcon, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipWrapper } from "@/components/ui/tooltip";
import { FC } from "react";
import { useNavigate } from "react-router";
interface RewardProps {
  color: string;
  label: string;
}
const Reward: FC<RewardProps> = ({ color, label }) => {
  return (
    <div className="relative inline-flex flex-1 items-center rounded-lg border p-1">
      {/* Badge Icon */}
      <AwardIcon color={color} size={24} className="opacity-50" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gray-400 opacity-40" />
      {/* Label */}
      <span className="ml-2 text-sm text-gray-500">{label}</span>
    </div>
  );
};

const RewardList = () => {
  return (
    <div className="flex items-center gap-4">
      <Reward color="#cd7f32" label="Bronze" />
      <Reward color="#c0c0c0" label="Silver" />
      <Reward color="#ffd700" label="Gold" />
    </div>
  );
};

export const Overview = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="wrap grid grid-cols-[1fr] gap-2 lg:grid-cols-[1fr_1fr_1fr]">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex items-center justify-between gap-2">
              <div>Total Contribution Info:</div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Typography as="h2" variant="h2" className="text-center">
              {user?.earned} points / {user?.daysContributed} days
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-col gap-1">
            <CardTitle className="inline-flex items-center justify-between gap-2">
              <div>Contributor Ranking:</div>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Typography as="h2" variant="h2" className="text-center">
              {user?.rank}
            </Typography>
            <Button className="flex-grow" onClick={() => navigate("/dashboard/leaderboard")}>
              Go to Leaderboard
            </Button>
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
            <RewardList />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer">
                    <Button className="flex-grow" disabled={Number(user?.daysContributed) < 30}>
                      Mint
                    </Button>
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
        <Contributions />
      </div>
    </>
  );
};
