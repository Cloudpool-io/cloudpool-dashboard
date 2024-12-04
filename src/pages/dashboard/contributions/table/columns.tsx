import { MoreHorizontal } from "lucide-react";

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
import { Contribution } from "@/core/interfaces/contribution.interface";
import { Region } from "@/core/enums/Region.enum";

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
              onClick={() =>
                navigator.clipboard.writeText(String(row.original.id))
              }
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
