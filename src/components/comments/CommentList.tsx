import { PaginatedList } from '../pagination/PaginatedList';
import { Comment } from './Comment';

import { DocumentNode } from 'graphql';
import { CommentInput } from './CommentInput';
import { UserSession } from '../../utils/user-session';

interface CommentListProps {
  dataName: string;
  query: DocumentNode;
  variables?: {};
  recipe: string;
}

export function CommentList({ dataName, query, variables, recipe }: CommentListProps) {
  return (
    <>
      {UserSession.isActive && <CommentInput recipe={recipe} />}
      <PaginatedList query={query} dataName={dataName} variables={variables} component={Comment} />
    </>
  );
}
