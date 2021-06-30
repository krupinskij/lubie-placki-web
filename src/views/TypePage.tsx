import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { RecipeList } from '../components/recipe/RecipeList';

import { TYPE_RECIPES_QUERY } from '../graphql/type-recipes.query';

export function TypePage() {
  const params: any = useParams();
  const { data, error } = useQuery(TYPE_RECIPES_QUERY, { variables: { type: params.type } });

  if (data) {
    return <RecipeList recipes={data.recipes} />;
  }

  if (error) {
    return <Error />;
  }

  return <Loading />;
}
