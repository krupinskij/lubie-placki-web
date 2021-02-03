import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteComponentProps } from 'react-router';

import { Recipe } from '../../components/recipe/Recipe';
import { View } from '../../templates/View';

import { RECIPE_QUERY } from '../../graphql/recipe.query';
import { Recipes } from '../../typings/types';

interface RecipeMatchParams {
    id: string;
}

type RecipeProps = RouteComponentProps<RecipeMatchParams>;

export function RecipePage(props: RecipeProps) {
    
    return(
        <View>
            <Query
                query={RECIPE_QUERY}
                variables={{
                    id: props.match.params.id
                }}
            >
                {({ data, error }: QueryResult<Recipes.Recipe>) => {
                    if(data) {
                        return <Recipe {...(data as any).recipe} />;
                    }
                    if(error) {
                        <div>Wystąpił błąd</div>
                    }

                    return <div>Loading...</div>
                }}
            </Query>
        </View>
    )
}