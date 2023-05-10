'use client';
import { PopoverTrigger } from '@radix-ui/react-popover';
import { Popover, PopoverContent } from './popover';
import { Button } from './button';
import { Settings2, Smile } from 'lucide-react';
import { Label } from './label';
import { Input } from './input';

export default function ReactionPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-10 rounded-full p-0">
          <Smile className="h-4 w-4" />
          <span className="sr-only">React</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="flex">
          <div className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg">
            <span>👍</span>
          </div>
          <div className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg">
            <span>👎</span>
          </div>
          <div className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg">
            <span>🔥</span>
          </div>
          <div className="p-2 cursor-pointer hover:bg-pink-500 rounded-lg">
            <span>👀</span>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
