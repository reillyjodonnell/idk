'use client';

import React, { useState } from 'react';
import { Check, LucideIcon, PlusCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/badge';
import { Button } from '@/components/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/popover';
import { Separator } from '@/components/separator';

interface DataTableFacetedFilter<TData, TValue> {
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: LucideIcon;
  }[];
}

export function TagSelector<TData, TValue>({
  title,
  options,
}: DataTableFacetedFilter<TData, TValue>) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {selectedValues.length}
                </Badge>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          defaultChecked
          className="w-[200px] justify-center items-center p-0"
        >
          <Command>
            <CommandInput placeholder={title} />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => {
                        if (isSelected) {
                          const filteredArr = selectedValues.filter(
                            (str) => str !== option.value
                          );
                          setSelectedValues(filteredArr);
                        } else {
                          setSelectedValues((prev) => [...prev, option.value]);
                        }
                      }}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          isSelected
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check className={cn('h-4 w-4')} />
                      </div>
                      {option.icon && (
                        <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              {selectedValues.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      onSelect={() => setSelectedValues([])}
                      className="justify-center text-center"
                    >
                      Clear filters
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="flex flex-wrap">
        {selectedValues.length > 0 ? (
          selectedValues.map((value) => (
            <Badge
              className="w-fit flex-wrap relative px-4 py-1 mx-1 my-1"
              key={value}
              variant="default"
            >
              {value}
              <X
                onClick={() =>
                  setSelectedValues((prev) =>
                    prev.filter((item) => item !== value)
                  )
                }
                className="w-4 h-4 ml-1 stroke-[2px] cursor-pointer"
              />
            </Badge>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <span className="text-ring my-2">No tags selected</span>
          </div>
        )}
      </div>
    </>
  );
}
