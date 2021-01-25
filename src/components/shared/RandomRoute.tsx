import { Query, QueryResult } from "react-apollo";
import { Redirect, Route } from "react-router";
import { RANDOM_RECIPE_QUERY } from "../../graphql/random-recipe.query";
import { RECIPES_QUERY } from "../../graphql/recipes.query";
import { Recipes } from "../../typings/types";

export function RandomRoute({ ...rest }: any) {
    return (
        <Route
        {...rest}
        render={props =>
            <Query query={RANDOM_RECIPE_QUERY} fetchPolicy='network-only' >
                {({ data }: any) => {
                    if(data) {
                        return <Redirect to={`/recipe/${data.randomRecipe[0]._id}`} />
                    } else {
                        return <div>Loading...</div>
                    }
                }}
            </Query>
            
        }
    />
    )
}