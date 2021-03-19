import { Recipes } from '../../typings/types';
import { Recipe } from './Recipe';

interface RecipeListProps {
  recipes: Recipes.Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
  const recipesList = recipes.map((recipe) => (
    <>
      <Recipe key={recipe._id + '0'} {...recipe} />
      <Recipe key={recipe._id + '1'} {...recipe} />
      <Recipe key={recipe._id + '2'} {...recipe} />
    </>
  ));

  return <>{recipesList}</>;
}
