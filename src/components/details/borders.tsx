import { Country } from '@/interfaces';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const BorderCountries = ({ borders }: { borders: string[] }) => {
  const queryClient = useQueryClient();

  const prefetch = (name: string) => {
    queryClient.prefetchQuery({
      queryKey: ['country', name],
      queryFn: async (): Promise<Country[]> => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`,
        );
        return res.json();
      },
      staleTime: Infinity,
    });
  };

  const { data } = useQueries({
    queries: borders.map((border) => ({
      queryKey: ['border', border],
      queryFn: async (): Promise<Country> => {
        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${border}`,
        );
        const data = (await response.json()) as Country[];
        return data[0];
      },
      staleTime: Infinity,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
      };
    },
  });

  return (
    <ul className="flex flex-wrap gap-2 gap-y-4">
      {data?.map((country) => (
        <li key={country?.name.common} className="text-neutral-dark-gray">
          <Link
            to={`/countries/${country?.name.common}`}
            className="rounded bg-neutral-white p-2 text-sm shadow dark:bg-neutral-dark-blue"
            onMouseOver={() => prefetch(country?.name.common || '')}
          >
            {country?.name.common}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default BorderCountries;
