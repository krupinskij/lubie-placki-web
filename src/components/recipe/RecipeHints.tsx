import { Typography } from '@material-ui/core';

import { Recipes } from '../../typings/types';

interface RecipeHintsProps {
  hints: Recipes.Hint[];
}

export function RecipeHints({ hints }: RecipeHintsProps) {
  const h = hints.map((hint) => {
    return <li key={hint.text}>{hint.text}</li>;
  });

  return (
    <>
      <Typography paragraph>Wskazówki:</Typography>
      <Typography paragraph>{h}</Typography>
    </>
  );
}
