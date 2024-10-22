import { Country as CountryInterface } from '@/interfaces';
import { Link } from 'react-router-dom';
import { Skeleton } from '../ui/skeleton';
import { memo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import ImageLoader from '../shared/image';

export const CountrySkeleton = () => {
  return (
    <div className="rounded-md max-sm:mx-auto max-sm:w-3/4">
      <div className="aspect-[6.5/4]">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-4 bg-neutral-white p-4 dark:bg-neutral-dark-blue">
        <Skeleton className="h-4 w-3/4" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Country = memo(({ country }: { country: CountryInterface }) => {
  const queryClient = useQueryClient();

  const prefetch = () =>
    queryClient.prefetchQuery({
      queryKey: ['country', country.name.common],
      queryFn: async (): Promise<CountryInterface[]> => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${country.name.common}?fullText=true`,
        );
        return res.json();
      },
    });

  return (
    <Link
      to={`/countries/${country.name.common}`}
      onMouseOver={prefetch}
      className="rounded-md transition-transform duration-200 ease-linear hover:scale-105 max-sm:mx-auto max-sm:w-3/4"
    >
      <ImageLoader
        src={country.flags.svg}
        alt={country.name.common}
        className="aspect-[6.5/4] w-full max-w-full object-cover"
      />
      <div className="space-y-4 bg-neutral-white p-4 dark:bg-neutral-dark-blue">
        <h3 className="line-clamp-1 text-lg font-semibold">
          {country.name.common}
        </h3>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            Population:{' '}
            <span className="text-neutral-dark-gray">{country.population}</span>
          </li>
          <li className="flex items-center gap-2">
            Region:{' '}
            <span className="text-neutral-dark-gray">{country.region}</span>
          </li>
          <li className="flex items-center gap-2">
            Capital:{' '}
            <span className="line-clamp-1 text-neutral-dark-gray">
              {country.capital}
            </span>
          </li>
        </ul>
      </div>
    </Link>
  );
});
export default Country;
