import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import RootLayout from '../layouts/root';
import Home from '../pages/home';
import CountryPage from '@/pages/details';
import NotFound from '@/pages/404';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route
        path="countries/:country"
        element={<CountryPage />}
        errorElement={<NotFound />}
      />
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

export default router;
