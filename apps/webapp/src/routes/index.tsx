import { auth } from '@/state/auth';
import { useValue } from 'signia-react';
import loader from '@/stylesheets/loaders.module.css';
import { FormattedMessage } from 'react-intl';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/navbar.tsx';

export const Component = () => {
  const loading = useValue(auth.loading);
  const isAuthenticated = useValue(auth.isAuthenticated);
  if (!loading && !isAuthenticated) {
    auth.login();
  }

  if (loading)
    return (
      <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
        <div className={loader.loader1} />
        <FormattedMessage id="loading" />
      </div>
    );

  return (
    <div className="flex flex-row min-h-screen">
      <Navbar />
      <div className="flex-grow p-4 pb-14 xl:max-w-screen-xl xl:mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

Component.displayName = 'HomePage';
