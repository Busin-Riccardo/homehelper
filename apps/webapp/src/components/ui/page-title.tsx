import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from './button';
import { Icon } from '@iconify/react/dist/iconify.js';

export function PageTitle({
  title,
  withBackButton,
}: {
  title: ReactNode;
  withBackButton?: boolean;
}) {
  return (
    <div className="pb-4 flex flex-col gap-y-2">
      <h1 className="text-2xl font-semibold">{title}</h1>
      {withBackButton && (
        <div className="flex flex-row justify-start">
          <Button asChild variant="ghost" className="relative -left-4">
            <Link relative="path" to=".." className="flex flex-row gap-1.5">
              <Icon icon="tabler:arrow-left" />
              <FormattedMessage id="app.back" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
