import { Query, QueryResult } from 'react-apollo';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { RecipeList } from '../components/recipe/RecipeList';

import { FAVOURITE_RECIPES_QUERY } from '../graphql/favourite-recipes.query';
import { Recipes } from '../typings/types';

export function FavouritePage() {
  return (
    <Query query={FAVOURITE_RECIPES_QUERY}>
      {({ data, error }: QueryResult<Recipes.FavouriteRecipes>) => {
        if (data) {
          return <RecipeList recipes={data.favouriteRecipes} />;
        }
        if (error) {
          return <Error />;
        }
        return <Loading />;
      }}
    </Query>
  );
}
