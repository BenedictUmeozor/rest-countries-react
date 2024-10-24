import { Skeleton } from '../ui/skeleton';

const CountrySkeleton = () => {
  return (
    <div className="rounded-md max-sm:mx-auto max-sm:w-3/4">
      <Skeleton className="aspect-[6.5/4] w-full" />

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
export default CountrySkeleton;
