import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { CommentList } from '../components/comments/CommentList';
import { Recipe } from '../components/recipe/Recipe';
import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';

import { RECIPE_QUERY } from '../graphql/recipe.query';
import { Data } from '../typings/types';

export function RecipePage() {
  const params: any = useParams();
  const { data, error, loading } = useQuery<Data.RecipeData>(RECIPE_QUERY, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data) {
    return (
      <>
        <Recipe {...data.recipe} />;
        <CommentList recipeId={params.id} />
      </>
    );
  }

  return null;
}
