import { Link } from 'react-router-dom';
import { MapPin, Compass, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-very-light-gray dark:bg-neutral-very-dark-blue">
      <div className="w-full max-w-lg px-6 py-8 text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="mb-2 text-8xl font-extrabold text-neutral-dark-blue dark:text-white">
            404
          </h1>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
            <Compass className="animate-spin-slow h-20 w-20 text-neutral-dark-gray dark:text-neutral-dark-blue" />
          </div>
        </div>

        {/* Message */}
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold text-neutral-very-dark-blue-light dark:text-white">
            Lost in Navigation
          </h2>
          <p className="text-neutral-dark-gray dark:text-neutral-very-light-gray">
            The page you're looking for seems to have wandered off the map.
          </p>
        </div>

        {/* Location Pin Animation */}
        <div className="mb-8 mt-8 flex justify-center">
          <MapPin className="h-8 w-8 animate-bounce text-neutral-dark-gray dark:text-white" />
        </div>

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center rounded-lg bg-neutral-dark-blue px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-opacity-90 dark:bg-neutral-dark-blue"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
