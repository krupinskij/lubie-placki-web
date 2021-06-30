import { useQuery } from 'react-apollo';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { RecipeList } from '../components/recipe/RecipeList';

import { RECIPES_QUERY } from '../graphql/recipes.query';

export function HomePage() {
  const { data, error } = useQuery(RECIPES_QUERY);

  if (data) return <RecipeList recipes={data.recipes} />;
  if (error) return <Error />;
  return <Loading />;
}
