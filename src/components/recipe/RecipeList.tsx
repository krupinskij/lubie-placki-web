import { Recipes } from "../../typings/types";
import { Recipe } from "./Recipe";

interface RecipeListProps {
    recipes: Recipes.Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
<<<<<<< HEAD
    const recipesList = recipes.map(recipe => <Recipe key={recipe._id} {...recipe} />)
=======
    const recipesList = recipes.map(recipe => <Recipe key={recipe.id} {...recipe} />)
>>>>>>> 15b1a09b4d8416652a72cfeef2cf324ac1ebce28

    return (
        <>
            { recipesList }
        </>
    )
}