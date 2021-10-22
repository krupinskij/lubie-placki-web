import { useQuery } from 'react-apollo';
import { useLocation } from 'react-router';

import { Comment } from './Comment';
import { CommentInput } from './CommentInput';

import { PaginatedList } from '../pagination/PaginatedList';
import { Loading } from '../shared/Loading';
import { Error } from '../shared/Error';

import { COMMENTS_QUERY } from '../../graphql/comments.query';
import { UserSession } from '../../utils/user-session';
import { Data } from '../../typings/types';

interface CommentListProps {
  recipeId: string;
}

export function CommentList({ recipeId }: CommentListProps) {
  const { search } = useLocation();
  const page = +(new URLSearchParams(search).get('page') || '1');

  const { data, error, loading } = useQuery<Data.PaginatedCommentData>(COMMENTS_QUERY, {
    variables: { paginationInput: { page }, recipeId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return <Loading />;
  if (error) return <Error />;

  if (data) {
    <>
      {UserSession.isActive && <CommentInput recipe={recipeId} />}
      <PaginatedList
        data={data.commentsByRecipeId.data}
        page={page}
        pages={data.commentsByRecipeId.pages}
        component={Comment}
      />
    </>;
  }

  return null;
}
