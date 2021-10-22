import { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useParams } from 'react-router';

import { RecipeList } from '../components/recipe/RecipeList';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { TYPE_RECIPES_QUERY } from '../graphql/type-recipes.query';
import { Data } from '../typings/types';

export function TypePage() {
  const params: any = useParams();
  const { search } = useLocation();

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const page = +(new URLSearchParams(search).get('page') || '1');
    setPage(page);
  }, [search]);

  const { data, error, loading } = useQuery<Data.PaginatedTypeRecipesData>(TYPE_RECIPES_QUERY, {
    variables: { paginationInput: { page }, type: params.type },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data) {
    return <RecipeList recipes={data.typeRecipes} page={page} />;
  }

  return null;
}
