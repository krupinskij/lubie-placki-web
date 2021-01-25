import { Recipes } from "../../typings/types";
import { Recipe } from "./Recipe";

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