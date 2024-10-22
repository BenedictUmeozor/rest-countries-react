import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Container = ({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('container mx-auto max-w-7xl px-4 md:px-8', className)}>
      {children}
    </div>
  );
};
export default Container;
