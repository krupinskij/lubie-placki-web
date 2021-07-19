import { useQuery } from 'react-apollo';
import { useParams } from 'react-router-dom';

import { Error } from '../components/shared/Error';
import { Loading } from '../components/shared/Loading';
import { Recipe } from '../components/recipe/Recipe';

import { RECIPE_QUERY } from '../graphql/recipe.query';
import { CommentInput } from '../components/comments/CommentInput';

export function RecipePage() {
  const params: any = useParams();
  const { data, error } = useQuery(RECIPE_QUERY, { variables: { id: params.id } });

  if (data)
    return (
      <>
        <Recipe {...(data as any).recipe} />;
        <CommentInput />
      </>
    );
  if (error) return <Error />;
  return <Loading />;
}
