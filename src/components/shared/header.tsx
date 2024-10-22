import { Link } from 'react-router-dom';
import Container from './container';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '@/hooks';

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="grid min-h-20 place-items-center bg-neutral-white shadow dark:bg-neutral-dark-blue">
      <Container className="flex items-center justify-between">
        <Link
          to="/"
          className="text-lg font-bold tracking-wide sm:text-xl md:text-2xl lg:text-3xl"
        >
          Where in the world?
        </Link>
        {theme === 'dark' ? (
          <button
            className="inline-flex items-center gap-2"
            onClick={() => setTheme('light')}
          >
            <SunIcon width={16} className="fill-white" /> Light Mode
          </button>
        ) : (
          <button
            className="inline-flex items-center gap-2"
            onClick={() => setTheme('dark')}
          >
            <MoonIcon
              width={16}
              className="fill-neutral-very-dark-blue-light"
            />{' '}
            Dark Mode
          </button>
        )}
      </Container>
    </header>
  );
};
export default Header;
