import { RecipeList } from '../components/recipe/RecipeList';

import { FAVOURITE_RECIPES_QUERY } from '../graphql/favourite-recipes.query';

export function FavouritePage() {
  return <RecipeList query={FAVOURITE_RECIPES_QUERY} dataName="favouriteRecipes" />;
}
