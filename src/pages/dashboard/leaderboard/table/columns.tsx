import { ColumnDef } from "@tanstack/react-table";
import { Contributor } from "@/core/interfaces/contributor.interface";

export const columns: ColumnDef<Contributor>[] = [
  {
    accessorKey: "rank",
    header: () => <div className="text-center">Rank</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.rank}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.email}</div>;
    },
  },
  {
    accessorKey: "activeContributions",
    header: () => <div className="text-center"> Active Contributions</div>,
    cell: ({ row }) => <div className="text-center capitalize">{row.original.activeContributions}</div>,
  },
  {
    accessorKey: "totalEarn",
    header: () => <div className="text-center">Total Earned</div>,
    cell: ({ row }) => <div className="text-center capitalize">{row.original.totalEarn}</div>,
  },
];
