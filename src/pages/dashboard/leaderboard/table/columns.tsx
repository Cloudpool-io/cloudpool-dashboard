import { MoreHorizontal } from "lucide-react";

export const data: Contributor[] = [
  {
    id: "m5gr84i9",
    rank: 1,
    earned: 0.05,
    staked: 0.1,
  },
  {
    id: "3u1reuv4",
    rank: 2,
    earned: 0.03,
    staked: 0.05,
  },
  {
    id: "derv1ws0",
    rank: 3,
    earned: 0.01,
    staked: 0.02,
  },
  {
    id: "5kma53ae",
    rank: 4,
    earned: 0.01,
    staked: 0.02,
  },
  {
    id: "bhqecj4p",
    rank: 5,
    earned: 0.02,
    staked: 0.03,
  },
];

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
export type Contributor = {
  id: string;
  rank: number;
  staked: number;
  earned: number;
};

export const columns: ColumnDef<Contributor>[] = [
  {
    accessorKey: "rank",
    header: () => <div className="text-center">Rank</div>,
    cell: () => {
      return <div className="text-center">#1</div>;
    },
  },
  {
    accessorKey: "staked",
    header: () => <div className="text-center">Staked</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.getValue("staked")}</div>;
    },
  },
  {
    accessorKey: "earned",
    header: "Reward",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("earned")}</div>
    ),
  },
  {
    id: "actions",
    header: "Actions",

    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy contributor ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View contribution details</DropdownMenuItem>
            <DropdownMenuItem>Cancel</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
