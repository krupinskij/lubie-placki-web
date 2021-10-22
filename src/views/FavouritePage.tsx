import { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useLocation } from 'react-router';

import { RecipeList } from '../components/recipe/RecipeList';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { FAVOURITE_RECIPES_QUERY } from '../graphql/favourite-recipes.query';
import { Data } from '../typings/types';

export function FavouritePage() {
  const { search } = useLocation();

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const page = +(new URLSearchParams(search).get('page') || '1');
    setPage(page);
  }, [search]);

  const { data, error, loading } = useQuery<Data.PaginatedFavouriteRecipesData>(FAVOURITE_RECIPES_QUERY, {
    variables: { paginationInput: { page } },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data) {
    return <RecipeList recipes={data.favouriteRecipes} page={page} />;
  }

  return null;
}
