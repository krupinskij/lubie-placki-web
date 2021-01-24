import { Recipes } from "../../typings/types";
import { Recipe } from "./Recipe";

import "./RecipeList.scss";

interface RecipeListProps {
    recipes: Recipes.Recipe[];
}

export function RecipeList({ recipes }: RecipeListProps) {
    const recipesList = recipes.map(recipe => <Recipe {...recipe} />)

    return (
        <div className="recipe-list">
            { recipesList }
        </div>
    )
}