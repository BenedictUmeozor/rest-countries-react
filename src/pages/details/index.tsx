import BorderCountries from '@/components/details/borders';
import PageSkeleton from '@/components/details/page-skeleton';
import Container from '@/components/shared/container';
import { Country } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import NotFound from '../404';

const CountryPage = () => {
  const navigate = useNavigate();
  const { country } = useParams();

  const { data, isPending, isError } = useQuery({
    queryKey: ['country', country],
    queryFn: async (): Promise<Country[]> => {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${country}?fullText=true`,
      );
      return res.json();
    },
    staleTime: Infinity,
  });

  if (isPending) {
    return (
      <Container className="space-y-12 py-8 max-lg:max-w-3xl">
        <button
          className="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-white px-4 text-sm font-thin shadow dark:bg-neutral-dark-blue"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft width={16} /> Back
        </button>
        <PageSkeleton />
      </Container>
    );
  }

  if (isError) return <NotFound />;

  return (
    <Container className="space-y-12 py-8 max-lg:max-w-3xl">
      <button
        className="inline-flex h-8 items-center gap-2 rounded-md bg-neutral-white px-4 text-sm font-thin shadow dark:bg-neutral-dark-blue"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft width={16} /> Back
      </button>

      <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center">
        <div>
          <img
            src={data[0].flags.svg}
            alt=""
            className="aspect-[6/4] w-full rounded object-cover"
          />
        </div>
        <div className="space-y-8">
          <h1 className="text-2xl font-semibold lg:text-3xl">
            {data[0].name.common}
          </h1>
          <div className="gap-8 max-lg:space-y-8 lg:flex lg:items-start">
            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-2">
                Native Name:
                <span className="text-neutral-dark-gray">
                  {data[0].name.official}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Population:
                <span className="text-neutral-dark-gray">
                  {data[0].population}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Region:
                <span className="text-neutral-dark-gray">{data[0].region}</span>
              </li>
              <li className="flex items-start gap-2">
                Sub Region:
                <span className="text-neutral-dark-gray">
                  {data[0].subregion}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Capital:
                <span className="text-neutral-dark-gray">
                  {data[0].capital}
                </span>
              </li>
            </ul>

            <ul className="flex-1 space-y-4">
              <li className="flex items-start gap-2">
                UN Member:
                <span className="text-neutral-dark-gray">
                  {data[0].unMember ? 'Yes' : 'No'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Currencies:
                <span className="text-neutral-dark-gray">
                  {data[0].currencies &&
                    Object.keys(data[0].currencies)
                      .map(
                        (key) =>
                          `${data[0].currencies[key].name} (${data[0].currencies[key].symbol})`,
                      )
                      .join(', ')}
                </span>
              </li>
              <li className="flex items-start gap-2">
                Languages:
                <span className="text-neutral-dark-gray">
                  {data[0].languages &&
                    Object.values(data[0].languages).join(', ')}
                </span>
              </li>
            </ul>
          </div>

          <div className="items-center gap-2 max-lg:space-y-4 lg:flex">
            <h2>Border Countries:</h2>
            {data[0].borders && data[0].borders.length ? (
              <BorderCountries borders={data[0].borders} />
            ) : (
              <span className="text-neutral-dark-gray">
                No border countries
              </span>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};
export default CountryPage;
