import { RecipeForm } from '@/components/recipes/form';
import { MainContainer } from '@/components/ui/main-container';
import { PageTitle } from '@/components/ui/page-title';
import { FormattedMessage } from 'react-intl';

export function Component() {
  return (
    <MainContainer size="small">
      <PageTitle
        title={<FormattedMessage id="recipes.create.title" />}
        withBackButton
      />
      <RecipeForm />
    </MainContainer>
  );
}
