export namespace Recipes {
  export type Ingredient = {
    product: string;
    quantity: number;
    unit: string;
  };

  export type Direction = {
    text: string;
  };

  export type Hint = {
    text: string;
  };

  export type Recipe = {
    __typename?: 'Recipe';
    _id: string;
    name: string;
    description: string;
    ingredients: Ingredient[];
    directions: Direction[];
    hints: Hint[];
    createdAt: number;
    owner: {
      _id: string;
      username: string;
    };
    isFavourite: boolean;
  };

  export type Recipes = {
    __typename?: 'Recipes';
    recipes: Recipe[];
  };

  export type FavouriteRecipes = {
    __typename?: 'Recipes';
    favouriteRecipes: Recipe[];
  };

  export type RandomRecipe = {
    __typename?: 'RandomRecipe';
    _id: string;
  };
}
