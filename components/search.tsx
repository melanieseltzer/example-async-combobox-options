import * as React from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import type { Product, SearchResponse } from '@/types';
import { searchProductsByName } from '@/api';

interface SearchProps {
  onSelectResult: (product: Product) => void;
}

export function Search({ onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSelectResult = (product: Product) => {
    setSearchQuery('');
    onSelectResult(product);
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search for product"
      />

      <SearchResults query={searchQuery} onSelectResult={handleSelectResult} />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  onSelectResult: SearchProps['onSelectResult'];
}

function SearchResults({ query, onSelectResult }: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<SearchResponse>({
    queryKey: ['search', debouncedSearchQuery],
    queryFn: () => searchProductsByName(debouncedSearchQuery),
    enabled,
  });

  const isLoading = enabled && isLoadingOrig;

  if (!enabled) return null;

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Searching...</div>}

      {/* TODO: proper loading aria */}
      {!isError && !isLoading && !data?.products.length && (
        <div className="p-4 text-sm">No products found</div>
      )}

      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {data?.products.map((user) => {
        const { id, title } = user;

        return (
          <CommandItem
            key={id}
            onSelect={() => onSelectResult({ id, title })}
            value={title}
          >
            {title}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}