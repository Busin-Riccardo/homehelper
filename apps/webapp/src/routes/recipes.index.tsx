import { NoDataIllustration } from '@/components/illustrations/no-data';
import { Button } from '@/components/ui/button';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

export function Component() {
  return (
    <div className="flex flex-col flex-grow h-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-semibold">
          <FormattedMessage id="recipes.title" />
        </h1>
      </div>
      <div className="flex flex-col flex-grow justify-center gap-4 py-4">
        <NoDataIllustration />
        <span className="text-2xl text-center w-full inline-block">
          <FormattedMessage id="recipes.empty" />
        </span>
      </div>

      <div className="flex flex-row justify-end">
        <Button asChild className="flex-grow md:flex-grow-0">
          <Link to="create">
            <FormattedMessage id="recipes.add" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
