export namespace Recipes {
    type Ingredient = {
        product: string;
        quantity: number;
        unit: string;
    };

    type Direction = {
        text: string;
    };

    type Hint = {
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
    };

    export type Recipes = {
        __typename?: 'Recipes';
        recipes: Recipe[];
    };

    export type RandomRecipe = {
        __typename?: 'RandomRecipe';
        _id: string;
    }
}