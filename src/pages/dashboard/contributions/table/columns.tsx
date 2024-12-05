import { ColumnDef } from "@tanstack/react-table";
import { Contribution } from "@/core/interfaces/contribution.interface";
import { Region } from "@/core/enums/Region.enum";
import { ContributionsActions } from "./actions";

export const columns: ColumnDef<Contribution>[] = [
  {
    accessorKey: "name",
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => {
      return <div className="text-center">{row.original.name}</div>;
    },
  },
  {
    accessorKey: "infraProvider",
    header: () => <div className="text-center">Infra provider</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.infraProvider}</div>
    ),
  },
  {
    accessorKey: "region",
    header: () => <div className="text-center">Region</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">
        {row.original.region as Region}
      </div>
    ),
  },
  {
    accessorKey: "cpu",
    header: () => <div className="text-center">CPU</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.cpu}</div>
    ),
  },
  {
    accessorKey: "ram",
    header: () => <div className="text-center">RAM</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.ram}</div>
    ),
  },
  {
    accessorKey: "diskSizeGb",
    header: () => <div className="text-center">Disk size</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.diskSizeGb}</div>
    ),
  },
  {
    accessorKey: "softwareStack",
    header: () => <div className="text-center">Software stack</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.softwareStack}</div>
    ),
  },
  {
    accessorKey: "version",
    header: () => <div className="text-center">Version</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.original.version}</div>
    ),
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
