import { Check, ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "./button";
import { FC } from "react";


interface ComboboxProps {
  fieldValue: string;
  options: string[];
  onChange: (value: string) => void;
}

export const Combobox: FC<ComboboxProps> = ({
  fieldValue,
  options,
  onChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "justify-between",
            !fieldValue && "text-muted-foreground",
          )}
        >
          {fieldValue
            ? options.find((option) => option === fieldValue)
            : "Select Infrastructure Provider"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No infrastructure provider found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  value={option}
                  key={option}
                  onSelect={() => {
                    onChange(option);
                  }}
                >
                  {option}
                  <Check
                    className={cn(
                      "ml-auto",
                      option === fieldValue ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
