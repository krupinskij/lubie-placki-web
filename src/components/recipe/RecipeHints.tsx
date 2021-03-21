import Typography from '@material-ui/core/Typography';

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
      <Typography variant="h6" component="h3">
        Wskazówki:
      </Typography>
      <Typography paragraph>{h}</Typography>
    </>
  );
}
