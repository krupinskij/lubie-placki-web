import React from 'react';
import { Query, QueryResult } from 'react-apollo';

import { RecipeList } from '../../components/recipe/RecipeList';
import { View } from '../../templates/View';

import { RECIPES_QUERY } from '../../graphql/recipes.query';
import { Recipes } from '../../typings/types';

export function HomePage() {
    return(
        <View>
            <Query query={RECIPES_QUERY}>
                {({ data, loading }: QueryResult<Recipes.Recipes>) => {
                    if(data) {
                        return <RecipeList recipes={data.recipes} />;
                    }
                    if(loading) {
                        <div>Loading...</div>
                    }
                    return <div>Wystąpił błąd</div>
                }} 
            </Query>
        </View>
    )
}