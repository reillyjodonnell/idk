'use client';

import React from 'react';
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
import type { Tag } from '@prisma/client';

interface DataTableFacetedFilter<TData, TValue> {
  title?: string;
  options: Tag[];
  tags: any[];
  setTags: React.Dispatch<React.SetStateAction<TValue[]>>;
}

export function TagSelector<TData, TValue>({
  title,
  options,
  tags: selectedValues,
  setTags: setSelectedValues,
}: DataTableFacetedFilter<TData, TValue>) {
  return (
    <div className="flex justify-start items-center py-4 ">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="lg" className="h-12 border ">
            <PlusCircle className="mr-2 h-4 w-4" />
            {title}
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal "
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
                  const isSelected = selectedValues.includes(option.name);
                  return (
                    <CommandItem
                      key={option.id}
                      onSelect={() => {
                        if (isSelected) {
                          const filteredArr = selectedValues.filter(
                            (str) => str !== option.name
                          );
                          setSelectedValues(filteredArr);
                        } else {
                          setSelectedValues((prev: any) => [
                            ...prev,
                            option.name,
                          ]);
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
                      <span>{option.name}</span>
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
      {/* <div className="flex flex-wrap">
        {selectedValues.length === 0 ? (
          <span className="mx-2">👈 Give this post a tag!</span>
        ) : null}
       {selectedValues.length > 0
          ? selectedValues.map((value) => (
              <Badge
                className="w-fit flex-wrap relative px-4 py-1 mx-1 my-1"
                key={value}
                variant="outline"
              >
                <span className="font-semibold px-2">{value}</span>
                <X
                  onClick={() =>
                    setSelectedValues((prev) =>
                      prev.filter((item) => item !== value)
                    )
                  }
                  className="w-4 h-4 stroke-[2px] cursor-pointer"
                />
              </Badge>
            ))
          : null} 
      </div> */}
    </div>
  );
}
