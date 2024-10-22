import { Skeleton } from '../ui/skeleton';

const PageSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-x-16 gap-y-8 lg:grid-cols-2 lg:items-center">
      <div className="aspect-[6/4] w-full rounded">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/4" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-8 w-2/4" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageSkeleton;
