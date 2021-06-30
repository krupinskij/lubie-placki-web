import { useQuery } from 'react-apollo';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { RecipeList } from '../components/recipe/RecipeList';

import { FAVOURITE_RECIPES_QUERY } from '../graphql/favourite-recipes.query';

export function FavouritePage() {
  const { data, error } = useQuery(FAVOURITE_RECIPES_QUERY);

  if (data) return <RecipeList recipes={data.favouriteRecipes} />;
  if (error) return <Error />;
  return <Loading />;
}
