import { ColumnDef } from "@tanstack/react-table";
import { Contribution } from "@/core/interfaces/contribution.interface";
import { ContributionsActions } from "./actions";
import { softwareStackLogosMap } from "@/core/maps/main";

export const columns: ColumnDef<Contribution>[] = [
  {
    accessorKey: "Contribution ID",
    header: () => <div className="text-center">Contribution ID</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.id}</div>;
    },
  },
  {
    accessorKey: "cpu",
    header: () => <div className="text-center">CPU / RAM / Disk size</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.ram} core(s) / {row.original.ram} GB / {row.original.diskSizeGb} GB
      </div>
    ),
  },
  {
    accessorKey: "softwareStack",
    header: () => <div className="text-center">Software stack</div>,
    cell: ({ row }) => {
      const softwareStackLogo = softwareStackLogosMap.get(row.original.softwareStack);

      return (
        <div className="flex items-center justify-center gap-2 text-center capitalize">
          <img width="20" height="20" src={softwareStackLogo} />
          {row.original.softwareStack}
        </div>
      );
    },
  },
  {
    accessorKey: "daysContributed",
    header: () => <div className="text-center">Days contributed</div>,
    cell: ({ row }) => <div className="text-center capitalize">{row.original.daysContributed}</div>,
  },
  {
    accessorKey: "earnedAmount",
    header: () => <div className="text-center">Rewards earned</div>,
    cell: ({ row }) => <div className="text-center capitalize">{row.original.earnedAmount}</div>,
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ContributionsActions contribution={row.original} />;
    },
  },
];
