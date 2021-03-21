import Typography from '@material-ui/core/Typography';

import { Recipes } from '../../typings/types';

interface RecipeMethodsProps {
  methods: Recipes.Direction[];
}

export function RecipeMethods({ methods }: RecipeMethodsProps) {
  const m = methods.map((method) => {
    return <li key={method.text}>{method.text}</li>;
  });

  return (
    <>
      <Typography variant="h6" component="h3">
        Opis:
      </Typography>
      <Typography paragraph>{m}</Typography>
    </>
  );
}
