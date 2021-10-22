import { useEffect, useState } from 'react';
import { useQuery } from 'react-apollo';
import { useLocation, useParams } from 'react-router';

import { UserProfile } from '../components/profile/UserProfile';
import { RecipeList } from '../components/recipe/RecipeList';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { USER_QUERY } from '../graphql/user.query';
import { USER_RECIPES_QUERY } from '../graphql/user-recipes.query';
import { Data } from '../typings/types';

export function ProfilePage() {
  const params: any = useParams();
  const { search } = useLocation();

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    const page = +(new URLSearchParams(search).get('page') || '1');
    setPage(page);
  }, [search]);

  const { data: userData, error: userError, loading: userLoading } = useQuery<Data.UserData>(USER_QUERY, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });

  const { data: recipeData, error: recipeError, loading: recipeLoading } = useQuery<Data.PaginatedUserRecipesData>(
    USER_RECIPES_QUERY,
    {
      variables: { paginationInput: { page }, owner: params.id },
      fetchPolicy: 'cache-and-network',
    },
  );

  if (userLoading || recipeLoading) return <Loading />;
  if (userError || recipeError) return <Error />;

  if (userData && recipeData) {
    return (
      <>
        <UserProfile {...userData.user} />
        <RecipeList recipes={recipeData.userRecipes} page={page} />;
      </>
    );
  }

  return null;
}
