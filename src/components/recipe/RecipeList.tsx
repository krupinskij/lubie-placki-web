import { PaginatedList } from '../pagination/PaginatedList';
import { Recipe } from './Recipe';

import { DocumentNode } from 'graphql';

interface RecipeListProps {
  dataName: string;
  query: DocumentNode;
  variables?: {};
}

export function RecipeList({ dataName, query, variables }: RecipeListProps) {
  return <PaginatedList query={query} dataName={dataName} variables={variables} component={Recipe} />;
}
