import { Recipe } from "./Recipe";

import { Recipes } from "../../typings/types";

interface RecipeListProps {
    recipes: Recipes.Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
    const recipesList = recipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)

    return (
        <>
            { recipesList }
        </>
    )
}