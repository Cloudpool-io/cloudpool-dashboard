import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FC, useState } from "react";
import { VercelLogoIcon } from "@radix-ui/react-icons";
import { infrastuctureProvidersLogosMap } from "@/core/maps/main";

interface ComboboxProps {
  defaultValue: string;
  options: { value: string; label: string; image?: string }[];
  notFoundMessage: string;
  selectedOptionPlaceholder: string;
  selectedValuePlaceholder?: string;
  onInputChange: (value: string) => void;
  onValueChange: (value: string) => void;
}

export const Combobox: FC<ComboboxProps> = ({
  options,
  selectedValuePlaceholder,
  selectedOptionPlaceholder,
  notFoundMessage,
  defaultValue,
  onInputChange,
  onValueChange,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [input, setInput] = useState(defaultValue);

  const handleInputChange = (inputValue: string) => {
    setInput(inputValue);
    onInputChange(inputValue);

    const matchedOption = options.find((option) => option.value === inputValue);
    if (matchedOption) {
      setValue(matchedOption.value);
      onValueChange(matchedOption.value);
      onInputChange(matchedOption.value);
    } else {
      setValue(inputValue);
    }
  };

  const handleOptionSelect = (selectedValue: string) => {
    setValue(selectedValue);
    setInput("");
    onValueChange(selectedValue);
    setOpen(false);
  };
  console.log(value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="inline-flex items-center gap-2">
            {value && <img src={infrastuctureProvidersLogosMap.get(value)} width={20} height={20} />}
            {value || selectedValuePlaceholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="PopoverContent p-0">
        <Command>
          <CommandInput placeholder={selectedOptionPlaceholder} value={input} onValueChange={handleInputChange} />
          <CommandList>
            <CommandEmpty>{notFoundMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value} onSelect={() => handleOptionSelect(option.value)}>
                  <Check className={cn("mr-2 h-4 w-4", option.value === value ? "opacity-100" : "opacity-0")} />
                  {option.image ? (
                    <img src={option.image} width="20" height="20" />
                  ) : (
                    <VercelLogoIcon className="h-[20px] w-[20px]" />
                  )}
                  {option.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
