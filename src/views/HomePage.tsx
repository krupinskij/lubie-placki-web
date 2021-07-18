import { RecipeList } from '../components/recipe/RecipeList';

import { RECIPES_QUERY } from '../graphql/recipes.query';

export function HomePage() {
  return <RecipeList query={RECIPES_QUERY} dataName="recipes" />;
}
