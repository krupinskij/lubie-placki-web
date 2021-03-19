import { Typography } from '@material-ui/core';

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
      <Typography paragraph>Opis:</Typography>
      <Typography paragraph>{m}</Typography>
    </>
  );
}
