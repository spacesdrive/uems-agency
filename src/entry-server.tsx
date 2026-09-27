import { StrictMode } from 'react';
import { prerender } from 'react-dom/static';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { routes } from './routes';

export const paths = routes.map((r) => r.path);

/** Renders a route to static HTML, waiting for lazy route chunks to resolve. */
export async function render(url: string): Promise<string> {
  const { prelude } = await prerender(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  return new Response(prelude).text();
}
