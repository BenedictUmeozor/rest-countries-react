import { memo, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { REGIONS } from '@/lib/constants';

const CustomSelect = memo(
  ({
    region,
    setRegion,
  }: {
    region: string | null;
    setRegion: (value: string | null) => void;
  }) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const toggleOpen = (e: React.MouseEvent) => {
      if (
        e.target === containerRef.current ||
        containerRef.current?.contains(e.target as Node)
      ) {
        setOpen((prev) => !prev);
      }
    };

    const handleChange = (value: string) => {
      if (region === value) {
        setRegion(null);
      } else {
        setRegion(value);
      }
      setOpen(false);
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node) &&
          listRef.current &&
          !listRef.current.contains(event.target as Node)
        ) {
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
          ref={containerRef}
          className="flex h-full cursor-pointer items-center justify-between rounded-md bg-neutral-white px-4 shadow dark:bg-neutral-dark-blue"
          onClick={toggleOpen}
        >
          {region || 'Filter by Region'}
          <ChevronDown
            width={20}
            className={cn('transition-transform', { 'rotate-180': open })}
          />
        </div>

        {open && (
          <ul
            ref={listRef}
            className={cn(
              'absolute left-0 top-14 w-full rounded-md bg-neutral-white py-2 shadow dark:bg-neutral-dark-blue',
            )}
          >
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
        )}
      </div>
    );
  },
);

export default CustomSelect;
