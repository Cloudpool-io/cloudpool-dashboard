import { Typography } from "@/components/ui/typography";
import { DataTableDemo } from "./table/main";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const LeaderBoard = () => {
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
      <DataTableDemo />;
    </>
  );
};
