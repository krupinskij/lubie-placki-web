import { Query, QueryResult } from 'react-apollo';

import { Error } from '../components/shared/Error';
import { Page } from '../components/shared/Page';
import { RecipeList } from '../components/recipe/RecipeList';

import { RECIPES_QUERY } from '../graphql/recipes.query';
import { Recipes } from '../typings/types';

export function HomePage() {
  return (
    <Page>
      <Query query={RECIPES_QUERY}>
        {({ data, loading }: QueryResult<Recipes.Recipes>) => {
          // if (data) {
          // //   return <RecipeList recipes={data.recipes} />;
          // // }
          // // if (loading) {
          //   <div>Loading...</div>;
          // }
          return <Error />;
        }}
      </Query>
    </Page>
  );
}
