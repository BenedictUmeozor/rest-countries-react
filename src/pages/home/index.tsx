import Country, { CountrySkeleton } from '@/components/home/country';
import SearchInput from '@/components/home/search';
import CustomSelect from '@/components/home/select';
import Container from '@/components/shared/container';
import { Country as CountryInterface } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

const Home = () => {
  const [region, setRegion] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const { data, isPending, isError } = useQuery({
    queryKey: ['countries'],
    queryFn: async (): Promise<CountryInterface[]> => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      return res.json();
    },
    staleTime: Infinity,
  });

  const onRegionChange = useCallback((value: string | null) => {
    setRegion(value);
  }, []);

  const onQueryChange = useCallback((value: string) => {
    setQuery(value);
  }, []);

  const countries = useMemo(() => {
    let filtered = data;

    if (region) {
      filtered = filtered?.filter(
        (country) => country.region.toLowerCase() === region.toLowerCase(),
      );
    }

    if (query) {
      filtered = filtered?.filter(
        (country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase()) ||
          country.name.official.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [data, region, query]);

  return (
    <section className="py-8">
      <Container className="space-y-12">
        <div className="flex flex-col gap-y-8 lg:flex-row lg:items-center lg:justify-between">
          <SearchInput query={query} setQuery={onQueryChange} />
          <CustomSelect region={region} setRegion={onRegionChange} />
        </div>
        {!countries?.length && !isPending && !isError && (
          <div className="grid h-80 place-items-center">
            <h2 className="text-base font-medium">
              No results returned for your search
            </h2>
          </div>
        )}
        {isError && (
          <div className="grid h-80 place-items-center">
            <h2 className="text-base font-medium text-red-600">
              There is a problem with the server. Try again later
            </h2>
          </div>
        )}
        {isPending && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <CountrySkeleton key={index} />
            ))}
          </div>
        )}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {countries?.map((country) => (
            <Country key={country.name.common} country={country} />
          ))}
        </div>
      </Container>
    </section>
  );
};
export default Home;
