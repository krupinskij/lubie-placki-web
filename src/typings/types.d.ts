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

export namespace Data {
  export type RecipeData = {
    recipe: Recipe;
  };

  export type PaginatedData<T> = {
    data: T[];
    pages: number;
  };

  export type PaginatedRecipesData = {
    recipes: PaginatedData<Recipes.Recipe>;
  };

  export type PaginatedFavouriteRecipesData = {
    favouriteRecipes: PaginatedData<Recipes.Recipe>;
  };

  export type PaginatedTypeRecipesData = {
    typeRecipes: PaginatedData<Recipes.Recipe>;
  };

  export type PaginatedUserRecipesData = {
    userRecipes: PaginatedData<Recipes.Recipe>;
  };

  export type PaginatedCommentData = {
    commentsByRecipeId: PaginatedData<Comments.Comment>;
  };

  export type UserData = {
    user: Users.User;
  };

  export type RandomRecipeData = {
    randomRecipe: string;
  };

  export type TokenData = {
    token: string;
    refreshToken: string;
  };

  export type LoginData = {
    login: TokenData;
  };

  export type RegisterData = {
    register: TokenData;
  };

  export type IdData = {
    _id: string;
  };

  export type CreateRecipeData = {
    createRecipe: IdData;
  };

  export type UploadPhotoData = {
    uploadPhoto: IdData;
  };

  export type AddPhotoToRecipeData = {
    addPhotoToRecipe: IdData;
  };

  export type EditUserData = {
    editUser: IdData;
  };

  export type AddAvatarToUserData = {
    addAvatarToUser: IdData;
  };

  export type CreateCommentData = {
    createComment: IdData;
  };

  export type AddToFavouriteData = {
    addToFavourite: IdData;
  };

  export type RemoveFromFavouriteData = {
    removeFromFavourite: IdData;
  };
}
