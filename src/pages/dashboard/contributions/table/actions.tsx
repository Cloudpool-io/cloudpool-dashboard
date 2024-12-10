import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { removeContribution } from "../actions/main";
import { Contribution } from "@/core/interfaces/contribution.interface";
import { FC } from "react";
import { useToast } from "@/hooks/use-toast";
import { CustomAxiosError } from "@/core/interfaces/error.interface";
import { queryClient } from "@/main";

interface ContributionsActionsProps {
  contribution: Contribution;
}
export const ContributionsActions: FC<ContributionsActionsProps> = ({ contribution }) => {
  const { toast } = useToast();
  const { mutate } = useMutation({
    mutationFn: removeContribution,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Contribution has been cancelled",
      });
      queryClient.invalidateQueries({ queryKey: ["contributions"] });
    },
    onError: (error: CustomAxiosError) => {
      if (error.response?.data.code) {
        toast({
          title: "Failed",
          description: error.response.data.message,
          variant: "destructive",
        });
      }
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => mutate(String(contribution.id))}>Cancel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
