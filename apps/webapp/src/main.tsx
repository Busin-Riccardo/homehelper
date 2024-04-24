import React from 'react';
import ReactDOM from 'react-dom/client';
import './globals.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import en from './i18n/en.json';
import { Toaster } from './components/ui/toaster';
const router = createBrowserRouter([
  {
    path: '/',
    lazy: () => import('./routes/index'),
    children: [
      {
        path: '/recipes',
        lazy: () => import('./routes/recipes.index'),
      },
      {
        path: '/recipes/create',
        lazy: () => import('./routes/recipes.create'),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IntlProvider messages={en} locale={navigator.language}>
      <RouterProvider router={router} />
      <Toaster />
    </IntlProvider>
  </React.StrictMode>,
);
