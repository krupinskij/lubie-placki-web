import { useParams } from 'react-router-dom';

import { RecipeList } from '../components/recipe/RecipeList';

import { TYPE_RECIPES_QUERY } from '../graphql/type-recipes.query';

export function TypePage() {
  const params: any = useParams();

  return <RecipeList query={TYPE_RECIPES_QUERY} variables={{ type: params.type }} dataName="typeRecipes" />;
}
