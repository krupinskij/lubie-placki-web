import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { Recipe } from '../components/recipe/Recipe';

import { RECIPE_QUERY } from '../graphql/recipe.query';
import { CommentList } from '../components/comments/CommentList';
import { COMMENTS_QUERY } from '../graphql/comments.query';

export function RecipePage() {
  const params: any = useParams();
  const { data, error, loading } = useQuery(RECIPE_QUERY, {
    variables: { id: params.id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <>
      <Recipe {...(data as any).recipe} />;
      <CommentList
        query={COMMENTS_QUERY}
        dataName="commentsByRecipeId"
        variables={{ recipeId: params.id }}
        recipe={params.id}
      />
    </>
  );
}
