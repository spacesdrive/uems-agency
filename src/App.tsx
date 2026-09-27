import './styles/tokens.css';
import './styles/base.css';
import { Route, Routes } from 'react-router';
import { SiteLayout } from './layouts/SiteLayout';
import { NotFound, routes } from './routes';

export function App() {
  return (
    <SiteLayout>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SiteLayout>
  );
}
