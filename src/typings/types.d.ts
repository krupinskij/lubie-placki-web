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
      avatar: string;
    };
    isFavourite: boolean;
    photo: string;
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

export namespace Users {
  export type User = {
    __typename?: 'User';
    _id: string;
    username: string;
    bio?: string;
    avatar: string;
  };
}

export namespace Comments {
  export type Comment = {
    __typename?: 'Comment';
    _id: string;
    text: string;
    createdAt: number;
    owner: {
      _id: string;
      username: string;
      avatar: string;
    };
  };
}
