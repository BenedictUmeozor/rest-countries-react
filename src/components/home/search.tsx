import { SearchIcon } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) => {
  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
  }, 300);

  return (
    <div className="relative h-12 w-full shadow lg:max-w-md">
      <input
        type="text"
        className="h-full w-full rounded-md bg-neutral-white pl-14 pr-4 focus:outline-none focus:ring-1 focus:ring-primary dark:bg-neutral-dark-blue"
        placeholder="Search for a country..."
        defaultValue={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchIcon
        width={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 transform"
      />
    </div>
  );
};
export default SearchInput;
