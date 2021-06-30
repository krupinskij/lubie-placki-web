import { Query, QueryResult } from 'react-apollo';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { RecipeList } from '../components/recipe/RecipeList';

import { RECIPES_QUERY } from '../graphql/recipes.query';
import { Recipes } from '../typings/types';

export function HomePage() {
  return (
    <Query query={RECIPES_QUERY}>
      {({ data, error }: QueryResult<Recipes.Recipes>) => {
        if (data) {
          return <RecipeList recipes={data.recipes} />;
        }
        if (error) {
          return <Error />;
        }
        return <Loading />;
      }}
    </Query>
  );
}
