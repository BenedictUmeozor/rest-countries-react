import { REGIONS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { memo, useEffect, useRef, useState } from 'react';

const CustomSelect = memo(
  ({
    region,
    setRegion,
  }: {
    region: string | null;
    setRegion: (value: string | null) => void;
  }) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    const handleChange = (value: string) => {
      if (region === value) {
        setRegion(null);

        return setOpen(false);
      }
      setRegion(value);

      setOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    return (
      <div className="relative h-12 w-56">
        <div
          className="flex h-full cursor-pointer items-center justify-between rounded-md bg-neutral-white px-4 shadow dark:bg-neutral-dark-blue"
          onClick={() => setOpen((prev) => !prev)}
        >
          {region || 'Filter by Region'}
          <ChevronDown
            width={20}
            className={cn('transition-transform', { 'rotate-180': open })}
          />
        </div>
        <div
          ref={ref}
          className={cn(
            'absolute left-0 top-14 w-full rounded-md bg-neutral-white shadow dark:bg-neutral-dark-blue',
            {
              hidden: !open,
            },
          )}
        >
          <ul className="py-2">
            {REGIONS.map((value) => (
              <li
                key={value}
                className={cn(
                  'cursor-pointer px-6 py-2 capitalize transition-colors hover:text-gray-400 dark:hover:text-gray-400',
                  { 'text-gray-400 dark:text-gray-400': region === value },
                )}
                onClick={() => handleChange(value)}
              >
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
);
export default CustomSelect;
