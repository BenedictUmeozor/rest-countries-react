import { Outlet } from 'react-router-dom';
import Header from '../components/shared/header';

const RootLayout = () => {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <section>
        <Outlet />
      </section>
      <footer className="py-8 text-center text-sm text-neutral-dark-gray">
        &copy; {new Date().getFullYear()}{' '}
        <a
          href="https://benedictumeozor.vercel.app"
          target="_blank"
          className="hover:underline"
        >
          Benedict
        </a>
      </footer>
    </main>
  );
};
export default RootLayout;
