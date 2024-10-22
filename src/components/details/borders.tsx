import { Country } from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BorderCountries = ({ borders }: { borders: string[] }) => {
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!borders.length) return;
    const promises = borders.map(async (border): Promise<Country[]> => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
      return res.json();
    });

    Promise.all(promises).then((data) => setBorderCountries(data.flat()));
  }, [borders]);

  return (
    <ul className="flex flex-wrap gap-2 gap-y-4">
      {borderCountries.map((country) => (
        <li key={country.name.common} className="text-neutral-dark-gray">
          <Link
            to={`/countries/${country.name.common}`}
            className="rounded bg-neutral-white p-2 text-sm shadow dark:bg-neutral-dark-blue"
            onMouseOver={() =>
              queryClient.prefetchQuery({
                queryKey: ['country', country.name.common],
                queryFn: async (): Promise<Country[]> => {
                  const res = await fetch(
                    `https://restcountries.com/v3.1/name/${country}?fullText=true`,
                  );
                  return res.json();
                },
              })
            }
          >
            {country.name.common}
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default BorderCountries;
