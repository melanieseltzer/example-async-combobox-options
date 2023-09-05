'use client';

import * as React from 'react';
import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import type { Product } from '@/types';
import { Search } from '@/components/search';

const POPOVER_WIDTH = 'w-[250px]';

export function ComboboxDemo() {
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Product | undefined>();

  const handleSetActive = React.useCallback((product: Product) => {
    setSelected(product);
    setOpen(false);
  }, []);

  const displayName = selected ? selected.title : 'Select product';

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn('justify-between', POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn('p-0', POPOVER_WIDTH)}>
        <Search onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
