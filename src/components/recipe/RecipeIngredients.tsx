import { Typography } from '@material-ui/core';

import { Recipes } from '../../typings/types';

interface RecipeIngredientsProps {
  ingredients: Recipes.Ingredient[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  const i = ingredients.map((ingredient) => {
    return (
      <li key={ingredient.product}>
        {ingredient.product} - {ingredient.quantity}
        {ingredient.unit}
      </li>
    );
  });
  return (
    <>
      <Typography paragraph>Składniki:</Typography>
      <Typography paragraph>{i}</Typography>
    </>
  );
}
