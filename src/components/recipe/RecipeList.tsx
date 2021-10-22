import { PaginatedList } from '../pagination/PaginatedList';
import { Recipe } from './Recipe';

import { Data, Recipes } from '../../typings/types';

interface RecipeListProps {
  recipes: Data.PaginatedData<Recipes.Recipe>;
  page: number;
}

export function RecipeList({ recipes, page }: RecipeListProps) {
  return <PaginatedList data={recipes.data} page={page} pages={recipes.pages} component={Recipe} />;
}
