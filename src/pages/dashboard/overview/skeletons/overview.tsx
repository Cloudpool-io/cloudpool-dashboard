import { Skeleton } from "@/components/ui/skeleton";

export const OverviewCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr_1fr] gap-2 md:gap-4">
      <Skeleton className="h-20 w-72" />
      <Skeleton className="h-20 w-72" />
    </div>
  );
};
